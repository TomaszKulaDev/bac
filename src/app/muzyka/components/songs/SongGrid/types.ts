import { Song, SongLevel } from "../../../types";

export type SortByType = 'newest' | 'popular' | 'alphabetical';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
export type StyleType = 'sensual' | 'dominicana' | 'impro';
export type TempoType = 'slow' | 'medium' | 'fast';

export interface Filters {
  difficulty: DifficultyLevel[];
  style: StyleType[];
  tempo: TempoType[];
}

export interface SongGridProps {
  songs: Song[];
  currentSongId?: string;
  isPlaying: boolean;
  onSongSelect: (songId: string) => void;
  onAddToPlaylist: (songId: string) => void;
  onToggleFavorite: (songId: string) => void;
  favorites: Set<string>;
  filters?: Filters;
  onFilterChange?: (filters: Filters) => void;
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
