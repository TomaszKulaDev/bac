"use client";

import Image from "next/image";
import Link from "next/link";
import { BachataVideoItem } from "./types";

interface BachataVideoArtistProps {
  videos: BachataVideoItem[];
}

export function BachataVideoArtist({ videos }: BachataVideoArtistProps) {
  const limitedVideos = videos.slice(0, 8);

  return (
    <section className="w-full bg-[#0f0f0f] py-6">
      <div className="max-w-[1400px] mx-auto px-4">
        {/* Nagłówek Shorts */}
        <div className="flex items-center gap-2 mb-4">
          <svg
            className="w-5 h-5 text-red-600 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M17.77 10.32c-.77-.32-1.2-.5-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25zM10 14.65v-5.3L15 12l-5 2.65z" />
          </svg>
          <h2 className="text-white text-lg font-medium">
            Top World Bachata Artist
          </h2>
        </div>

        {/* Grid z filmami */}
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
          {limitedVideos.map((video) => (
            <Link
              key={video.id}
              href={`/videos/${video.url}`}
              className="group relative aspect-[9/16] rounded-xl overflow-hidden bg-neutral-800"
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

              {/* Tytuł na dole */}
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white text-xs font-medium line-clamp-2">
                  {video.title}
                </h3>
                <div className="text-white/60 text-[10px] mt-1">
                  {video.subscriberCount?.split(" ")[0]} wyświetleń
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
