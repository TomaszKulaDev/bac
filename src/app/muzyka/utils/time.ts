export const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

/*
* Ten utility współpracuje z:
* - src/app/muzyka/hooks/useVideoDuration.ts (formatowanie czasu z YouTube API)
* - src/app/muzyka/components/RecommendedSongs.tsx (wyświetlanie sformatowanego czasu)
*
* Zawiera funkcje pomocnicze do formatowania czasu w formacie MM:SS
*/