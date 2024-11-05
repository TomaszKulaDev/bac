import { useState, useEffect } from "react";

declare global {
  interface Window {
    YT: {
      Player: any;
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

export const useVideoDuration = (videoId: string | undefined) => {
  const [duration, setDuration] = useState<string>("--:--");

  useEffect(() => {
    if (!videoId) return;

    let hiddenPlayer: HTMLDivElement | null = null;
    const playerId = `hidden-player-${videoId}`;

    const loadPlayer = () => {
      if (!hiddenPlayer) return;
      
      new window.YT.Player(playerId, {
        videoId: videoId,
        events: {
          onReady: (event: any) => {
            const durationInSeconds = event.target.getDuration();
            const minutes = Math.floor(durationInSeconds / 60);
            const seconds = Math.floor(durationInSeconds % 60);
            setDuration(`${minutes}:${seconds.toString().padStart(2, '0')}`);
            event.target.destroy();
            if (hiddenPlayer && document.body.contains(hiddenPlayer)) {
              document.body.removeChild(hiddenPlayer);
            }
          },
          onError: () => {
            setDuration("--:--");
            if (hiddenPlayer && document.body.contains(hiddenPlayer)) {
              document.body.removeChild(hiddenPlayer);
            }
          }
        }
      });
    };

    hiddenPlayer = document.createElement('div');
    hiddenPlayer.id = playerId;
    hiddenPlayer.style.display = 'none';
    document.body.appendChild(hiddenPlayer);

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = loadPlayer;
    } else {
      loadPlayer();
    }

    return () => {
      if (hiddenPlayer && document.body.contains(hiddenPlayer)) {
        document.body.removeChild(hiddenPlayer);
      }
    };
  }, [videoId]);

  return duration;
};

/*
* Ten hook współpracuje z:
* - src/app/muzyka/utils/time.ts (formatowanie czasu)
* - src/app/muzyka/components/RecommendedSongs.tsx (wyświetlanie czasu trwania utworów)
* 
* Hook pobiera czas trwania filmu z YouTube API i formatuje go do wyświetlenia
*/
