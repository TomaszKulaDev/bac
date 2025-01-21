import { useEffect, useRef } from "react";
import YouTube from "react-youtube";

interface YouTubePlayerProps {
  videoId: string;
  speed: number;
  loopSection: [number, number] | null;
  onProgress: (progress: number) => void;
  onDurationChange: (duration: number) => void;
}

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  videoId,
  speed,
  loopSection,
  onProgress,
  onDurationChange,
}) => {
  const playerRef = useRef<any>(null);

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0 as const,
      controls: 0 as const,
      modestbranding: 1 as const,
      rel: 0 as const,
      showinfo: 0 as const,
      iv_load_policy: 3 as const, // wyłącz adnotacje
      hl: "pl" as const, // język interfejsu
      cc_lang_pref: "pl" as const, // preferowany język napisów (jeśli są dostępne)
      disablekb: 1 as const, // wyłącz sterowanie klawiaturą
    },
  };

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.setPlaybackRate(speed);
      // Wyłączamy napisy programowo po załadowaniu
      playerRef.current.unloadModule("captions");
    }
  }, [speed]);

  const onReady = (event: any) => {
    playerRef.current = event.target;
    const duration = event.target.getDuration();
    onDurationChange(duration);
    // Dodatkowe zabezpieczenie - wyłącz napisy po załadowaniu
    event.target.unloadModule("captions");
  };

  const onStateChange = (event: any) => {
    if (event.data === YouTube.PlayerState.PLAYING) {
      const progressInterval = setInterval(() => {
        const currentTime = event.target.getCurrentTime();
        onProgress(currentTime);
      }, 1000);

      return () => clearInterval(progressInterval);
    }
  };

  return (
    <div className="relative w-full aspect-video">
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onReady}
        onStateChange={onStateChange}
        className="absolute top-0 left-0 w-full h-full"
        iframeClassName="w-full h-full"
      />
    </div>
  );
};
