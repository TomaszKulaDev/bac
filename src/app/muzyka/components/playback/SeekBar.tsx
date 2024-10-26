import { formatTime } from '../../utils/formatTime';

interface SeekBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

export const SeekBar: React.FC<SeekBarProps> = ({ currentTime, duration, onSeek }) => {
  return (
    <div className="w-full flex items-center">
      <span className="text-xs text-gray-500 mr-2 w-10 text-right">
        {formatTime(currentTime)}
      </span>
      <input
        type="range"
        min={0}
        max={duration}
        value={currentTime}
        onChange={(e) => onSeek(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        role="slider"
        aria-label="Postęp odtwarzania"
        aria-valuemin={0}
        aria-valuemax={duration}
        aria-valuenow={currentTime}
        aria-valuetext={`${formatTime(currentTime)} z ${formatTime(duration)}`}
      />
      <span className="text-xs text-gray-500 ml-2 w-10">
        {formatTime(duration)}
      </span>
    </div>
  );
};
