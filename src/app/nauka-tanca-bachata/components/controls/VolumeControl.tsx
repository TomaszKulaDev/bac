import { useState, useEffect, useRef } from "react";

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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 2000);
  };

  const getVolumeIcon = () => {
    if (isMuted || value === 0) {
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h2.44l4.5 4.5c.944.945 2.56.276 2.56-1.06V4.06zM12 15.94L7.06 11H4v2h3.06L12 17.94v-2zM12 6.06v2L7.06 13H4v-2h3.06L12 6.06zM18.36 8.86a1 1 0 10-1.42 1.42L18.66 12l-1.72 1.72a1 1 0 001.42 1.42L20.08 12l-1.72-1.72z"
          />
        </svg>
      );
    } else if (value < 0.5) {
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h2.44l4.5 4.5c.944.945 2.56.276 2.56-1.06V4.06zM12 15.94L7.06 11H4v2h3.06L12 17.94v-2zM12 6.06v2L7.06 13H4v-2h3.06L12 6.06zM16 12c0-1.1-.9-2-2-2v4c1.1 0 2-.9 2-2z"
          />
        </svg>
      );
    } else {
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h2.44l4.5 4.5c.944.945 2.56.276 2.56-1.06V4.06zM12 15.94L7.06 11H4v2h3.06L12 17.94v-2zM12 6.06v2L7.06 13H4v-2h3.06L12 6.06zM16 12c0-2.2-1.8-4-4-4v8c2.2 0 4-1.8 4-4zM20 12c0-4.4-3.6-8-8-8v2c3.3 0 6 2.7 6 6s-2.7 6-6 6v2c4.4 0 8-3.6 8-8z"
          />
        </svg>
      );
    }
  };

  return (
    <div
      className="relative group flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={onMute}
        className="hover:text-amber-500 transition-colors p-2"
      >
        {getVolumeIcon()}
      </button>

      <div
        className={`
          absolute bottom-full left-1/2 -translate-x-1/2 mb-2
          h-24 w-8 bg-black/60 backdrop-blur-sm rounded-lg p-2
          transition-all duration-200 origin-bottom
          ${
            isHovered
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible translate-y-2"
          }
          z-50
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
          className="h-full w-1 bg-white/30 rounded-full appearance-none cursor-pointer rotate-180
            [-webkit-appearance:slider-vertical]
            accent-amber-500
            
            [&::-webkit-slider-thumb]:appearance-none 
            [&::-webkit-slider-thumb]:w-3 
            [&::-webkit-slider-thumb]:h-3 
            [&::-webkit-slider-thumb]:rounded-full 
            [&::-webkit-slider-thumb]:bg-amber-500
            hover:[&::-webkit-slider-thumb]:bg-amber-400
            
            [&::-moz-range-thumb]:appearance-none 
            [&::-moz-range-thumb]:border-0
            [&::-moz-range-thumb]:w-3 
            [&::-moz-range-thumb]:h-3 
            [&::-moz-range-thumb]:rounded-full 
            [&::-moz-range-thumb]:bg-amber-500
            hover:[&::-moz-range-thumb]:bg-amber-400"
          style={{ writingMode: "vertical-lr" }}
        />
      </div>
    </div>
  );
};
