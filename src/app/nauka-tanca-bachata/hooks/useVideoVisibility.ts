import { useEffect, useRef, useState, useCallback } from "react";

export const useVideoVisibility = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const hideControlsWithDelay = useCallback(() => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setIsControlsVisible(false);
    }, 3000);
  }, []);

  const handlePlay = useCallback(async () => {
    if (!videoRef.current) return;
    try {
      await videoRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Error playing video:", error);
      setIsPlaying(false);
    }
  }, []);

  const handlePause = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(async () => {
    if (isPlaying) {
      handlePause();
    } else {
      await handlePlay();
    }
  }, [isPlaying, handlePlay, handlePause]);

  const toggleFullscreen = useCallback(async () => {
    if (!containerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
        setIsControlsVisible(true);
        hideControlsWithDelay();
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
        setIsControlsVisible(true);
      }
    } catch (err) {
      console.error("Błąd podczas przełączania trybu pełnoekranowego:", err);
    }
  }, [hideControlsWithDelay]);

  const handleMouseMove = useCallback(() => {
    if (isFullscreen) {
      setIsControlsVisible(true);
      hideControlsWithDelay();
    }
  }, [isFullscreen, hideControlsWithDelay]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (!isFullscreen && !entry.isIntersecting && isPlaying) {
          handlePause();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(video);

    const handleFullscreenChange = () => {
      const isFullscreenNow = !!document.fullscreenElement;
      setIsFullscreen(isFullscreenNow);
      if (!isFullscreenNow) {
        setIsControlsVisible(true);
        if (controlsTimeoutRef.current) {
          clearTimeout(controlsTimeoutRef.current);
        }
      }
    };

    video.addEventListener("play", () => setIsPlaying(true));
    video.addEventListener("pause", () => setIsPlaying(false));
    video.addEventListener("ended", () => setIsPlaying(false));
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      observer.disconnect();
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      video.removeEventListener("play", () => setIsPlaying(true));
      video.removeEventListener("pause", () => setIsPlaying(false));
      video.removeEventListener("ended", () => setIsPlaying(false));
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [handlePlay, handlePause, isFullscreen, isPlaying, hideControlsWithDelay]);

  return {
    videoRef,
    containerRef,
    isVisible,
    isPlaying,
    isMuted,
    isFullscreen,
    isControlsVisible,
    setIsMuted,
    togglePlay,
    toggleFullscreen,
    handlePlay,
    handlePause,
    handleMouseMove,
  };
};
