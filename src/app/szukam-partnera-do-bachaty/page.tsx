"use client";

import { HeroSection } from "./components/HeroSection";
import { LatestProfiles } from "./components/LatestProfiles";
import { FilterProvider } from "./context/FilterContext";
import { MapSidebar } from "./features/dancers-map/components/MapSidebar";
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
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
        <section className="py-16 bg-gray-50">
          <div className="max-w-8xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row">
              {/* Lewa strona - sidebar */}
              <div className="lg:w-[51%]">
                <MapSidebar />
              </div>

              {/* Prawa strona - mapa */}
              <div className="lg:w-[49%]">
                <InteractiveMap />
              </div>
            </div>
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
