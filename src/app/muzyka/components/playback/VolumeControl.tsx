import { useState } from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
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

  const handleVolumeToggle = () => {
    if (isMuted) {
      onVolumeChange(volume || 0.5);
    } else {
      onVolumeChange(0);
    }
    setIsMuted(!isMuted);
  };

  const rangeProps = {
    min: 0,
    max: 1,
    step: 0.01,
    value: volume,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      onVolumeChange(Number(e.target.value)),
    "aria-label": "Głośność",
    "aria-valuemin": 0,
    "aria-valuemax": 1,
    "aria-valuenow": volume,
    "aria-valuetext": `${Math.round(volume * 100)}%`,
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleVolumeToggle}
        className={playerStyles.controls.iconButton}
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
        {...rangeProps}
        className={`${playerStyles.controls.range} w-20 h-2`}
      />
    </div>
  );
};
