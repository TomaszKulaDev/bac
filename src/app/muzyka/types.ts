export interface Song {
  // istniejące właściwości
  id: string;
  title: string;
  artist: string;
  youtubeId: string;
  votes: number;
  score: number;
  isFavorite: boolean;
  // nowa właściwość
  userVote: "up" | "down" | null;
}

export interface MusicPlayerProps {
  songs: Song[];
}
