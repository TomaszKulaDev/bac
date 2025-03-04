import { NewsArticle } from "../types/article";

// Kategorie artykułów
export enum ArticleCategory {
  FEATURED = "featured", // Główne artykuły w NewsGrid
  SECONDARY = "secondary", // Drugorzędne artykuły w NewsGrid
  SIDEBAR = "sidebar", // Artykuły w sidebarze NewsGrid
  RED_SECTION = "redSection", // Artykuły w OnetNewsRedSection
}

// Wszystkie artykuły w jednym źródle
export const articles: Record<string, NewsArticle> = {
  // ===== ARTYKUŁY Z NEWSGRID =====

  // Główne artykuły (featured)
  "nowe-trendy-bachata-2024": {
    id: "2",
    title:
      "Nowe trendy w bachacie na 2024 rok. Dominikańska tradycja wraca do łask",
    image:
      "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?q=80&w=1770&auto=format&fit=crop",
    slug: "nowe-trendy-bachata-2024",
    category: ArticleCategory.FEATURED,
  },
  "bachata-sensual-nowy-wymiar": {
    id: "3",
    title: "Bachata Sensual - nowy wymiar bliskości w tańcu. Jak zacząć?",
    image:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1770&auto=format&fit=crop",
    slug: "bachata-sensual-nowy-wymiar",
    author: {
      name: "Carlos Mendez",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg",
    },
    category: ArticleCategory.FEATURED,
  },

  // Artykuły drugorzędne (secondary)
  "festiwal-bachata-fusion-2024": {
    id: "5",
    title: "Festiwal Bachata Fusion 2024 - Zapisy otwarte do końca miesiąca",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1770&auto=format&fit=crop",
    slug: "festiwal-bachata-fusion-2024",
    author: {
      name: "Juan Perez",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    category: ArticleCategory.SECONDARY,
  },
  "romeo-santos-nowy-album": {
    id: "6",
    title:
      'Muzyka do bachaty - "Nowy album Romeo Santosa bije rekordy popularności"',
    image:
      "https://images.unsplash.com/photo-1535525153412-5a42439a210d?q=80&w=1770&auto=format&fit=crop",
    slug: "romeo-santos-nowy-album",
    category: ArticleCategory.SECONDARY,
  },
  "mistrzostwa-polski-bachata": {
    id: "7",
    title: "Mistrzostwa Polski w Bachacie - Zgłoszenia tylko do 15 czerwca",
    image:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1770&auto=format&fit=crop",
    slug: "mistrzostwa-polski-bachata",
    category: ArticleCategory.SECONDARY,
  },
  "bachata-moderna-fuzja": {
    id: "8",
    title: "Bachata Moderna - Fuzja stylów i nowe możliwości ekspresji",
    image:
      "https://images.unsplash.com/photo-1524117074681-31bd4de22ad3?q=80&w=1770&auto=format&fit=crop",
    slug: "bachata-moderna-fuzja",
    author: {
      name: "Ana Martinez",
      avatar: "https://randomuser.me/api/portraits/women/52.jpg",
    },
    category: ArticleCategory.SECONDARY,
  },
  "warsztaty-bachaty-online": {
    id: "9",
    title: "Warsztaty Bachaty Online - Nowa Era Nauki Tańca",
    image:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1770&auto=format&fit=crop",
    slug: "warsztaty-bachaty-online",
    category: ArticleCategory.SECONDARY,
  },
  "bachata-kluby-przewodnik": {
    id: "10",
    title: "Bachata w klubach - Przewodnik po najlepszych miejscówkach",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1770&auto=format&fit=crop",
    slug: "bachata-kluby-przewodnik",
    author: {
      name: "Miguel Torres",
      avatar: "https://randomuser.me/api/portraits/men/62.jpg",
    },
    category: ArticleCategory.SECONDARY,
  },

  // Artykuły w sidebarze
  "buty-do-bachaty-poradnik": {
    id: "s1",
    title: "Jak wybrać idealne buty do bachaty? Poradnik dla początkujących",
    image:
      "https://images.unsplash.com/photo-1535525153412-5a42439a210d?q=80&w=1770&auto=format&fit=crop",
    slug: "buty-do-bachaty-poradnik",
    category: ArticleCategory.SIDEBAR,
    sidebarCategory: "PORADY",
  },
  "top-szkoly-bachaty-polska": {
    id: "s2",
    title: "Top 5 szkół bachaty w Polsce według tancerzy",
    image: "",
    slug: "top-szkoly-bachaty-polska",
    category: ArticleCategory.SIDEBAR,
    sidebarCategory: "RANKING",
  },
  "bachata-w-parach-trend": {
    id: "s3",
    title: "Bachata w parach - nowy trend na parkietach całego świata",
    image: "",
    slug: "bachata-w-parach-trend",
    category: ArticleCategory.SIDEBAR,
    sidebarCategory: "TRENDY",
  },
  "historia-bachaty-fenomen": {
    id: "s4",
    title: "Historia bachaty - Od muzyki wiejskiej do światowego fenomenu",
    image: "",
    slug: "historia-bachaty-fenomen",
    category: ArticleCategory.SIDEBAR,
    sidebarCategory: "HISTORIA",
  },
  "social-dance-polska": {
    id: "s5",
    title: "Weekendowe social dance w największych miastach Polski",
    image: "",
    slug: "social-dance-polska",
    category: ArticleCategory.SIDEBAR,
    sidebarCategory: "WYDARZENIA",
  },
  "technika-bachaty-podstawy": {
    id: "s6",
    title: "Technika bachaty dla początkujących - od czego zacząć?",
    image: "",
    slug: "technika-bachaty-podstawy",
    category: ArticleCategory.SIDEBAR,
    sidebarCategory: "PORADY",
  },
  "muzyka-do-bachaty": {
    id: "s7",
    title: "Najlepsze utwory do nauki bachaty w 2024 roku",
    image: "",
    slug: "muzyka-do-bachaty",
    category: ArticleCategory.SIDEBAR,
    sidebarCategory: "MUZYKA",
  },
  "bachata-moderna": {
    id: "s8",
    title: "Bachata moderna - nowy styl podbijający parkiety",
    image: "",
    slug: "bachata-moderna",
    category: ArticleCategory.SIDEBAR,
    sidebarCategory: "TRENDY",
  },
  "warsztaty-bachaty-2024": {
    id: "s9",
    title: "Kalendarz warsztatów bachaty na rok 2024",
    image: "",
    slug: "warsztaty-bachaty-2024",
    category: ArticleCategory.SIDEBAR,
    sidebarCategory: "WYDARZENIA",
  },
  "bachata-styl-dominikanski": {
    id: "s10",
    title: "Styl dominikański vs sensual - poznaj różnice",
    image: "",
    slug: "bachata-styl-dominikanski",
    category: ArticleCategory.SIDEBAR,
    sidebarCategory: "EDUKACJA",
  },

  // ===== ARTYKUŁY Z ONET NEWS RED SECTION =====

  "bachata-sensual-techniki": {
    id: "r2",
    title: "Bachata Sensual - zaawansowane techniki i figury",
    image:
      "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=80&w=1770&auto=format&fit=crop",
    slug: "bachata-sensual-techniki",
    category: ArticleCategory.RED_SECTION,
    author: {
      name: "Maria Rodriguez",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    date: "2024-02-28",
    views: 987,
  },
  "bachata-festiwale-europa": {
    id: "r3",
    title: "Największe festiwale bachaty w Europie 2024",
    image:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1769&auto=format&fit=crop",
    slug: "bachata-festiwale-europa",
    category: ArticleCategory.RED_SECTION,
    author: {
      name: "Javier Lopez",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    date: "2024-02-25",
    views: 1532,
  },
  "bachata-muzyka-klasyka": {
    id: "r4",
    title: "Klasyka muzyki bachatowej - utwory, które musisz znać",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1770&auto=format&fit=crop",
    slug: "bachata-muzyka-klasyka",
    category: ArticleCategory.RED_SECTION,
    author: {
      name: "Carmen Diaz",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    },
    date: "2024-02-20",
    views: 876,
  },
  "bachata-polska-scena": {
    id: "r5",
    title: "Polska scena bachatowa - rozwój i perspektywy",
    image:
      "https://images.unsplash.com/photo-1551634979-2b11f8c946fe?q=80&w=1770&auto=format&fit=crop",
    slug: "bachata-polska-scena",
    category: ArticleCategory.RED_SECTION,
    author: {
      name: "Tomasz Kowalski",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    },
    date: "2024-02-15",
    views: 1123,
  },
};

// Pomocnicze funkcje do pobierania artykułów według kategorii
export const getArticlesByCategory = (
  category: ArticleCategory
): NewsArticle[] =>
  Object.values(articles).filter((article) => article.category === category);

export const getFeaturedArticles = (): NewsArticle[] =>
  getArticlesByCategory(ArticleCategory.FEATURED);

export const getSecondaryArticles = (): NewsArticle[] =>
  getArticlesByCategory(ArticleCategory.SECONDARY);

export const getSidebarArticles = (): NewsArticle[] =>
  getArticlesByCategory(ArticleCategory.SIDEBAR);

export const getRedSectionArticles = (): NewsArticle[] =>
  getArticlesByCategory(ArticleCategory.RED_SECTION);

// Funkcja do pobierania artykułu po slugu
export const getArticleBySlug = (slug: string): NewsArticle | undefined =>
  articles[slug];

// Dla zachowania kompatybilności z istniejącym kodem
export const featuredArticles = getFeaturedArticles();
export const secondaryArticles = getSecondaryArticles();
export const sidebarArticles = getSidebarArticles();
export const redSectionArticles = getRedSectionArticles();
