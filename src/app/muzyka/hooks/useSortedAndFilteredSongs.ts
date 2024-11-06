import { useMemo } from "react";
import { Song, SortByType, SortOrderType, Playlist } from "../types";

const getSortValue = (song: Song, sortBy: SortByType) => {
  switch (sortBy) {
    case "title":
      return song.title.toLowerCase();
    case "artist":
      return song.artist.toLowerCase();
    case "date":
      return new Date(song.createdAt || "").getTime().toString();
    case "impro":
      return song.impro ? "1" : "0";
    case "beginnerFriendly":
      return song.beginnerFriendly ? "1" : "0";
    default:
      return "";
  }
};

export const useSortedAndFilteredSongs = (
  songs: Song[],
  sortBy: SortByType,
  sortOrder: SortOrderType,
  filterText: string,
  currentPlaylistId: string | null,
  playlists: Playlist[]
) => {
  return useMemo(() => {
    // Jeśli mamy aktywną playlistę, zachowujemy kolejność utworów z playlisty
    if (currentPlaylistId && playlists) {
      const playlist = playlists.find((p) => p.id === currentPlaylistId);
      if (playlist) {
        return playlist.songs
          .map((songId) => songs.find((song) => song.id === songId))
          .filter(
            (song): song is Song =>
              song !== undefined &&
              (!filterText ||
                song.title.toLowerCase().includes(filterText.toLowerCase()) ||
                song.artist.toLowerCase().includes(filterText.toLowerCase()))
          );
      }
    }

    // Dla głównej listy stosujemy sortowanie i filtrowanie
    const filteredSongs = songs.filter(
      (song) =>
        !filterText ||
        song.title.toLowerCase().includes(filterText.toLowerCase()) ||
        song.artist.toLowerCase().includes(filterText.toLowerCase())
    );

    return [...filteredSongs].sort((a, b) => {
      const aValue = getSortValue(a, sortBy);
      const bValue = getSortValue(b, sortBy);

      // Specjalna logika dla impro i beginnerFriendly
      if (sortBy === "impro" || sortBy === "beginnerFriendly") {
        // Odwracamy kolejność sortowania dla tych kategorii
        return sortOrder === "asc"
          ? bValue > aValue
            ? 1
            : -1
          : aValue > bValue
          ? 1
          : -1;
      }

      // Standardowe sortowanie dla pozostałych kategorii
      return sortOrder === "asc"
        ? aValue > bValue
          ? 1
          : -1
        : bValue > aValue
        ? 1
        : -1;
    });
  }, [songs, sortBy, sortOrder, filterText, currentPlaylistId, playlists]);
};
