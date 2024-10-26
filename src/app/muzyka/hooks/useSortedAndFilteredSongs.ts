import { useMemo } from 'react';
import { Song } from '../types';
import { sortSongs } from '../utils/sortUtils';

export const useSortedAndFilteredSongs = (
  songs: Song[],
  sortBy: "date" | "title" | "artist" | "impro" | "beginnerFriendly",
  sortOrder: "asc" | "desc",
  filterText: string
) => {
  return useMemo(() => {
    let filteredSongs = songs;
    if (filterText) {
      filteredSongs = songs.filter(
        (song) =>
          song.title.toLowerCase().includes(filterText.toLowerCase()) ||
          song.artist.toLowerCase().includes(filterText.toLowerCase())
      );
    }
    return sortSongs(filteredSongs, sortBy, sortOrder);
  }, [songs, sortBy, sortOrder, filterText]);
};

