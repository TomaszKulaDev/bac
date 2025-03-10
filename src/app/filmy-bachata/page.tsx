"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { FaPlay, FaStar, FaComment, FaShare, FaHeart } from "react-icons/fa";

const BachataVideos = () => {
  const { data: session } = useSession();

  const categories = [
    "Wszystkie",
    "Występy",
    "Social Dance",
    "Konkursy",
    "Pokazy",
    "Warsztaty",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <div className="bg-[#ffd200]/10 py-12">
        <div className="max-w-[1300px] mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Filmy Bachata
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Odkryj najlepsze występy, pokazy i momenty z imprez bachatowych.
            Oglądaj, oceniaj i inspiruj się tańcem innych.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-[1300px] mx-auto px-4 py-8">
        {/* Categories */}
        <div className="flex items-center gap-4 overflow-x-auto pb-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-600 hover:bg-[#ffd200] hover:text-gray-900 hover:border-[#ffd200] transition-all whitespace-nowrap"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Add video button */}
        {session && (
          <div className="mb-8">
            <button className="bg-[#ffd200] hover:bg-[#ffd200]/90 text-gray-900 px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
              <span>Dodaj film</span>
              <FaPlay className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Videos grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example video card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="relative aspect-video bg-gray-200 group cursor-pointer">
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <FaPlay className="w-12 h-12 text-white" />
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                3:45
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-gray-200" />
                <div>
                  <h3 className="font-medium text-gray-900">Daniel & Maria</h3>
                  <p className="text-xs text-gray-500">World Bachata Masters</p>
                </div>
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Finałowy występ - Sensual Bachata
              </h2>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <FaStar className="w-4 h-4 text-[#ffd200]" />
                  <span>4.9</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaHeart className="w-4 h-4" />
                  <span>1.2k</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaComment className="w-4 h-4" />
                  <span>85</span>
                </div>
                <button className="ml-auto">
                  <FaShare className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Load more button */}
        <div className="mt-8 text-center">
          <button className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
            Załaduj więcej filmów
          </button>
        </div>
      </div>
    </div>
  );
};

export default BachataVideos;
