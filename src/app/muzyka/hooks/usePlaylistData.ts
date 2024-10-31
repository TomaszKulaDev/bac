import { useState } from "react";

import { useEffect } from "react";
import { Playlist } from "../types";

const usePlaylistData = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const cached = sessionStorage.getItem('playlists');
        if (cached) {
          setPlaylists(JSON.parse(cached));
          setIsLoading(false);
          return;
        }

        const response = await fetch('/api/playlists');
        if (!response.ok) throw new Error('Błąd pobierania playlist');
        
        const data = await response.json();
        setPlaylists(data);
        sessionStorage.setItem('playlists', JSON.stringify(data));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Wystąpił błąd');
        console.error('Błąd:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  return { playlists, error, isLoading };
};
