export enum ArticleCategory {
  FEATURED = "featured",
  SECONDARY = "secondary",
  SIDEBAR = "sidebar",
  INTERVIEW_FEATURED = "interview_featured",
  INTERVIEW_SECONDARY = "interview_secondary",
  INTERVIEW_SIDEBAR = "interview_sidebar",
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

export interface SectionAuthors {
  mainAuthors: Author[];
  newsAuthors: Author[];
  // ... existing properties ...
}
