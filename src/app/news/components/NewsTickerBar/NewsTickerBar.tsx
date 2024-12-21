"use client";

import Link from "next/link";
import { LatestNews } from "./types";

interface NewsTickerBarProps {
  latestNews: LatestNews[];
}

export function NewsTickerBar({ latestNews }: NewsTickerBarProps) {
  return (
    <div className="bg-[#f5f5f5] border-b border-gray-200">
      <div className="max-w-[1530px] mx-auto flex items-stretch font-['Roboto_Condensed']">
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
            {latestNews.map((news) => (
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
            {latestNews.map((news) => (
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
  );
}
