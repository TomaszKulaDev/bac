import { useState, useCallback } from "react";
import { useEffect } from "react";
import { Playlist } from "../types";

export const usePlaylistData = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPlaylists = useCallback(async () => {
    console.log("usePlaylistData: Fetching playlists");
    try {
      const response = await fetch('/api/playlists');
      console.log("usePlaylistData: Response status:", response.status);
      
      if (!response.ok) throw new Error('Błąd pobierania playlist');
      
      const data = await response.json();
      console.log("usePlaylistData: Received playlists:", data.length);
      setPlaylists(data);
      sessionStorage.setItem('playlists', JSON.stringify(data));
      console.log("usePlaylistData: Playlists saved to sessionStorage");
    } catch (err) {
      console.error("usePlaylistData: Error fetching playlists:", err);
      setError(err instanceof Error ? err.message : 'Wystąpił błąd');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updatePlaylist = useCallback(async (playlistId: string, updatedData: Partial<Playlist>) => {
    try {
      const response = await fetch(`/api/playlists/${playlistId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error('Błąd aktualizacji playlisty');
      
      const updatedPlaylist = await response.json();
      setPlaylists(prev => 
        prev.map(p => p.id === playlistId ? { ...updatedPlaylist, id: updatedPlaylist._id } : p)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd aktualizacji');
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  return { 
    playlists, 
    error, 
    isLoading, 
    updatePlaylist,
    refreshPlaylists: fetchPlaylists 
  };
};
