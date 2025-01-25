"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { LoopSectionControl } from "./controls";
import { YouTubePlayer } from "./YouTubePlayer";
import { isYouTubeUrl, getYouTubeVideoId } from "../utils/youtubeUtils";
import Image from "next/image";
import {
  instructors,
  INSTRUCTOR_KEYS,
  INSTRUCTOR_NAMES,
} from "../data/instructors";
import { InstructorVideo } from "../types";

interface VideoPlayerProps {
  videos: InstructorVideo[];
  speed: number;
  mirror: boolean;
  loopSection: [number, number] | null;
  onProgress: (progress: number) => void;
  onDurationChange: (duration: number) => void;
  onLoopSectionChange: (section: [number, number] | null) => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videos,
  speed,
  mirror,
  loopSection,
  onProgress,
  onDurationChange,
  onLoopSectionChange,
}) => {
  // 1. Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 2. State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [isAdjustingLoop, setIsAdjustingLoop] = useState(false);

  // 3. Derived state
  const currentVideo = videos?.[0];
  const isYouTube = currentVideo ? isYouTubeUrl(currentVideo.videoUrl) : false;
  const youtubeVideoId =
    currentVideo && isYouTube ? getYouTubeVideoId(currentVideo.videoUrl) : null;

  // 4. Effects
  useEffect(() => {
    if (!isYouTube && videoRef.current) {
      videoRef.current.load();
    }
  }, [currentVideo?.videoUrl, isYouTube]);

  const togglePlay = useCallback(() => {
    if (!isYouTube && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying, isYouTube]);

  // Aktualizacja czasu i postępu
  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime;
      setCurrentTime(time);
      onProgress(time);
    }
  }, [onProgress]);

  // Obsługa przewijania
  const handleSeek = useCallback((newTime: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  }, []);

  // Obsługa załadowania metadanych
  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      const duration = videoRef.current.duration;
      setDuration(duration);
      onDurationChange(duration);
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

  // Dodajmy efekt pokazywania kontrolek gdy loop jest aktywny
  useEffect(() => {
    if (loopSection) {
      setIsControlsVisible(true);
    } else {
      setIsControlsVisible(false);
    }
  }, [loopSection]);

  // Dodajmy handler dla zmiany stanu adjusting
  const handleLoopAdjustingChange = (adjusting: boolean) => {
    setIsAdjustingLoop(adjusting);
  };

  // Funkcja do ukrywania kontrolek po czasie bezczynności
  const hideControlsWithDelay = useCallback(() => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }

    if (isFullscreen) {
      controlsTimeoutRef.current = setTimeout(() => {
        setIsControlsVisible(false);
      }, 1000); // 1 sekunda bezczynności
    }
  }, [isFullscreen]);

  // Obsługa ruchu myszki
  const handleMouseMove = useCallback(() => {
    setIsControlsVisible(true);
    hideControlsWithDelay();
  }, [hideControlsWithDelay]);

  // Czyszczenie timeoutu przy odmontowaniu
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

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
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        ) : (
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    );
  };

  // Dodajmy komponent do obsługi avatara z fallbackiem
  const InstructorAvatar: React.FC<{
    instructor: string;
    size?: number;
  }> = ({ instructor, size = 32 }) => {
    const [imageError, setImageError] = useState(false);

    // Dodajemy sprawdzenie czy instructor istnieje
    if (!instructor || imageError) {
      return (
        <div
          className={`flex items-center justify-center rounded-full bg-amber-500 border-2 border-white`}
          style={{ width: size, height: size }}
        >
          <span className="text-white font-medium text-sm">
            {instructor
              ? instructor
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
              : "??"}
          </span>
        </div>
      );
    }

    const getInstructorImagePath = (instructorName: string) => {
      return `/images/instructors/${instructorName
        .toLowerCase()
        .replace(/[&]/g, "and")
        .replace(/\s+/g, "-")
        .replace(/[ąćęłńóśźż]/g, (match) => {
          const chars: { [key: string]: string } = {
            ą: "a",
            ć: "c",
            ę: "e",
            ł: "l",
            ń: "n",
            ó: "o",
            ś: "s",
            ź: "z",
            ż: "z",
          };
          return chars[match] || match;
        })}.jpg`;
    };

    return (
      <Image
        src={getInstructorImagePath(instructor)}
        alt=""
        width={size}
        height={size}
        className="rounded-full border-2 border-white"
        onError={() => setImageError(true)}
      />
    );
  };

  // Renderowanie odpowiedniego playera
  if (!videos?.length || !currentVideo) {
    return (
      <div className="w-full aspect-video bg-gray-900 flex items-center justify-center text-white">
        Brak dostępnych filmów
      </div>
    );
  }

  if (isYouTube && youtubeVideoId) {
    return (
      <div className={`relative ${mirror ? "scale-x-[-1]" : ""}`}>
        <YouTubePlayer
          videoId={youtubeVideoId}
          speed={speed}
          loopSection={loopSection}
          onProgress={onProgress}
          onDurationChange={onDurationChange}
          onLoopSectionChange={onLoopSectionChange}
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => !isAdjustingLoop && setIsControlsVisible(false)}
    >
      <video
        ref={videoRef}
        src={currentVideo.videoUrl}
        className={`w-full h-full ${mirror ? "scale-x-[-1]" : ""}`}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={togglePlay}
      >
        <source src={currentVideo.videoUrl} type="video/mp4" />
        Twoja przeglądarka nie obsługuje odtwarzania wideo.
      </video>

      {/* Centralny przycisk play/pause */}
      {renderPlayButton()}

      {/* Informacja o aktualnym instruktorze */}
      {currentVideo && (
        <div
          className={`absolute top-4 left-4 flex items-center gap-2
          transition-opacity duration-300 
          ${isControlsVisible ? "opacity-100" : "opacity-0"}`}
        >
          <InstructorAvatar instructor={currentVideo.instructor} size={32} />
          <div>
            <div className="text-white font-medium">
              {currentVideo.instructor}
            </div>
          </div>
        </div>
      )}

      {/* Kontrolki z animowaną przezroczystością */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 transition-opacity duration-300 ${
          isControlsVisible ? "opacity-100" : "opacity-0"
        } ${isFullscreen ? "pointer-events-none" : ""}`}
        style={{ pointerEvents: isControlsVisible ? "auto" : "none" }}
      >
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
              {/* Znaczniki zakresu zapętlenia */}
              {loopSection && (
                <>
                  {/* Zakres zapętlenia */}
                  <div
                    ref={progressBarRef}
                    className="relative flex-1 h-1 group"
                  >
                    <div
                      className="loop-range"
                      style={{
                        left: `${(loopSection[0] / duration) * 100}%`,
                        width: `${
                          ((loopSection[1] - loopSection[0]) / duration) * 100
                        }%`,
                      }}
                    />
                    {/* Znacznik początku - poprawione przeciąganie */}
                    <div
                      className="loop-marker"
                      style={{ left: `${(loopSection[0] / duration) * 100}%` }}
                      data-time={formatTime(loopSection[0])}
                      onMouseDown={(e) => {
                        const handleDrag = (moveEvent: MouseEvent) => {
                          const rect =
                            progressBarRef.current?.getBoundingClientRect();
                          if (rect) {
                            const x = moveEvent.clientX - rect.left;
                            const newTime = Math.max(
                              0,
                              Math.min(
                                (x / rect.width) * duration,
                                loopSection[1]
                              )
                            );
                            onLoopSectionChange([newTime, loopSection[1]]);
                          }
                        };

                        const handleDragEnd = () => {
                          document.removeEventListener("mousemove", handleDrag);
                          document.removeEventListener(
                            "mouseup",
                            handleDragEnd
                          );
                        };

                        document.addEventListener("mousemove", handleDrag);
                        document.addEventListener("mouseup", handleDragEnd);
                      }}
                      onTouchStart={(e) => {
                        const handleDrag = (moveEvent: TouchEvent) => {
                          const rect =
                            progressBarRef.current?.getBoundingClientRect();
                          if (rect) {
                            const x = moveEvent.touches[0].clientX - rect.left;
                            const newTime = Math.max(
                              0,
                              Math.min(
                                (x / rect.width) * duration,
                                loopSection[1]
                              )
                            );
                            onLoopSectionChange([newTime, loopSection[1]]);
                          }
                        };

                        const handleDragEnd = () => {
                          document.removeEventListener("touchmove", handleDrag);
                          document.removeEventListener(
                            "touchend",
                            handleDragEnd
                          );
                        };

                        document.addEventListener("touchmove", handleDrag);
                        document.addEventListener("touchend", handleDragEnd);
                      }}
                    />
                    {/* Znacznik końca - poprawione przeciąganie */}
                    <div
                      className="loop-marker"
                      style={{ left: `${(loopSection[1] / duration) * 100}%` }}
                      data-time={formatTime(loopSection[1])}
                      onMouseDown={(e) => {
                        const handleDrag = (moveEvent: MouseEvent) => {
                          const rect =
                            progressBarRef.current?.getBoundingClientRect();
                          if (rect) {
                            const x = moveEvent.clientX - rect.left;
                            const newTime = Math.max(
                              loopSection[0],
                              Math.min((x / rect.width) * duration, duration)
                            );
                            onLoopSectionChange([loopSection[0], newTime]);
                          }
                        };

                        const handleDragEnd = () => {
                          document.removeEventListener("mousemove", handleDrag);
                          document.removeEventListener(
                            "mouseup",
                            handleDragEnd
                          );
                        };

                        document.addEventListener("mousemove", handleDrag);
                        document.addEventListener("mouseup", handleDragEnd);
                      }}
                      onTouchStart={(e) => {
                        const handleDrag = (moveEvent: TouchEvent) => {
                          const rect =
                            progressBarRef.current?.getBoundingClientRect();
                          if (rect) {
                            const x = moveEvent.touches[0].clientX - rect.left;
                            const newTime = Math.max(
                              loopSection[0],
                              Math.min((x / rect.width) * duration, duration)
                            );
                            onLoopSectionChange([loopSection[0], newTime]);
                          }
                        };

                        const handleDragEnd = () => {
                          document.removeEventListener("touchmove", handleDrag);
                          document.removeEventListener(
                            "touchend",
                            handleDragEnd
                          );
                        };

                        document.addEventListener("touchmove", handleDrag);
                        document.addEventListener("touchend", handleDragEnd);
                      }}
                    />
                  </div>
                </>
              )}

              {/* Istniejący input range i pasek postępu */}
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

          <LoopSectionControl
            value={loopSection}
            onChange={onLoopSectionChange}
            duration={duration}
            onAdjustingChange={setIsAdjustingLoop}
          />
        </div>
      </div>
    </div>
  );
};
