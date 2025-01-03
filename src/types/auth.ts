import { Gender } from "./user";

export interface DancePreferences {
  styles: string[];
  level: string;
  availability: string;
  location: string;
}

export interface UserBasicInfo {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string | null | undefined;
  dancePreferences?: DancePreferences;
  age?: number;
  gender?: Gender;
  bio?: string;
  height?: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserBasicInfo | null;
}

export const mapSessionToUser = (sessionUser: any): UserBasicInfo => {
  if (!sessionUser.email) {
    throw new Error("Email is required");
  }

  return {
    id: sessionUser.id,
    name: sessionUser.name || "Użytkownik",
    email: sessionUser.email,
    role: sessionUser.role || "user",
    image: sessionUser.image || undefined,
    dancePreferences: sessionUser.dancePreferences,
    age: sessionUser.age,
    gender: sessionUser.gender,
    bio: sessionUser.bio,
    height: sessionUser.height,
  };
};
