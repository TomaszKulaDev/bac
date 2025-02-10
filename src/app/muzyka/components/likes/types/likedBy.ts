export interface LikedByUser {
  userId: string;
  userName: string;
  email: string;
  userImage: string | null;
}

export interface LikedByAvatarsProps {
  users: LikedByUser[];
  size?: "small" | "large";
  maxAvatars?: number;
}
