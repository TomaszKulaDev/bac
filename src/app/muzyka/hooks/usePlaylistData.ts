import { useState, useCallback } from "react";
import { useEffect } from "react";
import { Playlist } from "../types";
import { useSecuredPlaylistOperations } from "./useSecuredPlaylistOperations";

interface UsePlaylistDataProps {
  isAuthenticated: boolean;
  showErrorToast: (message: string) => void;
  showSuccessToast: (message: string) => void;
}

export const usePlaylistData = ({
  isAuthenticated,
  showErrorToast,
  showSuccessToast,
}: UsePlaylistDataProps) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { secureOperation } = useSecuredPlaylistOperations({
    isAuthenticated,
    showErrorToast,
    showSuccessToast,
  });

  const fetchPlaylists = useCallback(async () => {
    if (!isAuthenticated) {
      setPlaylists([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      setError(null);
      await secureOperation(
        async () => {
          const response = await fetch("/api/playlists");
          if (!response.ok) throw new Error("Błąd pobierania playlist");
          const data = await response.json();
          setPlaylists(data);
        },
        {
          requireAuth: true,
          errorMessage: "Błąd pobierania playlist",
        }
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Wystąpił nieoczekiwany błąd"
      );
    } finally {
      setIsLoading(false);
    }
  }, [secureOperation, isAuthenticated]);

  useEffect(() => {
    fetchPlaylists();
  }, [isAuthenticated, fetchPlaylists]);

  return {
    playlists,
    isLoading,
    error,
    setPlaylists,
    refreshPlaylists: fetchPlaylists,
  };
};
