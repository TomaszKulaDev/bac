import { NewsArticle } from "../types/article";

// Przykładowe dane artykułów o bachacie
export const featuredArticles: NewsArticle[] = [
  {
    id: "1",
    title:
      "Światowy Kongres Bachaty 2024 - Największe wydarzenie roku już w czerwcu",
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
      "Nowe trendy w bachacie na 2024 rok. Dominikańska tradycja wraca do łask",
    image:
      "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?q=80&w=1770&auto=format&fit=crop",
    slug: "nowe-trendy-bachata-2024",
  },
  {
    id: "3",
    title: "Bachata Sensual - nowy wymiar bliskości w tańcu. Jak zacząć?",
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
    id: "4",
    title:
      "Mistrzowie bachaty z Dominikany przyjeżdżają do Polski na warsztaty",
    image:
      "https://images.unsplash.com/photo-1546805022-9f8c92733b86?q=80&w=1770&auto=format&fit=crop",
    slug: "mistrzowie-bachaty-warsztaty",
    author: {
      name: "Sofia Garcia",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    },
  },
  {
    id: "5",
    title: "Festiwal Bachata Fusion 2024 - Zapisy otwarte do końca miesiąca",
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
      'Muzyka do bachaty - "Nowy album Romeo Santosa bije rekordy popularności"',
    image:
      "https://images.unsplash.com/photo-1535525153412-5a42439a210d?q=80&w=1770&auto=format&fit=crop",
    slug: "romeo-santos-nowy-album",
  },
  {
    id: "7",
    title: "Mistrzostwa Polski w Bachacie - Zgłoszenia tylko do 15 czerwca",
    image:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1770&auto=format&fit=crop",
    slug: "mistrzostwa-polski-bachata",
  },
];

export const videoArticles: NewsArticle[] = [
  {
    id: "8",
    title: "Warsztaty online z mistrzami bachaty - Nowa seria lekcji",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1770&auto=format&fit=crop",
    slug: "warsztaty-online-bachata",
    hasVideo: true,
  },
  {
    id: "9",
    title: "Bachata Sensual vs Dominicana - Różnice w technice i stylu",
    image:
      "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?q=80&w=1770&auto=format&fit=crop",
    slug: "bachata-sensual-dominicana-roznice",
    hasVideo: true,
  },
  {
    id: "10",
    title: "Pokaz mistrzowski Daniel i Desiree na festiwalu w Krakowie",
    image:
      "https://images.unsplash.com/photo-1545128485-c400ce7b23d5?q=80&w=1770&auto=format&fit=crop",
    slug: "pokaz-daniel-desiree-krakow",
    hasVideo: true,
  },
  {
    id: "11",
    title: "Ćwiczenia rozciągające dla tancerzy bachaty - Seria wideo",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1770&auto=format&fit=crop",
    slug: "cwiczenia-rozciagajace-bachata",
    hasVideo: true,
  },
];

export const sidebarArticles: NewsArticle[] = [
  {
    id: "12",
    title: "Jak wybrać idealne buty do bachaty? Poradnik dla początkujących",
    image:
      "https://images.unsplash.com/photo-1535525153412-5a42439a210d?q=80&w=1770&auto=format&fit=crop",
    slug: "buty-do-bachaty-poradnik",
    category: "PORADY",
  },
  {
    id: "13",
    title: "Top 5 szkół bachaty w Polsce według tancerzy",
    image: "",
    slug: "top-szkoly-bachaty-polska",
    category: "RANKING",
  },
  {
    id: "14",
    title: "Bachata w parach - nowy trend na parkietach całego świata",
    image: "",
    slug: "bachata-w-parach-trend",
    category: "TRENDY",
  },
  {
    id: "15",
    title: "Historia bachaty - Od muzyki wiejskiej do światowego fenomenu",
    image: "",
    slug: "historia-bachaty-fenomen",
    category: "HISTORIA",
  },
  {
    id: "16",
    title: "Weekendowe social dance w największych miastach Polski",
    image: "",
    slug: "social-dance-polska",
    category: "WYDARZENIA",
  },
  {
    id: "17",
    title: "Technika prowadzenia w bachacie - Warsztaty dla mężczyzn",
    image: "",
    slug: "technika-prowadzenia-warsztaty",
    category: "KURSY",
  },
  {
    id: "18",
    title: "Jak znaleźć partnera do bachaty? Porady dla solistów",
    image: "",
    slug: "partner-do-bachaty-porady",
    category: "PORADY",
  },
  {
    id: "19",
    title: "Polscy instruktorzy na międzynarodowych festiwalach",
    image: "",
    slug: "polscy-instruktorzy-festiwale",
    category: "LUDZIE",
  },
  {
    id: "20",
    title: "Bachata Moderna - Nowy styl podbija polskie parkiety",
    image: "",
    slug: "bachata-moderna-nowy-styl",
    category: "STYLE",
  },
  {
    id: "21",
    title: "KALENDARZ FESTIWALI BACHATY 2024 - POLSKA I EUROPA",
    image: "",
    slug: "kalendarz-festiwali-2024",
    category: "WYDARZENIA",
  },
  {
    id: "22",
    title: "Bachata Fusion - Łączenie stylów na parkiecie",
    image: "",
    slug: "bachata-fusion-style",
    category: "STYLE",
  },
  {
    id: "23",
    title: "Jak przygotować się do pierwszych zawodów bachaty?",
    image: "",
    slug: "przygotowanie-zawody-bachata",
    category: "PORADY",
  },
  {
    id: "24",
    title: "TOP 10 piosenek do bachaty na 2024 rok",
    image: "",
    slug: "top-piosenki-bachata-2024",
    category: "MUZYKA",
  },
  {
    id: "25",
    title: "Warsztaty bachaty dla początkujących - od czego zacząć?",
    image: "",
    slug: "warsztaty-bachata-poczatkujacy",
    category: "KURSY",
  },
];

export const lastSidebarArticle = {
  id: "last",
  title: "Poland Bachata League - Nowa edycja konkursu dla tancerzy amatorów",
  image: "",
  slug: "poland-bachata-league-konkurs",
  category: "KONKURSY",
};
