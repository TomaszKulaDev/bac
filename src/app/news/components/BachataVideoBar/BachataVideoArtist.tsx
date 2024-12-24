"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { BachataVideoItem } from "./types";

interface BachataVideoArtistProps {
  videos: BachataVideoItem[];
}

export function BachataVideoArtist({ videos }: BachataVideoArtistProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Ograniczamy liczbę wyświetlanych filmów do pierwszych 5
  const limitedVideos = videos.slice(0, 10);

  return (
    <section className="w-full bg-[#0f0f0f] py-6">
      <div className="max-w-[1400px] mx-auto px-4">
        {/* Nagłówek z przyciskami nawigacji */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <svg
              className="w-6 h-6 text-yellow-500 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <h2 className="text-white text-lg font-medium">
              Top World Bachata Artist
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Przewiń w lewo"
            >
              <svg
                className="w-6 h-6 text-white"
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
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Przewiń w prawo"
            >
              <svg
                className="w-6 h-6 text-white"
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

        {/* Kontener z przewijaniem */}
        <div className="relative group">
          <div
            ref={scrollContainerRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
          >
            {limitedVideos.map((video) => (
              <Link
                key={video.id}
                href={`/videos/${video.url}`}
                className="flex-none w-[160px] snap-start group relative aspect-[9/16] rounded-xl overflow-hidden bg-neutral-800"
              >
                {/* Thumbnail */}
                <div className="absolute inset-0">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.youtubeId}?controls=0&showinfo=0&modestbranding=1&rel=0`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>

                {/* Tytuł na dole - przesunięty wyżej */}
                <div className="absolute bottom-2 left-0 right-0 p-2 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                  <h3 className="text-white text-xs font-medium line-clamp-2">
                    {video.title}
                  </h3>
                  <div className="text-white/60 text-[10px] mt-0.5">
                    {video.subscriberCount?.split(" ")[0]} wyświetleń
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Style dla ukrycia scrollbara */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
