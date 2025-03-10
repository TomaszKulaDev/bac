"use client";

import React from "react";
import { useSession } from "next-auth/react";
import {
  FaHeart,
  FaComment,
  FaShare,
  FaExclamationTriangle,
} from "react-icons/fa";

const BachataStories = () => {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <div className="bg-[#ffd200]/10 py-12">
        <div className="max-w-[1300px] mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Historie Bachaty
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Podziel się swoimi doświadczeniami z imprez bachatowych. Opowiedz o
            magicznych momentach, które sprawiły, że pokochałeś bachatę, lub o
            sytuacjach, które warto przedyskutować.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-[1300px] mx-auto px-4 py-8">
        {/* Add story button */}
        <div className="mb-8">
          {session ? (
            <button className="bg-[#ffd200] hover:bg-[#ffd200]/90 text-gray-900 px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
              <span>Dodaj swoją historię</span>
              <FaHeart className="w-4 h-4" />
            </button>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <p className="text-gray-600">
                Zaloguj się, aby podzielić się swoją historią z innymi
                tancerzami.
              </p>
            </div>
          )}
        </div>

        {/* Stories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example story card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div>
                  <h3 className="font-medium text-gray-900">Anna Kowalska</h3>
                  <p className="text-sm text-gray-500">2 godziny temu</p>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Mój pierwszy social
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
                Pamiętam swój pierwszy social jak dziś. Byłam przerażona, ale
                życzliwość innych tancerzy sprawiła, że poczułam się jak w
                domu...
              </p>
              <div className="flex items-center gap-6 text-gray-500">
                <button className="flex items-center gap-2 hover:text-gray-900 transition-colors">
                  <FaHeart className="w-4 h-4" />
                  <span>24</span>
                </button>
                <button className="flex items-center gap-2 hover:text-gray-900 transition-colors">
                  <FaComment className="w-4 h-4" />
                  <span>12</span>
                </button>
                <button className="flex items-center gap-2 hover:text-gray-900 transition-colors">
                  <FaShare className="w-4 h-4" />
                </button>
                <button className="flex items-center gap-2 hover:text-red-500 transition-colors ml-auto">
                  <FaExclamationTriangle className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Load more button */}
        <div className="mt-8 text-center">
          <button className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
            Załaduj więcej historii
          </button>
        </div>
      </div>
    </div>
  );
};

export default BachataStories;
