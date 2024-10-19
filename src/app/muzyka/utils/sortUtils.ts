import { Song } from "../types";

type SortBy = "date" | "title" | "artist" | "impro";
type SortOrder = "asc" | "desc";

export const sortSongs = (
  songs: Song[],
  sortBy: SortBy,
  sortOrder: SortOrder
): Song[] => {
  return [...songs].sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case "date":
        comparison =
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        break;
      case "title":
        comparison = a.title.localeCompare(b.title);
        break;
      case "artist":
        comparison = a.artist.localeCompare(b.artist);
        break;
      case "impro":
        comparison = (a.impro === b.impro) ? 0 : a.impro ? -1 : 1;
        break;
    }
    return sortOrder === "asc" ? comparison : -comparison;
  });
};
