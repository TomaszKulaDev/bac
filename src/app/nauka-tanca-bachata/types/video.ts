export const DANCE_LEVELS = {
  ALL: "Wszystkie poziomy",
  BEGINNER: "Początkujący",
  INTERMEDIATE: "Średniozaawansowany",
  ADVANCED: "Zaawansowany",
} as const;

export const DANCE_CATEGORIES = {
  BASIC: "Krok podstawowy",
  HER_SPINS: "Obroty partnerki",
  HIS_SPINS: "Obroty partnera",
  HER_HEAD_ROLL: "Ruch głowy partnerki",
  HIS_HEAD_ROLL: "Ruch głowy partnera",
  STYLING: "Styling",
  MUSICALITY: "Muzykalność",
  PARTNERWORK: "Praca w parze",
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
