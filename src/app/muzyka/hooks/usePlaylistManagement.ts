import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateSongsPlaylists } from "@/store/slices/features/songsSlice";
import {
  fetchPlaylists,
  updatePlaylistOrder,
} from "@/store/slices/features/playlistSlice";
import { Playlist, Song } from "../types";
import { DragEndEvent } from "@dnd-kit/core";
import { AppDispatch } from "@/store/store";
import { validatePlaylistTitle } from "../utils/validation";
import { useSecuredPlaylistOperations } from "./useSecuredPlaylistOperations";
import { updatePlaylist } from "@/store/slices/features/playlistSlice";
import { updatePlaylistWithSong } from "@/store/slices/features/playlistSlice";

export interface UsePlaylistManagementProps {
  playlists: Playlist[];
  onUpdatePlaylists: (
    updater: (prevPlaylists: Playlist[]) => Playlist[]
  ) => void;
  onPlayPlaylist: (playlistId: string) => void;
  currentPlaylistId: string | null;
  showSuccessToast: (message: string) => void;
  showErrorToast: (message: string) => void;
  showInfoToast: (message: string) => void;
  isAuthenticated: boolean;
  songs: Song[];
  onCreatePlaylist: (name: string, selectedSongs?: string[]) => void;
  setCurrentPlaylistId: (playlistId: string | null) => void;
  onRemoveSong?: (playlistId: string, songId: string) => Promise<void>;
}

export interface PlaylistManagementReturn {
  removeSongFromPlaylist: (playlistId: string, songId: string) => Promise<void>;
  // ...inne zwracane funkcje
}

interface SongReference {
  _id?: string;
  id?: string;
}

