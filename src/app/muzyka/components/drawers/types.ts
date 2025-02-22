import { Playlist } from "@/app/muzyka/types";

export interface BaseDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  showErrorToast: (message: string) => void;
}

export interface CreatePlaylistModalProps extends BaseDrawerProps {
  onCreatePlaylist: (name: string) => void;
  playlists: Playlist[];
}

export interface PlaylistSelectorDrawerProps extends BaseDrawerProps {
  playlists: Playlist[];
  currentPlaylistId: string | null;
  onPlayPlaylist: (playlistId: string) => void;
}
