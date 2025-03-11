import { NewsArticle, ArticleCategory } from "../types/article";

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
      "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    slug: "buty-do-bachaty-poradnik",
    category: ArticleCategory.SIDEBAR,
    sidebarCategory: "PORADY",
  },
  "top-szkoly-bachaty-polska": {
    id: "s2",
    title: "Top 5 szkół bachaty w Polsce według tancerzy",
    image:
      "https://images.unsplash.com/photo-1566224425427-998683bb171e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    slug: "top-szkoly-bachaty-polska",
    category: ArticleCategory.SIDEBAR,
    sidebarCategory: "RANKING",
  },
  "bachata-w-parach-trend": {
    id: "s3",
    title: "Bachata w parach - nowy trend na parkietach całego świata",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    slug: "bachata-w-parach-trend",
    category: ArticleCategory.SIDEBAR,
    sidebarCategory: "TRENDY",
  },
  "historia-bachaty-fenomen": {
    id: "s4",
    title: "Historia bachaty - Od muzyki wiejskiej do światowego fenomenu",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    slug: "historia-bachaty-fenomen",
    category: ArticleCategory.SIDEBAR,
    sidebarCategory: "HISTORIA",
  },
  "social-dance-polska": {
    id: "s5",
    title: "Weekendowe social dance w największych miastach Polski",
    image:
      "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    slug: "social-dance-polska",
    category: ArticleCategory.SIDEBAR,
    sidebarCategory: "WYDARZENIA",
  },
  "technika-bachaty-podstawy": {
    id: "s6",
    title: "Technika bachaty dla początkujących - od czego zacząć?",
    image:
      "https://images.unsplash.com/photo-1545128485-c400ce7b6892?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    slug: "technika-bachaty-podstawy",
    category: ArticleCategory.SIDEBAR,
    sidebarCategory: "PORADY",
  },
  "muzyka-do-bachaty": {
    id: "s7",
    title: "Najlepsze utwory do nauki bachaty w 2024 roku",
    image:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    slug: "muzyka-do-bachaty",
    category: ArticleCategory.SIDEBAR,
    sidebarCategory: "MUZYKA",
  },
  "bachata-moderna": {
    id: "s8",
    title: "Bachata moderna - nowy styl podbijający parkiety",
    image:
      "https://images.unsplash.com/photo-1524117074681-31bd4de22ad3?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    slug: "bachata-moderna",
    category: ArticleCategory.SIDEBAR,
    sidebarCategory: "TRENDY",
  },
  "warsztaty-bachaty-2024": {
    id: "s9",
    title: "Kalendarz warsztatów bachaty na rok 2024",
    image:
      "https://images.unsplash.com/photo-1547153760-18fc86324498?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    slug: "warsztaty-bachaty-2024",
    category: ArticleCategory.SIDEBAR,
    sidebarCategory: "WYDARZENIA",
  },
  "bachata-styl-dominikanski": {
    id: "s10",
    title: "Styl dominikański vs sensual - poznaj różnice",
    image:
      "https://images.unsplash.com/photo-1544717684-1243da23b545?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    slug: "bachata-styl-dominikanski",
    category: ArticleCategory.SIDEBAR,
    sidebarCategory: "EDUKACJA",
  },
};

// Podstawowe funkcje pomocnicze
const getArticlesByCategory = (category: ArticleCategory): NewsArticle[] =>
  Object.values(articles).filter((article) => article.category === category);

// Eksportowane funkcje używane w komponentach
export const featuredArticles = getArticlesByCategory(ArticleCategory.FEATURED);
export const secondaryArticles = getArticlesByCategory(
  ArticleCategory.SECONDARY
);
export const sidebarArticles = getArticlesByCategory(ArticleCategory.SIDEBAR);

// Funkcja do pobierania artykułu po slugu (używana w routingu)
export const getArticleBySlug = (slug: string): NewsArticle | undefined =>
  articles[slug];
