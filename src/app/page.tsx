"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Poll, polls } from "@/app/news/components/Polls";
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
import { FashionGrid } from "@/app/news/components/FashionGrid";
import { fashionGridData } from "@/app/news/components/FashionGrid/data";
import { EventsWinnersGrid } from "@/app/news/components/EventsWinnersGrid";
import { eventsWinnersData } from "@/app/news/components/EventsWinnersGrid/data";
import { Header } from "@/app/news/components/Header";
import { DailyHighlights } from "@/app/news/components/DailyHighlights/DailyHighlights";
import {
  highlightsData,
  categories,
} from "@/app/news/components/DailyHighlights/data";

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
      {/* -------------------------- SEKCJA 1: GÓRNY PASEK WIADOMOŚCI -------------------------- */}
      <NewsTickerBar latestNews={tickerNewsData} />

      {/* -------------------------- SEKCJA 2: NAGŁÓWEK -------------------------- */}
      <Header />

      {/* -------------------------- SEKCJA 3: WYRÓŻNIONE WIADOMOŚCI -------------------------- */}
      <DailyHighlights highlights={highlightsData} categories={categories} />

      {/* -------------------------- SEKCJA 4: BACHATA NEWS -------------------------- */}
      <BachataNews newsItems={bachataNewsData} />

      {/* Main Content Container */}
      <div className="container mx-auto px-4 py-6 font-['Roboto_Condensed']">
        <div className="flex gap-6">
          {/* -------------------------- SEKCJA 5: LEWA KOLUMNA (62%) -------------------------- */}
          <div className="w-[62%]">
            {/* Siatka 12 newsów w stylu WP */}
            <div className="w-full mt-8">
              <NewsGrid
                newsItems={newsGridData}
                title="NAJCIEKAWSZE W BACHACIE!"
                showHeader={true}
              />

              {/* -------- SEKCJA ANKIET - OGÓLNE -------- */}
              <div className="grid grid-cols-3 gap-6 mt-8">
                <Poll data={pollsState.partnerPoll} onVote={handleVote} />
                <Poll data={pollsState.frequencyPoll} onVote={handleVote} />
                <Poll data={pollsState.stylePoll} onVote={handleVote} />
              </div>

              {/* -------- SEKCJA MODY TANECZNEJ -------- */}
              <div className="w-full mt-8">
                <FashionGrid fashionItems={fashionGridData} showHeader={true} />
              </div>

              {/* -------- SEKCJA ANKIET - MODA -------- */}
              <div className="grid grid-cols-3 gap-6 mt-8">
                <Poll
                  data={pollsState.accessoriesPollForHer}
                  onVote={handleVote}
                />
                <Poll data={pollsState.shoesPollForHer} onVote={handleVote} />
                <Poll
                  data={pollsState.dressStylePollForHer}
                  onVote={handleVote}
                />
              </div>
            </div>

            {/* -------- SEKCJA ZWYCIĘZCY I WYDARZENIA -------- */}
            <div className="w-full mt-8">
              <EventsWinnersGrid
                eventsItems={eventsWinnersData}
                showHeader={true}
              />

              {/* -------- SEKCJA ANKIET - WYDARZENIA -------- */}
              <div className="grid grid-cols-3 gap-6 mt-8">
                <Poll data={pollsState.winnersPoll} onVote={handleVote} />
                <Poll data={pollsState.eventsPoll} onVote={handleVote} />
                <Poll data={pollsState.judgingPoll} onVote={handleVote} />
              </div>
            </div>
          </div>

          {/* -------------------------- SEKCJA 6: PRAWA KOLUMNA (20%) -------------------------- */}
          {/* <div className="w-[20%]"> */}
            {/* -------- SEKCJA TEMATY DZIENNE -------- */}
            {/* <DailyTopics topics={topicsData} />
            {/* -------- SEKCJA REKLAM -------- */}
            {/* <AdColumn {...ads.schoolAd} /> Reklama szkoły tańca */}
            {/* <AdColumn {...ads.courseAd} /> Reklama kursu online */}
          {/* </div> */}
        </div>

        {/* -------- LINIA ODDZIELAJĄCA -------- */}
        <div className="w-full border-b border-gray-200 my-12"></div>
      </div>
    </main>
  );
}
