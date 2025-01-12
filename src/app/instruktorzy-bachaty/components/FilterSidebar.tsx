import { motion } from "framer-motion";
import { FaMoneyBillWave, FaMusic } from "react-icons/fa";
import { FilterSection } from "./FilterSection";

interface FilterSidebarProps {
  selectedFilters: {
    style: string;
    priceRange: string;
  };
  onFilterChange: (type: string, value: string) => void;
  lightMode?: boolean;
}

export function FilterSidebar({
  selectedFilters,
  onFilterChange,
  lightMode = false,
}: FilterSidebarProps) {
  return (
    <div
      className={`rounded-xl p-6 shadow-lg backdrop-blur-sm
      ${lightMode ? "bg-white" : "bg-white/10"} 
      border border-amber-100/50`}
    >
      <FilterSection
        title="Cena za godzinę"
        icon={<FaMoneyBillWave />}
        options={[
          { id: "all", label: "Dowolna cena" },
          { id: "100", label: "Do 100 zł" },
          { id: "150", label: "100-150 zł" },
          { id: "200", label: "150-200 zł" },
          { id: "200+", label: "Powyżej 200 zł" },
        ]}
        selected={selectedFilters.priceRange}
        onChange={(value: string) => onFilterChange("priceRange", value)}
        lightMode={lightMode}
      />

      <FilterSection
        title="Styl"
        icon={<FaMusic />}
        options={[
          { id: "all", label: "Wszystkie style" },
          { id: "sensual", label: "Bachata Sensual" },
          { id: "dominicana", label: "Bachata Dominicana" },
          { id: "moderna", label: "Bachata Moderna" },
        ]}
        selected={selectedFilters.style}
        onChange={(value: string) => onFilterChange("style", value)}
        lightMode={lightMode}
      />
    </div>
  );
}
