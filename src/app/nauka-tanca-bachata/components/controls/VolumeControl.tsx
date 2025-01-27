import { useState } from "react";

interface VolumeControlProps {
  value: number;
  onChange: (volume: number) => void;
  onMute: () => void;
  isMuted: boolean;
}

export const VolumeControl: React.FC<VolumeControlProps> = ({
  value,
  onChange,
  onMute,
  isMuted,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getVolumeIcon = () => {
    if (isMuted || value === 0) {
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
        />
      );
    } else if (value < 0.5) {
      return (
        <>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.536 8.464a5 5 0 010 7.072"
          />
        </>
      );
    } else {
      return (
        <>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.536 8.464a5 5 0 010 7.072M17.536 6.464a8 8 0 010 11.072"
          />
        </>
      );
    }
  };

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button onClick={onMute} className="video-control-button">
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          stroke="currentColor"
          fill="none"
        >
          {getVolumeIcon()}
        </svg>
      </button>

      <div
        className={`
          absolute bottom-full left-1/2 -translate-x-1/2 mb-2
          h-24 w-8 bg-black/60 backdrop-blur-sm rounded-lg p-2
          transition-all duration-200
          group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
          opacity-0 invisible translate-y-2
          flex items-center justify-center
        `}
      >
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-full w-1 bg-white/30 rounded-full appearance-none cursor-pointer
            [-webkit-appearance:slider-vertical]
            
            [&::-webkit-slider-thumb]:appearance-none 
            [&::-webkit-slider-thumb]:w-3 
            [&::-webkit-slider-thumb]:h-3 
            [&::-webkit-slider-thumb]:rounded-full 
            [&::-webkit-slider-thumb]:bg-amber-500
            [&::-webkit-slider-thumb]:transition-colors
            hover:[&::-webkit-slider-thumb]:bg-amber-400
            
            [&::-moz-range-thumb]:appearance-none 
            [&::-moz-range-thumb]:border-0
            [&::-moz-range-thumb]:w-3 
            [&::-moz-range-thumb]:h-3 
            [&::-moz-range-thumb]:rounded-full 
            [&::-moz-range-thumb]:bg-amber-500
            [&::-moz-range-thumb]:transition-colors
            hover:[&::-moz-range-thumb]:bg-amber-400
            
            [&::-webkit-slider-runnable-track]:bg-transparent
            [&::-moz-range-track]:bg-transparent"
        />
      </div>
    </div>
  );
};
