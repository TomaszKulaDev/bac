"use client";

import Image from "next/image";
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

  const sortedArtists = [...artists].sort(
    (a, b) => (votes[b.id] || 0) - (votes[a.id] || 0)
  );

  return (
    <section className="w-full bg-[#1a1a1a] border-y border-gray-800 py-6">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Nagłówek */}
        <div className="flex items-center gap-2 mb-8">
          <div className="text-red-500 text-2xl">★</div>
          <h2 className="text-white text-2xl font-bold">
            Ranking Instruktorów
          </h2>
        </div>

        {/* Wykres słupkowy */}
        <div className="grid grid-cols-5 gap-8 mb-12">
          {sortedArtists.slice(0, 5).map((artist, index) => (
            <div key={artist.id} className="flex flex-col items-center">
              {/* Słupek */}
              <div className="h-48 w-6 bg-gray-800 rounded-lg relative mb-2">
                <div
                  className="absolute bottom-0 w-full bg-gradient-to-t from-red-500 via-purple-500 to-fuchsia-400 rounded-lg transition-all duration-500 ease-out"
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
              {/* Liczba głosów */}
              <span className="text-white text-lg font-bold mb-1">
                {votes[artist.id] || 0}
              </span>
            </div>
          ))}
        </div>

        {/* Lista artystów */}
        <div className="flex justify-center gap-8 py-4">
          {artists.map((artist) => (
            <div key={artist.id} className="flex flex-col items-center group">
              <button
                onClick={() => handleVote(artist.id)}
                className="relative w-24 h-24 mb-3 transform transition-transform duration-300 hover:scale-105"
              >
                {/* Gradient border */}
                <div
                  className={`
                  absolute inset-0 rounded-full 
                  ${
                    artist.isActive
                      ? "bg-gradient-to-tr from-red-500 via-purple-500 to-fuchsia-400 p-[3px]"
                      : "bg-gray-700 p-[2px]"
                  }
                `}
                >
                  {/* Zdjęcie */}
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-[#1a1a1a]">
                    <Image
                      src={artist.image}
                      alt={artist.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </button>
              {/* Nazwa */}
              <p className="text-gray-300 text-sm font-medium text-center">
                {artist.name}
              </p>
              {/* Liczba głosów */}
              <p className="text-gray-500 text-xs">
                {votes[artist.id] || 0} głosów
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
