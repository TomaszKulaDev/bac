export type InstructorLevel = "master" | "expert" | "advanced";

export interface Instructor {
  id: string;
  name: string;
  image: string;
  location: string;
  level: InstructorLevel;
  specialization: string[];
  instagram?: string;
  achievements?: string[];
  description?: string;
  rating?: number;
}
