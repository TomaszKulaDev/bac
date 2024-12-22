"use client";

import Image from "next/image";
import Link from "next/link";
import { PolishArtist } from "./types";

interface PolishPromoArtistProps {
  artists: PolishArtist[];
}

export function PolishPromoArtist({ artists }: PolishPromoArtistProps) {
  return (
    <section className="w-full bg-[#1a1a1a] border-y border-gray-800">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex items-center gap-2 pt-4 pb-3">
          <svg
            className="w-5 h-5 text-red-600 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          <h2 className="text-white text-lg font-medium">
            Poland Top Instructors
          </h2>
        </div>

        <div className="flex gap-4 overflow-x-auto py-4 scrollbar-hide">
          {artists.map((artist) => (
            <Link
              key={artist.id}
              href={`/artists/${artist.id}`}
              className="flex-none group"
            >
              {/* Okrągłe zdjęcie ze stylem Instagram Stories */}
              <div
                className={`
                w-20 h-20 rounded-full 
                ${
                  artist.isActive
                    ? "p-[3px] bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500"
                    : "p-[2px] bg-gray-700"
                }
              `}
              >
                <div className="rounded-full p-[2px] bg-[#1a1a1a]">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={artist.image}
                      alt={artist.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              {/* Nazwa pod zdjęciem */}
              <p className="mt-1 text-xs text-center text-gray-400 truncate w-20">
                {artist.name}
              </p>
            </Link>
          ))}
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
