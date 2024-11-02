import { useCallback } from 'react';

interface UseSeekGesturesProps {
  onSeek: (time: number) => void;
  currentTime: number;
  duration: number;
}

export const useSeekGestures = ({ onSeek, currentTime, duration }: UseSeekGesturesProps) => {
  const handleDoubleTap = useCallback((position: number) => {
    const seekTime = position < 0.5 
      ? Math.max(0, currentTime - 10)
      : Math.min(duration, currentTime + 10);
    onSeek(seekTime);
    if ('vibrate' in navigator) {
      navigator.vibrate([10, 40, 10]);
    }
  }, [currentTime, duration, onSeek]);

  const handleLongPress = useCallback((position: number) => {
    if ('vibrate' in navigator) {
      navigator.vibrate([15, 50, 15]);
    }
    onSeek(position * duration);
  }, [duration, onSeek]);

  return { handleDoubleTap, handleLongPress };
};