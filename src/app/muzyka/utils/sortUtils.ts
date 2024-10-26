import { Song } from "../types";
import { useMemo } from 'react';

type SortBy = "date" | "title" | "artist" | "impro" | "beginnerFriendly";
type SortOrder = "asc" | "desc";

const getSortValue = (song: Song, sortBy: SortBy): any => {
  switch (sortBy) {
    case "date":
      return new Date(song.createdAt).getTime();
    case "title":
    case "artist":
      return song[sortBy].trim().toLowerCase();
    case "impro":
    case "beginnerFriendly":
      return song[sortBy] ? 1 : 0;
    default:
      return song.title.trim().toLowerCase();
  }
};

export const useSortFunction = (sortBy: SortBy, sortOrder: SortOrder) => {
  return useMemo(() => {
    return (a: Song, b: Song) => {
      const aValue = getSortValue(a, sortBy);
      const bValue = getSortValue(b, sortBy);
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue, undefined, { sensitivity: 'base' });
        return sortOrder === "asc" ? comparison : -comparison;
      }
      
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    };
  }, [sortBy, sortOrder]);
};

export const sortSongs = (songs: Song[], sortFunction: (a: Song, b: Song) => number): Song[] => {
  return [...songs].sort(sortFunction);
};
