"use client";

import { useState } from "react";
import { PartnerSearch } from "./components/PartnerSearch";
import { HeroSection } from "./components/HeroSection";
import { LatestProfiles } from "./components/LatestProfiles";
import { FaThList, FaThLarge } from "react-icons/fa";

export default function PartnerSearchPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-gray-50">
      <HeroSection />
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-end mb-6">
          <div className="flex gap-2 bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-all ${
                viewMode === "grid"
                  ? "bg-red-100 text-red-600"
                  : "text-gray-400"
              }`}
            >
              <FaThLarge />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-all ${
                viewMode === "list"
                  ? "bg-red-100 text-red-600"
                  : "text-gray-400"
              }`}
            >
              <FaThList />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <PartnerSearch />
          </div>
          <div className="lg:col-span-3">
            <LatestProfiles />
          </div>
        </div>
      </section>
    </div>
  );
}
