import { useState, useCallback, useEffect } from "react";
import { Playlist } from "../types";

type OperationType =
  | "UPDATE"
  | "DELETE"
  | "REORDER"
  | "ADD_SONG"
  | "REMOVE_SONG";

interface PlaylistOperation {
  type: OperationType;
  playlistId: string;
  data?: any;
  timestamp: number;
}

interface RetryConfig {
  maxAttempts: number;
  baseDelay: number;
}

export const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxAttempts: 3,
  baseDelay: 1000,
};

interface UsePlaylistSyncProps {
  retryConfig?: RetryConfig;
  showErrorToast: (message: string) => void;
}

export const usePlaylistSync = ({ 
  retryConfig = DEFAULT_RETRY_CONFIG,
  showErrorToast 
}: UsePlaylistSyncProps) => {
  const [pendingOperations, setPendingOperations] = useState<PlaylistOperation[]>(() => {
    const saved = localStorage.getItem('pendingPlaylistOperations');
    return saved ? JSON.parse(saved) : [];
  });

  const addOperation = useCallback(
    (operation: Omit<PlaylistOperation, "timestamp">) => {
      const newOperation = { ...operation, timestamp: Date.now() };
      setPendingOperations((prev) => {
        const updated = [...prev, newOperation];
        localStorage.setItem(
          "pendingPlaylistOperations",
          JSON.stringify(updated)
        );
        return updated;
      });
    },
    []
  );

  const executeOperation = useCallback(async (operation: PlaylistOperation) => {
    const { type, playlistId, data } = operation;
    let response;

    switch (type) {
      case "REORDER":
        response = await fetch(`/api/playlists/${playlistId}/reorder`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newOrder: data.newOrder }),
        });
        if (!response.ok) throw new Error("Reorder operation failed");
        return await response.json();

      case "ADD_SONG":
        response = await fetch(`/api/playlists/${playlistId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ songId: data.songId }),
        });
        if (!response.ok) throw new Error("Add song operation failed");
        return await response.json();

      case "REMOVE_SONG":
        response = await fetch(
          `/api/playlists/${playlistId}/songs/${data.songId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) throw new Error("Remove song operation failed");
        return await response.json();

      case "UPDATE":
        response = await fetch(`/api/playlists/${playlistId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Update operation failed");
        return await response.json();

      case "DELETE":
        response = await fetch(`/api/playlists/${playlistId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) throw new Error("Delete operation failed");
        return await response.json();

      default:
        throw new Error(`Unsupported operation type: ${type}`);
    }
  }, []);

  const syncWithServer = useCallback(async () => {
    if (!navigator.onLine || pendingOperations.length === 0) return;

    const operations = [...pendingOperations];
    setPendingOperations([]);
    localStorage.removeItem('pendingPlaylistOperations');

    const retryWithBackoff = async (
      operation: PlaylistOperation
    ): Promise<any> => {
      let lastError: Error | null = null;

      for (let attempt = 0; attempt < retryConfig.maxAttempts; attempt++) {
        try {
          const result = await executeOperation(operation);
          return result;
        } catch (error) {
          lastError =
            error instanceof Error ? error : new Error("Unknown error");
          if (attempt === retryConfig.maxAttempts - 1) break;

          const delay = retryConfig.baseDelay * Math.pow(2, attempt);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }

      throw lastError || new Error("Max retry attempts reached");
    };

    for (const operation of operations) {
      if (!navigator.onLine) {
        setPendingOperations((prev) => [...prev, operation]);
        break;
      }
      try {
        await retryWithBackoff(operation);
      } catch (error) {
        console.error('Sync error after retries:', error);
        setPendingOperations((prev) => [...prev, operation]);
        showErrorToast('Nie udało się zsynchronizować niektórych zmian. Spróbujemy ponownie później.');
        break;
      }
    }
  }, [pendingOperations, retryConfig.maxAttempts, retryConfig.baseDelay, executeOperation, showErrorToast]);

  useEffect(() => {
    window.addEventListener("online", syncWithServer);
    return () => window.removeEventListener("online", syncWithServer);
  }, [syncWithServer]);

  return {
    addOperation,
    pendingOperations,
    syncWithServer
  };
};
