import { useState, useCallback } from 'react';
import { SEEK_BAR_CONFIG } from './seekBarConfig';

interface UsePinchGestureProps {
  duration: number;
  onSeek: (time: number) => void;
}

export const usePinchGesture = ({ duration, onSeek }: UsePinchGestureProps) => {
  const [initialDistance, setInitialDistance] = useState<number>(0);
  const [initialTime, setInitialTime] = useState<number>(0);

  const handlePinchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length === 2) {
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setInitialDistance(distance);
      setInitialTime(duration / 2);
    }
  }, [duration]);

  const handlePinchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length === 2) {
      const currentDistance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      
      const scale = currentDistance / initialDistance;
      const newTime = initialTime * scale;
      
      onSeek(Math.max(0, Math.min(duration, newTime)));
    }
  }, [duration, initialDistance, initialTime, onSeek]);

  return { handlePinchStart, handlePinchMove };
};