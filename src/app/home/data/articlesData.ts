import { values } from "lodash";
import { NewsArticle, ArticleCategory } from "../types/article";

// Wszystkie artykuły w jednym źródle
export const articles: Record<string, NewsArticle> = {
  // ===== ARTYKUŁY Z NEWSGRID (BACHATA NA DZIŚ) =====
  "nowe-trendy-bachata-2024": {
    id: "1",
    title: "Nowe trendy w bachacie na 2024 rok - Co się zmienia w stylu tańca?",
    image:
      "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?q=80&w=1770&auto=format&fit=crop",
    slug: "nowe-trendy-bachata-2024",
    category: ArticleCategory.FEATURED,
  },
  "social-bachata-polska": {
    id: "2",
    title: "Social Bachata w Polsce - Gdzie potańczyć w 2024 roku?",
    image:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1770&auto=format&fit=crop",
    slug: "social-bachata-polska",
    category: ArticleCategory.FEATURED,
  },

  // Artykuły drugorzędne (secondary) dla BACHATA NA DZIŚ
  "festiwale-bachata-2024": {
    id: "3",
    title:
      "Kalendarz festiwali bachaty 2024 - Nie przegap najważniejszych wydarzeń",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1770",
    slug: "festiwale-bachata-2024",
    category: ArticleCategory.SECONDARY,
  },
  "muzyka-bachata-nowosci": {
    id: "4",
    title: "Nowe hity w bachacie - Przegląd najgorętszych utworów miesiąca",
    image:
      "https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=1770",
    slug: "muzyka-bachata-nowosci",
    category: ArticleCategory.SECONDARY,
  },
  "konkursy-bachata-polska": {
    id: "5",
    title: "Konkursy bachaty w Polsce - Harmonogram na najbliższe miesiące",
    image:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1770",
    slug: "konkursy-bachata-polska",
    category: ArticleCategory.SECONDARY,
  },

  // ===== ARTYKUŁY EDUKACYJNE (NAUKA) =====
  "podstawy-bachaty": {
    id: "e1",
    title: "Od czego zacząć naukę bachaty? Kompletny przewodnik",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1770",
    slug: "podstawy-bachaty",
    category: ArticleCategory.FEATURED,
  },
  "technika-prowadzenia": {
    id: "e2",
    title: "Technika prowadzenia w bachacie - Najważniejsze zasady",
    image:
      "https://images.unsplash.com/photo-1524117074681-31bd4de22ad3?w=1770",
    slug: "technika-prowadzenia",
    category: ArticleCategory.FEATURED,
  },
  "figury-dla-poczatkujacych": {
    id: "e3",
    title: "Top 10 figur dla początkujących w bachacie",
    image:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1770",
    slug: "figury-dla-poczatkujacych",
    category: ArticleCategory.SECONDARY,
  },
  "musicality-bachata": {
    id: "e4",
    title: "Muzyczność w bachacie - Jak tańczyć do rytmu?",
    image:
      "https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=1770",
    slug: "musicality-bachata",
    category: ArticleCategory.SECONDARY,
  },

  // ===== ARTYKUŁY O NAJLEPSZYCH TAŃCACH (TOP DANCE) =====
  "top-bachata-2024": {
    id: "v1",
    title: "Najlepsze występy bachaty 2024 - Top 10 pokazów",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1770",
    slug: "top-bachata-2024",
    category: ArticleCategory.FEATURED,
  },
  "mistrzowskie-pokazy": {
    id: "v2",
    title: "Mistrzowskie pokazy z World Bachata Masters 2024",
    image:
      "https://images.unsplash.com/photo-1524117074681-31bd4de22ad3?w=1770",
    slug: "mistrzowskie-pokazy",
    category: ArticleCategory.FEATURED,
  },
  "viral-bachata-videos": {
    id: "v3",
    title: "Viralowe filmy bachatowe tego miesiąca",
    image:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1770",
    slug: "viral-bachata-videos",
    category: ArticleCategory.SECONDARY,
  },
  "najlepsze-choreografie": {
    id: "v4",
    title: "Najlepsze choreografie bachaty 2024",
    image:
      "https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=1770",
    slug: "najlepsze-choreografie",
    category: ArticleCategory.SECONDARY,
  },

  // ===== ARTYKUŁY Z WYWIADÓW =====
  "wywiad-carla-viviani": {
    id: "i1",
    title:
      "Zouk i Bachata - wywiad z Carlą Viviani o łączeniu stylów tanecznych",
    slug: "zouk-bachata-wywiad-carla-viviani",
    image: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800",
    category: ArticleCategory.INTERVIEW_FEATURED,
  },
  "wywiad-daniel-desiree": {
    id: "i2",
    title: "Daniel y Desiree - o rozwoju bachaty sensual w Europie",
    slug: "daniel-desiree-rozwoj-bachaty-sensual",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
    category: ArticleCategory.INTERVIEW_FEATURED,
  },
  "wywiad-korke-judith": {
    id: "i3",
    title: "Korke i Judith - nasza droga do sukcesu w bachacie",
    slug: "korke-judith-droga-do-sukcesu",
    image: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=800",
    category: ArticleCategory.INTERVIEW_SECONDARY,
  },
  "wywiad-jorge-burgos": {
    id: "i4",
    title: "Jorge Burgos - o ewolucji bachaty dominikańskiej",
    slug: "jorge-burgos-ewolucja-bachaty",
    image: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800",
    category: ArticleCategory.INTERVIEW_SECONDARY,
  },
  "wywiad-marco-sara": {
    id: "i5",
    title: "Marco i Sara - jak stworzyliśmy własny styl w bachacie",
    slug: "marco-sara-wlasny-styl",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
    category: ArticleCategory.INTERVIEW_SECONDARY,
  },
  "wywiad-ataca-alemana": {
    id: "i6",
    title: "Ataca i La Alemana - o początkach kariery i planach na przyszłość",
    slug: "ataca-alemana-wywiad",
    image: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=800",
    category: ArticleCategory.INTERVIEW_SECONDARY,
  },
  "wywiad-ronald-alba": {
    id: "i7",
    title: "Ronald i Alba - jak prowadzić szkołę tańca z sukcesem",
    slug: "ronald-alba-szkola-tanca",
    image: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800",
    category: ArticleCategory.INTERVIEW_SECONDARY,
  },
  "wywiad-tony-lara": {
    id: "i8",
    title: "Tony Lara - o historii bachaty i jej współczesnym obliczu",
    slug: "tony-lara-historia-bachaty",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
    category: ArticleCategory.INTERVIEW_SECONDARY,
  },
  "wywiad-isabelle-felicien": {
    id: "i9",
    title: "Isabelle i Felicien - łączenie stylów w bachacie fusion",
    slug: "isabelle-felicien-bachata-fusion",
    image: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=800",
    category: ArticleCategory.INTERVIEW_SECONDARY,
  },
  "wywiad-daniel-poczatkujacy": {
    id: "i10",
    title: "Wywiad z Danielem: Od początkującego do mistrza bachaty",
    slug: "daniel-od-poczatkujacego-do-mistrza",
    image: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800",
    category: ArticleCategory.INTERVIEW_SIDEBAR,
  },
  "wywiad-desiree-kobiecosc": {
    id: "i11",
    title: "Rozmowa z Desirée o kobiecości w bachacie",
    slug: "desiree-kobiecosc-w-bachacie",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
    category: ArticleCategory.INTERVIEW_SIDEBAR,
  },

  // Artykuły w sidebarze dla każdej sekcji
  "sidebar-nowosci": {
    id: "s1",
    title: "Najnowsze trendy w bachacie dominikańskiej",
    image: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95",
    slug: "sidebar-nowosci",
    category: ArticleCategory.SIDEBAR,
    sidebarCategory: "TRENDY",
  },
  "sidebar-technika": {
    id: "s2",
    title: "5 ćwiczeń na poprawę techniki w bachacie",
    image: "https://images.unsplash.com/photo-1566224425427-998683bb171e",
    slug: "sidebar-technika",
    category: ArticleCategory.SIDEBAR,
    sidebarCategory: "NAUKA",
  },
  "sidebar-pokazy": {
    id: "s3",
    title: "Najlepsze pokazy z BachatArt Festival",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7",
    slug: "sidebar-pokazy",
    category: ArticleCategory.SIDEBAR,
    sidebarCategory: "POKAZY",
  },
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

// Dodaj nowe funkcje pomocnicze
export const interviewFeaturedArticles = getArticlesByCategory(
  ArticleCategory.INTERVIEW_FEATURED
);
export const interviewSecondaryArticles = getArticlesByCategory(
  ArticleCategory.INTERVIEW_SECONDARY
);
export const interviewSidebarArticles = getArticlesByCategory(
  ArticleCategory.INTERVIEW_SIDEBAR
);

// Funkcja do pobierania artykułu po slugu (używana w routingu)
export const getArticleBySlug = (slug: string): NewsArticle | undefined =>
  articles[slug];

// Dodajemy nowy interfejs dla wiadomości informacyjnych
export interface InfoMessage {
  id: string;
  type: "info" | "announcement" | "event" | "promo";
  content: string;
  link?: string;
  date?: string;
  isNew?: boolean;
  expiresAt?: string; // Format: "YYYY-MM-DD" - data po której wiadomość nie będzie wyświetlana
}

// Dodajemy dane dla paska informacyjnego
// UWAGA: Pole expiresAt określa datę wygaśnięcia wiadomości w formacie "YYYY-MM-DD"
// Wiadomości z datą wygaśnięcia wcześniejszą niż dzisiejsza nie będą wyświetlane
// Aby wiadomość była zawsze widoczna, można usunąć pole expiresAt lub ustawić odległą datę

// Kolory dla typów wiadomości:
// - announcement: żółty (#ffd200) - dla ważnych ogłoszeń i nowości
// - event: niebieski (blue-500) - dla wydarzeń i warsztatów
// - promo: gradient fioletowo-różowy (purple-500 to pink-500) - dla promocji i ofert specjalnych
// - info (default): ciemny szary (gray-800) - dla standardowych informacji

export const infoMessages: InfoMessage[] = [
  {
    id: "1",
    type: "announcement",
    content: "Nowe kursy bachaty - zapisz się już dziś i otrzymaj 15% zniżki!",
    link: "/kursy",
    isNew: true,
    expiresAt: "2025-12-31", // Wygasa z końcem 2025 roku
  },
  {
    id: "2",
    type: "event",
    content: "Wielki Festiwal Bachaty 2025 - Early Birds do 1 czerwca",
    link: "/festiwal-2025",
    date: "15-17 sierpnia 2025",
    expiresAt: "2025-12-01", // Wygasa po zakończeniu festiwalu
  },
  {
    id: "3",
    type: "info",
    content: "Aktualizacja harmonogramu praktyk na czerwiec już dostępna",
    link: "/praktyki",
    expiresAt: "2025-07-01", // Wygasa po czerwcu
  },
  {
    id: "4",
    type: "promo",
    content: "Warsztaty Lady Styling z Carlą Viviani - zapisz się już dziś!",
    link: "/promocje/bachata-masters",
    expiresAt: "2025-07-15", // Wygasa po zakończeniu promocji
  },
  {
    id: "5",
    type: "event",
    content: "Warsztaty z Korke i Judith w Warszawie - ostatnie miejsca",
    link: "/warsztaty/korke-judith",
    date: "24-25 czerwca 2024",
    isNew: true,
    expiresAt: "2024-06-25", // Wygasa po zakończeniu warsztatów
  },
  {
    id: "6",
    type: "info",
    content: "Nowy ranking szkół bachaty w Polsce - sprawdź wyniki",
    link: "/ranking-szkol",
    expiresAt: "2025-01-15", // Wygasa po pewnym czasie od publikacji
  },
  {
    id: "7",
    type: "announcement",
    content: "Subskrybuj newsletter i otrzymaj darmowy e-book o bachacie",
    link: "/newsletter",
    expiresAt: "2025-12-31", // Długoterminowa promocja
  },
];
