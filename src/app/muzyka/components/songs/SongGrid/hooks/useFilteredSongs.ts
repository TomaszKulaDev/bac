import { useMemo } from 'react';
import { Song } from '../../../../types';
import { FilterState } from '../../filters/types';
import { getSongLevel } from '../utils';

export const useFilteredSongs = (songs: Song[], filters: FilterState) => {
  return useMemo(() => {
    return songs.filter(song => {
      // Filtrowanie po poziomie
      if (filters.levels.size > 0) {
        const songLevel = getSongLevel(song);
        if (!songLevel || !filters.levels.has(songLevel)) {
          return false;
        }
      }

      // Filtrowanie po stylu
      if (filters.styles.size > 0) {
        if (!song.style || !filters.styles.has(song.style)) {
          return false;
        }
      }

      // Filtrowanie po tempie
      if (filters.tempo.size > 0) {
        if (!song.tempo || !filters.tempo.has(song.tempo)) {
          return false;
        }
      }

      // Filtrowanie po tekście
      if (filters.searchQuery) {
        const searchLower = filters.searchQuery.toLowerCase();
        return (
          song.title.toLowerCase().includes(searchLower) ||
          song.artist.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  }, [songs, filters]);
}; 