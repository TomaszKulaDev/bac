import { useState } from "react";
import { FaVolumeUp, FaVolumeMute, FaVolumeDown } from "react-icons/fa";
import { playerStyles } from "@/styles/common/playerControls";

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
}

export const VolumeControl: React.FC<VolumeControlProps> = ({
  volume,
  onVolumeChange,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleVolumeToggle = () => {
    if (isMuted) {
      onVolumeChange(volume || 0.5);
    } else {
      onVolumeChange(0);
    }
    setIsMuted(!isMuted);
  };

  // Wybierz odpowiednią ikonę na podstawie poziomu głośności
  const VolumeIcon = () => {
    if (isMuted || volume === 0) return FaVolumeMute;
    if (volume < 0.5) return FaVolumeDown;
    return FaVolumeUp;
  };

  const Icon = VolumeIcon();

  return (
    <div
      className="flex items-center gap-2 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={handleVolumeToggle}
        className={`
          p-2 rounded-full transition-all duration-200
          hover:bg-gray-100 active:bg-gray-200
          ${isMuted ? "text-gray-400" : "text-gray-600"}
        `}
        aria-label={isMuted ? "Włącz dźwięk" : "Wycisz"}
        title={isMuted ? "Włącz dźwięk" : "Wycisz"}
      >
        <Icon size={18} />
      </button>

      <div
        className={`
        relative w-20 h-8 flex items-center
        transition-all duration-200 ease-out
        ${isHovered ? "opacity-100" : "opacity-70"}
      `}
      >
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
          className={`
            w-full h-1 rounded-full appearance-none bg-gray-200
            hover:bg-gray-300 transition-all duration-200
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-3
            [&::-webkit-slider-thumb]:h-3
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-amber-500
            [&::-webkit-slider-thumb]:hover:bg-amber-600
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:transition-all
            [&::-webkit-slider-thumb]:duration-200
            [&::-webkit-slider-thumb]:shadow-md
            relative
          `}
          style={{
            background: `linear-gradient(to right, #f59e0b ${
              volume * 100
            }%, #e5e7eb ${volume * 100}%)`,
          }}
          aria-label="Głośność"
          aria-valuemin={0}
          aria-valuemax={1}
          aria-valuenow={volume}
          aria-valuetext={`${Math.round(volume * 100)}%`}
        />
      </div>
    </div>
  );
};
