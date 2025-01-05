export type Gender = "male" | "female";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  image?: string;
  bio?: string;
  height?: number;
  createdAt: string | Date;
  updatedAt?: string;
  dancePreferences?: {
    styles: string[];
    level: string;
    availability: string;
    location: string;
  };
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
  age?: number;
  gender?: Gender;
  slug?: string;
}
