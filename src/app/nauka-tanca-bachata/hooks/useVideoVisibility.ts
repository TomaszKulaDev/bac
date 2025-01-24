import { useEffect, useRef, useState, useCallback } from "react";

export const useVideoVisibility = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handlePlay = useCallback(async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Error playing video:", error);
        setIsPlaying(false);
      }
    }
  }, []);

  const handlePause = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const togglePlay = useCallback(async () => {
    if (isPlaying) {
      handlePause();
    } else {
      await handlePlay();
    }
  }, [isPlaying, handlePlay, handlePause]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          handlePlay();
        } else {
          handlePause();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(video);

    // Dodajemy nasłuchiwanie zdarzeń wideo
    video.addEventListener("play", () => setIsPlaying(true));
    video.addEventListener("pause", () => setIsPlaying(false));
    video.addEventListener("ended", () => setIsPlaying(false));

    return () => {
      observer.disconnect();
      video.removeEventListener("play", () => setIsPlaying(true));
      video.removeEventListener("pause", () => setIsPlaying(false));
      video.removeEventListener("ended", () => setIsPlaying(false));
    };
  }, [handlePlay, handlePause]);

  return {
    videoRef,
    isVisible,
    isPlaying,
    isMuted,
    setIsMuted,
    togglePlay,
    handlePlay,
    handlePause,
  };
};
