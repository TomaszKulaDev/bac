import { memo } from 'react';
import { useFilters } from './FilterContext';
import { FilterOption, FilterState, StyleType, TempoType } from './types';
import { TEMPO_OPTIONS, STYLE_OPTIONS } from './constants';
import { levelConfig } from '../SongGrid/constants';

const FilterChip = memo<{
  option: FilterOption;
  isSelected: boolean;
  onToggle: () => void;
}>(({ option, isSelected, onToggle }) => (
  <button
    onClick={onToggle}
    className={`
      px-3 py-1.5 rounded-full text-sm font-medium
      flex items-center gap-2 transition-all duration-200
      ${isSelected 
        ? 'bg-purple-100 text-purple-700 border-purple-200' 
        : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
      }
      border
    `}
  >
    {option.icon && <span>{option.icon}</span>}
    <span>{option.label}</span>
  </button>
));

FilterChip.displayName = 'FilterChip';

export const FilterPanel = memo(() => {
  const { filters, setFilters } = useFilters();

  const toggleLevel = (value: string) => {
    const newSet = new Set(filters.levels);
    if (newSet.has(value)) {
      newSet.delete(value);
    } else {
      newSet.add(value);
    }
    setFilters({ levels: newSet });
  };

  const toggleStyle = (value: StyleType) => {
    const newSet = new Set(filters.styles);
    if (newSet.has(value)) {
      newSet.delete(value);
    } else {
      newSet.add(value);
    }
    setFilters({ styles: newSet });
  };

  const toggleTempo = (value: TempoType) => {
    const newSet = new Set(filters.tempo);
    if (newSet.has(value)) {
      newSet.delete(value);
    } else {
      newSet.add(value);
    }
    setFilters({ tempo: newSet });
  };

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow-sm">
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Poziom</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(levelConfig).map(([key, value]) => (
            <FilterChip
              key={key}
              option={{ id: key, label: value.label, icon: value.icon }}
              isSelected={filters.levels.has(key)}
              onToggle={() => toggleLevel(key)}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Styl</h3>
        <div className="flex flex-wrap gap-2">
          {STYLE_OPTIONS.map(option => (
            <FilterChip
              key={option.id}
              option={option}
              isSelected={filters.styles.has(option.id as StyleType)}
              onToggle={() => toggleStyle(option.id as StyleType)}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Tempo</h3>
        <div className="flex flex-wrap gap-2">
          {TEMPO_OPTIONS.map(option => (
            <FilterChip
              key={option.id}
              option={option}
              isSelected={filters.tempo.has(option.id as TempoType)}
              onToggle={() => toggleTempo(option.id as TempoType)}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

FilterPanel.displayName = 'FilterPanel';