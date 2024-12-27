export type AdvertisementType = "Praktis" | "Social" | "Kurs" | "Inne";
export type DanceLevel =
  | "Początkujący"
  | "Średniozaawansowany"
  | "Zaawansowany";

export interface Advertisement {
  _id: string;
  type: AdvertisementType;
  title: string;
  date: string;
  time: string;
  location: {
    city: string;
    place: string;
  };
  author: {
    name: string;
    level: DanceLevel;
    avatar?: string;
  };
  createdAt: string;
}
