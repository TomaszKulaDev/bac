import { formatTime } from "../../utils/formatTime";
import { useState, useRef, TouchEvent, useCallback, useEffect } from "react";
import { debounce } from "lodash";

interface SeekBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  buffered?: number;
  isMobile?: boolean;
}

export const SeekBar: React.FC<SeekBarProps> = ({
  currentTime,
  duration,
  onSeek,
  buffered,
  isMobile,
}) => {
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

  const updateSeekPosition = useCallback(
    (position: number) => {
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
    },
    [duration, onSeek]
  );

  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    if ("vibrate" in navigator) {
      navigator.vibrate(10);
    }
    setIsDragging(true);
    const position = calculatePosition(e.touches[0].clientX);
    setHoverTime(position * duration);
    updateSeekPosition(position * duration);
  };

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      if (!isDragging) return;

      const position = calculatePosition(e.touches[0].clientX);
      setHoverTime(position * duration);
      updateSeekPosition(position);
    },
    [calculatePosition, duration, isDragging, updateSeekPosition]
  );

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!progressBarRef.current) return;

      const position = calculatePosition(e.clientX);
      setHoverTime(position * duration);

      if (isDragging) {
        updateSeekPosition(position);
      }
    },
    [calculatePosition, duration, isDragging, updateSeekPosition]
  );

  const handleMouseDown = () => {
    setIsDragging(true);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const progress = (currentTime / duration) * 100;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      onSeek(Math.min(currentTime + 5, duration));
    } else if (e.key === "ArrowLeft") {
      onSeek(Math.max(currentTime - 5, 0));
    }
  };

  return (
    <div className="w-full flex flex-col gap-0.5">
      <div className="w-full flex items-center gap-1">
        {/* Czas początkowy */}
        <span className="text-xs text-gray-500 min-w-[27px]">
          {formatTime(currentTime)}
        </span>

        {/* Pasek postępu */}
        <div
          ref={progressBarRef}
          className="relative h-1 group cursor-pointer flex-grow"
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
          <div className="absolute w-full h-full bg-gray-200 rounded-full" />
          <div
            className="absolute h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
          <div
            className={`absolute h-4 w-4 bg-amber-600 rounded-full -top-1.5 
              shadow-lg transition-all duration-200 ease-in-out
              ${isDragging ? "scale-150" : "group-hover:opacity-100 opacity-0"}
              hover:scale-125 hover:shadow-xl`}
            style={{
              left: `${progress}%`,
              transform: "translateX(-50%)",
              boxShadow: isDragging ? "0 0 15px rgba(245, 158, 11, 0.7)" : "",
            }}
          />
          {isHovering && (
            <div
              className="absolute -top-8 px-2 py-1 bg-black/75 text-white text-xs rounded transform -translate-x-1/2"
              style={{ left: `${(hoverTime / duration) * 100}%` }}
            >
              {formatTime(hoverTime)}
            </div>
          )}
          <div
            className="absolute h-full bg-gray-300 rounded-full"
            style={{ width: `${(buffered || 0) * 100}%` }}
          />
        </div>

        {/* Czas końcowy */}
        <span className="text-xs text-gray-500 min-w-[35px] text-right">
          {formatTime(duration)}
        </span>
      </div>
    </div>
  );
};
