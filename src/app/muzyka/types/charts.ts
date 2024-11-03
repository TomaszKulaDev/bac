export interface TopChartsSection {
  topLikedSongs: {
    id: string;
    title: string;
    artist: string;
    thumbnail: string;
    likesCount: number;
    likedBy: {
      id: string;
      name: string;
      avatar?: string;
    }[];
    trend: 'up' | 'down' | 'stable';
    lastWeekPosition: number;
  }[];
  
  topPlaylists: {
    id: string;
    name: string;
    createdBy: {
      id: string;
      name: string;
      avatar?: string;
    };
    thumbnail: string;
    likesCount: number;
    songsCount: number;
    followers: number;
    trend: 'up' | 'down' | 'stable';
    lastWeekPosition: number;
  }[];
}
