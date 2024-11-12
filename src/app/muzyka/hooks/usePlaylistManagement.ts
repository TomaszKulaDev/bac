import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateSongsPlaylists } from "@/store/slices/features/songsSlice";
import { updatePlaylistOrder } from "@/store/slices/features/playlistSlice";
import { Playlist, Song } from "../types";
import { DragEndEvent } from "@dnd-kit/core";
import { AppDispatch } from "@/store/store";
import { validatePlaylistTitle } from "../utils/validation";
import { useSecuredPlaylistOperations } from "./useSecuredPlaylistOperations";

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
    showSuccessToast
  });

  const handleDragEnd = useCallback(
    (event: DragEndEvent, currentPlaylist: Playlist) => {
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

        dispatch(
          updatePlaylistOrder({
            playlistId: currentPlaylist._id || currentPlaylist.id || '',
            newOrder: newSongs,
          })
        )
          .unwrap()
          .catch((error: Error) => {
            console.error("Failed to update playlist order:", error);
            showErrorToast("Nie udało się zaktualizować kolejności utworw");
          });
      }
    },
    [dispatch, isAuthenticated, showErrorToast, onUpdatePlaylists]
  );

  const addSongToPlaylist = useCallback(
    async (playlistId: string, songId: string) => {
      await secureOperation(
        async () => {
          if (!playlistId || !songId) {
            throw new Error("Nieprawidłowe dane utworu lub playlisty");
          }

          const playlist = playlists.find((p) => (p._id || p.id) === playlistId);
          const song = songs.find((s) => (s._id || s.id) === songId);

          if (!playlist || !song) {
            throw new Error("Nie można dodać utworu do playlisty");
          }

          if (playlist.songs.includes(songId)) {
            showInfoToast(`Utwór "${song.title}" jest już w playliście "${playlist.name}"`);
            return;
          }

          const response = await fetch(`/api/playlists/${playlistId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ songId }),
          });

          if (!response.ok) {
            throw new Error('Nie udało się dodać utworu do playlisty');
          }

          onUpdatePlaylists((prevPlaylists) =>
            prevPlaylists.map((p) =>
              (p._id || p.id) === playlistId ? { ...p, songs: [...p.songs, songId] } : p
            )
          );
        },
        {
          errorMessage: "Nie udało się dodać utworu do playlisty",
          successMessage: "Utwór został dodany do playlisty"
        }
      );
    },
    [secureOperation, playlists, songs, onUpdatePlaylists, showInfoToast]
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
            const response = await fetch(`/api/playlists/${playlistId}/songs/${songId}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
              }
            });

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.error || 'Nie udało się usunąć utworu z playlisty');
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
            successMessage: 'Utwór został usunięty z playlisty',
            errorMessage: 'Nie udało się usunąć utworu z playlisty'
          }
        );
      } catch (error) {
        console.error('Błąd podczas usuwania utworu:', error);
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
        prevPlaylists.filter((playlist) => (playlist._id || playlist.id) !== playlistId)
      );

      if (currentPlaylistId === playlistId) {
        setCurrentPlaylistId(null);
      }
    },
    [onUpdatePlaylists, currentPlaylistId, isAuthenticated, showErrorToast, setCurrentPlaylistId]
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
      const playlist = playlists.find(p => p._id === playlistId || p.id === playlistId);
      return playlist ? playlist.songs.includes(songId) : false;
    },
    [playlists]
  );

  const handlePlaylistUpdate = async (playlistId: string, songId: string) => {
    try {
      const response = await fetch(`/api/playlists/${playlistId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ songId }),
      });

      if (!response.ok) {
        throw new Error('Błąd aktualizacji playlisty');
      }

      const updatedPlaylist = await response.json();
      onUpdatePlaylists(prev => 
        prev.map(p => (p._id || p.id) === playlistId ? { ...updatedPlaylist, id: updatedPlaylist._id } : p)
      );
      
      return true;
    } catch (error) {
      console.error('Błąd podczas aktualizacji playlisty:', error);
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
