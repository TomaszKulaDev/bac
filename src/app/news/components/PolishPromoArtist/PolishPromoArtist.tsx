"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PolishArtist } from "./types";

interface PolishPromoArtistProps {
  artists: PolishArtist[];
}

export function PolishPromoArtist({ artists }: PolishPromoArtistProps) {
  const [votes, setVotes] = useState<Record<string, number>>({});

  const handleVote = (artistId: string) => {
    setVotes((prev) => ({
      ...prev,
      [artistId]: (prev[artistId] || 0) + 1,
    }));
  };

  // Sortujemy artystów według liczby głosów
  const sortedArtists = [...artists].sort(
    (a, b) => (votes[b.id] || 0) - (votes[a.id] || 0)
  );

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
            Ranking Instruktorów
          </h2>
        </div>

        {/* Wykres słupkowy */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          {sortedArtists.slice(0, 5).map((artist, index) => (
            <div key={artist.id} className="flex flex-col items-center">
              <div className="h-32 w-4 bg-gray-800 rounded-t-lg relative">
                <div
                  className="absolute bottom-0 w-full bg-gradient-to-t from-red-500 to-purple-500 rounded-t-lg transition-all duration-500"
                  style={{
                    height: `${Math.min(
                      ((votes[artist.id] || 0) /
                        Math.max(...Object.values(votes), 1)) *
                        100,
                      100
                    )}%`,
                  }}
                />
              </div>
              <span className="text-white text-sm mt-1">
                {votes[artist.id] || 0}
              </span>
            </div>
          ))}
        </div>

        {/* Lista artystów */}
        <div className="flex gap-4 overflow-x-auto py-4 scrollbar-hide">
          {artists.map((artist) => (
            <div key={artist.id} className="flex-none group">
              {/* Zdjęcie ze stylem Instagram Stories */}
              <button
                onClick={() => handleVote(artist.id)}
                className="block w-20 cursor-pointer"
              >
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
                {/* Liczba głosów */}
                <p className="text-xs text-center text-gray-500">
                  {votes[artist.id] || 0} głosów
                </p>
              </button>
            </div>
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
