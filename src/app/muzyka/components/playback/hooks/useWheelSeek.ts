import { useCallback } from 'react';
import { SEEK_BAR_CONFIG } from './seekBarConfig';

interface UseWheelSeekProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

export const useWheelSeek = ({ currentTime, duration, onSeek }: UseWheelSeekProps) => {
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.1;
    const newTime = Math.max(0, Math.min(duration, currentTime + delta));
    onSeek(newTime);
  }, [currentTime, duration, onSeek]);

  return { handleWheel };
};