import { Song } from "../../../types";

export type SortByType = 'newest' | 'popular' | 'alphabetical';
export type DifficultyLevel = 'unspecified' | 'beginner' | 'intermediate' | 'advanced';
export type StyleType = 'unspecified' | 'sensual' | 'dominicana' | 'impro';
export type TempoType = 'unspecified' | 'slow' | 'medium' | 'fast';

export interface Filters {
  difficulty: DifficultyLevel[];
  style: StyleType[];
  tempo: TempoType[];
}

export interface FilterPanelProps {
  filters: Filters;
  onFilterChange: (filterType: keyof Filters, value: DifficultyLevel | StyleType | TempoType) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

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

export interface LoadMoreButtonProps {
  isVisible: boolean;
  onClick: () => void;
  remainingSongs: number;
  isExpanded: boolean;
}
