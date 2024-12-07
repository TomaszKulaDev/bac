import { Song } from "../../types";

export interface BadgeContainerProps {
  song: Song;
}

export interface SongCardProps {
  song: Song;
  isCurrentSong: boolean;
  isFavorite: boolean;
  isPlaying: boolean;
  onSongSelect: (songId: string) => void;
  onAddToPlaylist?: (songId: string) => void;
  onToggleFavorite?: (songId: string) => void;
}

export interface SongGridProps {
  songs: Song[];
  currentSongId?: string;
  isPlaying: boolean;
  favorites: Set<string>;
  onSongSelect: (songId: string) => void;
  onAddToPlaylist: (songId: string) => void;
  onToggleFavorite: (songId: string) => void;
}
