import { useState, useCallback, useMemo } from "react";
import type {
  Filters,
  DifficultyLevel,
  StyleType,
  TempoType,
} from "../../types";
import type { Song } from "../../../../../types";

export const useFilters = (initialSongs: Song[]) => {
  const [filters, setFilters] = useState<Filters>({
    difficulty: [],
    style: [],
    tempo: [],
  });

  const updateFilter = useCallback(
    (
      filterType: keyof Filters,
      value: DifficultyLevel | StyleType | TempoType
    ) => {
      setFilters((prev) => {
        const currentValues = prev[filterType];
        const newValues = currentValues.includes(value as never)
          ? currentValues.filter((v) => v !== value)
          : [...currentValues, value as never];

        return {
          ...prev,
          [filterType]: newValues,
        };
      });
    },
    []
  );

  const filteredSongs = useMemo(() => {
    return initialSongs.filter((song) => {
      const matchesDifficulty =
        filters.difficulty.length === 0 ||
        filters.difficulty.some(level => {
          switch (level) {
            case 'beginner':
              return song.beginnerFriendly;
            case 'intermediate':
              return song.intermediate;
            case 'advanced':
              return song.advanced || song.impro;
            default:
              return false;
          }
        });

      const matchesStyle =
        filters.style.length === 0 ||
        filters.style.some(style => {
          switch (style) {
            case 'impro':
              return song.impro;
            case 'sensual':
              return song.sensual && !song.impro;
            case 'dominicana':
              return song.dominicana && !song.impro;
            default:
              return false;
          }
        });

      const matchesTempo =
        filters.tempo.length === 0 ||
        filters.tempo.some(tempo => {
          switch (tempo) {
            case 'slow':
              return song.slow;
            case 'medium':
              return song.medium;
            case 'fast':
              return song.fast;
            default:
              return false;
          }
        });

      return matchesDifficulty && matchesStyle && matchesTempo;
    });
  }, [initialSongs, filters]);

  return {
    filters,
    updateFilter,
    clearFilters: useCallback(
      () => setFilters({ difficulty: [], style: [], tempo: [] }),
      []
    ),
    filteredSongs,
    hasActiveFilters: Object.values(filters).some((arr) => arr.length > 0),
  };
};
