export interface NewsGridItem {
  id: string;
  title: string;
  image: string;
  url: string;
}

export interface NewsGridProps {
  newsItems: NewsGridItem[];
  title?: string;
  showHeader?: boolean;
}
