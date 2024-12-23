"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { PolishArtist } from "./types";

interface PolishPromoArtistProps {
  artists: PolishArtist[];
}

export function PolishPromoArtist({ artists }: PolishPromoArtistProps) {
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [animatingId, setAnimatingId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [displayCount, setDisplayCount] = useState(5);

  const handleVote = (artistId: string) => {
    setAnimatingId(artistId);
    setVotes((prev) => ({
      ...prev,
      [artistId]: (prev[artistId] || 0) + 1,
    }));

    // Reset animacji po 1s
    setTimeout(() => setAnimatingId(null), 1000);
  };

  const sortedArtists = [...artists].sort(
    (a, b) => (votes[b.id] || 0) - (votes[a.id] || 0)
  );

  const getPositionClass = (index: number) => {
    switch (index) {
      case 0:
        return "text-yellow-400";
      case 1:
        return "text-gray-300";
      case 2:
        return "text-amber-600";
      default:
        return "text-gray-500";
    }
  };

  const handleShowMore = () => {
    setDisplayCount((prev) => Math.min(prev + 5, artists.length));
  };

  const handleShowLess = () => {
    setDisplayCount(5);
  };

  return (
    <section className="w-full bg-[#1a1a1a] border-y border-gray-800 py-10">
      <div className="max-w-[1400px] mx-auto px-8">
        {/* Nagłówek */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="text-red-500 text-3xl animate-pulse">★</div>
            <h2 className="text-white text-3xl font-bold tracking-tight">
              Ranking Instruktorów
            </h2>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleShowLess}
              className={`text-sm px-4 py-2 rounded-lg transition-all ${
                displayCount > 5
                  ? "bg-gray-700 hover:bg-gray-600 text-white"
                  : "bg-gray-800/30 text-gray-500 cursor-not-allowed"
              }`}
              disabled={displayCount <= 5}
            >
              Top 5
            </button>
            <button
              onClick={handleShowMore}
              className={`text-sm px-4 py-2 rounded-lg transition-all ${
                displayCount < artists.length
                  ? "bg-purple-600 hover:bg-purple-500 text-white"
                  : "bg-gray-800/30 text-gray-500 cursor-not-allowed"
              }`}
              disabled={displayCount >= artists.length}
            >
              Pokaż więcej
            </button>
          </div>
        </div>

        {/* Wykres słupkowy */}
        <div
          className={`
          grid gap-4 mb-16 transition-all duration-500
          ${
            displayCount <= 5
              ? "grid-cols-5"
              : displayCount <= 10
              ? "grid-cols-10"
              : "grid-cols-[repeat(auto-fill,minmax(100px,1fr))]"
          }
        `}
        >
          {sortedArtists.slice(0, displayCount).map((artist, index) => (
            <div key={artist.id} className="flex flex-col items-center">
              {/* Pozycja */}
              <div
                className={`text-xl font-bold mb-2 ${getPositionClass(index)}`}
              >
                #{index + 1}
              </div>

              {/* Zdjęcie nad słupkiem */}
              <div className="mb-3 relative w-12 h-12 md:w-16 md:h-16">
                <div
                  className={`
                  absolute inset-0 rounded-full 
                  ${
                    artist.isActive
                      ? "bg-gradient-to-tr from-red-500 via-purple-500 to-fuchsia-400 p-[2px]"
                      : "bg-gray-700 p-[1px]"
                  }
                `}
                >
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-[#1a1a1a]">
                    <Image
                      src={artist.image}
                      alt={artist.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Nazwa nad słupkiem */}
              <p className="text-gray-200 text-xs md:text-sm font-medium text-center mb-3 truncate max-w-[100px]">
                {artist.name}
              </p>

              {/* Słupek */}
              <div className="h-40 md:h-52 w-6 md:w-8 bg-gray-800/50 rounded-xl relative mb-3 overflow-hidden backdrop-blur-sm">
                <div
                  className={`
                    absolute bottom-0 w-full 
                    bg-gradient-to-t from-red-500 via-purple-500 to-fuchsia-400 
                    rounded-xl transition-all duration-700 ease-out 
                    shadow-lg shadow-purple-500/20
                    ${animatingId === artist.id ? "animate-pulse-fast" : ""}
                  `}
                  style={{
                    height: `${Math.min(
                      ((votes[artist.id] || 0) /
                        Math.max(...Object.values(votes), 1)) *
                        100,
                      100
                    )}%`,
                  }}
                />
                {/* Linie poziome w tle */}
                <div className="absolute inset-0 flex flex-col justify-between py-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-full h-[1px] bg-gray-700/30" />
                  ))}
                </div>
              </div>

              {/* Liczba głosów */}
              <div
                className={`
                text-white text-lg md:text-2xl font-bold
                transition-all duration-300
                ${animatingId === artist.id ? "scale-125 text-yellow-400" : ""}
              `}
              >
                {votes[artist.id] || 0}
              </div>
            </div>
          ))}
        </div>

        {/* Lista wszystkich artystów ze scrollem */}
        <div className="border-t border-gray-800/50 pt-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-white text-xl font-semibold">
              Wszyscy Instruktorzy ({artists.length})
            </h3>
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              {showAll ? "Pokaż mniej" : "Pokaż wszystkich"}
            </button>
          </div>

          <div
            className={`
            grid gap-6 transition-all duration-500
            ${
              showAll
                ? "grid-cols-5"
                : "grid-cols-5 max-h-[200px] overflow-hidden"
            }
          `}
          >
            {artists.map((artist) => (
              <div
                key={artist.id}
                className="flex flex-col items-center group p-4 rounded-lg hover:bg-gray-800/30 transition-all"
              >
                <button
                  onClick={() => handleVote(artist.id)}
                  className="relative w-20 h-20 mb-3 transform transition-all duration-300 hover:scale-105"
                >
                  {/* Gradient border z animacją */}
                  <div
                    className={`
                    absolute inset-0 rounded-full 
                    ${
                      artist.isActive
                        ? "bg-gradient-to-tr from-red-500 via-purple-500 to-fuchsia-400 p-[3px] animate-gradient-slow"
                        : "bg-gray-700 p-[2px]"
                    }
                    ${animatingId === artist.id ? "animate-ping-short" : ""}
                  `}
                  >
                    {/* Zdjęcie z efektem hover */}
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-[#1a1a1a] group-hover:opacity-90 transition-opacity">
                      <Image
                        src={artist.image}
                        alt={artist.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 112px"
                        priority={sortedArtists.indexOf(artist) < 5}
                      />
                      {/* Overlay z ikoną głosowania */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all">
                        <svg
                          className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </button>

                <div className="text-center">
                  <p className="text-gray-200 text-sm font-medium mb-1">
                    {artist.name}
                  </p>
                  <p className="text-gray-400 text-xs mb-1">
                    {artist.city} • {artist.school}
                  </p>
                  <p className="text-gray-500 text-xs">{artist.specialty}</p>
                  <p
                    className={`
                    text-sm font-medium mt-2 transition-all duration-300
                    ${
                      animatingId === artist.id
                        ? "text-yellow-400 scale-110"
                        : "text-gray-400"
                    }
                  `}
                  >
                    {votes[artist.id] || 0} głosów
                  </p>
                </div>
              </div>
            ))}
          </div>

          {!showAll && (
            <div className="h-20 bg-gradient-to-t from-[#1a1a1a] to-transparent mt-[-80px] relative pointer-events-none" />
          )}
        </div>
      </div>

      {/* Style dla animacji */}
      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient-slow {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        @keyframes ping-short {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-ping-short {
          animation: ping-short 0.5s ease-out;
        }
        .animate-pulse-fast {
          animation: pulse 0.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
