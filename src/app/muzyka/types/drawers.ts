import { SortByType, SortOrderType } from "../hooks/useDrawers";
import { Playlist, Song } from "../types";

export interface BaseDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxHeight?: string;
}

export interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  sortBy: SortByType;
  sortOrder: SortOrderType;
  onSortChange: (sortBy: SortByType, sortOrder: SortOrderType) => void;
  playlists: Playlist[];
  songs: Song[];
  expandedPlaylist: string | null;
  setExpandedPlaylist: (id: string | null) => void;
  currentPlaylistId: string | null;
  onPlayPlaylist: (id: string) => void;
  isAuthenticated: boolean;
  showErrorToast: (message: string) => void;
  showSuccessToast: (message: string) => void;
}

export interface CreatePlaylistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePlaylist: () => void;
  isAuthenticated: boolean;
  showErrorToast: (message: string) => void;
  playlists: Playlist[];
}

export interface PlaylistSelectorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  playlists: Playlist[];
  currentPlaylistId: string | null;
  onPlayPlaylist: (playlistId: string) => void;
  isAuthenticated: boolean;
  showErrorToast: (message: string) => void;
}

export interface PlaylistManagerProps {
  playlists: Playlist[];
  songs: Song[];
  expandedPlaylist: string | null;
  setExpandedPlaylist: (id: string | null) => void;
  onDeletePlaylist: (id: string) => void;
  onRenamePlaylist: (id: string, name: string) => void;
  onRemoveSongFromPlaylist: (playlistId: string, songId: string) => void;
  onCreatePlaylist: () => void;
  isMobile: boolean;
  onPlayPlaylist: (id: string) => void;
  currentPlaylistId: string | null;
  onAddToPlaylist: (playlistId: string, songId: string) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  isModalOpen: boolean;
  showSuccessToast: (message: string) => void;
  showErrorToast: (message: string) => void;
  showInfoToast: (message: string) => void;
}
