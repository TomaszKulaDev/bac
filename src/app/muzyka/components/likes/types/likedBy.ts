export interface LikedByUser {
  userId: string;
  userName: string;
  userImage: string | null;
}

export interface LikedByAvatarsProps {
  users: LikedByUser[];
  size?: "small" | "large";
  showCount?: boolean;
  maxAvatars?: number;
}
