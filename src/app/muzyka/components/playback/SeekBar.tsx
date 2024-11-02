import { formatTime } from '../../utils/formatTime';
import { useState, useRef, TouchEvent, useCallback, useEffect } from 'react';
import { debounce } from 'lodash';

interface SeekBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  buffered?: number;
  isMobile?: boolean;
}

export const SeekBar: React.FC<SeekBarProps> = ({ currentTime, duration, onSeek, buffered, isMobile }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [hoverTime, setHoverTime] = useState(0);
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

  const handleTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
    setIsDragging(true);
    const position = calculatePosition(e.touches[0].clientX);
    setHoverTime(position * duration);
    updateSeekPosition(position * duration);
  };

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    if (!isDragging) return;
    
    const position = calculatePosition(e.touches[0].clientX);
    setHoverTime(position * duration);
    updateSeekPosition(position);
  }, [calculatePosition, duration, isDragging, updateSeekPosition]);

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!progressBarRef.current) return;
    
    const position = calculatePosition(e.clientX);
    setHoverTime(position * duration);
    
    if (isDragging) {
      updateSeekPosition(position);
    }
  }, [calculatePosition, duration, isDragging, updateSeekPosition]);

  const handleMouseDown = () => {
    setIsDragging(true);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const progress = (currentTime / duration) * 100;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      onSeek(Math.min(currentTime + 5, duration));
    } else if (e.key === 'ArrowLeft') {
      onSeek(Math.max(currentTime - 5, 0));
    }
  };

  return (
    <div className="w-full flex flex-col gap-1">
      <div 
        ref={progressBarRef}
        className="relative h-1 group cursor-pointer"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          if (!isDragging) {
            setIsDragging(false);
          }
        }}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => {
          if (!isDragging && progressBarRef.current) {
            const position = calculatePosition(e.clientX);
            onSeek(position * duration);
          }
        }}
        tabIndex={0}
        role="slider"
        aria-label="Pozycja utworu"
        aria-valuemin={0}
        aria-valuemax={duration}
        aria-valuenow={currentTime}
        onKeyDown={handleKeyDown}
      >
        {/* Tło paska */}
        <div className="absolute w-full h-full bg-gray-200 rounded-full" />
        
        {/* Pasek postępu */}
        <div 
          className="absolute h-full bg-blue-600 rounded-full transition-all duration-150"
          style={{ width: `${progress}%` }}
        />

        {/* Znacznik aktualnej pozycji */}
        <div 
          className={`
            absolute h-3 w-3 bg-blue-600 rounded-full -top-1 
            shadow-md transition-all duration-150 
            ${isDragging ? 'scale-150 opacity-100' : 'group-hover:opacity-100 opacity-0'}
            ${isMobile ? 'w-4 h-4 -top-1.5' : 'w-3 h-3 -top-1'}
          `}
          style={{ 
            left: `${progress}%`, 
            transform: 'translateX(-50%)',
            boxShadow: isDragging ? '0 0 10px rgba(37, 99, 235, 0.5)' : ''
          }}
        />

        {/* Podgląd czasu przy hover */}
        {isHovering && (
          <div 
            className="absolute -top-8 px-2 py-1 bg-black/75 text-white text-xs rounded transform -translate-x-1/2"
            style={{ left: `${(hoverTime / duration) * 100}%` }}
          >
            {formatTime(hoverTime)}
          </div>
        )}

        {/* Bufor ładowania */}
        <div 
          className="absolute h-full bg-gray-300 rounded-full"
          style={{ width: `${(buffered || 0) * 100}%` }}
        />
      </div>

      {/* Wyświetlanie czasu */}
      <div className="flex justify-between text-xs text-gray-500 px-1">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};
