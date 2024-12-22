export interface NewsItem {
  id: string;
  title: string;
  image: string;
  url: string;
  category?: string;
  isHighlighted?: boolean;
  date?: string;
}

export interface NewsGridProps {
  newsItems: NewsItem[];
  title?: string;
  showHeader?: boolean;
}
