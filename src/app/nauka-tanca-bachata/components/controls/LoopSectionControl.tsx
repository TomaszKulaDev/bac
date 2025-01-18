interface LoopSectionControlProps {
  value: [number, number] | null;
  onChange: (section: [number, number] | null) => void;
  duration: number;
}

export const LoopSectionControl: React.FC<LoopSectionControlProps> = ({
  value,
  onChange,
  duration,
}) => {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => onChange(value ? null : [0, duration])}
        className={`video-control-button ${value ? "active" : ""}`}
      >
        <svg viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        <span>{value ? "Zapętlenie włączone" : "Zapętl sekcję"}</span>
      </button>

      {value && (
        <div className="video-control-button">
          <input
            type="range"
            min={0}
            max={duration}
            value={value[0]}
            onChange={(e) => onChange([Number(e.target.value), value[1]])}
            className="video-range-input w-24"
          />
          <span className="mx-2">do</span>
          <input
            type="range"
            min={0}
            max={duration}
            value={value[1]}
            onChange={(e) => onChange([value[0], Number(e.target.value)])}
            className="video-range-input w-24"
          />
        </div>
      )}
    </div>
  );
};
