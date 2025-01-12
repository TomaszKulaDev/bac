import { motion } from "framer-motion";
import {
  FaMoneyBillWave,
  FaMusic,
  FaStar,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FilterSection } from "./FilterSection";

interface FilterSidebarProps {
  selectedFilters: {
    style: string;
    priceRange: string;
    location?: string;
    level?: string;
  };
  onFilterChange: (type: string, value: string) => void;
  filterCounts: {
    [key: string]: number;
  };
  lightMode?: boolean;
}

export function FilterSidebar({
  selectedFilters,
  onFilterChange,
  filterCounts,
  lightMode = false,
}: FilterSidebarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100/50 p-6"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-semibold text-gray-900">Filtry</h2>
        <button
          onClick={() => onFilterChange("reset", "all")}
          className="text-sm text-amber-600 hover:text-amber-700 font-medium"
        >
          Wyczyść filtry
        </button>
      </div>

      <FilterSection
        title="Lokalizacja"
        icon={<FaMapMarkerAlt className="text-amber-500" />}
        options={[
          { id: "all", label: "Wszystkie miasta" },
          { id: "warszawa", label: "Warszawa", count: filterCounts.warszawa },
          { id: "krakow", label: "Kraków", count: filterCounts.krakow },
          { id: "wroclaw", label: "Wrocław", count: filterCounts.wroclaw },
          { id: "poznan", label: "Poznań", count: filterCounts.poznan },
        ]}
        selected={selectedFilters.location || "all"}
        onChange={(value) => onFilterChange("location", value)}
      />

      <div className="h-px bg-gray-100 my-6" />

      <FilterSection
        title="Styl tańca"
        icon={<FaMusic className="text-amber-500" />}
        options={[
          { id: "all", label: "Wszystkie style" },
          {
            id: "sensual",
            label: "Bachata Sensual",
            count: filterCounts.sensual,
          },
          {
            id: "dominicana",
            label: "Bachata Dominicana",
            count: filterCounts.dominicana,
          },
          {
            id: "moderna",
            label: "Bachata Moderna",
            count: filterCounts.moderna,
          },
        ]}
        selected={selectedFilters.style}
        onChange={(value) => onFilterChange("style", value)}
      />

      <div className="h-px bg-gray-100 my-6" />

      <FilterSection
        title="Cena za godzinę"
        icon={<FaMoneyBillWave className="text-amber-500" />}
        options={[
          { id: "all", label: "Dowolna cena" },
          { id: "100", label: "Do 100 zł", count: filterCounts.price100 },
          { id: "150", label: "100-150 zł", count: filterCounts.price150 },
          { id: "200", label: "150-200 zł", count: filterCounts.price200 },
          {
            id: "200+",
            label: "Powyżej 200 zł",
            count: filterCounts.price200plus,
          },
        ]}
        selected={selectedFilters.priceRange}
        onChange={(value) => onFilterChange("priceRange", value)}
      />
    </motion.div>
  );
}
