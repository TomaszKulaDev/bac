export interface LikedByUser {
  userId: string;
  userName: string;
  email: string;
  userImage: string | null;
  slug?: string;
}

export interface LikedByAvatarsProps {
  users: LikedByUser[];
  size?: "small" | "large";
  maxAvatars?: number;
  onAvatarClick?: (profileUrl: string) => void;
  onMoreClick?: () => void;
  showTooltip?: boolean;
  isLoading?: boolean;
  totalLikes?: number;
}
