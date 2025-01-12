import { motion } from "framer-motion";

interface FilterBarProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { id: "all", label: "Wszyscy" },
  { id: "master", label: "Master" },
  { id: "expert", label: "Expert" },
  { id: "advanced", label: "Advanced" },
];

export function FilterBar({ selectedFilter, onFilterChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-12">
      {filters.map((filter) => (
        <motion.button
          key={filter.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onFilterChange(filter.id)}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300
            ${
              selectedFilter === filter.id
                ? "bg-gradient-to-r from-amber-500 to-red-500 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
        >
          {filter.label}
        </motion.button>
      ))}
    </div>
  );
}
