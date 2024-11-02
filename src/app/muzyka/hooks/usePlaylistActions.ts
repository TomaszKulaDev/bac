import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateSongsPlaylists } from '@/store/slices/features/songsSlice';
import { Playlist } from '../types';
import { AppDispatch } from '@/store/store';

export const usePlaylistActions = (
  playlists: Playlist[],
  setPlaylists: (updater: (prevPlaylists: Playlist[]) => Playlist[]) => void
) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveSongFromPlaylist = useCallback(
    (playlistId: string, songId: string) => {
      setPlaylists((prevPlaylists: Playlist[]) =>
        prevPlaylists.map((playlist) =>
          playlist.id === playlistId
            ? {
                ...playlist,
                songs: playlist.songs.filter((id) => id !== songId),
              }
            : playlist
        )
      );

      const playlistName = playlists.find((p) => p.id === playlistId)?.name || "";
      dispatch(updateSongsPlaylists({
        songIds: [songId],
        playlistId,
        playlistName,
        remove: true,
      }))
        .unwrap()
        .catch((error: Error) => {
          console.error('Failed to update songs playlists:', error);
        });
    },
    [dispatch, playlists, setPlaylists]
  );

  return { handleRemoveSongFromPlaylist };
};