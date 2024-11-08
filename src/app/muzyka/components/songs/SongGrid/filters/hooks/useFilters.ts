import { useState, useCallback, useMemo } from 'react';
import type { Filters, DifficultyLevel, StyleType, TempoType } from '../../types';
import type { Song } from '../../../../../types';

export const useFilters = (initialSongs: Song[]) => {
  const [filters, setFilters] = useState<Filters>({
    difficulty: [],
    style: [],
    tempo: []
  });

  const updateFilter = useCallback((
    filterType: keyof Filters,
    value: DifficultyLevel | StyleType | TempoType
  ) => {
    setFilters(prev => {
      const currentValues = prev[filterType];
      const newValues = currentValues.includes(value as never)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value as never];
      
      return {
        ...prev,
        [filterType]: newValues
      };
    });
  }, []);

  const filteredSongs = useMemo(() => {
    return initialSongs.filter(song => {
      if (!song.difficulty || !song.style || !song.tempo) return true;
      
      const matchesDifficulty = filters.difficulty.length === 0 || 
        filters.difficulty.includes(song.difficulty);
      
      const matchesStyle = filters.style.length === 0 || 
        filters.style.includes(song.style);
      
      const matchesTempo = filters.tempo.length === 0 || 
        filters.tempo.includes(song.tempo);

      return matchesDifficulty && matchesStyle && matchesTempo;
    });
  }, [initialSongs, filters]);

  return {
    filters,
    updateFilter,
    clearFilters: useCallback(() => setFilters({ difficulty: [], style: [], tempo: [] }), []),
    filteredSongs,
    hasActiveFilters: Object.values(filters).some(arr => arr.length > 0)
  };
}; 