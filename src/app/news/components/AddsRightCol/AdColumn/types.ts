export type Ad = {
  type: "image" | "text";
  title: string;
  link: string;
} & (
  | { type: "image"; imageUrl: string }
  | { type: "text"; description: string }
);

export interface AdColumnProps {
  ads: Ad[];
}
