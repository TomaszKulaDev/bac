"use client";

import Link from "next/link";
import Image from "next/image";
import { DailyHighlightProps, Highlight, Category } from "./types";

export function DailyHighlights({
  highlights,
  categories,
}: DailyHighlightProps) {
  return (
    <section className="w-full bg-[#f8f8f8] py-4">
      <div className="max-w-[1530px] mx-auto px-4">
        {/* Nagłówek z kategoriami */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[28px] font-bold text-[#2a2a2a]">
            WYDARZENIA DNIA
          </h2>
          <div className="flex gap-2">
            {categories.map((category: Category) => (
              <span
                key={category.id}
                className="bg-[#e5e5e5] px-3 py-1.5 text-[13px] font-medium hover:bg-gray-300 cursor-pointer"
              >
                {category.name}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3">
          {/* Lewa kolumna - duże zdjęcie i 2 mniejsze pod nim */}
          <div className="col-span-6 grid gap-3">
            {/* Duże zdjęcie */}
            <Link href={highlights[0].url} className="block group">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={highlights[0].image}
                  alt={highlights[0].title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <h3 className="absolute bottom-4 left-4 right-4 text-white text-[28px] font-bold leading-tight group-hover:underline decoration-1 underline-offset-2">
                  {highlights[0].title}
                </h3>
              </div>
            </Link>

            {/* 2 mniejsze zdjęcia pod głównym */}
            <div className="grid grid-cols-2 gap-3">
              {highlights.slice(1, 3).map((highlight: Highlight) => (
                <Link
                  key={highlight.id}
                  href={highlight.url}
                  className="block group"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={highlight.image}
                      alt={highlight.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <h3 className="absolute bottom-3 left-3 right-3 text-white text-[15px] font-bold leading-tight group-hover:underline decoration-1 underline-offset-2">
                      {highlight.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Prawa kolumna - 6 małych zdjęć w układzie 2x3 */}
          <div className="col-span-6 grid grid-cols-2 gap-x-3 gap-y-[10px]">
            {highlights.slice(3, 9).map((highlight: Highlight) => (
              <Link
                key={highlight.id}
                href={highlight.url}
                className="block group"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={highlight.image}
                    alt={highlight.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <h3 className="absolute bottom-3 left-3 right-3 text-white text-[15px] font-bold leading-tight group-hover:underline decoration-1 underline-offset-2">
                    {highlight.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
