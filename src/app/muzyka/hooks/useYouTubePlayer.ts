import { useState, useCallback, useRef, useEffect } from "react";
import { YouTubeProps } from "react-youtube";
import { useResponsive } from './useResponsive';

interface UseYouTubePlayerReturn {
  player: any;
  playerRef: React.RefObject<any>;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isPlayerReady: boolean;
  error: string | null;
  playerDimensions: { width: string; height: string };
  setPlayerDimensions: (dimensions: { width: string; height: string }) => void;
  opts: YouTubeProps["opts"];
  onReady: (event: any) => void;
  onPlay: () => void;
  onPause: () => void;
  setError: (error: string | null) => void;
  updatePlayerDimensions: () => void;
  isSmallScreen: boolean;
  setIsSmallScreen: (isSmall: boolean) => void;
}

export const useYouTubePlayer = (): UseYouTubePlayerReturn => {
  const {
    playerDimensions,
    isSmallScreen,
    setPlayerDimensions,
    updatePlayerDimensions,
    setIsSmallScreen
  } = useResponsive();

  const [player, setPlayer] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const playerRef = useRef<any>(null);

  const opts: YouTubeProps["opts"] = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const onReady = useCallback((event: any) => {
    playerRef.current = event.target;
    setPlayer(event.target);
    setIsPlayerReady(true);
    setIsLoading(false);
  }, []);

  const onPlay = useCallback(() => setIsPlaying(true), []);
  const onPause = useCallback(() => setIsPlaying(false), []);

  return {
    player,
    playerRef,
    isPlaying,
    setIsPlaying,
    isLoading,
    setIsLoading,
    isPlayerReady,
    error,
    playerDimensions,
    setPlayerDimensions,
    opts,
    onReady,
    onPlay,
    onPause,
    setError,
    updatePlayerDimensions,
    isSmallScreen,
    setIsSmallScreen
  };
};
