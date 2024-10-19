import { Song } from "../types";

type SortBy = "date" | "title" | "artist" | "impro" | "beginnerFriendly";
type SortOrder = "asc" | "desc";

export const sortSongs = (
  songs: Song[],
  sortBy: SortBy,
  sortOrder: SortOrder
): Song[] => {
  console.log('Sorting:', { sortBy, sortOrder });
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
        comparison = Number(b.impro) - Number(a.impro);
        break;
      case "beginnerFriendly":
        comparison = Number(b.beginnerFriendly) - Number(a.beginnerFriendly);
        break;
    }
    return sortOrder === "asc" ? comparison : -comparison;
  });
};
