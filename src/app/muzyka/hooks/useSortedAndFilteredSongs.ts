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

  const filteredSongs = useMemo(() => {
    if (!filterText) return songs;
    return songs.filter(
      (song) =>
        song.title.toLowerCase().includes(filterText.toLowerCase()) ||
        song.artist.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [songs, filterText]);

  return useMemo(() => {
    return sortSongs(filteredSongs, sortFunction);
  }, [filteredSongs, sortFunction]);
};
