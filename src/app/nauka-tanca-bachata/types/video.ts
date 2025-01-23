export const DANCE_LEVELS = {
  ALL: "Wszystkie poziomy",
  BEGINNER: "Początkujący",
  INTERMEDIATE: "Średniozaawansowany",
  ADVANCED: "Zaawansowany",
} as const;

export type DanceLevel = keyof typeof DANCE_LEVELS;

export interface BachataVideo {
  id: string;
  publicId: string;
  title: string;
  description?: string;
  thumbnailUrl: string;
  duration: number;
  tags: string[];
  category: string;
  level: DanceLevel;
  instructorProfileUrl?: string;
  instructorName?: string;
  instructorAvatarUrl?: string;
}

export interface VideosResponse {
  videos: BachataVideo[];
  totalCount: number;
}
