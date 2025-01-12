import { motion } from "framer-motion";

interface FilterOption {
  id: string;
  label: string;
  count?: number; // liczba instruktorów dla danej opcji
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
    <div className="mb-8">
      <h3 className="flex items-center gap-2 text-sm font-semibold mb-4 text-gray-800">
        {icon}
        {title}
      </h3>
      <div className="space-y-1.5">
        {options.map((option) => (
          <motion.button
            key={option.id}
            onClick={() => onChange(option.id)}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm 
              transition-all duration-200 group
              ${
                selected === option.id
                  ? "bg-amber-50 text-amber-700 font-medium shadow-sm"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
          >
            <span className="flex items-center gap-2">
              {selected === option.id && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-1.5 h-1.5 rounded-full bg-amber-500"
                />
              )}
              {option.label}
            </span>
            {option.count && (
              <span
                className={`text-xs px-2 py-1 rounded-full 
                ${
                  selected === option.id
                    ? "bg-amber-100 text-amber-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {option.count}
              </span>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
