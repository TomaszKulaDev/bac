import { useState, useEffect } from "react";
import { BachataVideo, DanceLevel } from "../types/video";

export function useNaukaBachataVideos() {
  const [videos, setVideos] = useState<BachataVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sortVideosByLevel = (videos: BachataVideo[]) => {
    // Definiujemy kolejność poziomów (bez ALL)
    const levelPriority: Record<Exclude<DanceLevel, "ALL">, number> = {
      BEGINNER: 1,
      INTERMEDIATE: 2,
      ADVANCED: 3,
    };

    return [...videos].sort((a, b) => {
      // Debug logowanie
      console.log("Sorting videos:", {
        videoA: { title: a.title, level: a.level },
        videoB: { title: b.title, level: b.level },
      });

      // Jeśli poziom to "ALL", traktuj jako najniższy priorytet
      const levelA =
        a.level === "ALL"
          ? 0
          : levelPriority[a.level as Exclude<DanceLevel, "ALL">] || 0;
      const levelB =
        b.level === "ALL"
          ? 0
          : levelPriority[b.level as Exclude<DanceLevel, "ALL">] || 0;

      return levelA - levelB;
    });
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        console.log("Fetching videos...");
        const response = await fetch("/api/naukabachataapi/videos");
        const data = await response.json();

        // Debug logowanie otrzymanych danych
        console.log(
          "Received videos before sorting:",
          data.videos.map((v: BachataVideo) => ({
            title: v.title,
            level: v.level,
          }))
        );

        if (!response.ok) {
          throw new Error(data.error || "Błąd pobierania filmów");
        }

        const sortedVideos = sortVideosByLevel(data.videos);

        // Debug logowanie po sortowaniu
        console.log(
          "Videos after sorting:",
          sortedVideos.map((v) => ({
            title: v.title,
            level: v.level,
          }))
        );

        setVideos(sortedVideos);
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
