import { useMemo } from 'react';
import { Song } from '../types';
import { sortSongs, useSortFunction } from '../utils/sortUtils';

export const useSortedAndFilteredSongs = (
  songs: Song[],
  sortBy: "date" | "title" | "artist" | "impro" | "beginnerFriendly",
  sortOrder: "asc" | "desc",
  filterText: string
) => {
  const sortFunction = useSortFunction(sortBy, sortOrder);

  return useMemo(() => {
    const filteredSongs = filterText
      ? songs.filter(
          (song) =>
            song.title.toLowerCase().includes(filterText.toLowerCase()) ||
            song.artist.toLowerCase().includes(filterText.toLowerCase())
        )
      : songs;
    return sortSongs(filteredSongs, sortFunction);
  }, [songs, sortFunction, filterText]);
};
