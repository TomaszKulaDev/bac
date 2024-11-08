import { Song, SongLevel } from "../../../types";

export type SortByType = 'newest' | 'popular' | 'alphabetical' | 'title' | 'artist' | 'date' | 'impro';

export interface SongGridProps {
  songs: Song[];
  currentSongId?: string;
  isPlaying: boolean;
  onSongSelect: (songId: string) => void;
  onAddToPlaylist: (songId: string) => void;
  onToggleFavorite: (songId: string) => void;
  favorites: Set<string>;
}

export interface SongCardProps {
  song: Song;
  isCurrentSong: boolean;
  isPlaying: boolean;
  isFavorite: boolean;
  onSongSelect: (songId: string) => void;
  onAddToPlaylist: (songId: string) => void;
  onToggleFavorite: (songId: string) => void;
}
