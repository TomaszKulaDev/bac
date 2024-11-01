import { Playlist, Song } from "@/app/muzyka/types";
import { SortByType, SortOrderType } from "@/app/muzyka/types";

export interface BaseDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  showErrorToast: (message: string) => void;
}

export interface CreatePlaylistDrawerProps extends BaseDrawerProps {
  onCreatePlaylist: (name: string, selectedSongs?: string[]) => void;
  playlists: Playlist[];
}

export interface PlaylistSelectorDrawerProps extends BaseDrawerProps {
  playlists: Playlist[];
  currentPlaylistId: string | null;
  onPlayPlaylist: (playlistId: string) => void;
}

export interface MobileDrawerProps extends BaseDrawerProps {
  sortBy: SortByType;
  sortOrder: SortOrderType;
  onSortChange: (sortBy: SortByType, sortOrder: SortOrderType) => void;
  playlists: Playlist[];
  songs: Song[];
  expandedPlaylist: string | null;
  setExpandedPlaylist: (id: string | null) => void;
  onAddToPlaylist: (playlistId: string, songId: string) => void;
  onCreatePlaylist: (name: string, selectedSongs?: string[]) => void;
  currentPlaylistId: string | null;
  onPlayPlaylist: (id: string) => void;
  onUpdatePlaylists: (updater: (prevPlaylists: Playlist[]) => Playlist[]) => void;
  showSuccessToast: (message: string) => void;
} 