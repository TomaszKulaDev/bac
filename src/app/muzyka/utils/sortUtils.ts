import { Song } from "../types";

type SortBy = "date" | "title" | "artist" | "impro" | "beginnerFriendly";
type SortOrder = "asc" | "desc";

export const sortSongs = (
  songs: Song[],
  sortBy: SortBy,
  sortOrder: SortOrder
): Song[] => {
  console.log("Sorting:", { sortBy, sortOrder });
  return [...songs].sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case "date":
        comparison =
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
      case "title":
        const cleanTitleA = a.title.trim().replace(/^[^a-zA-Z0-9]+/, '');
        const cleanTitleB = b.title.trim().replace(/^[^a-zA-Z0-9]+/, '');
        comparison = cleanTitleA.localeCompare(cleanTitleB, undefined, {sensitivity: 'base', ignorePunctuation: true});
        break;
      case "artist":
        const cleanArtistA = a.artist.trim().replace(/^[^a-zA-Z0-9]+/, '');
        const cleanArtistB = b.artist.trim().replace(/^[^a-zA-Z0-9]+/, '');
        comparison = cleanArtistA.localeCompare(cleanArtistB, undefined, {sensitivity: 'base', ignorePunctuation: true});
        break;
      case "impro":
        comparison = b.impro === a.impro ? 0 : b.impro ? -1 : 1;
        break;
      case "beginnerFriendly":
        comparison = b.beginnerFriendly === a.beginnerFriendly ? 0 : b.beginnerFriendly ? -1 : 1;
        break;
    }
    console.log(
      "Sorted result:",
      songs.map((song) => song.title)
    );
    return sortOrder === "asc" ? comparison : -comparison;
  });
};
