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
  onAvatarClick?: (userId: string) => void;
  onMoreClick?: () => void;
  showTooltip?: boolean;
  isLoading?: boolean;
  totalLikes?: number;
}
