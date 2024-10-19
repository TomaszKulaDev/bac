import { Song } from "../types";

type SortBy = "date" | "title" | "artist" | "impro" | "beginnerFriendly";
type SortOrder = "asc" | "desc";

export const sortSongs = (
  songs: Song[],
  sortBy: SortBy,
  sortOrder: SortOrder
): Song[] => {
  console.log("Sorting:", { sortBy, sortOrder });
  
  const getSortValue = (song: Song): any => {
    switch (sortBy) {
      case "date":
        return new Date(song.createdAt).getTime();
      case "title":
        return song.title.trim().replace(/^[^a-zA-Z0-9]+/, '').toLowerCase();
      case "artist":
        return song.artist.trim().replace(/^[^a-zA-Z0-9]+/, '').toLowerCase();
      case "impro":
        return song.impro ? 1 : 0;
      case "beginnerFriendly":
        return song.beginnerFriendly ? 1 : 0;
      default:
        return song.title;
    }
  };

  return [...songs].sort((a, b) => {
    const aValue = getSortValue(a);
    const bValue = getSortValue(b);
    
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });
};
