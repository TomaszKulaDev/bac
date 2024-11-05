import { useMemo } from 'react';
import { Song, SortOption, SortOrder, Playlist } from '../types';
import { getSortValue } from '../utils/sortUtils';

export const useSortedAndFilteredSongs = (
  songs: Song[],
  sortBy: SortOption,
  sortOrder: SortOrder,
  filterText: string,
  currentPlaylistId?: string | null,
  playlists?: Playlist[]
) => {
  return useMemo(() => {
    if (currentPlaylistId && playlists) {
      const playlist = playlists.find(p => p.id === currentPlaylistId);
      if (playlist) {
        return playlist.songs
          .map(songId => songs.find(song => song.id === songId))
          .filter((song): song is Song => 
            song !== undefined && 
            (!filterText || 
              song.title.toLowerCase().includes(filterText.toLowerCase()) ||
              song.artist.toLowerCase().includes(filterText.toLowerCase()))
          );
      }
    }

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
  }, [songs, sortBy, sortOrder, filterText, currentPlaylistId, playlists]);
};
