"use client";

import Link from "next/link";
import Image from "next/image";
import { BachataNewsItem } from "./types";

interface BachataNewsProps {
  newsItems: BachataNewsItem[];
}

export function BachataNews({ newsItems }: BachataNewsProps) {
  return (
    <div className="w-full">
      <div className="bg-[#e90636] p-6">
        <h2 className="text-white text-3xl font-bold mb-6">BACHATA NEWS</h2>

        <div className="grid grid-cols-3 gap-4">
          {newsItems.map((item) => (
            <Link key={item.id} href={`/news/${item.url}`} className="group">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <div className="mt-3">
                <h3 className="text-white text-lg font-bold leading-tight group-hover:underline">
                  {item.title}
                </h3>
                <div className="w-8 h-[2px] bg-white/80 mt-2" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
