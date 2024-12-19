"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaEye, FaRegClock, FaShare } from "react-icons/fa";

// Uproszczony interfejs bez elementów społecznościowych
interface NewsItem {
  id: string;
  title: string;
  image: string;
  isHot?: boolean;
  category: string;
}

const newsData: NewsItem[] = [
  {
    id: "1",
    title:
      "Światowy Festiwal Bachaty 2024 - Największe wydarzenie roku już w czerwcu w Warszawie",
    image: "/images/bachata-festival.jpg",
    category: "Wydarzenia",
  },
  {
    id: "2",
    title: "Daniel i Maya zdobywają mistrzostwo świata w bachacie sensual",
    image: "/images/bachata-couple.jpg",
    isHot: true,
    category: "Zawody",
  },
  {
    id: "3",
    title: "Bachata Romance - nowy kierunek w bachacie tradycyjnej",
    image: "/images/bachata-romance.jpg",
    category: "Style",
  },
  {
    id: "4",
    title: "Top 10 szkół bachaty w Polsce - gdzie warto zacząć?",
    image: "/images/bachata-schools.jpg",
    category: "Edukacja",
  },
  {
    id: "5",
    title: "Podstawowe kroki bachaty - przewodnik dla początkujących",
    image: "/images/bachata-steps.jpg",
    category: "Nauka",
  },
  {
    id: "6",
    title: "Co założyć na imprezę bachatową? Kompletny przewodnik",
    image: "/images/bachata-outfit.jpg",
    category: "Lifestyle",
  },
  {
    id: "7",
    title: "Top 20 piosenek bachatowych 2024 roku",
    image: "/images/bachata-songs.jpg",
    category: "Muzyka",
  },
  {
    id: "8",
    title: "Historia bachaty - od dominikańskich korzeni po światową scenę",
    image: "/images/bachata-history.jpg",
    category: "Historia",
  },
  {
    id: "9",
    title: "Najlepsze festiwale bachaty w Europie 2024",
    image: "/images/bachata-festivals-europe.jpg",
    category: "Wydarzenia",
  },
  {
    id: "10",
    title: "Technika prowadzenia w bachacie - wskazówki dla zaawansowanych",
    image: "/images/bachata-leading.jpg",
    category: "Technika",
  },
  {
    id: "11",
    title: "Muzyka bachatowa - jak rozpoznać style i rytmy",
    image: "/images/bachata-music-styles.jpg",
    category: "Muzyka",
  },
  {
    id: "12",
    title: "Bachata fusion - łączenie stylów i nowe trendy",
    image: "/images/bachata-history.jpg",
    category: "Style",
  },
  {
    id: "13",
    title: "Nowe trendy w bachacie na 2024 rok. Co się zmieni w technice?",
    image: "/images/bachata-trends.jpg",
    category: "Technika",
  },
  {
    id: "14",
    title: "Mistrzostwa Polski w Bachacie - zapisy już otwarte",
    image: "/images/bachata-championship.jpg",
    category: "Zawody",
  },
  {
    id: "15",
    title: "Dominikańscy instruktorzy prowadzą warsztaty w Polsce",
    image: "/images/bachata-workshop.jpg",
    category: "Edukacja",
  },
  {
    id: "16",
    title: "Jak przygotować się do pierwszych zawodów bachaty?",
    image: "/images/bachata-preparation.jpg",
    category: "Nauka",
  },
  {
    id: "17",
    title: "10 najlepszych szkół bachaty w Polsce - ranking 2024",
    image: "/images/bachata-schools.jpg",
    category: "Edukacja",
  },
  {
    id: "18",
    title: "Bachata dla początkujących - od czego zacząć?",
    image: "/images/bachata-beginners.jpg",
    category: "Nauka",
  },
  {
    id: "19",
    title: "Trening mentalny w bachacie - jak pokonać stres przed występem",
    image: "/images/bachata-mental.jpg",
    category: "Rozwój",
  },
];

// Dodajemy stałą dla linków nawigacyjnych
const NAVIGATION_LINKS = [
  { href: "/wydarzenia", label: "Wydarzenia" },
  { href: "/zawody", label: "Zawody" },
  { href: "/style", label: "Style" },
  { href: "/edukacja", label: "Edukacja" },
  { href: "/muzyka", label: "Muzyka" },
] as const;

