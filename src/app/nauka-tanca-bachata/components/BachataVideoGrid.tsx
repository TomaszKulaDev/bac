"use client";

import React, { useState } from "react";
import { BachataVideo } from "../types/video";
import Image from "next/image";
import { DANCE_LEVELS, DanceLevel } from "../types/video";

interface BachataVideoGridProps {
  videos: BachataVideo[];
  isLoading: boolean;
  error: string | null;
}

const DANCE_CATEGORIES = {
  BASIC: "Krok podstawowy",
  SPINS: "Obroty",
  FIGURES: "Figury",
  STYLING: "Styling",
  MUSICALITY: "Muzykalność",
  PARTNERWORK: "Praca w parze",
} as const;

type Category = keyof typeof DANCE_CATEGORIES;

export const BachataVideoGrid: React.FC<BachataVideoGridProps> = ({
  videos,
  isLoading,
  error,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | "ALL">(
    "ALL"
  );
  const [selectedLevel, setSelectedLevel] = useState<DanceLevel>("ALL");

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  if (error)
    return <div className="text-red-500 text-center py-8">{error}</div>;
  if (!videos || videos.length === 0)
    return <div className="text-gray-500 text-center py-8">Brak filmów</div>;

  const filteredVideos = videos.filter((video) => {
    const matchesCategory =
      selectedCategory === "ALL" || video.category === selectedCategory;
    const matchesLevel =
      selectedLevel === "ALL" || video.level === selectedLevel;
    return matchesCategory && matchesLevel;
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Nagłówek z opisem */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
          Nauka Bachaty Online
        </h1>
        <p className="text-gray-600 text-lg sm:text-xl">
          <div className="flex items-center justify-center gap-2">
            <span>
              Wybierz kategorię i rozpocznij naukę z najlepszymi instruktorami
            </span>
            <Image
              src="/images/instagramIco/Inst.jpg"
              alt="Instagram"
              width={32}
              height={32}
              className="w-6 h-6 rounded-lg"
              priority
            />
            <span>Instagrama.</span>
          </div>
        </p>
      </div>

      {/* Filtry poziomów */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {Object.entries(DANCE_LEVELS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setSelectedLevel(key as DanceLevel)}
            className={`px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-medium ${
              selectedLevel === key
                ? "bg-purple-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            } transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Filtry kategorii */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        <button
          onClick={() => setSelectedCategory("ALL")}
          className={`px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-medium ${
            selectedCategory === "ALL"
              ? "bg-purple-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          } transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50`}
        >
          Wszystkie
        </button>
        {Object.entries(DANCE_CATEGORIES).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key as Category)}
            className={`px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-medium ${
              selectedCategory === key
                ? "bg-purple-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            } transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Siatka z filmami */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Instruktor z avatarem */}
            {(video.instructorName || video.instructorAvatarUrl) && (
              <div className="flex items-center space-x-2 mb-2">
                {video.instructorProfileUrl ? (
                  <a
                    href={video.instructorProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    {video.instructorAvatarUrl && (
                      <Image
                        src={video.instructorAvatarUrl}
                        alt={video.instructorName || "Instructor"}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    )}
                    {video.instructorName && (
                      <span className="text-sm hover:underline">
                        {video.instructorName}
                      </span>
                    )}
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.509-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2z" />
                    </svg>
                  </a>
                ) : (
                  <>
                    {video.instructorAvatarUrl && (
                      <Image
                        src={video.instructorAvatarUrl}
                        alt={video.instructorName || "Instructor"}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    )}
                    {video.instructorName && (
                      <span className="text-sm text-gray-600">
                        {video.instructorName}
                      </span>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Video */}
            <div className="relative">
              <video
                className="w-full aspect-video object-cover rounded-lg"
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/${video.publicId}`}
                controls
                preload="none"
                poster={video.thumbnailUrl}
              />
            </div>

            {/* Akcje pod filmem - styl Instagram */}
            <div className="flex items-center justify-between mt-4 mb-3">
              <div className="flex items-center space-x-4">
                <span className="flex items-center text-gray-600">
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {Math.floor(video.duration / 60)}min
                </span>
                <span className="bg-purple-100 text-purple-700 text-xs sm:text-sm px-3 py-1.5 rounded-full">
                  {DANCE_CATEGORIES[video.category as Category]}
                </span>
                <span className="bg-blue-100 text-blue-700 text-xs sm:text-sm px-3 py-1.5 rounded-full">
                  {DANCE_LEVELS[video.level]}
                </span>
              </div>
            </div>

            {/* Tytuł i opis */}
            <div className="mt-2">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                {video.title}
              </h3>
              {video.description && (
                <p className="text-sm text-gray-600 mt-1">
                  {video.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Komunikat gdy brak filmów w kategorii */}
      {filteredVideos.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          Brak filmów w wybranej kategorii
        </div>
      )}
    </div>
  );
};
