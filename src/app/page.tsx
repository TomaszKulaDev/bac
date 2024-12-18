"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaRegComment, FaRegBookmark, FaRegClock, FaShare, FaEye, FaRegHeart, FaHeart, FaBookmark } from "react-icons/fa";

// Interfejs dla danych artykułu
interface NewsItem {
  id: string;
  title: string;
  image: string;
  source: string;
  comments: number;
  isHot: boolean;
  category: string;
  likes: number;
  views: number;
}

const newsData: NewsItem[] = [
  {
    id: "1",
    title: "Światowy Festiwal Bachaty 2024 - Największe wydarzenie roku już w czerwcu w Warszawie",
    image: "/images/bachata-festival.jpg",
    source: "Redakcja Taneczna",
    comments: 156,
    isHot: true,
    category: "Wydarzenia",
    likes: 312,
    views: 7733
  },
  {
    id: "2",
    title: "Daniel i Maya zdobywają mistrzostwo świata w bachacie sensual",
    image: "/images/bachata-couple.jpg",
    source: "Dance News",
    comments: 324,
    isHot: true,
    category: "Zawody",
    likes: 280,
    views: 2929
  },
  {
    id: "3",
    title: "Bachata Romance - nowy kierunek w bachacie tradycyjnej",
    image: "/images/bachata-romance.jpg",
    source: "Latin Dance Blog",
    comments: 89,
    isHot: false,
    category: "Style",
    likes: 120,
    views: 1500
  },
  {
    id: "4",
    title: "Top 10 szkół bachaty w Polsce - gdzie warto zacząć?",
    image: "/images/bachata-schools.jpg",
    source: "Dance Review",
    comments: 245,
    isHot: true,
    category: "Edukacja",
    likes: 180,
    views: 2200
  },
  {
    id: "5",
    title: "Podstawowe kroki bachaty - przewodnik dla początkujących",
    image: "/images/bachata-steps.jpg",
    source: "Dance Tutorial",
    comments: 167,
    isHot: false,
    category: "Nauka",
    likes: 100,
    views: 1300
  },
  {
    id: "6",
    title: "Co założyć na imprezę bachatową? Kompletny przewodnik",
    image: "/images/bachata-outfit.jpg",
    source: "Style & Dance",
    comments: 198,
    isHot: false,
    category: "Lifestyle",
    likes: 150,
    views: 1800
  },
  {
    id: "7",
    title: "Top 20 piosenek bachatowych 2024 roku",
    image: "/images/bachata-songs.jpg",
    source: "Latin Music",
    comments: 276,
    isHot: true,
    category: "Muzyka",
    likes: 200,
    views: 2500
  },
  {
    id: "8",
    title: "Historia bachaty - od dominikańskich korzeni po światową scenę",
    image: "/images/bachata-history.jpg",
    source: "Dance History",
    comments: 145,
    isHot: false,
    category: "Historia",
    likes: 100,
    views: 1200
  },
];

// Dodajemy stałe dla kategorii
const CATEGORIES = [
  { id: 'all', label: 'Wszystkie' },
  { id: 'events', label: 'Wydarzenia' },
  { id: 'competitions', label: 'Zawody' },
  { id: 'styles', label: 'Style' },
  { id: 'education', label: 'Edukacja' },
  { id: 'music', label: 'Muzyka' }
] as const;

// Interfejs dla interakcji z artykułem
interface ArticleInteractions {
  id: string;
  isBookmarked: boolean;
  isLiked: boolean;
  likes: number;
  views: number;
  timeToRead: string;
}

