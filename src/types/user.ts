export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
  dancePreferences?: {
    styles: string[];
    level: string;
    availability: string;
    location: string;
  };
}
