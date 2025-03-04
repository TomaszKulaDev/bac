import { NewsArticle } from "../types/article";

// Przykładowe dane artykułów o bachacie
export const featuredArticles: NewsArticle[] = [
  {
    id: "1",
    title:
      "a1 Światowy Kongres Bachaty 2024 - Największe wydarzenie roku już w czerwcu",
    image:
      "https://images.unsplash.com/photo-1545128485-c400ce7b23d5?q=80&w=1770&auto=format&fit=crop",
    slug: "swiatowy-kongres-bachaty-2024",
    author: {
      name: "Maria Rodriguez",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    },
  },
  {
    id: "2",
    title:
      "a2 Nowe trendy w bachacie na 2024 rok. Dominikańska tradycja wraca do łask",
    image:
      "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?q=80&w=1770&auto=format&fit=crop",
    slug: "nowe-trendy-bachata-2024",
  },
  {
    id: "3",
    title: "a3 Bachata Sensual - nowy wymiar bliskości w tańcu. Jak zacząć?",
    image:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1770&auto=format&fit=crop",
    slug: "bachata-sensual-nowy-wymiar",
    author: {
      name: "Carlos Mendez",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg",
    },
  },
];

export const secondaryArticles: NewsArticle[] = [

  {
    id: "5",
    title: "a5 Festiwal Bachata Fusion 2024 - Zapisy otwarte do końca miesiąca",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1770&auto=format&fit=crop",
    slug: "festiwal-bachata-fusion-2024",
    author: {
      name: "Juan Perez",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    },
  },
  {
    id: "6",
    title:
      'a6 Muzyka do bachaty - "Nowy album Romeo Santosa bije rekordy popularności"',
    image:
      "https://images.unsplash.com/photo-1535525153412-5a42439a210d?q=80&w=1770&auto=format&fit=crop",
    slug: "romeo-santos-nowy-album",
  },
  {
    id: "7",
    title: "a7 Mistrzostwa Polski w Bachacie - Zgłoszenia tylko do 15 czerwca",
    image:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1770&auto=format&fit=crop",
    slug: "mistrzostwa-polski-bachata",
  },
  {
    id: "8",
    title: "a8 Bachata Moderna - Fuzja stylów i nowe możliwości ekspresji",
    image:
      "https://images.unsplash.com/photo-1524117074681-31bd4de22ad3?q=80&w=1770&auto=format&fit=crop",
    slug: "bachata-moderna-fuzja",
    author: {
      name: "Ana Martinez",
      avatar: "https://randomuser.me/api/portraits/women/52.jpg",
    },
  },
  {
    id: "9",
    title: "a9 Warsztaty Bachaty Online - Nowa Era Nauki Tańca",
    image:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1770&auto=format&fit=crop",
    slug: "warsztaty-bachaty-online",
  },
  {
    id: "10",
    title: "a10 Bachata w klubach - Przewodnik po najlepszych miejscówkach",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1770&auto=format&fit=crop",
    slug: "bachata-kluby-przewodnik",
    author: {
      name: "Miguel Torres",
      avatar: "https://randomuser.me/api/portraits/men/62.jpg",
    },
  },
];

export const sidebarArticles: NewsArticle[] = [
  {
    id: "1",
    title: "Jak wybrać idealne buty do bachaty? Poradnik dla początkujących",
    image:
      "https://images.unsplash.com/photo-1535525153412-5a42439a210d?q=80&w=1770&auto=format&fit=crop",
    slug: "buty-do-bachaty-poradnik",
    category: "PORADY",
  },
  {
    id: "2",
    title: "Top 5 szkół bachaty w Polsce według tancerzy",
    image: "",
    slug: "top-szkoly-bachaty-polska",
    category: "RANKING",
  },
  {
    id: "3",
    title: "Bachata w parach - nowy trend na parkietach całego świata",
    image: "",
    slug: "bachata-w-parach-trend",
    category: "TRENDY",
  },
  {
    id: "4",
    title: "Historia bachaty - Od muzyki wiejskiej do światowego fenomenu",
    image: "",
    slug: "historia-bachaty-fenomen",
    category: "HISTORIA",
  },
  {
    id: "5",
    title: "Weekendowe social dance w największych miastach Polski",
    image: "",
    slug: "social-dance-polska",
    category: "WYDARZENIA",
  },
  {
    id: "6",
    title: "Technika prowadzenia w bachacie - Warsztaty dla mężczyzn",
    image: "",
    slug: "technika-prowadzenia-warsztaty",
    category: "KURSY",
  },
  {
    id: "7",
    title: "Jak znaleźć partnera do bachaty? Porady dla solistów",
    image: "",
    slug: "partner-do-bachaty-porady",
    category: "PORADY",
  },
  {
    id: "8",
    title: "Polscy instruktorzy na międzynarodowych festiwalach",
    image: "",
    slug: "polscy-instruktorzy-festiwale",
    category: "LUDZIE",
  },
  {
    id: "9",
    title: "Bachata Moderna - Nowy styl podbija polskie parkiety",
    image: "",
    slug: "bachata-moderna-nowy-styl",
    category: "STYLE",
  },
  {
    id: "10",
    title: "KALENDARZ FESTIWALI BACHATY 2024 - POLSKA I EUROPA",
    image: "",
    slug: "kalendarz-festiwali-2024",
    category: "WYDARZENIA",
  },
  {
    id: "11",
    title: "Bachata Fusion - Łączenie stylów na parkiecie",
    image: "",
    slug: "bachata-fusion-style",
    category: "STYLE",
  },
  {
    id: "12",
    title: "Jak przygotować się do pierwszych zawodów bachaty?",
    image: "",
    slug: "przygotowanie-zawody-bachata", 
    category: "PORADY",
  },
  {
    id: "13",
    title: "TOP 10 piosenek do bachaty na 2024 rok",
    image: "",
    slug: "top-piosenki-bachata-2024",
    category: "MUZYKA",
  },
  {
    id: "14",
    title: "Warsztaty bachaty dla początkujących - od czego zacząć?",
    image: "",
    slug: "warsztaty-bachata-poczatkujacy",
    category: "KURSY",
  },
  {
    id: "15", 
    title: "Najlepsze miejsca do tańczenia bachaty w Polsce",
    image: "",
    slug: "najlepsze-miejsca-bachata",
    category: "MIEJSCA",
  },
  {
    id: "16",
    title: "Jak wybrać odpowiednią szkołę bachaty?",
    image: "",
    slug: "wybor-szkoly-bachaty",
    category: "PORADY",
  },
  {
    id: "17",
    title: "Bachata Dominican Style - powrót do korzeni",
    image: "",
    slug: "bachata-dominican-style",
    category: "STYLE",
  },
];
