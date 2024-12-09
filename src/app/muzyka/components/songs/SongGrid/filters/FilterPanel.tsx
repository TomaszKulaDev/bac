import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFilter, FaTimes } from "react-icons/fa";
import type { Filters, DifficultyLevel, StyleType, TempoType } from "../types";
import { DIFFICULTY_OPTIONS, STYLE_OPTIONS, TEMPO_OPTIONS } from "./constants";
import type { FilterPanelProps } from "../types";

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
        className="text-sm font-medium text-white mb-3 flex items-center gap-1"
      >
        {title}
        {selectedValues.length > 0 && (
          <span
            className="text-xs text-white"
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
                  px-3 py-1.5 rounded-md text-sm font-medium
                  flex items-center gap-2 transition-all duration-200
                  ${
                    selectedValues.includes(value)
                      ? "bg-[#1ed760] text-black shadow-md"
                      : "bg-[#282828] text-white hover:bg-[#3E3E3E]"
                  }
                `}
            >
              <span className="text-base" aria-hidden="true">
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
  hasActiveFilters
}) => {
  const totalFilters = Object.values(filters).reduce(
    (acc, arr) => acc + arr.length,
    0
  );

  return (
    <div className="w-full">
      <div className="max-w-[1800px] mx-auto px-8">
        <div className="text-center mb-8">
          {!hasActiveFilters ? (
            <h3 className="text-lg font-semibold text-white mb-4 tracking-wide">
              Dobierz muzykę do swoich możliwości
            </h3>
          ) : (
            <button
              onClick={onClearFilters}
              className="inline-flex items-center gap-2 px-4 py-1.5 
                rounded-full text-xs font-medium
                bg-[#232323] text-white 
                hover:bg-[#2a2a2a] hover:text-[#1ed760]
                transition-all duration-200"
            >
              <span>Wyczyść</span>
              <span className="opacity-75">({totalFilters})</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      </div>
    </div>
  );
};
