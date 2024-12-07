import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFilter, FaTimes } from "react-icons/fa";
import type { Filters, DifficultyLevel, StyleType, TempoType } from "../types";
import { DIFFICULTY_OPTIONS, STYLE_OPTIONS, TEMPO_OPTIONS } from "./constants";

interface FilterSectionProps<
  T extends DifficultyLevel | StyleType | TempoType
> {
  title: string;
  options: Record<
    T,
    { label: string; icon: string; color: string; description: string }
  >;
  selectedValues: T[];
  onChange: (value: T) => void;
}

interface FilterPanelProps {
  filters: Filters;
  onFilterChange: (
    filterType: keyof Filters,
    value: DifficultyLevel | StyleType | TempoType
  ) => void;
  onClearFilters: () => void;
}

const FilterSection = <T extends DifficultyLevel | StyleType | TempoType>({
  title,
  options,
  selectedValues,
  onChange,
}: FilterSectionProps<T>) => {
  const sectionId = `filter-section-${title
    .toLowerCase()
    .replace(/\s+/g, "-")}`;

  return (
    <div className="relative" role="group" aria-labelledby={sectionId}>
      <h4
        id={sectionId}
        className="text-xs font-medium text-[#a7a7a7] mb-2 flex items-center gap-1"
      >
        {title}
        {selectedValues.length > 0 && (
          <span
            className="text-[10px] text-[#a7a7a7]"
            aria-label={`Wybrano ${selectedValues.length} opcji`}
          >
            ({selectedValues.length})
          </span>
        )}
      </h4>
      <div className="flex flex-wrap gap-1.5">
        {(
          Object.entries(options) as [
            T,
            { label: string; icon: string; color: string; description: string }
          ][]
        ).map(([value, { label, icon, description }]) => {
          const descriptionId = `${sectionId}-${value}-description`;
          return (
            <motion.button
              key={value}
              role="checkbox"
              aria-checked={selectedValues.includes(value)}
              aria-label={label}
              aria-describedby={descriptionId}
              title={description}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onChange(value)}
              className={`
                  px-2 py-1.5 rounded-md text-xs font-medium
                  flex items-center gap-1.5 transition-all duration-200
                  ${
                    selectedValues.includes(value)
                      ? 'bg-[#1ed760] text-black'
                      : 'bg-[#232323] text-white hover:bg-[#2a2a2a]'
                  }
                `}
            >
              <span className="text-sm" aria-hidden="true">
                {icon}
              </span>
              <span>{label}</span>
              <span id={descriptionId} className="sr-only">
                {description}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  const hasActiveFilters = Object.values(filters).some((arr) => arr.length > 0);
  const totalFilters = Object.values(filters).reduce(
    (acc, arr) => acc + arr.length,
    0
  );

  return (
    <motion.div
      role="region"
      aria-label="Panel filtrów"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black p-4 mb-4"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-[#a7a7a7]">Szybki wybór</h3>
          {hasActiveFilters && (
            <span className="text-xs text-[#a7a7a7]">({totalFilters})</span>
          )}
        </div>
        {hasActiveFilters && (
          <motion.button
            onClick={onClearFilters}
            className="text-xs px-2 py-1 text-[#a7a7a7] hover:text-white 
              transition-colors"
          >
            Wyczyść
          </motion.button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FilterSection
          title="Poziom trudności"
          options={DIFFICULTY_OPTIONS}
          selectedValues={filters.difficulty}
          onChange={(value) => onFilterChange("difficulty", value)}
        />
        <FilterSection
          title="Styl bachaty"
          options={STYLE_OPTIONS}
          selectedValues={filters.style}
          onChange={(value) => onFilterChange("style", value)}
        />
        <FilterSection
          title="Tempo utworu"
          options={TEMPO_OPTIONS}
          selectedValues={filters.tempo}
          onChange={(value) => onFilterChange("tempo", value)}
        />
      </div>
    </motion.div>
  );
};
