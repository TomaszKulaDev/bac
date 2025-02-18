"use client";

import React, { useState } from "react";
import {
  BachataVideo,
  DANCE_LEVELS,
  DANCE_CATEGORIES,
  DanceLevel,
  Category,
} from "../types/video";
import Image from "next/image";
import { VideoCard } from "./VideoCard/VideoCard";

interface BachataVideoGridProps {
  videos: BachataVideo[];
  isLoading: boolean;
  error: string | null;
}

export const BachataVideoGrid: React.FC<BachataVideoGridProps> = ({
  videos,
  isLoading,
  error,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | "ALL">(
    "ALL"
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  if (error)
    return <div className="text-red-500 text-center py-8">{error}</div>;
  if (!videos || videos.length === 0)
    return <div className="text-gray-500 text-center py-8">Brak filmów</div>;

  const filteredVideos = videos.filter((video) => {
    return selectedCategory === "ALL" || video.category === selectedCategory;
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
              Wybierz kategorię i rozpocznij naukę z najlepszymi instruktorami Instagrama.
            </span>
          </div>
        </p>
      </div>

      {/* Filtry kategorii */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        <button
          onClick={() => setSelectedCategory("ALL")}
          className={`px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-medium ${
            selectedCategory === "ALL"
              ? "bg-orange-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          } transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50`}
        >
          Wszystkie
        </button>
        {Object.entries(DANCE_CATEGORIES).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key as Category)}
            className={`px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-medium ${
              selectedCategory === key
                ? "bg-orange-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            } transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Grid z filmami */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      {/* Komunikat o braku filmów */}
      {filteredVideos.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          Brak filmów w wybranej kategorii
        </div>
      )}
    </div>
  );
};
