import { useMemo } from 'react';
import { Playlist, Song } from '../types';
import { SortByType } from '../components/songs/SongGrid/types';
import { getDateTimestamp } from '../utils/dateHelpers';

type SortOrder = 'asc' | 'desc';

export const useSortedAndFilteredSongs = (
  songs: Song[],
  sortBy: SortByType,
  sortOrder: SortOrder,
  filterText: string,
  currentPlaylistId: string | null,
  playlists: Playlist[]
) => {
  return useMemo(() => {
    let sortedSongs = [...songs].sort((a, b) => {
      const sortMultiplier = sortOrder === 'asc' ? 1 : -1;
      
      switch (sortBy as string) {
        case 'newest':
          return (getDateTimestamp(b.createdAt) - getDateTimestamp(a.createdAt)) * sortMultiplier;
        case 'popular':
          return 0; // Zaimplementuj logikę popularności
        case 'alphabetical':
          return a.title.localeCompare(b.title) * sortMultiplier;
        default:
          return 0;
      }
    });

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

    return sortedSongs;
  }, [songs, sortBy, sortOrder, filterText, currentPlaylistId, playlists]);
};
