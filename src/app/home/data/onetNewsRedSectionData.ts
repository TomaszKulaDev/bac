import { NewsArticle } from "../types/article";

// Główny artykuł
export const mainArticle = {
  id: "main-1",
  title: 'Nowe trendy w bachacie na 2024 rok. "Rewolucja w technice"',
  image:
    "https://images.unsplash.com/photo-1545959570-a94084071b5d?q=80&w=1776&auto=format&fit=crop",
  slug: "nowe-trendy-w-bachacie",
  category: "TANIEC",
  author: {
    name: "Maria Rodriguez",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    timeAgo: "2 godz. temu",
  },
};

// Artykuły w prawej kolumnie
export const rightColumnArticles = [
  {
    id: "right-1",
    title:
      'Dominikańska bachata - powrót do korzeni. "Autentyczność ponad wszystko"',
    image:
      "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=80&w=1770&auto=format&fit=crop",
    slug: "dominikanska-bachata",
    isPremium: true,
    premiumLabel: "sprawdź",
    author: {
      name: "Carlos Mendez",
      avatar: "https://randomuser.me/api/portraits/men/44.jpg",
      shortName: "C. Mendez",
    },
  },
  {
    id: "right-2",
    title: "Bachata Sensual - nowy wymiar bliskości w tańcu",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1770&auto=format&fit=crop",
    slug: "bachata-sensual",
    author: {
      name: "Sofia Garcia",
      avatar: "https://randomuser.me/api/portraits/women/42.jpg",
      shortName: "S. Garcia",
    },
  },
];

// Artykuły w sekcji "SKRÓT WYDARZEŃ"
export const shortNewsArticles = [
  {
    id: "short-1",
    title:
      "Bachata Festiwal w Warszawie - największe wydarzenie roku już w maju",
    image:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1770&auto=format&fit=crop",
    slug: "bachata-festiwal-warszawa",
  },
  {
    id: "short-2",
    title:
      "Mistrzostwa Bachaty 2024 - polscy tancerze podbijają światowe podium",
    image:
      "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?q=80&w=1770&auto=format&fit=crop",
    slug: "mistrzostwa-bachaty",
  },
  {
    id: "short-3",
    title:
      "Bachata dla początkujących - jak zacząć przygodę z najpopularniejszym tańcem",
    image:
      "https://images.unsplash.com/photo-1545128485-c400ce7b23d5?q=80&w=1770&auto=format&fit=crop",
    slug: "bachata-dla-poczatkujacych",
  },
  {
    id: "short-4",
    title: "Muzyka do bachaty - nowe hity, które musisz znać w 2024 roku",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1770&auto=format&fit=crop",
    slug: "muzyka-do-bachaty",
  },
];

// Artykuły w dolnym rzędzie
export const bottomRowArticles = [
  {
    id: "bottom-1",
    title: 'Wywiad z mistrzem bachaty: "Taniec zmienił moje życie na zawsze"',
    image:
      "https://images.unsplash.com/photo-1535525153412-5a42439a210d?q=80&w=1770&auto=format&fit=crop",
    slug: "wywiad-mistrz-bachaty",
    author: "Juan Perez",
  },
  {
    id: "bottom-2",
    title:
      "Bachata w parach - jak osiągnąć idealną harmonię i zrozumienie na parkiecie",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1770&auto=format&fit=crop",
    slug: "bachata-w-parach-harmonia",
    author: "Marta Kowalska",
  },
  {
    id: "bottom-3",
    title:
      "Stroje do bachaty - co wybrać, aby czuć się komfortowo i wyglądać olśniewająco",
    image:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1769&auto=format&fit=crop",
    slug: "stroje-do-bachaty",
    author: "Anna Nowak",
  },
  {
    id: "bottom-4",
    title:
      "Bachata fusion - jak łączyć style taneczne i tworzyć unikalne choreografie",
    image:
      "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1774&auto=format&fit=crop",
    slug: "bachata-fusion-choreografie",
    author: "Piotr Wiśniewski",
  },
];
