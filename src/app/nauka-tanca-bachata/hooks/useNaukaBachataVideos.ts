import { useState, useEffect } from "react";
import { BachataVideo, DanceLevel } from "../types/video";

export function useNaukaBachataVideos() {
  const [videos, setVideos] = useState<BachataVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("/api/naukabachataapi/videos");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Błąd pobierania filmów");
        }

        setVideos(data.videos);
        setIsLoading(false);
      } catch (err) {
        console.error("Error in hook:", err);
        setError(err instanceof Error ? err.message : "Wystąpił błąd");
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return { videos, isLoading, error };
}
