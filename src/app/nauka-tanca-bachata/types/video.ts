export const DANCE_LEVELS = {
  ALL: "Wszystkie poziomy",
  BEGINNER: "Początkujący",
  INTERMEDIATE: "Średniozaawansowany",
  ADVANCED: "Zaawansowany",
} as const;

export const DANCE_CATEGORIES = {
  BASIC: "Krok podstawowy",
  SPINS: "Obroty",
  HER_SPINS: "Obroty partnerki",
  HIS_SPINS: "Obroty partnera",
  FIGURES: "Figury",
  STYLING: "Styling",
  HER_STYLING: "Styling partnerki",
  HIS_STYLING: "Styling partnera",
  MUSICALITY: "Muzykalność",
  PARTNERWORK: "Praca w parze",
  HEAD_MOVEMENT: "Ruchy głowy",
  BODY_MOVEMENT: "Izolacje ciała",
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
  instructorProfileUrl?: string;
  instructorName?: string;
  instructorAvatarUrl?: string;
  likes?: number;
}

export interface VideosResponse {
  videos: BachataVideo[];
  totalCount: number;
}
