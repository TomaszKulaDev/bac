import { useState, useRef, useCallback, useEffect } from 'react';
import { SEEK_BAR_CONFIG } from './seekBarConfig';

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
  const frameRef = useRef<number>();
  const lastPositionRef = useRef<number>(0);

  const calculatePosition = useCallback((clientX: number) => {
    if (progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    }
    return 0;
  }, []);

  const updateSeekPosition = useCallback((position: number) => {
    if (position === lastPositionRef.current) return;
    
    lastPositionRef.current = position;
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      const time = position * duration;
      if (time >= 0 && time <= duration) {
        onSeek(time);
      }
    });
  }, [duration, onSeek]);

  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

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
      updateSeekPosition(position);
    }
  }, [calculatePosition, duration, updateSeekPosition, isDragging]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
    setIsDragging(true);
    const position = calculatePosition(e.touches[0].clientX);
    setHoverTime(position * duration);
    updateSeekPosition(position);
  }, [calculatePosition, duration, updateSeekPosition]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const position = calculatePosition(e.clientX);
    setHoverTime(position * duration);
    if (isDragging) {
      updateSeekPosition(position);
    }
  }, [calculatePosition, duration, isDragging, updateSeekPosition]);

  useEffect(() => {
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseUp]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowRight':
        updateSeekPosition(Math.min(currentTime + 5, duration));
        break;
      case 'ArrowLeft':
        updateSeekPosition(Math.max(currentTime - 5, 0));
        break;
      case 'Home':
        updateSeekPosition(0);
        break;
      case 'End':
        updateSeekPosition(duration);
        break;
      case 'PageUp':
        updateSeekPosition(Math.min(currentTime + 30, duration));
        break;
      case 'PageDown':
        updateSeekPosition(Math.max(currentTime - 30, 0));
        break;
    }
  }, [currentTime, duration, updateSeekPosition]);

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