// Definicja typu dla liczników komentarzy
type CommentCountsType = {
  main: number;
  secondary: Record<string, number>;
};

// Zdefiniowanie stałej z poprawnym typowaniem
const COMMENT_COUNTS: CommentCountsType = {
  main: 328,
  secondary: {
    "1": 245,
    "2": 187,
    "3": 222,
    "4": 156,
    "5": 198,
    "6": 267,
    "7": 312,
    "8": 178,
    "9": 234,
    "10": 289,
    "11": 167,
    "12": 298,
    "13": 345,
    "14": 156,
    "15": 234,
    "16": 189,
    "17": 467,
    "18": 145,
    "19": 178,
    "20": 389,
  },
};

// Uproszczony komponent dla artykułu
const ArticleListItem = ({ news }: { news: NewsItem }) => {
  return (
    <Link href={`/news/${news.id}`} className="group block">
      <div className="flex gap-5 group-hover:bg-gray-50 p-2 -mx-2 rounded-lg transition-colors">
        {/* Miniatura */}
        <div className="relative w-[180px] h-[120px] flex-shrink-0 overflow-hidden rounded-sm">
          <Image
            src={news.image}
            alt={news.title}
            fill
            sizes="180px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {news.isHot && (
            <div className="absolute top-2 left-2">
              <span className="bg-red-500 text-white px-2 py-0.5 text-[11px] font-medium">
                Hot
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="pt-1 flex-1">
          <h2 className="font-bold text-[15px] leading-tight mb-3 group-hover:text-gray-900 transition-colors">
            {news.title}
          </h2>
        </div>
      </div>
    </Link>
  );
};

// Interfejs dla najnowszych wiadomości
interface LatestNews {
  id: string;
  time: string;
  title: string;
  category: string;
  categoryColor?: string;
}

// Dane najnowszych wiadomości
const latestNewsData: LatestNews[] = [
  {
    id: "1",
    time: "22:34",
    title:
      "Światowi instruktorzy bachaty przybywają do Warszawy na BachatArt Festival",
    category: "WYDARZENIA",
    categoryColor: "text-blue-600",
  },
  {
    id: "2",
    time: "22:25",
    title: "Nowe zasady na World Bachata Masters 2024. Kontrowersyjna decyzja",
    category: "ZAWODY",
    categoryColor: "text-orange-600",
  },
  {
    id: "3",
    time: "22:14",
    title: "Romeo Santos zapowiada nowy album. 'To powrót do korzeni bachaty'",
    category: "MUZYKA",
    categoryColor: "text-purple-600",
  },
  {
    id: "4",
    time: "22:06",
    title:
      "Dominikańska technika vs styl europejski. Gorąca debata w świecie bachaty",
    category: "STYL",
    categoryColor: "text-green-600",
  },
];

// Dodajmy nowy interfejs dla tematów
interface TopicItem {
  id: string;
  title: string;
  category?: string;
  isHighlighted?: boolean;
}

// Modyfikacja listy tematów z dodatkowymi kategoriami
const topicsList: TopicItem[] = [
  {
    id: "1",
    title: "Światowy Festiwal Bachaty ogłasza nowe gwiazdy. Lista instruktorów",
    isHighlighted: true,
  },
  {
    id: "2",
    title: "Rosjanie zachwyceni bachatą. Nowy trend w Moskwie",
    category: "ŚWIAT",
  },
  {
    id: "3",
    title:
      "Dominikańscy tancerze zdziwieni europejskim stylem. Komentują technikę",
    category: "STYL",
  },
  {
    id: "4",
    title: '"Bachata to nowe tango". Eksperci przewidują boom na styl',
    category: "TRENDY",
  },
  {
    id: "5",
    title: 'Romeo Santos publikuje nowy teledysk. "To powrót do korzeni"',
    category: "MUZYKA",
  },
  {
    id: "6",
    title: '"Współczesna bachata czci tradycję". Mocne słowa po festiwalu',
    category: "WYDARZENIA",
  },
  {
    id: "7",
    category: "ŚWIAT",
    title:
      "Duński styl bije na alarm. Wskazuje na ryzyko utraty autentyczności",
  },
  {
    id: "8",
    title: "Nowa szkoła bachaty otworzona na osiedlu. Tłumy na otwarciu",
    category: "POLSKA",
  },
  {
    id: "9",
    title: "Kanada ugina się pod wpływem bachaty. Ogłaszają zmiany",
    category: "ŚWIAT",
  },
  {
    id: "10",
    category: "ŚWIAT",
    title:
      "Sensual vs Dominicana. Która wersja lepsza? Eksperci nie mają wątpliwości",
  },
];

