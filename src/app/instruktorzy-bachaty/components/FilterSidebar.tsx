import { motion } from "framer-motion";
import { FaStar, FaMapMarkerAlt, FaGraduationCap } from "react-icons/fa";

interface FilterSidebarProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

export function FilterSidebar({
  selectedFilter,
  onFilterChange,
}: FilterSidebarProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Filtry</h2>

      {/* Poziom zaawansowania */}
      <div className="mb-8">
        <h3 className="text-white/80 text-sm font-medium mb-4 flex items-center gap-2">
          <FaGraduationCap />
          Poziom
        </h3>
        <div className="space-y-3">
          {[
            { id: "all", label: "Wszyscy" },
            { id: "master", label: "Master" },
            { id: "expert", label: "Expert" },
            { id: "advanced", label: "Advanced" },
          ].map((level) => (
            <label
              key={level.id}
              className="flex items-center gap-3 text-white/90 cursor-pointer hover:text-white"
            >
              <input
                type="radio"
                name="level"
                value={level.id}
                checked={selectedFilter === level.id}
                onChange={() => onFilterChange(level.id)}
                className="form-radio text-amber-500"
              />
              {level.label}
            </label>
          ))}
        </div>
      </div>

      {/* Lokalizacja */}
      <div className="mb-8">
        <h3 className="text-white/80 text-sm font-medium mb-4 flex items-center gap-2">
          <FaMapMarkerAlt />
          Miasto
        </h3>
        {/* Tu dodaj wybór miasta */}
      </div>

      {/* Specjalizacje */}
      <div className="mb-8">
        <h3 className="text-white/80 text-sm font-medium mb-4 flex items-center gap-2">
          <FaStar />
          Specjalizacje
        </h3>
        {/* Tu dodaj wybór specjalizacji */}
      </div>
    </div>
  );
}
