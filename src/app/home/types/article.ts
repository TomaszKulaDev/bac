// Podstawowy interfejs dla artykułów
export interface NewsArticle {
  id: string;
  title: string;
  image: string;
  slug: string;
  category?: string;
  hasVideo?: boolean;
  isPremium?: boolean;
  premiumLabel?: string;
  author?: {
    name: string;
    avatar: string;
    shortName?: string;
    timeAgo?: string;
  };
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
