import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateSongsPlaylists } from "@/store/slices/features/songsSlice";
import { updatePlaylistOrder } from "@/store/slices/features/playlistSlice";
import { Playlist, Song } from "../types";
import { DragEndEvent } from "@dnd-kit/core";
import { AppDispatch } from '@/store/store';

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
}: UsePlaylistManagementProps) => {
  const dispatch = useDispatch<AppDispatch>();

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
            playlistId: currentPlaylist.id,
            newOrder: newSongs,
          })
        )
          .unwrap()
          .catch((error: Error) => {
            console.error('Failed to update playlist order:', error);
            showErrorToast("Nie udało się zaktualizować kolejności utworów");
          });
      }
    },
    [dispatch, isAuthenticated, showErrorToast, onUpdatePlaylists]
  );

  const addSongToPlaylist = useCallback(
    (playlistId: string, songId: string) => {
      if (!isAuthenticated) {
        showErrorToast(
          "Musisz być zalogowany, aby dodawać utwory do playlisty."
        );
        return;
      }

      const playlist = playlists.find((p) => p.id === playlistId);
      const song = songs.find((s) => s.id === songId);

      if (!playlist || !song) {
        showErrorToast("Nie można dodać utworu do playlisty.");
        return;
      }

      if (playlist.songs.includes(songId)) {
        showInfoToast(
          `Utwór "${song.title}" jest już w playliście "${playlist.name}"`
        );
        return;
      }

      onUpdatePlaylists((prevPlaylists) =>
        prevPlaylists.map((p) =>
          p.id === playlistId ? { ...p, songs: [songId, ...p.songs] } : p
        )
      );

      dispatch(
        updateSongsPlaylists({
          songIds: [songId],
          playlistId,
          playlistName: playlist.name,
        }) as any
      )
        .unwrap()
        .catch(() => {
          showErrorToast("Nie udało się dodać utworu do playlisty");
        });
    },
    [
      playlists,
      songs,
      dispatch,
      onUpdatePlaylists,
      isAuthenticated,
      showErrorToast,
      showInfoToast,
    ]
  );

  const removeSongFromPlaylist = useCallback(
    (playlistId: string, songId: string) => {
      if (!isAuthenticated) {
        showErrorToast("Musisz być zalogowany, aby usuwać utwory z playlisty.");
        return;
      }

      const playlistName =
        playlists.find((p) => p.id === playlistId)?.name || "";
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

      dispatch(
        updateSongsPlaylists({
          songIds: [songId],
          playlistId,
          playlistName,
          remove: true,
        }) as any
      )
        .unwrap()
        .then(() => {
          showSuccessToast("Utwór został usunięty z playlisty");
        })
        .catch(() => {
          showErrorToast("Nie udało się usunąć utworu z playlisty");
        });
    },
    [
      dispatch,
      playlists,
      onUpdatePlaylists,
      isAuthenticated,
      showSuccessToast,
      showErrorToast,
    ]
  );

  const editPlaylistName = useCallback(
    (playlistId: string, newName: string) => {
      if (!isAuthenticated) {
        showErrorToast("Musisz być zalogowany, aby edytować nazwę playlisty.");
        return;
      }

      onUpdatePlaylists((prevPlaylists) =>
        prevPlaylists.map((playlist) =>
          playlist.id === playlistId ? { ...playlist, name: newName } : playlist
        )
      );
    },
    [onUpdatePlaylists, isAuthenticated, showErrorToast]
  );

  const deletePlaylist = useCallback(
    (playlistId: string) => {
      if (!isAuthenticated) {
        showErrorToast("Musisz być zalogowany, aby usunąć playlistę.");
        return;
      }

      onUpdatePlaylists((prevPlaylists) =>
        prevPlaylists.filter((playlist) => playlist.id !== playlistId)
      );

      if (currentPlaylistId === playlistId) {
        onPlayPlaylist("");
      }
    },
    [
      onUpdatePlaylists,
      onPlayPlaylist,
      currentPlaylistId,
      isAuthenticated,
      showErrorToast,
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

  return {
    handleDragEnd,
    addSongToPlaylist,
    removeSongFromPlaylist,
    editPlaylistName,
    deletePlaylist,
    handleCreateEmptyPlaylist,
  };
};
