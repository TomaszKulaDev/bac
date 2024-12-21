"use client";

import Image from "next/image";
import Link from "next/link";
import { NewsGridProps } from "./types";

export function NewsGrid({ newsItems }: NewsGridProps) {
  return (
    <div className="w-full mt-8">
      {/* Nagłówek sekcji - zmniejszone marginesy */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-900">
            NAJCIEKAWSZE W BACHACIE
          </h2>
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

      {/* Grid z newsami */}
      <div className="w-full">
        <div className="grid grid-cols-3 gap-4">
          {newsItems.map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.url}`}
              className="block group"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <div className="mt-3 relative">
                <h3 className="text-white text-lg font-bold leading-tight transition-colors duration-300 ease-in-out group-hover:text-white/90">
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
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
