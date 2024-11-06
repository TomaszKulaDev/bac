import { useMemo } from "react";
import { Song, SortByType, SortOrderType, Playlist } from "../types";

const getSortValue = (song: Song, sortBy: SortByType) => {
  switch (sortBy) {
    case "title":
      return song.title.toLowerCase();
    case "artist":
      return song.artist.toLowerCase();
    case "date":
      return new Date(song.createdAt).getTime();
    case "impro":
    case "beginnerFriendly":
      return Number(!song[sortBy]);
    default:
      return new Date(song.createdAt).getTime();
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

      if (aValue === bValue) return 0;
      const compareResult = aValue > bValue ? 1 : -1;
      return sortOrder === "asc" ? compareResult : -compareResult;
    });
  }, [songs, sortBy, sortOrder, filterText, currentPlaylistId, playlists]);
};
