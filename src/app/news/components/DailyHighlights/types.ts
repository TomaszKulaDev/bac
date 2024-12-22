export interface Highlight {
  id: string;
  title: string;
  image: string;
  url: string;
  label?: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface DailyHighlightProps {
  highlights: Highlight[];
  categories: Category[];
}
