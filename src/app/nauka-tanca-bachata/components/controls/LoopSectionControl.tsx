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
        className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
          value
            ? "bg-amber-100 text-amber-700"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        Zapętl sekcję
      </button>
      {value && (
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={0}
            max={duration}
            value={value[0]}
            onChange={(e) => onChange([Number(e.target.value), value[1]])}
            className="w-24"
          />
          <input
            type="range"
            min={0}
            max={duration}
            value={value[1]}
            onChange={(e) => onChange([value[0], Number(e.target.value)])}
            className="w-24"
          />
        </div>
      )}
    </div>
  );
};
