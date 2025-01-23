"use client";

import React, { useState } from "react";
import { BachataVideo } from "../types/video";
import Image from "next/image";

interface BachataVideoGridProps {
  videos: BachataVideo[];
  isLoading: boolean;
  error: string | null;
}

const DANCE_CATEGORIES = {
  BASICS: "Krok podstawowy",
  SPINS: "Obroty",
  FIGURES: "Figury",
  STYLING: "Styling",
  MUSICALITY: "Muzykalność",
  PARTNERWORK: "Praca w parze",
} as const;

type Category = keyof typeof DANCE_CATEGORIES;

// Dodaj nowy typ dla poziomów zaawansowania
type Level = "ALL" | "BASIC" | "INTERMEDIATE" | "ADVANCED";

// Dodaj stałą z poziomami
const DANCE_LEVELS = {
  ALL: "Wszystkie",
  BASIC: "Podstawowy",
  INTERMEDIATE: "Średniozaawansowany",
  ADVANCED: "Zaawansowany",
} as const;

export const BachataVideoGrid: React.FC<BachataVideoGridProps> = ({
  videos,
  isLoading,
  error,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | "ALL">(
    "ALL"
  );
  const [selectedLevel, setSelectedLevel] = useState<Level>("ALL"); // Dodaj nowy stan

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

  const filteredVideos =
    selectedCategory === "ALL"
      ? videos
      : videos.filter((video) => video.category === selectedCategory);

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

      {/* Filtry poziomów zaawansowania */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {Object.entries(DANCE_LEVELS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setSelectedLevel(key as Level)}
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
            {/* Informacje o lekcji */}
            <div className="p-4 sm:p-6">
              {/* Nagłówek z avatarem i nazwą instruktora - styl Instagram */}
              {(video.instructorName || video.instructorAvatarUrl) && (
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {video.instructorProfileUrl ? (
                      <a
                        href={video.instructorProfileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center group"
                      >
                        <div className="w-10 h-10 mr-3">
                          {video.instructorAvatarUrl ? (
                            <Image
                              src={video.instructorAvatarUrl}
                              alt={video.instructorName || "Instructor"}
                              width={40}
                              height={40}
                              className="rounded-full border-2 border-gray-300"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <span className="text-gray-600 text-base">
                                {video.instructorName?.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                        {video.instructorName && (
                          <span className="text-base font-semibold text-gray-800 group-hover:text-purple-600">
                            {video.instructorName}
                          </span>
                        )}
                      </a>
                    ) : (
                      <div className="flex items-center">
                        <div className="w-10 h-10 mr-3">
                          {video.instructorAvatarUrl ? (
                            <Image
                              src={video.instructorAvatarUrl}
                              alt={video.instructorName || "Instructor"}
                              width={40}
                              height={40}
                              className="rounded-full border-2 border-gray-300"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <span className="text-gray-600 text-base">
                                {video.instructorName?.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                        {video.instructorName && (
                          <span className="text-base font-semibold text-gray-800">
                            {video.instructorName}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  {/* Trzy kropki menu - styl Instagram */}
                  <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                    </svg>
                  </button>
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
