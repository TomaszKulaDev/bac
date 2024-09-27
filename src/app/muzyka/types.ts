export interface Song {
  _id: string;
  id?: string;
  title: string;
  artist: string;
  youtubeId: string;
  votes: number;
  score: number;
  isFavorite: boolean;
  __v?: number;
  userVote: "up" | "down" | null;
}

export interface MusicPlayerProps {
  songs: Song[];
}
