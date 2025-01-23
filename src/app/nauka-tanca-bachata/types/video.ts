export interface BachataVideo {
  id: string;
  publicId: string;
  title: string;
  description?: string;
  thumbnailUrl: string;
  duration: number;
  tags: string[];
  category: string;
  instructorProfileUrl?: string;
  instructorName?: string;
  instructorAvatarUrl?: string;
}

export interface VideosResponse {
  videos: BachataVideo[];
  totalCount: number;
}
