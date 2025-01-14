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

// Dodajemy domyślne wartości
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
  createdAt: string | Date;
  updatedAt?: string;
  dancePreferences?: DancePreferences;
  socialMedia?: SocialMedia;
  age?: number;
  gender?: Gender;
  slug?: string;
  settings?: UserSettings;
  instructorProfile?: InstructorProfile;
}

// Poprawiona definicja typu NestedKeyOf

export type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string | number
        ? T[K] extends object
          ? K | `${K}.${NestedKeyOf<T[K]>}`
          : K
        : never;
    }[keyof T & (string | number)]
  : never;

// Zachowujemy również poprzednie typy
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

// Dodajemy specjalny typ dla pól tablicowych
type ArrayFields = {
  "dancePreferences.styles": string[];
};

// Rozszerzamy UserProfilePaths o pola tablicowe
export type UserProfilePaths = DotNestedKeys<UserProfile> | keyof ArrayFields;
export type UserProfileNestedPaths = NestedKeyOf<UserProfile>;

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

// Dodajemy typy związane z mapą
export interface MapFilters {
  danceStyle: DanceStyleValue | "";
  level: DanceLevel | "";
  gender: Gender | "";
}

export interface MapConfig {
  defaultZoom: number;
  maxZoom: number;
  minZoom: number;
  defaultCenter: { lat: number; lng: number };
}

export interface DancerMarker {
  id: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  stats: {
    totalDancers: number;
    activeDancers: number;
  };
  styles: Array<{
    name: DanceStyleValue;
    count: number;
  }>;
  dancers: Array<Pick<UserProfile, "id" | "name" | "image">>;
}
