interface SpeedControlProps {
  value: number;
  onChange: (speed: number) => void;
}

export const SpeedControl: React.FC<SpeedControlProps> = ({
  value,
  onChange,
}) => {
  const speeds = [0.25, 0.35, 0.5, 0.75, 1, 1.25, 1.5];

  return (
    <div className="group relative">
      <div className="video-control-button">
        <svg viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        <span>{value}x</span>
      </div>
      <div
        className="absolute left-0 top-0 h-8 w-full 
                    opacity-0 group-hover:opacity-100 
                    transition-opacity duration-200"
      >
        <select
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-full w-full appearance-none bg-white rounded-full 
                     px-3 text-xs font-normal text-gray-700
                     border border-gray-100 shadow-sm
                     focus:outline-none cursor-pointer"
        >
          {speeds.map((speed) => (
            <option key={speed} value={speed}>
              {speed}x
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
