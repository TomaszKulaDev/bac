export interface Song {
  _id: string;
  id?: string;
  title: string;
  artist: string;
  youtubeId: string;
  createdAt: Date; // Dodajemy pole createdAt
  __v?: number;
}

export interface MusicPlayerProps {
  songs: Song[];
}
