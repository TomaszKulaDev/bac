"use client";

import Image from "next/image";
import Link from "next/link";
import { NewsGridProps } from "./types";
import { GridAd } from "../GridAd";
import { gridAds } from "../GridAd/ads";

export function NewsGrid({
  newsItems,
  title = "NAJCIEKAWSZE W BACHACIE",
  showHeader = true,
}: NewsGridProps) {
  const limitedNewsItems = newsItems.slice(0, 13);
  const [firstItem, ...restItems] = limitedNewsItems;

  return (
    <div className="w-full mt-8">
      {showHeader && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <div className="h-2 w-2 rounded-full bg-[#e90636] animate-pulse" />
          </div>
          <Link
            href="/news"
            className="text-sm text-gray-600 hover:text-[#e90636] transition-colors duration-200 flex items-center gap-1"
          >
            Zobacz wszystkie
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
      )}

      {/* Grid z newsami */}
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

              {/* Ciemny gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

              {/* Tytuł */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-2xl font-bold leading-tight group-hover:text-white/90 transition-colors duration-300">
                  {firstItem.title}
                </h3>
                <div className="relative h-[2px] mt-3 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-white w-35 -translate-x-full group-hover:translate-x-full 
                             transition-transform duration-[850ms] ease-[cubic-bezier(0.4,0,0.2,1)] 
                             opacity-0 group-hover:opacity-100"
                  />
                </div>
              </div>
            </div>
          </Link>

          {/* Pozostałe newsy (max 9) */}
          {restItems.map((item) => (
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

                {/* Ciemny gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

                {/* Tytuł */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white text-lg font-bold leading-tight group-hover:text-white/90 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <div className="relative h-[2px] mt-2 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-white w-35 -translate-x-full group-hover:translate-x-full 
                               transition-transform duration-[850ms] ease-[cubic-bezier(0.4,0,0.2,1)] 
                               opacity-0 group-hover:opacity-100"
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {/* Miejsce na reklamę */}
          <GridAd {...gridAds.defaultAd} />
        </div>
      </div>
    </div>
  );
}
