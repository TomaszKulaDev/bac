import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFilter, FaTimes } from 'react-icons/fa';
import type { Filters, DifficultyLevel, StyleType, TempoType } from '../types';
import { DIFFICULTY_OPTIONS, STYLE_OPTIONS, TEMPO_OPTIONS } from './constants';

interface FilterSectionProps<T extends DifficultyLevel | StyleType | TempoType> {
  title: string;
  options: Record<T, { label: string; icon: string; color: string }>;
  selectedValues: T[];
  onChange: (value: T) => void;
}

interface FilterPanelProps {
  filters: Filters;
  onFilterChange: (filterType: keyof Filters, value: DifficultyLevel | StyleType | TempoType) => void;
  onClearFilters: () => void;
}

const FilterSection = <T extends DifficultyLevel | StyleType | TempoType>({
  title,
  options,
  selectedValues,
  onChange,
}: FilterSectionProps<T>) => (
  <div>
    <h4 className="text-sm font-medium text-gray-600 mb-2">{title}</h4>
    <div className="flex flex-wrap gap-2">
      {(Object.entries(options) as [T, { label: string; icon: string; color: string }][]).map(
        ([value, { label, icon, color }]) => (
          <motion.button
            key={value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(value)}
            className={`
              px-3 py-1.5 rounded-full text-sm font-medium
              flex items-center gap-1.5 transition-all duration-200
              ${selectedValues.includes(value)
                ? `bg-gradient-to-r ${color} text-white shadow-sm`
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            <span>{icon}</span>
            <span>{label}</span>
          </motion.button>
        )
      )}
    </div>
  </div>
);

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  const hasActiveFilters = Object.values(filters).some(arr => arr.length > 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-5 mb-6 border border-white/20"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <div className="bg-gray-100 p-2 rounded-lg">
            <FaFilter className="text-gray-600 w-4 h-4" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">Filtry</h3>
        </div>
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={onClearFilters}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 
                hover:text-gray-800 transition-colors bg-gray-100 rounded-full
                hover:bg-gray-200"
            >
              <FaTimes className="w-3 h-3" />
              <span>Wyczyść wszystko</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-6">
        <FilterSection
          title="Poziom trudności"
          options={DIFFICULTY_OPTIONS}
          selectedValues={filters.difficulty}
          onChange={(value) => onFilterChange('difficulty', value)}
        />
        
        <FilterSection
          title="Styl bachaty"
          options={STYLE_OPTIONS}
          selectedValues={filters.style}
          onChange={(value) => onFilterChange('style', value)}
        />
        
        <FilterSection
          title="Tempo utworu"
          options={TEMPO_OPTIONS}
          selectedValues={filters.tempo}
          onChange={(value) => onFilterChange('tempo', value)}
        />
      </div>
    </motion.div>
  );
};