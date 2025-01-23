import { useState, useEffect } from "react";
import { BachataVideo, VideosResponse } from "../types/video";

export function useNaukaBachataVideos() {
  const [videos, setVideos] = useState<BachataVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        console.log("Fetching videos..."); // Log przed fetchem
        const response = await fetch("/api/naukabachataapi/videos");
        const data = await response.json();
        console.log("Received data:", data); // Log otrzymanych danych

        if (!response.ok) {
          throw new Error(data.error || "Błąd pobierania filmów");
        }

        setVideos(data.videos);
        setIsLoading(false);
      } catch (err) {
        console.error("Error in hook:", err); // Log błędów
        setError(err instanceof Error ? err.message : "Wystąpił błąd");
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return { videos, isLoading, error };
}
