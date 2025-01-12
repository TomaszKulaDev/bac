interface FilterOption {
  id: string;
  label: string;
}

interface FilterSectionProps {
  title: string;
  icon: React.ReactNode;
  options: FilterOption[];
  selected: string;
  onChange: (value: string) => void;
  lightMode?: boolean;
}

export function FilterSection({
  title,
  icon,
  options,
  selected,
  onChange,
  lightMode = false,
}: FilterSectionProps) {
  return (
    <div className="mb-6">
      <h3
        className={`flex items-center gap-2 text-sm font-medium mb-4
        ${lightMode ? "text-gray-700" : "text-white/80"}`}
      >
        {icon}
        {title}
      </h3>
      <div className="space-y-2">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors
              ${
                selected === option.id
                  ? "bg-amber-500/20 text-amber-500"
                  : lightMode
                  ? "text-gray-600 hover:bg-gray-100"
                  : "text-white/60 hover:bg-white/5"
              }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
