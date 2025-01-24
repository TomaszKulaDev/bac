export const DANCE_LEVELS = {
  ALL: "Wszystkie poziomy",
  BEGINNER: "Początkujący",
  INTERMEDIATE: "Średniozaawansowany",
  ADVANCED: "Zaawansowany",
} as const;

export const DANCE_CATEGORIES = {
  BASIC: "Krok podstawowy",
  SPINS: "Obroty5",
  FIGURES: "Figury4",
  STYLING: "Styling3",
  MUSICALITY: "Muzykalność2",
  PARTNERWORK: "Praca w parze1",
} as const;

export type DanceLevel = keyof typeof DANCE_LEVELS;
export type Category = keyof typeof DANCE_CATEGORIES;

export interface BachataVideo {
  id: string;
  publicId: string;
  title: string;
  description?: string;
  thumbnailUrl: string;
  duration: number;
  tags: string[];
  category: Category;
  level: DanceLevel;
  instructorProfileUrl?: string;
  instructorName?: string;
  instructorAvatarUrl?: string;
  likes?: number;
}

export interface VideosResponse {
  videos: BachataVideo[];
  totalCount: number;
}
