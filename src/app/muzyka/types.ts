export interface Song {
  _id: string;
  id?: string;
  title: string;
  artist: string;
  youtubeId: string;
  __v?: number;
}

export interface MusicPlayerProps {
  songs: Song[];
}
