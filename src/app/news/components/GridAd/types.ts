export interface GridAdProps {
  imageUrl: string;
  title: string;
  description?: string;
  link: string;
}

export type GridAd = {
  type: "image" | "text";
  title: string;
  link: string;
} & (
  | { type: "image"; imageUrl: string }
  | { type: "text"; description: string }
);
