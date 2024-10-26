import { useState } from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
}

export const VolumeControl: React.FC<VolumeControlProps> = ({ volume, onVolumeChange }) => {
  const [isMuted, setIsMuted] = useState(false);

  const handleVolumeToggle = () => {
    if (isMuted) {
      onVolumeChange(volume || 0.5);
    } else {
      onVolumeChange(0);
    }
    setIsMuted(!isMuted);
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleVolumeToggle}
        className="text-gray-600 hover:text-gray-800 p-2"
        aria-label={isMuted ? "Włącz dźwięk" : "Wycisz"}
        title={isMuted ? "Włącz dźwięk" : "Wycisz"}
      >
        {isMuted || volume === 0 ? (
          <FaVolumeMute size={20} />
        ) : (
          <FaVolumeUp size={20} />
        )}
      </button>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={(e) => onVolumeChange(Number(e.target.value))}
        className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        role="slider"
        aria-label="Głośność"
        aria-valuemin={0}
        aria-valuemax={1}
        aria-valuenow={volume}
        aria-valuetext={`${Math.round(volume * 100)}%`}
      />
    </div>
  );
};

