export interface PolishArtist {
  id: string;
  name: string;
  image: string;
  city: string;
  school: string;
  isActive?: boolean;
  specialty?: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
}

export interface InstructorRating {
  teaching: number; // Umiejętności nauczania
  technique: number; // Technika tańca
  musicality: number; // Muzykalność
  atmosphere: number; // Atmosfera na zajęciach
  communication: number; // Komunikatywność
}

export interface RatingRecord {
  ratings: Record<string, InstructorRating>;
  votedInstructors: string[];
}
