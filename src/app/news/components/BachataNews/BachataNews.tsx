"use client";

import Link from "next/link";
import Image from "next/image";
import { BachataNewsItem } from "./types";

interface BachataNewsProps {
  newsItems: BachataNewsItem[];
}

export function BachataNews({ newsItems }: BachataNewsProps) {
  const limitedNews = newsItems.slice(0, 4);

  return (
    <div className="w-full bg-[#f8f8f8] py-4">
      <div className="max-w-[1530px] mx-auto px-4">
        <div className="bg-[#e90636] p-3">
          <h2 className="text-white text-3xl font-bold mb-1">
            ZACZNIJ OD TEGO!
          </h2>

          <div className="grid grid-cols-4 gap-4">
            {limitedNews.map((item) => (
              <Link key={item.id} href={`/news/${item.url}`} className="group">
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
    </div>
  );
}
