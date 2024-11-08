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
      const matchesDifficulty = filters.difficulty.length === 0 || 
        (song.beginnerFriendly && filters.difficulty.includes('beginner')) ||
        (!song.beginnerFriendly && !song.impro && filters.difficulty.includes('intermediate')) ||
        (!song.beginnerFriendly && !song.impro && filters.difficulty.includes('advanced'));
      
      const matchesStyle = filters.style.length === 0 || 
        (song.impro && filters.style.includes('impro')) ||
        (!song.impro && filters.style.includes('sensual')) ||
        (!song.impro && filters.style.includes('dominicana'));
      
      const matchesTempo = filters.tempo.length === 0 || 
        filters.tempo.includes(song.tempo as TempoType);

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