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
  source: string;
  isHot: boolean;
  category: string;
}

const newsData: NewsItem[] = [
  {
    id: "1",
    title:
      "Światowy Festiwal Bachaty 2024 - Największe wydarzenie roku już w czerwcu w Warszawie",
    image: "/images/bachata-festival.jpg",
    source: "Redakcja Taneczna",
    isHot: true,
    category: "Wydarzenia",
  },
  {
    id: "2",
    title: "Daniel i Maya zdobywają mistrzostwo świata w bachacie sensual",
    image: "/images/bachata-couple.jpg",
    source: "Dance News",
    isHot: true,
    category: "Zawody",
  },
  {
    id: "3",
    title: "Bachata Romance - nowy kierunek w bachacie tradycyjnej",
    image: "/images/bachata-romance.jpg",
    source: "Latin Dance Blog",
    isHot: false,
    category: "Style",
  },
  {
    id: "4",
    title: "Top 10 szkół bachaty w Polsce - gdzie warto zacząć?",
    image: "/images/bachata-schools.jpg",
    source: "Dance Review",
    isHot: true,
    category: "Edukacja",
  },
  {
    id: "5",
    title: "Podstawowe kroki bachaty - przewodnik dla początkujących",
    image: "/images/bachata-steps.jpg",
    source: "Dance Tutorial",
    isHot: false,
    category: "Nauka",
  },
  {
    id: "6",
    title: "Co założyć na imprezę bachatową? Kompletny przewodnik",
    image: "/images/bachata-outfit.jpg",
    source: "Style & Dance",
    isHot: false,
    category: "Lifestyle",
  },
  {
    id: "7",
    title: "Top 20 piosenek bachatowych 2024 roku",
    image: "/images/bachata-songs.jpg",
    source: "Latin Music",
    isHot: true,
    category: "Muzyka",
  },
  {
    id: "8",
    title: "Historia bachaty - od dominikańskich korzeni po światową scenę",
    image: "/images/bachata-history.jpg",
    source: "Dance History",
    isHot: false,
    category: "Historia",
  },
  {
    id: "9",
    title: "Najlepsze festiwale bachaty w Europie 2024",
    image: "/images/bachata-festivals-europe.jpg",
    source: "Festival Guide",
    isHot: true,
    category: "Wydarzenia",
  },
  {
    id: "10",
    title: "Technika prowadzenia w bachacie - wskazówki dla zaawansowanych",
    image: "/images/bachata-leading.jpg",
    source: "Pro Dance Tips",
    isHot: false,
    category: "Technika",
  },
  {
    id: "11",
    title: "Muzyka bachatowa - jak rozpoznać style i rytmy",
    image: "/images/bachata-music-styles.jpg",
    source: "Music Theory",
    isHot: false,
    category: "Muzyka",
  },
  {
    id: "12",
    title: "Bachata fusion - łączenie stylów i nowe trendy",
    image: "/images/bachata-fusion.jpg",
    source: "Dance Trends",
    isHot: true,
    category: "Style",
  },
];

// Dodajemy stałe dla kategorii
const CATEGORIES = [
  { id: "all", label: "Wszystkie" },
  { id: "events", label: "Wydarzenia" },
  { id: "competitions", label: "Zawody" },
  { id: "styles", label: "Style" },
  { id: "education", label: "Edukacja" },
  { id: "music", label: "Muzyka" },
] as const;

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
              <span className="bg-red-500 text-white px-2 py-0.5 text-[11px] font-medium rounded-full">
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gray-200" />
              <span className="text-[13px] text-gray-500">{news.source}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <FaRegClock size={12} />
              <span className="text-[12px]">2 godz.</span>
            </div>
          </div>
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
    title: "Światowi instruktorzy bachaty przybywają do Warszawy na BachatArt Festival",
    category: "WYDARZENIA",
    categoryColor: "text-blue-600"
  },
  {
    id: "2",
    time: "22:25",
    title: "Nowe zasady na World Bachata Masters 2024. Kontrowersyjna decyzja",
    category: "ZAWODY",
    categoryColor: "text-orange-600"
  },
  {
    id: "3",
    time: "22:14",
    title: "Romeo Santos zapowiada nowy album. 'To powrót do korzeni bachaty'",
    category: "MUZYKA",
    categoryColor: "text-purple-600"
  },
  {
    id: "4",
    time: "22:06",
    title: "Dominikańska technika vs styl europejski. Gorąca debata w świecie bachaty",
    category: "STYL",
    categoryColor: "text-green-600"
  }
];