const ArticleListItem = ({ news }: { news: NewsItem }) => {
  return (
    <Link href={`/news/${news.id}`} className="group block">
      <div className="flex gap-4">
        {/* Miniatura */}
        <div className="relative w-[180px] h-[120px] flex-shrink-0 overflow-hidden rounded-sm">
          <Image
            src={news.image}
            alt={news.title}
            fill
            sizes="180px"
            className="object-cover"
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
        <div className="flex-1">
          <h2 className="font-bold text-[17px] leading-tight mb-2 group-hover:text-blue-600 transition-colors">
            {news.title}
          </h2>
          
          {/* Meta info */}
          <div className="flex items-center gap-3 text-[13px] text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gray-200" />
              <span>{news.source}</span>
            </div>
            <span className="flex items-center gap-1.5">
              <FaRegClock size={13} />
              2 godz.
            </span>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 mt-2 text-[13px] text-gray-500">
            <div className="flex items-center gap-1.5">
              <FaRegHeart size={13} />
              <span>{news.likes}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FaRegBookmark size={13} />
              <span>156</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FaRegComment size={13} />
              <span>{news.comments}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FaEye size={13} />
              <span>{news.views}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FaRegClock size={13} />
              <span>2 min</span>
            </div>
            <button className="hover:text-blue-500 transition-colors">
              <FaShare size={13} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function Home() {
  // Stan dla aktywnej kategorii
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Stan dla interakcji użytkownika
  const [interactions, setInteractions] = useState<Record<string, ArticleInteractions>>(() => 
    newsData.reduce((acc, news) => ({
      ...acc,
      [news.id]: {
        id: news.id,
        isBookmarked: false,
        isLiked: false,
        likes: Math.floor(Math.random() * 1000),
        views: Math.floor(Math.random() * 10000),
        timeToRead: '2 min',
      }
    }), {})
  );

  // Filtrowanie newsów według kategorii
  const getFilteredNews = () => {
    if (activeCategory === 'all') return newsData;
    return newsData.filter(news => news.category.toLowerCase() === activeCategory);
  };

  // Funkcje obsługujące interakcje
  const toggleBookmark = (id: string, event: React.MouseEvent) => {
    event.preventDefault();
    setInteractions(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        isBookmarked: !prev[id].isBookmarked
      }
    }));
  };

  const toggleLike = (id: string, event: React.MouseEvent) => {
    event.preventDefault();
    setInteractions(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        isLiked: !prev[id].isLiked,
        likes: prev[id].likes + (prev[id].isLiked ? -1 : 1)
      }
    }));
  };

  // Komponent dla przycisków interakcji - dodany margin top
  const InteractionButtons = ({ articleId, variant = 'default' }: { articleId: string, variant?: 'default' | 'compact' }) => {
    const interaction = interactions[articleId];
    
    if (variant === 'compact') {
      return (
        <div className="flex items-center gap-3 text-gray-500 text-[13px] mt-3">
          <div className="flex items-center gap-1.5">
            <FaRegHeart size={13} />
            <span>{interaction.likes}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FaRegBookmark size={13} />
          </div>
          <div className="flex items-center gap-1.5">
            <FaRegComment size={13} />
            <span>{newsData[0].comments}</span>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-4 mt-4">
        <div className="flex items-center gap-6">
          {/* Lewa strona - główne akcje */}
          <div className="flex items-center gap-4">
            <button 
              onClick={(e) => toggleLike(articleId, e)}
              className="flex items-center gap-1.5 text-gray-500 hover:text-red-500 transition-colors"
            >
              {interaction.isLiked ? (
                <FaHeart className="text-red-500" size={14} />
              ) : (
                <FaRegHeart size={14} />
              )}
              <span className="text-[13px]">{interaction.likes}</span>
            </button>

            <button 
              onClick={(e) => toggleBookmark(articleId, e)}
              className="text-gray-500 hover:text-blue-500 transition-colors"
            >
              {interaction.isBookmarked ? (
                <FaBookmark className="text-blue-500" size={14} />
              ) : (
                <FaRegBookmark size={14} />
              )}
            </button>

            <div className="flex items-center gap-1.5 text-gray-500">
              <FaRegComment size={14} />
              <span className="text-[13px]">{newsData[0].comments}</span>
            </div>
          </div>

          {/* Separator */}
          <div className="h-4 w-px bg-gray-300"></div>

          {/* Prawa strona - informacje */}
          <div className="flex items-center gap-4 text-gray-500">
            <div className="flex items-center gap-1.5">
              <FaEye size={14} />
              <span className="text-[13px]">{interaction.views}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <FaRegClock size={14} />
              <span className="text-[13px]">{interaction.timeToRead}</span>
            </div>

            <button 
              className="text-gray-500 hover:text-blue-500 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                if (navigator.share) {
                  navigator.share({
                    title: newsData.find(n => n.id === articleId)?.title,
                    url: `/news/${articleId}`
                  });
                }
              }}
            >
              <FaShare size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Header z rozwiniętym systemem kategorii */}
      <div className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="bg-yellow-400 rounded-full w-[22px] h-[22px] flex items-center justify-center shadow-sm">
                <span className="font-bold text-black text-[13px] leading-none">O</span>
              </div>
              <span className="font-bold text-[13px] tracking-wider text-gray-900">TYM SIĘ MÓWI</span>
            </div>
            
            {/* Rozbudowany system kategorii */}
            <div className="flex gap-2">
              {CATEGORIES.map((category) => (
                <button 
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`
                    px-3 py-1.5 rounded-full transition-all duration-200
                    ${activeCategory === category.id 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
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
        {activeCategory !== 'all' && (
          <div className="container mx-auto px-4 py-2 bg-gray-50 text-sm border-t">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">
                Pokazano {getFilteredNews().length} artykułów w kategorii &quot;{CATEGORIES.find(c => c.id === activeCategory)?.label}&quot;
              </span>
              <button 
                onClick={() => setActiveCategory('all')}
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
              <Link href={`/news/${newsData[0].id}`} className="group block">
                <div className="relative h-[360px] overflow-hidden rounded-sm shadow-md">
                  <Image
                    src={newsData[0].image}
                    alt={newsData[0].title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                    {/* Dodane oznaczenia popularności */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-blue-600 text-white px-3 py-1 text-[12px] font-medium rounded-full">
                        {newsData[0].category}
                      </span>
                      <span className="bg-black/50 text-white px-3 py-1 text-[12px] font-medium rounded-full flex items-center gap-1.5">
                        <FaEye size={12} />
                        2.5k
                      </span>
                    </div>
                    <div className="absolute bottom-0 p-5">
                      <h1 className="text-[22px] font-bold text-white mb-3 leading-tight">
                        {newsData[0].title}
                      </h1>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gray-300/90" />
                            <span className="text-[13px] text-gray-100">
                              {newsData[0].source}
                            </span>
                          </div>
                          <button className="px-3 py-1 text-[13px] text-white bg-black/40 hover:bg-black/50 rounded-full transition-colors">
                            Obserwuj
                          </button>
                        </div>
                        <InteractionButtons articleId={newsData[0].id} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Two Articles Below - dodane efekty hover */}
            <div className="space-y-6">
              {newsData.slice(1, 3).map((news) => (
                <Link href={`/news/${news.id}`} key={news.id} className="group block">
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
                      <h2 className="font-bold text-[15px] leading-tight mb-3 group-hover:text-blue-600 transition-colors">
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
                        <InteractionButtons articleId={news.id} />
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
              <Link href={`/news/${news.id}`} key={news.id} className="group block">
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
                  <h3 className="font-bold text-[15px] leading-tight mb-3 group-hover:text-blue-600 transition-colors">
                    {news.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-gray-200" />
                    <span className="text-[13px] text-gray-500">{news.source}</span>
                  </div>
                  <InteractionButtons articleId={news.id} />
                </div>
              </Link>
            ))}
          </div>

          {/* Right Column - poprawione miniatury */}
          <div className="w-[25%] space-y-[18px]">
            {newsData.slice(5).map((news) => (
              <Link href={`/news/${news.id}`} key={news.id} className="group block">
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
                  <h3 className="text-[13px] font-bold leading-tight pt-0.5 group-hover:text-blue-600 transition-colors">
                    {news.title}
                  </h3>
                </div>
                <InteractionButtons articleId={news.id} />
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
                  ${page === 1 ? 'bg-blue-600 text-white' : 'hover:bg-gray-50'}`}
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
