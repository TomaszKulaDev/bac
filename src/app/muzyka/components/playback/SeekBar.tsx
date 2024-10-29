import { formatTime } from '../../utils/formatTime';
import { useState, useRef } from 'react';

interface SeekBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

export const SeekBar: React.FC<SeekBarProps> = ({ currentTime, duration, onSeek }) => {
  const [isHovering, setIsHovering] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [hoverTime, setHoverTime] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const position = (e.clientX - rect.left) / rect.width;
      setHoverTime(position * duration);
    }
  };

  const progress = (currentTime / duration) * 100;

  return (
    <div className="w-full flex flex-col gap-1">
      <div 
        ref={progressBarRef}
        className="relative h-1 group cursor-pointer"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
        onClick={(e) => {
          if (progressBarRef.current) {
            const rect = progressBarRef.current.getBoundingClientRect();
            const position = (e.clientX - rect.left) / rect.width;
            onSeek(position * duration);
          }
        }}
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
          className="absolute h-3 w-3 bg-blue-600 rounded-full -top-1 shadow-md transition-opacity duration-150 opacity-0 group-hover:opacity-100"
          style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
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
      </div>

      {/* Wyświetlanie czasu */}
      <div className="flex justify-between text-xs text-gray-500 px-1">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};
