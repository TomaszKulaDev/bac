import { useMemo } from 'react';
import { Song, SortOption, SortOrder } from '../types';
import { getSortValue } from '../utils/sortUtils';

export const useSortedAndFilteredSongs = (
  songs: Song[],
  sortBy: SortOption,
  sortOrder: SortOrder,
  filterText: string
) => {
  return useMemo(() => {
    return songs
      .filter(song => 
        !filterText || 
        song.title.toLowerCase().includes(filterText.toLowerCase()) ||
        song.artist.toLowerCase().includes(filterText.toLowerCase())
      )
      .sort((a, b) => {
        const aValue = getSortValue(a, sortBy);
        const bValue = getSortValue(b, sortBy);
        
        if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
          // Odwracamy kolejność dla wartości boolean
          return sortOrder === 'asc' 
            ? (aValue === bValue ? 0 : aValue ? -1 : 1)
            : (aValue === bValue ? 0 : aValue ? 1 : -1);
        }
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortOrder === 'asc' 
            ? aValue.localeCompare(bValue, undefined, { sensitivity: 'base' })
            : bValue.localeCompare(aValue, undefined, { sensitivity: 'base' });
        }
        
        return sortOrder === 'asc' ? (aValue > bValue ? 1 : -1) : (bValue > aValue ? 1 : -1);
      });
  }, [songs, sortBy, sortOrder, filterText]);
};
