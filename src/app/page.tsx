"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaEye, FaRegClock, FaShare } from "react-icons/fa";
import { Poll, polls } from "@/app/news/components/Polls";
import type { PollData } from "@/app/news/components/Polls/types";
import { NewsTickerBar } from "@/app/news/components/NewsTickerBar/NewsTickerBar";
import { latestNewsData as tickerNewsData } from "@/app/news/components/NewsTickerBar/data";
import { BachataNews } from "@/app/news/components/BachataNews/BachataNews";
import { bachataNewsData } from "@/app/news/components/BachataNews/data";
import { DailyTopics } from "@/app/news/components/DailyTopics";
import { topicsData } from "@/app/news/components/DailyTopics/data";
import { AdColumn, ads } from "@/app/news/components/AddsRightCol";
import { PollsRecord } from "@/app/news/components/Polls/types";
import { NewsGrid } from "@/app/news/components/NewsGrid";
import { newsGridData } from "@/app/news/components/NewsGrid/data";

// Uproszczony interfejs bez elementów społecznościowych
interface NewsItem {
  id: string;
  title: string;
  image: string;
  url: string;
}

// Dodajemy stałą dla linków nawigacyjnych
const NAVIGATION_LINKS = [
  { href: "/wydarzenia", label: "Wydarzenia" },
  { href: "/zawody", label: "Zawody" },
  { href: "/style", label: "Style" },
  { href: "/edukacja", label: "Edukacja" },
  { href: "/muzyka", label: "Muzyka" },
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

// Dodajmy nowy interfejs dla tematów
interface TopicItem {
  id: string;
  title: string;
  category?: string;
  isHighlighted?: boolean;
}

export default function Home() {
  // Stan dla interakcji użytkownika z useMemo dla stabilnych wartości początkowych
  const [isClient, setIsClient] = useState(false);
  const [pollsState, setPollsState] = useState<PollsRecord>(polls);

  // Inicjalizacja stanu po stronie klienta
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleVote = (pollId: string, optionId: string) => {
    setPollsState((currentPolls) => {
      const poll = currentPolls[pollId];
      if (!poll) {
        console.error(`Poll with id ${pollId} not found`);
        return currentPolls;
      }

      return {
        ...currentPolls,
        [pollId]: {
          ...poll,
          options: poll.options.map((option) => ({
            ...option,
            votes: option.id === optionId ? option.votes + 1 : option.votes,
          })),
          totalVotes: poll.totalVotes + 1,
        },
      };
    });
  };

  return (
    <main className="min-h-screen bg-white font-['Roboto_Condensed',_'Roboto_Condensed-fallback',_Arial,_sans-serif]">
      {/* -------------------------- Ruchomy pasek wiadomości - dodajemy NewsTickerBar jako pierwszy komponent --------------------------    */}
      <NewsTickerBar latestNews={tickerNewsData} />

      {/* Header z rozwiniętym systemem kategorii */}
      <div className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm font-['Roboto_Condensed']">
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
      <div className="container mx-auto px-4 py-6 font-['Roboto_Condensed']">
        <div className="flex gap-6">
          {/* Lewa strona - główne newsy */}
          <div className="w-[62%]">
            {/*------------------------  Sekcja  Czerwone BACHATA NEWS ------------------------  */}
            <BachataNews newsItems={bachataNewsData} />

            {/*------------------------  Sekcja 12 newsów w stylu WP - układ 3-kolumnowy ------------------------   */}
            <div className="w-full mt-8">
              <NewsGrid
                newsItems={newsGridData}
                title="NAJCIEKAWSZE W BACHACIE!"
                showHeader={true}
              />

              {/*  ------------- Sekcja ankiet  -------------  */}
              <div className="w-full mt-8">
                <div className="grid grid-cols-3 gap-6">
                  <Poll data={pollsState.partnerPoll} onVote={handleVote} />
                  <Poll data={pollsState.frequencyPoll} onVote={handleVote} />
                  <Poll data={pollsState.outfitPoll} onVote={handleVote} />
                </div>
              </div>
            </div>
          </div>

          {/*  ------------- Prawa kolumna - TEMATY DNIA  -------------  */}
          <div className="w-[20%]">
            <DailyTopics topics={topicsData} />
            {/* ------------- Reklamy -------------  */}
            <AdColumn {...ads.schoolAd} /> {/* Szkoła tańca */}
            <AdColumn {...ads.courseAd} /> {/* Kurs online */}
          </div>
        </div>

        {/* Linia oddzielająca zamiast paginacji */}
        <div className="w-full border-b border-gray-200 my-12"></div>
      </div>
    </main>
  );
}
