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
      case "artist":
        return song[sortBy].trim().toLowerCase();
      case "impro":
      case "beginnerFriendly":
        return song[sortBy] ? 1 : 0;
      default:
        return song.title.trim().toLowerCase();
    }
  };

  return [...songs].sort((a, b) => {
    const aValue = getSortValue(a);
    const bValue = getSortValue(b);
    
    if (sortBy === "title" || sortBy === "artist") {
      const comparison = aValue.localeCompare(bValue, undefined, { sensitivity: 'base' });
      return sortOrder === "desc" ? comparison : -comparison;
    }
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      const comparison = aValue.localeCompare(bValue, undefined, { sensitivity: 'base' });
      return sortOrder === "asc" ? comparison : -comparison;
    }
    
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });
};
