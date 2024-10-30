export interface Song {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  youtubeId?: string;
}

export type RepeatMode = {
  song: "on" | "off";
  playlist: "on" | "off";
};

export interface Playlist {
  id: string;
  name: string;
  songs: string[];
}

interface MusicPlayerProps {
  // ... istniejące props
  onToggleButtonsVisibility?: () => void;
  initialButtonsVisible?: boolean;
}
