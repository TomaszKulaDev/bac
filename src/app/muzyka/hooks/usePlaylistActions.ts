import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateSongsPlaylists } from '@/store/actions/playlistActions';
import { Playlist } from '../types';

export const usePlaylistActions = (
  playlists: Playlist[],
  setPlaylists: (updater: (prevPlaylists: Playlist[]) => Playlist[]) => void
) => {
  const dispatch = useDispatch();

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
      }));
    },
    [dispatch, playlists, setPlaylists]
  );

  return { handleRemoveSongFromPlaylist };
};