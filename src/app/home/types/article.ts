// Podstawowy interfejs dla artykułów
export interface NewsArticle {
  id: string;
  title: string;
  image: string;
  slug: string;
  category: string;
  author?: {
    name: string;
    avatar: string;
    shortName?: string;
    timeAgo?: string;
  };
  // Add missing properties
  sidebarCategory?: string;
  date?: string;
  views?: number;
  premiumLabel?: string;
}
// Interfejs dla artykułów w sekcji "SKRÓT WYDARZEŃ"
export interface ShortNewsArticle {
  id: string;
  title: string;
  image: string;
  slug: string;
}

// Interfejs dla artykułów w dolnym rzędzie
export interface BottomRowArticle {
  id: string;
  title: string;
  image: string;
  slug: string;
  author: string;
}