export default function Home() {
  // Stan dla aktywnej kategorii
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Stan dla interakcji użytkownika z useMemo dla stabilnych wartości początkowych
  const [isClient, setIsClient] = useState(false);

  // Inicjalizacja stanu po stronie klienta
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Filtrowanie news��w według kategorii
  const getFilteredNews = () => {
    if (activeCategory === "all") return newsData;
    return newsData.filter(
      (news) => news.category.toLowerCase() === activeCategory
    );
  };

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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
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
                    <span className={`text-xs font-medium ${news.categoryColor || 'text-gray-500'}`}>
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
                    <span className={`text-xs font-medium ${news.categoryColor || 'text-gray-500'}`}>
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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Header z rozwiniętym systemem kategorii */}
      <div className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="bg-yellow-400 rounded-full w-[22px] h-[22px] flex items-center justify-center shadow-sm">
                <span className="font-bold text-black text-[13px] leading-none">
                  INFO
                </span>
              </div>
              <span className="font-bold text-[13px] tracking-wider text-gray-900">
                PARKIET
              </span>
            </div>

            {/* Rozbudowany system kategorii */}
            <div className="flex gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`
                    px-3 py-1.5 rounded-full transition-all duration-200
                    ${
                      activeCategory === category.id
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }
                    text-[13px] font-medium
                  `}
                >
                  {category.label}
                  {activeCategory === category.id && (
                    <span className="ml-2 text-[11px] bg-white/20 px-1.5 py-0.5 rounded-full">
                      {getFilteredNews().length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dodane podsumowanie filtrów */}
        {activeCategory !== "all" && (
          <div className="container mx-auto px-4 py-2 bg-gray-50 text-sm border-t">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">
                Pokazano {getFilteredNews().length} artykułów w kategorii &quot;
                {CATEGORIES.find((c) => c.id === activeCategory)?.label}&quot;
              </span>
              <button
                onClick={() => setActiveCategory("all")}
                className="text-blue-600 hover:text-blue-700 text-[13px]"
              >
                Wyczyść filtr
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content - dodane animacje przy wejściu */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-[24px]">
          {/* Left Column - dodane statystyki */}
          <div className="w-[50%]">
            <div className="mb-7">
              <Link href={`/news/${newsData[0].id}`} className="group">
                <div className="relative h-[400px] overflow-hidden rounded-lg">
                  <Image
                    src={newsData[0].image}
                    alt={newsData[0].title}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {newsData[0].isHot && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-red-500 text-white px-2 py-0.5 text-sm font-medium rounded-full">
                        Hot
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <h2 className="text-2xl font-bold mb-2 text-white group-hover:text-white">
                      {newsData[0].title}
                    </h2>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-200" />
                      <span className="text-sm text-gray-200">{newsData[0].source}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Two Articles Below - dodane efekty hover */}
            <div className="space-y-6">
              {newsData.slice(1, 3).map((news) => (
                <Link
                  href={`/news/${news.id}`}
                  key={news.id}
                  className="group block"
                >
                  <div className="flex gap-5 group-hover:bg-gray-50 p-2 -mx-2 rounded-lg transition-colors">
                    <div className="relative w-[180px] h-[120px] flex-shrink-0 overflow-hidden rounded-sm shadow-sm">
                      <Image
                        src={news.image}
                        alt={news.title}
                        fill
                        sizes="180px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {news.isHot && (
                        <div className="absolute top-2 left-2">
                          <span className="bg-red-500 text-white px-2 py-0.5 text-[11px] font-medium rounded-full">
                            Hot
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="pt-1 flex-1">
                      <h2 className="font-bold text-[15px] leading-tight mb-3 text-gray-900 group-hover:text-gray-900">
                        {news.title}
                      </h2>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-gray-200" />
                          <span className="text-[13px] text-gray-500">
                            {news.source}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-400">
                          <FaRegClock size={12} />
                          <span className="text-[12px]">2 godz.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Middle Column - poprawione proporcje zdjęć */}
          <div className="w-[25%] space-y-6">
            {newsData.slice(3, 5).map((news) => (
              <Link
                href={`/news/${news.id}`}
                key={news.id}
                className="group block"
              >
                <div>
                  <div className="relative h-[160px] mb-3 overflow-hidden">
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      sizes="25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-bold text-[15px] leading-tight mb-3 text-gray-900 group-hover:text-gray-900">
                    {news.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-gray-200" />
                    <span className="text-[13px] text-gray-500">
                      {news.source}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Right Column - poprawione miniatury */}
          <div className="w-[25%] space-y-[18px]">
            {newsData.slice(5).map((news) => (
              <Link
                href={`/news/${news.id}`}
                key={news.id}
                className="group block"
              >
                <div className="flex gap-4">
                  <div className="relative w-[100px] h-[70px] flex-shrink-0 overflow-hidden">
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      sizes="100px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-[13px] font-bold leading-tight pt-0.5 text-gray-900 group-hover:text-gray-900">
                    {news.title}
                  </h3>
                </div>
              </Link>
            ))}
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
                  ${
                    page === 1 ? "bg-blue-600 text-white" : "hover:bg-gray-50"
                  }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
            Następna strona
          </button>
        </div>
      </div>
    </main>
  );
}
