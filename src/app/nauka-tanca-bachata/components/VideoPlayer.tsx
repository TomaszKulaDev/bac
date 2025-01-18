"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface VideoPlayerProps {
  url: string;
  speed: number;
  mirror: boolean;
  loopSection: [number, number] | null;
  onProgress: (progress: number) => void;
  onDurationChange: (duration: number) => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url,
  speed,
  mirror,
  loopSection,
  onProgress,
  onDurationChange,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Inicjalizacja wideo
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [url]);

  // Obsługa odtwarzania/pauzy
  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  // Aktualizacja czasu i postępu
  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      onProgress(videoRef.current.currentTime);
    }
  }, [onProgress]);

  // Obsługa załadowania metadanych
  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      onDurationChange(videoRef.current.duration);
    }
  }, [onDurationChange]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const toggleFullscreen = useCallback(async () => {
    if (!containerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error("Błąd podczas przełączania trybu pełnoekranowego:", err);
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Dodaj efekt dla zmiany prędkości z dodatkową logiką dla wolnych prędkości
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;

      // Dla bardzo wolnych prędkości warto dodać dodatkowe ustawienia
      if (speed < 0.5) {
        // Popraw jakość klatek dla wolnego odtwarzania
        videoRef.current.style.imageRendering = "auto";
        // Możemy też dodać interpolację klatek jeśli przeglądarka to wspiera
        if ("preservesPitch" in videoRef.current) {
          videoRef.current.preservesPitch = true;
        }
      } else {
        videoRef.current.style.imageRendering = "";
        if ("preservesPitch" in videoRef.current) {
          videoRef.current.preservesPitch = false;
        }
      }
    }
  }, [speed]);

  // Dodaj efekt dla sekcji zapętlenia
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !loopSection) return;

    const handleTimeUpdate = () => {
      if (video.currentTime >= loopSection[1]) {
        video.currentTime = loopSection[0];
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [loopSection]);

  return (
    <div ref={containerRef} className="relative w-full h-full group">
      <video
        ref={videoRef}
        className={`w-full h-full ${mirror ? "scale-x-[-1]" : ""}`}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={togglePlay}
      >
        <source src={url} type="video/mp4" />
        Twoja przeglądarka nie obsługuje odtwarzania wideo.
      </video>

      {/* Kontrolki */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center gap-4 text-white">
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

          <div className="flex-1 flex items-center gap-2">
            <span className="text-sm">{formatTime(currentTime)}</span>
            <div className="relative flex-1 h-1 group">
              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={(e) => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = Number(e.target.value);
                  }
                }}
                className="absolute w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer z-10
                  [&::-webkit-slider-thumb]:appearance-none 
                  [&::-webkit-slider-thumb]:w-3 
                  [&::-webkit-slider-thumb]:h-3 
                  [&::-webkit-slider-thumb]:rounded-full 
                  [&::-webkit-slider-thumb]:bg-amber-500
                  [&::-webkit-slider-thumb]:opacity-0
                  group-hover:[&::-webkit-slider-thumb]:opacity-100"
              />
              <div
                className="absolute top-0 left-0 h-1 bg-amber-500 rounded-full pointer-events-none"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <span className="text-sm">{formatTime(duration)}</span>
          </div>

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
