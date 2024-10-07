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
  createdAt: Date;
  __v?: number;
  playlists: string[]; // Tablica ID playlist, do których należy utwór
}

export interface MusicPlayerProps {
  songs: Song[];
  onCreatePlaylist: (name: string, songs: string[]) => void;
  onAddToPlaylist: (playlistId: string, songId: string) => void;
  expandedPlaylist: string | null;
  setExpandedPlaylist: React.Dispatch<React.SetStateAction<string | null>>;
  isPlaylistExpanded: boolean;
}
