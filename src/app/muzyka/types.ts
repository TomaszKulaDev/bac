import { UniqueIdentifier } from "@dnd-kit/core";
import { SensorDescriptor, SensorOptions } from "@dnd-kit/core";
import { DragEndEvent } from "@dnd-kit/core";
import {
  DifficultyLevel,
  StyleType,
  TempoType,
} from "./components/songs/SongGrid/types";

// Interfejs reprezentujący playlistę
export interface Playlist {
  _id: string;
  id: string;
  name: string;
  userId: string;
  songs: string[];
  createdAt: Date;
}

// Interfejs reprezentujący utwór muzyczny
export interface Song {
  _id: string;
  id: string;
  title: string;
  artist: string;
  duration: number;
  youtubeId: string;
  dateAdded: string;
  thumbnail?: string;

  // Pola dla difficulty
  beginnerFriendly: boolean;
  intermediate: boolean;
  advanced: boolean;

  // Pola dla style
  sensual: boolean;
  dominicana: boolean;
  impro: boolean;

  // Pola dla tempo
  slow: boolean;
  medium: boolean;
  fast: boolean;

  // Pozostałe pola
  difficulty: DifficultyLevel;
  style: StyleType;
  tempo: TempoType;
  createdAt: string;
  likesCount: number;
  isLiked: boolean;
  playlists: string[];
  __v?: number;
}

export interface PoplistaSong extends Song {
  position: number;
  previousPosition: number;
  votes: {
    up: number;
  };
  trend: "new" | null;
  positionChange: number;
  thumbnail?: string;
  isVisible: boolean;
}

export type FilterType = "all" | "new" | "rising" | "falling";

// Interfejs właściwości komponentu odtwarzacza muzyki
export interface MusicPlayerProps {
  songs: Song[];
  onCreatePlaylist: (name: string, selectedSongs?: string[]) => void;
  onAddToPlaylist: (playlistId: string, songId: string) => void;
  expandedPlaylist: string | null;
  setExpandedPlaylist: React.Dispatch<React.SetStateAction<string | null>>;
  isPlaylistExpanded: boolean;
  filterText: string;
  setFilterText: React.Dispatch<React.SetStateAction<string>>;
  isMobile: boolean;
  currentPlaylistId: string | null;
  playlists: Playlist[];
  onUpdatePlaylists: (
    updater: (prevPlaylists: Playlist[]) => Playlist[]
  ) => void;
  onPlayPlaylist: (playlistId: string) => void;
  showSuccessToast: (message: string) => void;
  showErrorToast: (message: string) => void;
  showInfoToast: (message: string) => void;
  playlistCount: number;
  onToggleButtonsVisibility?: () => void;
  initialButtonsVisible?: boolean;
  sensors: any; // możemy później dodać dokładniejszy typ z @dnd-kit/core
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentPlaylistId: (id: string | null) => void;
  currentSongIndex: number;
  setPlaylists: React.Dispatch<React.SetStateAction<Playlist[]>>;
  isPlaylistManagerVisible: boolean;
  setIsPlaylistManagerVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

// Interfejs reprezentujący tryb powtarzania
export interface RepeatMode {
  song: "on" | "off";
  playlist: "on" | "off";
}

// Typy dla opcji sortowania
export type SortOption =
  | "date"
  | "title"
  | "artist"
  | "impro"
  | "beginnerFriendly";
export type SortBy = SortOption;
export type SortOrder = "asc" | "desc";

export type SortOrderType = "asc" | "desc";
export type SortByType =
  | "date"
  | "title"
  | "artist"
  | "impro"
  | "beginnerFriendly";

// Dodajemy interfejs DraggableSong
export interface DraggableSong {
  id: UniqueIdentifier;
  playlistId: string;
  songDetails: Song;
}

export interface PlaylistDndProps {
  playlist: Playlist;
  onReorder: (playlistId: string, newOrder: string[]) => void;
}

// Dodajemy nowy interfejs
export interface PlaylistManagerProps {
  playlists: Playlist[];
  songs: Song[];
  expandedPlaylist: string | null;
  setExpandedPlaylist: (playlistId: string | null) => void;
  onDeletePlaylist: (playlistId: string) => void;
  onRenamePlaylist: (playlistId: string, newName: string) => void;
  onRemoveSongFromPlaylist: (playlistId: string, songId: string) => void;
  onCreatePlaylist: (name: string, selectedSongs?: string[]) => void;
  isMobile: boolean;
  onPlayPlaylist: (playlistId: string) => void;
  currentPlaylistId: string | null;
  onAddToPlaylist: (playlistId: string, songId: string) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  isModalOpen: boolean;
  showSuccessToast: (message: string) => void;
  showErrorToast: (message: string) => void;
  showInfoToast: (message: string) => void;
  onUpdatePlaylists: (
    updater: (prevPlaylists: Playlist[]) => Playlist[]
  ) => void;
  setPlaylists: React.Dispatch<React.SetStateAction<Playlist[]>>;
  isAuthenticated: boolean;
  setCurrentPlaylistId: (id: string | null) => void;
}

export interface PlaylistManagerContentProps extends PlaylistManagerProps {
  sensors: SensorDescriptor<SensorOptions>[];
  onDragEnd: (event: DragEndEvent, currentPlaylist: Playlist) => void;
  getSongDetails: (songId: string) => Song | undefined;
  isAuthenticated: boolean;
}

interface SongListProps {
  // ... istniejące pola ...
  visibleSongs: number;
  onLoadMore: () => void;
}

interface LoadMoreButtonProps {
  isVisible: boolean;
  onClick: () => void;
  remainingSongs?: number;
}

export type SongLevel = "beginner" | "intermediate" | "advanced" | "impro";

// Dodajmy też typ dla historii pozycji
export interface PositionHistory {
  songId: string;
  positions: {
    position: number;
    timestamp: Date;
  }[];
}
