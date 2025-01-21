import { useEffect, useRef, useState, useCallback } from "react";
import YouTube from "react-youtube";
import { LoopSectionControl } from "./controls";

interface YouTubePlayerProps {
  videoId: string;
  speed: number;
  loopSection: [number, number] | null;
  onProgress: (progress: number) => void;
  onDurationChange: (duration: number) => void;
  onLoopSectionChange: (section: [number, number] | null) => void;
}

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  videoId,
  speed,
  loopSection,
  onProgress,
  onDurationChange,
  onLoopSectionChange,
}) => {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [isAdjustingLoop, setIsAdjustingLoop] = useState(false);

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0 as const,
      controls: 0 as const,
      modestbranding: 1 as const,
      rel: 0 as const,
      showinfo: 0 as const,
      iv_load_policy: 3 as const,
      hl: "pl" as const,
      disablekb: 1 as const,
      cc_lang_pref: "none" as const,
    },
  };

  const disableClosedCaptions = (player: any) => {
    if (!player) return;

    player.unloadModule("captions");
    player.unloadModule("cc");

    player.setOption("captions", "track", {});
    player.setOption("cc", "track", {});

    try {
      player.setOption("cc", "reload", false);
      const iframe = player.getIframe();
      if (iframe) {
        iframe.setAttribute("cc_lang_pref", "none");
      }
    } catch (error) {
      console.warn("Nie udało się zmodyfikować ustawień napisów:", error);
    }
  };

  const togglePlay = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;

    if (playerRef.current) {
      playerRef.current.seekTo(newTime);
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSeek = useCallback(
    (newTime: number) => {
      if (playerRef.current) {
        playerRef.current.seekTo(newTime);
        setCurrentTime(newTime);
        onProgress(newTime);
      }
    },
    [onProgress]
  );

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.setPlaybackRate(speed);
      disableClosedCaptions(playerRef.current);
    }
  }, [speed]);

  const onReady = (event: any) => {
    playerRef.current = event.target;
    const videoDuration = event.target.getDuration();
    setDuration(videoDuration);
    onDurationChange(videoDuration);
    disableClosedCaptions(event.target);
  };

  const onStateChange = (event: any) => {
    if (event.data === YouTube.PlayerState.PLAYING) {
      setIsPlaying(true);
      disableClosedCaptions(event.target);

      const progressInterval = setInterval(() => {
        const time = event.target.getCurrentTime();
        setCurrentTime(time);
        onProgress(time);
      }, 1000);

      return () => clearInterval(progressInterval);
    } else if (event.data === YouTube.PlayerState.PAUSED) {
      setIsPlaying(false);
    }
  };

  const handleMouseMove = () => {
    setIsControlsVisible(true);
  };

  // Centralny przycisk play/pause
  const renderPlayButton = () => {
    if (!isControlsVisible) return null;

    return (
      <button
        onClick={togglePlay}
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          w-16 h-16 flex items-center justify-center rounded-full bg-black/50 
          text-white transition-opacity duration-300 hover:bg-black/70
          ${isControlsVisible ? "opacity-100" : "opacity-0"}`}
        style={{ pointerEvents: isControlsVisible ? "auto" : "none" }}
      >
        {isPlaying ? (
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    );
  };

  // Dodaj obsługę zapętlenia
  useEffect(() => {
    if (!playerRef.current || !loopSection) return;

    const checkTime = () => {
      const currentTime = playerRef.current.getCurrentTime();
      if (currentTime >= loopSection[1]) {
        playerRef.current.seekTo(loopSection[0]);
      }
    };

    const interval = setInterval(checkTime, 100);
    return () => clearInterval(interval);
  }, [loopSection]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video bg-black group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => !isAdjustingLoop && setIsControlsVisible(false)}
    >
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onReady}
        onStateChange={onStateChange}
        className="absolute top-0 left-0 w-full h-full"
        iframeClassName="w-full h-full"
      />

      {renderPlayButton()}

      {/* Kontrolki */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 
          transition-opacity duration-300 ${
            isControlsVisible ? "opacity-100" : "opacity-0"
          }`}
        style={{ pointerEvents: isControlsVisible ? "auto" : "none" }}
      >
        <div className="flex items-center gap-4 text-white">
          {/* Przycisk play/pause */}
          <button
            onClick={togglePlay}
            className="hover:text-amber-500 transition-colors"
          >
            {isPlaying ? (
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Pasek postępu i czas */}
          <div className="flex-1 flex items-center gap-2">
            <span className="text-sm">{formatTime(currentTime)}</span>
            <div className="relative flex-1 h-1 group">
              {/* Loop section markers */}
              {loopSection && (
                <>
                  {/* Tło sekcji zapętlenia */}
                  <div
                    className="absolute top-0 h-2 bg-amber-500/40 rounded-full pointer-events-none"
                    style={{
                      left: `${(loopSection[0] / duration) * 100}%`,
                      width: `${
                        ((loopSection[1] - loopSection[0]) / duration) * 100
                      }%`,
                    }}
                  />

                  {/* Znaczniki początku i końca */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-1 h-4 bg-amber-500 rounded-full pointer-events-none"
                    style={{ left: `${(loopSection[0] / duration) * 100}%` }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-1 h-4 bg-amber-500 rounded-full pointer-events-none"
                    style={{ left: `${(loopSection[1] / duration) * 100}%` }}
                  />

                  {/* Etykiety czasu dla znaczników */}
                  <div
                    className="absolute -top-6 transform -translate-x-1/2 text-xs text-white bg-black/70 px-1 rounded"
                    style={{ left: `${(loopSection[0] / duration) * 100}%` }}
                  >
                    {formatTime(loopSection[0])}
                  </div>
                  <div
                    className="absolute -top-6 transform -translate-x-1/2 text-xs text-white bg-black/70 px-1 rounded"
                    style={{ left: `${(loopSection[1] / duration) * 100}%` }}
                  >
                    {formatTime(loopSection[1])}
                  </div>
                </>
              )}

              {/* Progress input */}
              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={(e) => handleSeek(Number(e.target.value))}
                className="absolute w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer z-10
                  [&::-webkit-slider-thumb]:appearance-none 
                  [&::-webkit-slider-thumb]:w-3 
                  [&::-webkit-slider-thumb]:h-3 
                  [&::-webkit-slider-thumb]:rounded-full 
                  [&::-webkit-slider-thumb]:bg-amber-500
                  [&::-webkit-slider-thumb]:opacity-0
                  group-hover:[&::-webkit-slider-thumb]:opacity-100"
              />

              {/* Progress indicator */}
              <div
                className="absolute top-0 left-0 h-1 bg-amber-500 rounded-full pointer-events-none"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <span className="text-sm">{formatTime(duration)}</span>
          </div>

          {/* Dodaj LoopSectionControl */}
          <LoopSectionControl
            value={loopSection}
            onChange={onLoopSectionChange}
            duration={duration}
            onAdjustingChange={setIsAdjustingLoop}
          />

          {/* Przycisk pełnego ekranu */}
          <button
            onClick={toggleFullscreen}
            className="hover:text-amber-500 transition-colors"
          >
            {isFullscreen ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
