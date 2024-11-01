// Interfejs reprezentujący playlistę
export interface Playlist {
  id: string;
  name: string;
  songs: string[]; // Tablica ID piosenek
}

// Interfejs reprezentujący utwór muzyczny
export interface Song {
  _id: string;
  id: string;
  title: string;
  artist: string;
  youtubeId: string;
  impro: boolean;
  beginnerFriendly: boolean; // Określa, czy utwór jest przyjazny dla początkujących
  createdAt: Date;
  __v?: number;
  playlists: string[]; // Tablica ID playlist, do których należy utwór
  thumbnail?: string;
}

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
  onUpdatePlaylists: (updater: (prevPlaylists: Playlist[]) => Playlist[]) => void;
  onPlayPlaylist: (playlistId: string) => void;
  showSuccessToast: (message: string) => void;
  showErrorToast: (message: string) => void;
  showInfoToast: (message: string) => void;
  playlistCount: number;
  onToggleButtonsVisibility?: () => void;
  initialButtonsVisible?: boolean;
}

// Interfejs reprezentujący tryb powtarzania
export interface RepeatMode {
  song: "on" | "off";
  playlist: "on" | "off";
}

// Typy dla opcji sortowania
export type SortOption = "date" | "title" | "artist" | "impro" | "beginnerFriendly";
export type SortBy = SortOption;
export type SortOrder = "asc" | "desc";

export type SortOrderType = 'asc' | 'desc';
export type SortByType = 'date' | 'title' | 'artist' | 'impro' | 'beginnerFriendly';
