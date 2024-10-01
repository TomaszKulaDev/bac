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
}

export interface MusicPlayerProps {
  songs: Song[];
}
