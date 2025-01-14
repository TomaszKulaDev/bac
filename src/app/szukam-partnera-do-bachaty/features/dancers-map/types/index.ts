import { DanceStyleValue } from "@/constants/danceStyles";
import { DanceLevel } from "@/constants/levels";
import { UserProfile } from "@/types/user";

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
}

export interface MapConfig {
  defaultZoom: number;
  maxZoom: number;
  minZoom: number;
  defaultCenter: { lat: number; lng: number };
}