// Dodajmy nowy interfejs dla gorących tematów
interface HotTopic {
  id: string;
  title: string;
  image: string;
  commentsCount: number;
}

// Dane dla gorących tematów
const hotTopics: HotTopic[] = [
  {
    id: "1",
    title:
      'Daniel i Maya ZDOBYWAJĄ ZŁOTO na Mistrzostwach Świata w Bachacie: "Trenowali dzień i noc przez rok"',
    image: "/images/bachata-couple.jpg",
    commentsCount: 422,
  },
  {
    id: "2",
    title:
      'Instruktorzy z Dominikany i Europy "wymienili się technikami i połączyli style". Powstał nowy trend',
    image: "/images/bachata-fusion.jpg",
    commentsCount: 584,
  },
];

export default function Home() {
  // Stan dla interakcji użytkownika z useMemo dla stabilnych wartości początkowych
  const [isClient, setIsClient] = useState(false);

  // Inicjalizacja stanu po stronie klienta
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Pasek najnowszych wiadomości */}
      <div className="bg-[#f5f5f5] border-b border-gray-200">
        <div className="max-w-[1530px] mx-auto flex items-stretch">
          {/* Sekcja NAJNOWSZE */}
          <div className="flex items-center border-r border-gray-200">
            <div className="px-4 py-2 flex items-center gap-2">
              <span className="text-red-600 font-bold text-sm tracking-wide">
                NAJNOWSZE
              </span>
              <button className="w-6 h-6 flex items-center justify-center hover:bg-gray-200 rounded-full transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Sekcja z przewijającymi się wiadomościami */}
          <div className="flex-1 relative overflow-hidden">
            <div className="animate-marquee flex items-stretch">
              {latestNewsData.map((news) => (
                <Link
                  key={news.id}
                  href={`/news/${news.id}`}
                  className="flex items-center min-w-max border-r border-gray-200 group"
                >
                  <div className="px-4 py-2 flex items-center gap-3">
                    <span className="text-red-600 font-bold text-sm">
                      {news.time}
                    </span>
                    <span className="text-sm text-gray-900 group-hover:text-gray-900">
                      {news.title}
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        news.categoryColor || "text-gray-500"
                      }`}
                    >
                      {news.category}
                    </span>
                  </div>
                </Link>
              ))}
              {/* Duplikacja dla płynnego przewijania */}
              {latestNewsData.map((news) => (
                <Link
                  key={`dup-${news.id}`}
                  href={`/news/${news.id}`}
                  className="flex items-center min-w-max border-r border-gray-200 group"
                >
                  <div className="px-4 py-2 flex items-center gap-3">
                    <span className="text-red-600 font-bold text-sm">
                      {news.time}
                    </span>
                    <span className="text-sm text-gray-900 group-hover:text-gray-900">
                      {news.title}
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        news.categoryColor || "text-gray-500"
                      }`}
                    >
                      {news.category}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Przycisk następny */}
          <div className="border-l border-gray-200">
            <button className="h-full px-4 hover:bg-gray-200 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Header z rozwiniętym systemem kategorii */}
      <div className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="bg-blue-800 rounded-full w-[42px] h-[42px] flex items-center justify-center shadow-sm">
                <span className="font-bold text-white text-[13px] leading-none">
                  INFO
                </span>
              </div>
              <span className="font-bold text-[13px] tracking-wider text-gray-900">
                PARKIET
              </span>
            </div>

            {/* Statyczne linki nawigacyjne */}
            <nav className="flex gap-2">
              {NAVIGATION_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 rounded-full transition-all duration-200
                    text-gray-600 hover:bg-gray-100 hover:text-gray-900
                    text-[13px] font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Lewa strona - główne newsy */}
          <div className="w-[65%]">
            {/* Górna sekcja - główny news + 2 mniejsze */}
            <div className="flex gap-4 mb-4">
              {/* Główny news */}
              <div className="w-[60%]">
                <Link href={`/news/${newsData[0].id}`} className="group block">
                  <div className="relative h-[320px] overflow-hidden">
                    <Image
                      src={newsData[0].image}
                      alt={newsData[0].title}
                      fill
                      priority
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full overflow-hidden">
                          <Image
                            src="/images/author.jpg"
                            alt="Author"
                            width={24}
                            height={24}
                          />
                        </div>
                        <span className="text-white text-xs">
                          Dawid Serafin
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-white">
                        {newsData[0].title}
                      </h2>
                    </div>
                  </div>
                </Link>
              </div>

              {/* 2 mniejsze newsy obok głównego */}
              <div className="w-[40%] space-y-4">
                {newsData.slice(1, 3).map((news) => (
                  <Link
                    href={`/news/${news.id}`}
                    key={news.id}
                    className="group block"
                  >
                    <div className="relative h-[150px] overflow-hidden">
                      <Image
                        src={news.image}
                        alt={news.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                        <h3 className="text-sm font-bold text-white">
                          {news.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Dolna sekcja - 3 równe newsy */}
            <div className="grid grid-cols-3 gap-4">
              {newsData.slice(3, 6).map((news) => (
                <Link
                  href={`/news/${news.id}`}
                  key={news.id}
                  className="group block"
                >
                  <div className="relative h-[140px] overflow-hidden">
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-xs font-bold text-white">
                        {news.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Środkowa kolumna - newsy z liczbami */}
          <div className="w-[15%]">
            <div className="space-y-4">
              {hotTopics.map((topic) => (
                <Link
                  href={`/news/${topic.id}`}
                  key={topic.id}
                  className="group block"
                >
                  <div className="relative">
                    <div className="relative h-[120px] overflow-hidden">
                      <Image
                        src={topic.image}
                        alt={topic.title}
                        fill
                        sizes="15vw"
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-white px-1.5 py-0.5 text-[11px] font-bold">
                        {topic.commentsCount}
                      </div>
                    </div>
                    <h3 className="mt-1.5 text-[13px] font-bold leading-tight">
                      {topic.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Prawa kolumna - TEMATY DNIA */}
          <div className="w-[20%]">
            {/* Header TEMATY DNIA */}
            <div className="mb-6">
              <div className="flex items-center gap-2.5 pb-3 border-b border-gray-200">
                <div className="bg-red-600 rounded-full w-[22px] h-[22px] flex items-center justify-center shadow-sm">
                  <span className="font-bold text-white text-[13px] leading-none">
                    T
                  </span>
                </div>
                <span className="font-bold text-[13px] tracking-wider text-gray-900">
                  TEMATY DNIA
                </span>
              </div>
            </div>

            {/* Lista tematów */}
            <div className="space-y-[18px]">
              {topicsList.map((topic) => (
                <Link
                  href={`/news/${topic.id}`}
                  key={topic.id}
                  className="group block"
                >
                  <div className="flex flex-col gap-1">
                    {topic.category && (
                      <span className="text-[11px] font-bold text-blue-600">
                        {topic.category}
                      </span>
                    )}
                    <h3
                      className={`text-[13px] leading-[1.4] ${
                        topic.isHighlighted ? "font-bold" : "font-normal"
                      } text-gray-900 group-hover:text-gray-900`}
                    >
                      {topic.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dodany footer z paginacją */}
      <div className="mt-8 border-t pt-6 flex justify-between items-center text-sm">
        <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
          Poprzednia strona
        </button>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors
                ${page === 1 ? "bg-blue-600 text-white" : "hover:bg-gray-50"}`}
            >
              {page}
            </button>
          ))}
        </div>
        <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
          Następna strona
        </button>
      </div>
    </main>
  );
}
