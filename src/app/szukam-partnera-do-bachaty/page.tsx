"use client";

import { HeroSection } from "./components/HeroSection";
import { LatestProfiles } from "./components/LatestProfiles";
import { FilterProvider } from "./context/FilterContext";
import dynamic from "next/dynamic";

// Dynamiczny import mapy bez SSR
const InteractiveMap = dynamic(
  () =>
    import("./features/dancers-map/components/InteractiveMap").then(
      (mod) => mod.InteractiveMap
    ),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[700px] bg-gray-100 rounded-xl flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    ),
  }
);

export default function PartnerSearchPage() {
  return (
    <FilterProvider>
      <div className="min-h-screen">
        <HeroSection />
        {/* Sekcja z mapą */}
        <section className="flex flex-row gap-8 py-16 bg-gray-50">
          <div className="w-1/2 px-8">
            <h2 className="text-3xl font-bold mb-6">
              Znajdź partnera do tańca
            </h2>
            <p className="text-gray-600 mb-4">
              Nasza społeczność tancerzy bachaty stale się rozwija. Dołącz do
              nas i znajdź idealnego partnera do tańca w swojej okolicy.
            </p>
          </div>
          <div className="w-1/2">
            <InteractiveMap />
          </div>
        </section>

        {/* Sekcja z profilami */}
        <section className="max-w-[2200px] mx-auto px-4 sm:px-8 py-16">
          <div>
            <LatestProfiles />
          </div>
        </section>
      </div>
    </FilterProvider>
  );
}
