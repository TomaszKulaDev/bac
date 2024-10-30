import { SortByType, SortOrderType } from "../hooks/useDrawers";
import { Playlist } from "./playlist";

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
