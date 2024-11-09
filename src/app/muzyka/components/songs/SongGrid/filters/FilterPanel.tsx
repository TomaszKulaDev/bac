import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFilter, FaTimes } from 'react-icons/fa';
import type { Filters, DifficultyLevel, StyleType, TempoType } from '../types';
import { DIFFICULTY_OPTIONS, STYLE_OPTIONS, TEMPO_OPTIONS } from './constants';

interface FilterSectionProps<T extends DifficultyLevel | StyleType | TempoType> {
  title: string;
  options: Record<T, { label: string; icon: string; color: string; description: string }>;
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
  <div className="relative">
    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
      {title}
      <span className="text-xs text-gray-400">
        {selectedValues.length ? `(${selectedValues.length})` : ''}
      </span>
    </h4>
    <div className="flex flex-wrap gap-2">
      {(Object.entries(options) as [T, { label: string; icon: string; color: string; description: string }][]).map(
        ([value, { label, icon, color, description }]) => (
          <motion.button
            key={value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange(value)}
            title={description}
            className={`
              px-3 py-2 rounded-lg text-sm font-medium
              flex items-center gap-2 transition-all duration-200
              ${selectedValues.includes(value)
                ? `bg-gradient-to-r ${color} text-white shadow-md`
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-100'
              }
            `}
          >
            <span className="inline-flex items-center justify-center w-5 h-5 text-base">{icon}</span>
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
  const totalFilters = Object.values(filters).reduce((acc, arr) => acc + arr.length, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 mb-8 border border-white/30"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2.5 rounded-xl shadow-md">
            <FaFilter className="text-white w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Filtry</h3>
            {hasActiveFilters && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-gray-500 mt-0.5"
              >
                Aktywne filtry: {totalFilters}
              </motion.p>
            )}
          </div>
        </div>
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={onClearFilters}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 
                hover:text-red-700 transition-colors bg-red-50 rounded-lg
                hover:bg-red-100 border border-red-100"
            >
              <FaTimes className="w-3.5 h-3.5" />
              <span>Wyczyść filtry</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-8">
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