"use client";

import Link from "next/link";
import Image from "next/image";
import { DailyHighlightProps, Highlight, Category } from "./types";

export function DailyHighlights({
  highlights,
  categories,
}: DailyHighlightProps) {
  return (
    <section className="w-full bg-[#f8f8f8] py-2.5">
      <div className="max-w-[1380px] mx-auto px-3">
        {/* Nagłówek z kategoriami */}
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-[36px] font-bold text-[#2a2a2a]">
            WYDARZENIA DNIA
          </h2>
          <div className="flex gap-1.5">
            {categories.map((category: Category) => (
              <span
                key={category.id}
                className="bg-[#e5e5e5] w-[137.109px] h-[17px] flex items-center justify-center text-[13px] leading-[17px] font-medium hover:bg-gray-300 cursor-pointer"
              >
                {category.name}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-2">
          {/* Lewa kolumna - duże zdjęcie i 2 mniejsze pod nim */}
          <div className="col-span-6 grid gap-2">
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
                <h3 className="absolute bottom-2.5 left-2.5 right-2.5 text-white text-[24px] font-bold leading-tight group-hover:underline decoration-1 underline-offset-2">
                  {highlights[0].title}
                </h3>
              </div>
            </Link>

            {/* 2 mniejsze zdjęcia pod głównym */}
            <div className="grid grid-cols-2 gap-2">
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
                    <h3 className="absolute bottom-2 left-2 right-2 text-white text-[13px] font-bold leading-tight group-hover:underline decoration-1 underline-offset-2">
                      {highlight.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Prawa kolumna - 6 małych zdjęć w układzie 2x3 */}
          <div className="col-span-6 grid grid-cols-2 gap-x-2 gap-y-[6px]">
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
                  <h3 className="absolute bottom-2 left-2 right-2 text-white text-[13px] font-bold leading-tight group-hover:underline decoration-1 underline-offset-2">
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
