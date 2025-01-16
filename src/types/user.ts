import { DanceStyleValue } from "@/constants/danceStyles";
import { DanceLevel } from "@/constants/levels";

export type Gender = "male" | "female";

export interface DancePreferences {
  styles: string[];
  level: string;
  availability: string;
  location: string;
}

export interface SocialMedia {
  instagram?: string;
  facebook?: string;
  youtube?: string;
}

export interface UserSettings {
  notifications: {
    email: boolean;
    push: boolean;
  };
  privacy: {
    isPublic: boolean;
  };
}

export const DEFAULT_SETTINGS: UserSettings = {
  notifications: {
    email: false,
    push: false,
  },
  privacy: {
    isPublic: false,
  },
};

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  image?: string;
  bio?: string;
  height?: number;
  age?: number;
  gender?: Gender;
  createdAt: string | Date;
  updatedAt?: string;
  dancePreferences?: DancePreferences;
  socialMedia?: SocialMedia;
  slug?: string;
  settings?: UserSettings;
  instructorProfile?: InstructorProfile;
  isPublicProfile: boolean;
}

export type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string | number
        ? T[K] extends object
          ? K | `${K}.${NestedKeyOf<T[K]>}`
          : K
        : never;
    }[keyof T & (string | number)]
  : never;

export type DotPrefix<T extends string> = T extends "" ? "" : `.${T}`;

export type DotNestedKeys<T> = (
  T extends object
    ? {
        [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<
          DotNestedKeys<T[K]>
        >}`;
      }[Exclude<keyof T, symbol>]
    : ""
) extends infer D
  ? Extract<D, string>
  : never;

type ArrayFields = {
  "dancePreferences.styles": string[];
};

export type UserProfilePaths =
  | keyof UserProfile
  | "dancePreferences.styles"
  | "dancePreferences.level"
  | "dancePreferences.availability"
  | "dancePreferences.location"
  | "socialMedia.instagram"
  | "socialMedia.facebook"
  | "socialMedia.youtube";

export interface EditProfileFormData
  extends Omit<UserProfile, "id" | "createdAt" | "updatedAt"> {
  // Pola, które można edytować
}

export interface InstructorProfile {
  isInstructor: boolean;
  specializations: string[];
  experience: string;
  certificates: {
    name: string;
    issuer: string;
    year: number;
  }[];
  classes: {
    name: string;
    description: string;
    level: string;
    maxParticipants: number;
  }[];
  pricing: {
    privateClass: number;
    groupClass: number;
  };
}
