import { DanceStyleValue } from "@/constants/danceStyles";

export interface Dancer {
  city: string;
  styles: Array<{
    name: DanceStyleValue;
    count: number;
  }>;
}
