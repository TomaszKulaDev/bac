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
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700">Prędkość:</span>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="px-2 py-1 text-sm border rounded-md bg-white"
      >
        {speeds.map((speed) => (
          <option key={speed} value={speed}>
            {speed}x
          </option>
        ))}
      </select>
    </div>
  );
};
