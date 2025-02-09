export interface LikedByUser {
  userId: string;
  userName: string;
  userImage: string;
}

export interface LikedByAvatarsProps {
  songId: string;
  size?: "small" | "large";
  maxAvatars?: number;
}
