"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Poll, polls } from "@/app/news/components/Polls";
import { NewsTickerBar } from "@/app/news/components/NewsTickerBar/NewsTickerBar";
import { latestNewsData as tickerNewsData } from "@/app/news/components/NewsTickerBar/data";
import { BachataVideoArtist } from "@/app/news/components/BachataVideoBar/BachataVideoArtist";
import { bachataVideosData } from "@/app/news/components/BachataVideoBar/data";
import { RightSideBar } from "@/app/news/components/NewsGrid";
import { topicsData } from "@/app/news/components/NewsGrid/data";
import { PollsRecord } from "@/app/news/components/Polls/types";
import { NewsGrid } from "@/app/news/components/NewsGrid";
import { newsGridData } from "@/app/news/components/NewsGrid/data";
import { Header } from "@/app/news/components/Header";
import { DailyHighlights } from "@/app/news/components/DailyHighlights/DailyHighlights";
import {
  highlightsData,
  categories,
} from "@/app/news/components/DailyHighlights/data";
import { PolishPromoArtist } from "@/app/news/components/PolishPromoArtist/PolishPromoArtist";
import { polishArtistsData } from "@/app/news/components/PolishPromoArtist/data";

// Uproszczony interfejs bez elementów społecznościowych
interface NewsItem {
  id: string;
  title: string;
  image: string;
  url: string;
}

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

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Baciata.pl",
  url: "https://baciata.pl",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://baciata.pl/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
  sameAs: [
    "https://www.facebook.com/Baciata/",
    "https://www.instagram.com/baciata_pl/",
    "https://www.youtube.com/@Baciata_pl",
  ],
  organization: {
    "@type": "Organization",
    name: "Baciata.pl",
    logo: {
      "@type": "ImageObject",
      url: "https://baciata.pl/logo.png",
    },
  },
};

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
    <main className="min-h-screen bg-white font-['Roboto_Condensed']">
      <BachataVideoArtist videos={bachataVideosData} />
      <PolishPromoArtist artists={polishArtistsData} />
      <NewsTickerBar latestNews={tickerNewsData} />

      {/* -------------------------- SEKCJA 2: NAGŁÓWEK -------------------------- */}
      <Header />

      {/* -------------------------- SEKCJA 3: WYRÓŻNIONE WIADOMOŚCI -------------------------- */}
      <DailyHighlights highlights={highlightsData} categories={categories} />

      {/* -------------------------- SEKCJA 4: BACHATA NEWS -------------------------- */}

      {/* Main Content Container */}
      <div className="container mx-auto px-4 py-6 font-['Roboto_Condensed']">
        <div className="flex gap-6">
          {/* -------------------------- SEKCJA 5: LEWA KOLUMNA (62%) -------------------------- */}
          <div className="w-[62%]">
            {/* Główna siatka - najnowsze 10 newsów */}
            <div className="w-full mt-8">
              <NewsGrid newsItems={newsGridData} />
            </div>
            <div className="grid grid-cols-3 gap-6 mt-8">
              <Poll data={pollsState.partnerPoll} onVote={handleVote} />
              <Poll data={pollsState.frequencyPoll} onVote={handleVote} />
              <Poll data={pollsState.stylePoll} onVote={handleVote} />
            </div>
          </div>
          {/* -------------------------- SEKCJA 6: PRAWA KOLUMNA (20%) -------------------------- */}
          <div className="w-[20%]">
            {/* Sidebar - starsze newsy */}
            <RightSideBar topics={topicsData} />
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </main>
  );
}
