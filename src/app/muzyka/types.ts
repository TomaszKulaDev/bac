export interface Playlist {
  id: string;
  name: string;
  songs: string[]; // Tablica ID piosenek
}

export interface Song {
  _id: string;
  id: string;
  title: string;
  artist: string;
  youtubeId: string;
  impro: boolean;
  beginnerFriendly: boolean; // Nowe pole
  createdAt: Date;
  __v?: number;
  playlists: string[]; // Tablica ID playlist, do których należy utwór
}

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
}

export interface RepeatMode {
  playlist: 'off' | 'on';
  song: 'off' | 'on';
}
