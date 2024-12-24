"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { InstructorRating, PolishArtist, RatingRecord } from "./types";
import { RatingModal } from "../RatingModal/RatingModal";
import { RatingBar } from "./components/RatingBar";

interface PolishPromoArtistProps {
  artists: PolishArtist[];
}

export function PolishPromoArtist({ artists }: PolishPromoArtistProps) {
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [averageRatings, setAverageRatings] = useState<Record<string, number>>(
    {}
  );
  const [animatingId, setAnimatingId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [displayCount, setDisplayCount] = useState(5);
  const listRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedArtist, setSelectedArtist] = useState<PolishArtist | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ratings, setRatings] = useState<RatingRecord>({
    ratings: {},
    votedInstructors: [],
  });
  const [sortType, setSortType] = useState<"rating" | "votes">("rating");

  const calculateWeightedAverage = (rating: InstructorRating): number => {
    // 1. Obliczanie głównej oceny (max 5 punktów)
    const mainCategories = {
      teaching: { weight: 0.4, value: rating.teaching },
      technique: { weight: 0.3, value: rating.technique },
      atmosphere: { weight: 0.3, value: rating.atmosphere },
    };

    const mainScore = Object.values(mainCategories).reduce(
      (sum, { weight, value }) => sum + value * weight,
      0
    );

    // 2. Dodatkowe punkty (0 lub 1 punkt każdy)
    const bonusPoints = [
      rating.studentDancing ? 1 : 0,
      rating.socialDancing ? 1 : 0,
    ];

    // 3. Obliczanie końcowej oceny
    const totalScore =
      mainScore + bonusPoints.reduce((sum, point) => sum + point, 0);
    const maxPossibleScore = 5 + bonusPoints.length; // 5 za główne + max 2 za dodatkowe

    // 4. Normalizacja do skali 0-5
    return (totalScore / maxPossibleScore) * 5;
  };

  const scrollList = (direction: "left" | "right") => {
    if (listRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      listRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleVote = (artistId: string) => {
    const artist = artists.find((a) => a.id === artistId);
    if (artist) {
      setSelectedArtist(artist);
      setIsModalOpen(true);
    }
  };

  const handleRatingSubmit = (rating: InstructorRating) => {
    if (!selectedArtist) return;

    setRatings((prev) => ({
      ...prev,
      ratings: {
        ...prev.ratings,
        [selectedArtist.id]: rating,
      },
      votedInstructors: [...prev.votedInstructors, selectedArtist.id],
    }));

    setVotes((prevVotes) => ({
      ...prevVotes,
      [selectedArtist.id]: (prevVotes[selectedArtist.id] || 0) + 1,
    }));

    const newAverage = calculateWeightedAverage(rating);
    setAverageRatings((prevAverages) => ({
      ...prevAverages,
      [selectedArtist.id]: newAverage,
    }));

    setAnimatingId(selectedArtist.id);
    setTimeout(() => setAnimatingId(null), 500);

    setIsModalOpen(false);
    setSelectedArtist(null);
  };

  const sortedArtists = [...artists].sort((a, b) => {
    if (sortType === "rating") {
      const aRating = averageRatings[a.id] || 0;
      const bRating = averageRatings[b.id] || 0;
      return bRating - aRating;
    } else {
      const aVotes = votes[a.id] || 0;
      const bVotes = votes[b.id] || 0;
      return bVotes - aVotes;
    }
  });

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
    setDisplayCount(artists.length);
  };

  const handleShowLess = () => {
    setDisplayCount(5);
  };

  const getTopThreeStyles = (index: number) => {
    const sizes = {
      0: {
        size: 200,
        textSize: "text-3xl",
        color: "text-yellow-400",
        nameSize: "text-2xl",
      },
      1: {
        size: 160,
        textSize: "text-2xl",
        color: "text-gray-300",
        nameSize: "text-xl",
      },
      2: {
        size: 120,
        textSize: "text-xl",
        color: "text-amber-600",
        nameSize: "text-lg",
      },
    };

    const { size, textSize, color, nameSize } =
      sizes[index as keyof typeof sizes];

    return {
      containerStyle: {
        width: `${size}px`,
        height: `${size}px`,
      },
      textClass: `text-center font-bold ${textSize} ${color}`,
      nameClass: `text-center font-bold ${nameSize} text-white mb-2`,
    };
  };

  // Znajdujemy maksymalną liczbę głosów
  const maxVotes = Math.max(...Object.values(votes));

  // Helper function do renderowania artysty
  const renderTopArtist = (artist: PolishArtist, index: number) => {
    const styles = getTopThreeStyles(index);
    return (
      <>
        <div className="relative" style={styles.containerStyle}>
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
            <div className="relative w-full h-full rounded-full overflow-hidden bg-gray-900">
              <Image
                src={artist.image}
                alt={artist.name}
                fill
                className="object-cover"
                sizes={`${styles.containerStyle.width}px`}
                priority
              />
            </div>
          </div>
        </div>

        <p className={`${styles.nameClass} mt-4 mb-2`}>{artist.name}</p>

        <div className={styles.textClass}>
          <div className="mb-1">{votes[artist.id] || 0} głosów</div>
          {averageRatings[artist.id] ? (
            <div>{averageRatings[artist.id].toFixed(1)}/5.0</div>
          ) : null}
        </div>
      </>
    );
  };

  return (
    <section
      ref={containerRef}
      className={`
        w-full bg-[#1a1a1a] border-y border-gray-800 
        relative transition-all duration-500 ease-in-out
        ${
          isExpanded ? "max-h-none mb-8" : "max-h-[780px] overflow-hidden mb-10"
        }
      `}
    >
      <div className="max-w-[1400px] mx-auto px-8 py-10">
        <div className="flex items-center justify-between mb-12">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="text-red-500 text-3xl animate-pulse">★</div>
              <h2 className="text-white text-3xl font-bold tracking-tight">
                {`Ranking Duetów Instruktorskich Bachaty w Polsce ${new Date().getFullYear()}`}
              </h2>
            </div>
            <p className="text-gray-400 text-lg ml-10">
              Głosuj na najlepsze duety instruktorskie Bachaty w Polsce!
            </p>
          </div>
          <div className="flex gap-4">
            <div className="flex bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setSortType("rating")}
                className={`px-4 py-2 rounded-lg transition-all text-sm ${
                  sortType === "rating"
                    ? "bg-purple-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Najwyżej Oceniani
              </button>
              <button
                onClick={() => setSortType("votes")}
                className={`px-4 py-2 rounded-lg transition-all text-sm ${
                  sortType === "votes"
                    ? "bg-purple-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Najpopularniejsi
              </button>
            </div>
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
              Pokaż wszystkich
            </button>
          </div>
        </div>

        <div className="text-gray-400 text-sm mb-6">
          Sortowanie:{" "}
          {sortType === "rating" ? "według ocen" : "według popularności"}
        </div>

        <div className="flex justify-between gap-8 mb-12">
          {/* Lewa strona - Podium */}
          <div className="w-1/2">
            <h3 className="text-white text-xl font-semibold mb-6">TOP 3</h3>
            <div className="flex justify-center items-end gap-4 relative">
              {/* 2 miejsce */}
              <div className="flex flex-col items-center translate-y-[-20px]">
                {renderTopArtist(sortedArtists[1], 1)}
                <div className="h-[80px] w-[100px] bg-gradient-to-t from-gray-300 to-gray-200 rounded-t-lg mt-2" />
              </div>

              {/* 1 miejsce */}
              <div className="flex flex-col items-center translate-y-[-40px]">
                {renderTopArtist(sortedArtists[0], 0)}
                <div className="h-[100px] w-[100px] bg-gradient-to-t from-yellow-400 to-yellow-300 rounded-t-lg mt-2" />
              </div>

              {/* 3 miejsce */}
              <div className="flex flex-col items-center">
                {renderTopArtist(sortedArtists[2], 2)}
                <div className="h-[60px] w-[100px] bg-gradient-to-t from-amber-700 to-amber-600 rounded-t-lg mt-2" />
              </div>
            </div>
          </div>

          {/* Prawa strona - Top 5 */}
          <div className="w-1/2">
            <h3 className="text-white text-xl font-semibold mb-6">Top 5</h3>
            <div className="space-y-4">
              {sortedArtists.slice(0, 5).map((artist, index) => (
                <div
                  key={artist.id}
                  className={`
                    flex items-center gap-4 p-4 rounded-lg
                    ${index < 3 ? "bg-gray-800/50" : "bg-gray-800/30"}
                    hover:bg-gray-800/70 transition-all duration-300
                  `}
                >
                  {/* Numer pozycji */}
                  <div
                    className={`
                    w-8 h-8 flex items-center justify-center rounded-full
                    ${getPositionClass(index)} bg-gray-900/50 font-bold
                  `}
                  >
                    {index + 1}
                  </div>

                  {/* Zdjęcie */}
                  <div className="relative w-12 h-12">
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
                      <div className="relative w-full h-full rounded-full overflow-hidden bg-gray-900">
                        <Image
                          src={artist.image}
                          alt={artist.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Informacje */}
                  <div className="flex-1">
                    <div className="text-white font-medium">{artist.name}</div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-yellow-400">
                        {averageRatings[artist.id]?.toFixed(1) || "0.0"}/5.0
                      </span>
                      <span className="text-gray-400">
                        {votes[artist.id] || 0} głosów
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800/50 pt-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-white text-xl font-semibold">
              Wszyscy Instruktorzy ({artists.length})
            </h3>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => scrollList("left")}
                  className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors"
                >
                  <svg
                    className="w-5 h-5"
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
                  onClick={() => scrollList("right")}
                  className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors"
                >
                  <svg
                    className="w-5 h-5"
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

              <button
                onClick={() => setShowAll(!showAll)}
                className="text-sm px-4 py-2 rounded-lg transition-all
                  bg-purple-600 hover:bg-purple-500 text-white"
              >
                {showAll ? "Zwiń listę" : "Pokaż wszystkich"}
              </button>
            </div>
          </div>

          <div
            ref={listRef}
            className={`
              flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory
              scroll-smooth pb-4 transition-all duration-500
              ${!showAll ? "max-h-[200px]" : "flex-wrap"}
            `}
          >
            {artists.map((artist) => (
              <div key={artist.id} className="flex-none w-[200px] snap-start">
                <div className="flex flex-col items-center group p-4 rounded-lg hover:bg-gray-800/30 transition-all">
                  <button
                    onClick={() => handleVote(artist.id)}
                    className="relative w-20 h-20 mb-3 transform transition-all duration-300 hover:scale-105"
                  >
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
                      <div className="relative w-full h-full rounded-full overflow-hidden bg-[#1a1a1a] group-hover:opacity-90 transition-opacity">
                        <Image
                          src={artist.image}
                          alt={artist.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 112px"
                          priority={sortedArtists.indexOf(artist) < 5}
                        />
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
                    {artist.specialty && (
                      <p className="text-gray-500 text-xs mb-2">
                        {artist.specialty}
                      </p>
                    )}
                    {artist.socialLinks && (
                      <div className="flex justify-center gap-2">
                        {artist.socialLinks.instagram && (
                          <a
                            href={`https://instagram.com/${artist.socialLinks.instagram.replace(
                              "@",
                              ""
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:text-purple-300 transition-colors"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                          </a>
                        )}
                        {artist.socialLinks.facebook && (
                          <a
                            href={`https://facebook.com/${artist.socialLinks.facebook}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                            </svg>
                          </a>
                        )}
                        {artist.socialLinks.youtube && (
                          <a
                            href={`https://youtube.com/${artist.socialLinks.youtube}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                            </svg>
                          </a>
                        )}
                      </div>
                    )}
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
              </div>
            ))}
          </div>

          {!showAll && (
            <div className="h-20 bg-gradient-to-t from-[#1a1a1a] to-transparent mt-[-80px] relative pointer-events-none" />
          )}
        </div>
      </div>

      <div
        className={`
          absolute bottom-0 left-0 right-0
          transition-opacity duration-500
          ${isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"}
        `}
      >
        <div className="h-32 bg-gradient-to-t from-[#1a1a1a] to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="
              flex flex-col items-center gap-1
              text-gray-400 hover:text-white
              transition-colors duration-300
              group
              bg-[#1a1a1a] p-2 rounded-full
            "
          >
            <span className="text-sm">
              {isExpanded ? "Pokaż mniej" : "Pokaż więcej"}
            </span>
            <div
              className="
                w-8 h-8 
                rounded-full
                border border-gray-700
                flex items-center justify-center
                group-hover:border-gray-500
                transition-all duration-300
              "
            >
              <svg
                className={`
                  w-4 h-4 
                  transition-transform duration-300
                  ${isExpanded ? "-rotate-180" : ""}
                `}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="flex justify-center py-8">
          <button
            onClick={() => {
              setIsExpanded(false);
              containerRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
            className="
              flex flex-col items-center gap-2
              text-gray-400 hover:text-white
              transition-colors duration-300
              group
            "
          >
            <span className="text-sm">Pokaż mniej</span>
            <div
              className="
              w-8 h-8 
              rounded-full
              border border-gray-700
              flex items-center justify-center
              group-hover:border-gray-500
              transition-all duration-300
            "
            >
              <svg
                className="w-4 h-4 -rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </button>
        </div>
      )}

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
        @keyframes sparkle {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 100% 100%;
          }
        }
        .animate-sparkle {
          animation: sparkle 20s linear infinite;
        }
      `}</style>

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {selectedArtist && (
        <RatingModal
          artist={selectedArtist}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedArtist(null);
          }}
          onSubmit={handleRatingSubmit}
        />
      )}
    </section>
  );
}
