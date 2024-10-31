import { useMemo, useState, useEffect } from 'react';
import { Playlist } from '../types';

export const usePlaylistManagement = (songId: string, playlists: Playlist[]) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (playlists.length === 0) {
      // Sprawdź czy użytkownik jest zalogowany
      // Pobierz playlisty jeśli tak
    }
    setIsLoading(false);
  }, [playlists]);

  const isInPlaylist = useMemo(() => 
    playlists.some(playlist => playlist.songs.includes(songId)),
    [playlists, songId]
  );

  const playlistNames = useMemo(() => 
    playlists
      .filter(playlist => playlist.songs.includes(songId))
      .map(playlist => playlist.name),
    [playlists, songId]
  );

  const playlistCount = useMemo(() => 
    playlistNames.length,
    [playlistNames]
  );

  return { 
    isInPlaylist,
    playlistNames,
    playlistCount,
    isLoading
  };
};
