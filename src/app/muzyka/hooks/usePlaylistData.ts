import { useState, useCallback, useEffect } from 'react';
import { Playlist } from '../types';
import { useSecuredPlaylistOperations } from './useSecuredPlaylistOperations';

export const usePlaylistData = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPlaylists = useCallback(async () => {
    if (!isAuthenticated) {
      setPlaylists([]);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/playlists');
      if (!response.ok) throw new Error('Błąd pobierania playlist');
      const data = await response.json();
      setPlaylists(data);
      sessionStorage.setItem('playlists', JSON.stringify(data));
    } catch (err) {
      console.error("Error fetching playlists:", err);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists, isAuthenticated]);

  return { 
    playlists, 
    isLoading, 
    refreshPlaylists: fetchPlaylists 
  };
};
