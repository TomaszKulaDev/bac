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
  atmosphere: number; // Atmosfera na zajęciach
  studentDancing: boolean; // Tańczą z kursantami na zajęciach
  socialDancing: boolean; // Tańczą na imprezach/socjalach
}

export interface RatingRecord {
  ratings: Record<string, InstructorRating>;
  votedInstructors: string[];
}
