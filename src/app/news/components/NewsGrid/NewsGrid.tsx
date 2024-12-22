"use client";

import Image from "next/image";
import Link from "next/link";
import { NewsGridProps, NewsItem } from "./types";
import { GridAd } from "../GridAd";
import { gridAds } from "../GridAd/ads";

export function NewsGrid({
  newsItems,
  title = "NAJCIEKAWSZE W BACHACIE",
  showHeader = true,
}: NewsGridProps) {
  // Sortujemy newsy od najnowszych do najstarszych
  const sortedNews = [...newsItems].sort((a, b) => {
    return new Date(b.date || "").getTime() - new Date(a.date || "").getTime();
  });

  const limitedNewsItems = sortedNews.slice(0, 10);
  const [firstItem, ...restItems] = limitedNewsItems;

  return (
    <div className="w-full mt-8">
      {showHeader && (
        <div className="mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
            <div className="h-2 w-2 rounded-full bg-[#e90636] animate-pulse" />
          </div>
        </div>
      )}

      <div className="w-full">
        <div className="grid grid-cols-3 grid-rows-2 gap-4">
          {/* Pierwszy duży news */}
          <Link
            href={`/news/${firstItem.url}`}
            className="block group relative row-span-2"
          >
            <div className="relative w-[300px] h-[376px] overflow-hidden">
              <Image
                src={firstItem.image}
                alt={firstItem.title}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-4 left-0 right-0 px-4">
                <h3 className="text-white text-2xl font-medium leading-tight group-hover:underline decoration-2 underline-offset-4">
                  {firstItem.title}
                </h3>
              </div>
            </div>
          </Link>

          {/* Pozostałe newsy */}
          {restItems.map((item: NewsItem) => (
            <Link
              key={item.id}
              href={`/news/${item.url}`}
              className="block group relative"
            >
              <div className="relative w-[300px] h-[180px] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-3 left-0 right-0 px-3">
                  <h3 className="text-white text-lg font-normal leading-tight group-hover:underline decoration-2 underline-offset-4">
                    {item.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}

          {/* Miejsce na reklamę */}
          <GridAd {...gridAds.defaultAd} />
        </div>
      </div>

      {/* Zobacz więcej - z animacją */}
      <div className="flex justify-end mt-6">
        <Link
          href="/news/archive"
          className="group inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#e90636] transition-colors duration-200"
        >
          <span className="relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-[#e90636] after:origin-left after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300">
            ZOBACZ WIĘCEJ
          </span>
          <svg
            className="w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1"
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
        </Link>
      </div>
    </div>
  );
}
