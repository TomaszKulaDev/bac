export enum ArticleCategory {
  FEATURED = "featured",
  SECONDARY = "secondary",
  SIDEBAR = "sidebar",
}

export interface Author {
  name: string;
  avatar: string;
  shortName?: string;
  timeAgo?: string;
  role?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  image: string;
  slug: string;
  category: ArticleCategory;
  author?: Author;
  date?: string;
  views?: number;
  sidebarCategory?: string;
}
