export interface Song {
  _id: string;
  id: string;
  title: string;
  artist: string;
  youtubeId: string;
  impro: boolean;
  beginnerFriendly: boolean;
  sensual: boolean;
  dominicana: boolean;
  intermediate: boolean;
  advanced: boolean;
  slow: boolean;
  medium: boolean;
  fast: boolean;
  createdAt: string;
  isLiked?: boolean;
  likesCount: number;
  playlists?: string[];
} 