export const usePlaylistManagement = ({
  playlists,
  onUpdatePlaylists,
  onPlayPlaylist,
  currentPlaylistId,
  showSuccessToast,
  showErrorToast,
  showInfoToast,
  isAuthenticated,
  songs,
  onCreatePlaylist,
  setCurrentPlaylistId,
  onRemoveSong,
}: UsePlaylistManagementProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { secureOperation } = useSecuredPlaylistOperations({
    isAuthenticated,
    showErrorToast,
    showSuccessToast,
  });

  const handleDragEnd = useCallback(
    async (event: DragEndEvent, currentPlaylist: Playlist) => {
      if (!isAuthenticated) {
        showErrorToast("Musisz być zalogowany, aby zarządzać playlistami.");
        return;
      }

      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const activeIndex = currentPlaylist.songs.indexOf(active.id as string);
      const overIndex = currentPlaylist.songs.indexOf(over.id as string);

      if (activeIndex !== overIndex) {
        const newSongs = [...currentPlaylist.songs];
        newSongs.splice(activeIndex, 1);
        newSongs.splice(overIndex, 0, active.id as string);

        onUpdatePlaylists((prevPlaylists) =>
          prevPlaylists.map((playlist) =>
            playlist.id === currentPlaylist.id
              ? { ...playlist, songs: newSongs }
              : playlist
          )
        );

        try {
          const response = await fetch(
            `/api/musisite/playlists/${currentPlaylist.id}/reorder`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ newOrder: newSongs }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to update playlist order");
          }

          const updatedPlaylist = await response.json();
          onUpdatePlaylists((prevPlaylists) =>
            prevPlaylists.map((playlist) =>
              playlist.id === currentPlaylist.id
                ? { ...updatedPlaylist, id: updatedPlaylist._id }
                : playlist
            )
          );
        } catch (error) {
          console.error("Failed to update playlist order:", error);
          showErrorToast("Nie udało się zaktualizować kolejności utworów");
        }
      }
    },
    [isAuthenticated, showErrorToast, onUpdatePlaylists]
  );

  const addSongToPlaylist = useCallback(
    async (playlistId: string, songId: string) => {
      await secureOperation(
        async () => {
          if (!playlistId || !songId) {
            console.error("Missing data:", { playlistId, songId });
            throw new Error("Nieprawidłowe dane utworu lub playlisty");
          }

          const playlist = playlists.find(
            (p) => p._id === playlistId || p.id === playlistId
          );
          const song = songs.find((s) => s._id === songId || s.id === songId);

          console.log("Found playlist and song:", {
            playlist: playlist?.name,
            song: song?.title,
            playlistId,
            songId,
          });

          if (!playlist || !song) {
            console.error("Not found:", { playlist: !!playlist, song: !!song });
            throw new Error(
              "Nie można dodać utworu do playlisty - nie znaleziono utworu lub playlisty"
            );
          }

          try {
            // Sprawdź, czy playlista jest poprawnie zainicjalizowana
            if (!Array.isArray(playlist.songs)) {
              console.error("Playlist songs is not an array:", playlist);
              // Zainicjuj pustą tablicę, jeśli nie istnieje
              playlist.songs = [];
            }

            console.log("Current playlist state:", {
              playlistId,
              localSongs: playlist.songs,
              playlistDetails: {
                name: playlist.name,
                currentSongs: playlist.songs.length,
                playlistId: playlist._id || playlist.id,
                songToAdd: song.title,
              },
            });

            // Sprawdź, czy utwór nie jest już w playliście
            const songExists = playlist.songs.some(
              (id: string) => id === songId || id === song._id || id === song.id
            );

            if (songExists) {
              showInfoToast(
                `Utwór "${song.title}" jest już w playliście "${playlist.name}"`
              );
              return;
            }

            console.log("Dispatching updatePlaylistWithSong:", {
              playlistId: playlist._id || playlist.id,
              songId: song._id || song.id,
              playlistDetails: {
                name: playlist.name,
                currentSongs: playlist.songs.length,
              },
            });

            // Dodaj nagłówek autoryzacji
            const resultAction = await dispatch(
              updatePlaylistWithSong({
                playlistId: playlist._id || playlist.id,
                songId: song._id || song.id,
              })
            ).unwrap();

            console.log("Result from updatePlaylistWithSong:", {
              success: !!resultAction,
              songsCount: resultAction?.songs?.length,
              playlistId: resultAction?._id || resultAction?.id,
              error: resultAction?.error,
              resultAction,
            });

            if (!resultAction) {
              console.error("No result from server");
              throw new Error("Nie otrzymano odpowiedzi z serwera");
            }

            if (resultAction.error) {
              console.error("Server returned error:", resultAction.error);
              throw new Error(resultAction.error);
            }

            // Sprawdź, czy utwór został dodany używając obu możliwych ID
            const songWasAdded =
              Array.isArray(resultAction.songs) &&
              resultAction.songs.some(
                (id: string) =>
                  id === songId || id === song._id || id === song.id
              );

            if (!songWasAdded) {
              console.error("Song not found in updated playlist:", {
                playlistSongs: resultAction.songs,
                songId,
                songIds: { _id: song._id, id: song.id },
                playlistDetails: {
                  beforeUpdate: playlist.songs.length,
                  afterUpdate: resultAction.songs?.length || 0,
                },
              });

              // Spróbuj odświeżyć playlisty
              await dispatch(fetchPlaylists());
              throw new Error(
                "Nie udało się dodać utworu do playlisty. Spróbuj ponownie za chwilę."
              );
            }

            // Aktualizuj stan lokalny z nowymi danymi
            onUpdatePlaylists((prevPlaylists) =>
              prevPlaylists.map((p) =>
                p._id === playlistId || p.id === playlistId
                  ? {
                      ...resultAction,
                      songs: Array.isArray(resultAction.songs)
                        ? [...resultAction.songs]
                        : [],
                      id: resultAction._id || resultAction.id,
                      _id: resultAction._id || resultAction.id,
                    }
                  : p
              )
            );

            showSuccessToast(
              `Utwór "${song.title}" został dodany do playlisty "${playlist.name}"`
            );
          } catch (error) {
            console.error("Error details:", {
              error,
              message: error instanceof Error ? error.message : "Unknown error",
              playlistId,
              songId,
              playlistName: playlist.name,
              songTitle: song.title,
            });
            // Spróbuj odświeżyć playlisty w przypadku błędu
            try {
              await dispatch(fetchPlaylists());
            } catch (refreshError) {
              console.error("Error refreshing playlists:", refreshError);
            }
            throw new Error(
              error instanceof Error
                ? error.message
                : "Wystąpił błąd podczas dodawania utworu do playlisty"
            );
          }
        },
        {
          errorMessage: "Nie udało się dodać utworu do playlisty",
          successMessage: undefined,
        }
      );
    },
    [
      secureOperation,
      playlists,
      songs,
      onUpdatePlaylists,
      dispatch,
      showInfoToast,
      showSuccessToast,
    ]
  );

  const removeSongFromPlaylist = useCallback(
    async (playlistId: string, songId: string) => {
      if (!isAuthenticated) {
        showErrorToast("Musisz być zalogowany, aby usuwać utwory z playlisty.");
        return;
      }

      try {
        await secureOperation(
          async () => {
            const response = await fetch(
              `/api/musisite/playlists/${playlistId}/songs/${songId}`,
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  "Cache-Control": "no-cache",
                },
              }
            );

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(
                errorData.error || "Nie udało się usunąć utworu z playlisty"
              );
            }

            onUpdatePlaylists((prevPlaylists) =>
              prevPlaylists.map((playlist) =>
                playlist.id === playlistId
                  ? {
                      ...playlist,
                      songs: playlist.songs.filter((id) => id !== songId),
                    }
                  : playlist
              )
            );
          },
          {
            requireAuth: true,
            successMessage: "Utwór został usunięty z playlisty",
            errorMessage: "Nie udało się usunąć utworu z playlisty",
          }
        );
      } catch (error) {
        console.error("Błąd podczas usuwania utworu:", error);
        showErrorToast("Nie udało się usunąć utworu z playlisty");
      }
    },
    [isAuthenticated, showErrorToast, secureOperation, onUpdatePlaylists]
  );

  const editPlaylistName = useCallback(
    (playlistId: string, newName: string) => {
      const validation = validatePlaylistTitle(newName);

      if (!validation.isValid) {
        showErrorToast(validation.error || "");
        return;
      }

      onUpdatePlaylists((prevPlaylists) =>
        prevPlaylists.map((playlist) =>
          (playlist._id || playlist.id) === playlistId
            ? { ...playlist, name: newName }
            : playlist
        )
      );
    },
    [onUpdatePlaylists, showErrorToast]
  );

  const deletePlaylist = useCallback(
    (playlistId: string) => {
      if (!isAuthenticated) {
        showErrorToast("Musisz być zalogowany, aby usunąć playlistę.");
        return;
      }

      onUpdatePlaylists((prevPlaylists) =>
        prevPlaylists.filter(
          (playlist) => (playlist._id || playlist.id) !== playlistId
        )
      );

      if (currentPlaylistId === playlistId) {
        setCurrentPlaylistId(null);
      }
    },
    [
      onUpdatePlaylists,
      currentPlaylistId,
      isAuthenticated,
      showErrorToast,
      setCurrentPlaylistId,
    ]
  );

  const handleCreateEmptyPlaylist = useCallback(() => {
    if (!isAuthenticated) {
      showErrorToast("Musisz być zalogowany, aby tworzyć playlisty.");
      return;
    }

    const name = prompt("Podaj nazwę nowej playlisty:");
    if (name) {
      onCreatePlaylist(name, []);
      showSuccessToast(`Utworzono nową playlistę "${name}"`);
    }
  }, [isAuthenticated, onCreatePlaylist, showSuccessToast, showErrorToast]);

  const isInPlaylist = useCallback(
    (songId: string, playlistId: string | null) => {
      if (!playlistId || !songId) return false;
      const playlist = playlists.find(
        (p) => p._id === playlistId || p.id === playlistId
      );
      return playlist ? playlist.songs.includes(songId) : false;
    },
    [playlists]
  );

  const handlePlaylistUpdate = async (playlistId: string, songId: string) => {
    try {
      const response = await fetch(`/api/musisite/playlists/${playlistId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ songId }),
      });

      if (!response.ok) {
        throw new Error("Błąd aktualizacji playlisty");
      }

      const updatedPlaylist = await response.json();
      onUpdatePlaylists((prev) =>
        prev.map((p) =>
          (p._id || p.id) === playlistId
            ? { ...updatedPlaylist, id: updatedPlaylist._id }
            : p
        )
      );

      return true;
    } catch (error) {
      console.error("Błąd podczas aktualizacji playlisty:", error);
      return false;
    }
  };

  return {
    handleDragEnd,
    addSongToPlaylist,
    removeSongFromPlaylist,
    editPlaylistName,
    deletePlaylist,
    handleCreateEmptyPlaylist,
    isInPlaylist,
    handlePlaylistUpdate,
  };
};
