export interface Song {
  _id: string;
  title: string;
  artist: string;
  youtubeId: string;
  next: string | null; // ID następnej piosenki
  prev: string | null; // ID poprzedniej piosenki
}

export interface MusicPlayerProps {
  songs: Song[];
}
