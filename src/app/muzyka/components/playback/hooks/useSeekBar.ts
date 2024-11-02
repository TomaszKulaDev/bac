import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { debounce } from 'lodash';

interface UseSeekBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  isMobile?: boolean;
}

export const useSeekBar = ({ currentTime, duration, onSeek, isMobile }: UseSeekBarProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hoverTime, setHoverTime] = useState(0);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const calculatePosition = useCallback((clientX: number) => {
    if (progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    }
    return 0;
  }, []);

  const debouncedSeek = useMemo(() => 
    debounce((time: number) => {
      if (time >= 0 && time <= duration) {
        onSeek(time);
      }
    }, 16),
    [duration, onSeek]
  );

  useEffect(() => {
    return () => {
      debouncedSeek.cancel();
    };
  }, [debouncedSeek]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
    document.addEventListener('mouseup', handleMouseUp);
  }, [handleMouseUp]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    if (isDragging) {
      const position = calculatePosition(e.touches[0].clientX);
      setHoverTime(position * duration);
      debouncedSeek(position * duration);
    }
  }, [calculatePosition, duration, debouncedSeek, isDragging]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
    setIsDragging(true);
    const position = calculatePosition(e.touches[0].clientX);
    setHoverTime(position * duration);
    debouncedSeek(position * duration);
  }, [calculatePosition, duration, debouncedSeek]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const position = calculatePosition(e.clientX);
    setHoverTime(position * duration);
    if (isDragging) {
      onSeek(position * duration);
    }
  }, [calculatePosition, duration, isDragging, onSeek]);

  useEffect(() => {
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseUp]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      onSeek(Math.min(currentTime + 5, duration));
    } else if (e.key === 'ArrowLeft') {
      onSeek(Math.max(currentTime - 5, 0));
    }
  }, [currentTime, duration, onSeek]);

  const progress = (currentTime / duration) * 100;

  return {
    isHovering,
    setIsHovering,
    isDragging,
    hoverTime,
    progress,
    progressBarRef,
    handlers: {
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
      handleMouseMove,
      handleMouseDown,
      handleMouseUp,
      handleKeyDown
    }
  };
};