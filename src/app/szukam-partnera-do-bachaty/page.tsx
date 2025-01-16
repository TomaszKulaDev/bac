"use client";

import { HeroSection } from "./components/HeroSection";
import { LatestProfiles } from "./components/LatestProfiles";
import { FilterProvider } from "./context/FilterContext";
import { PromoBanner } from "./components/PromoBanner";

export default function PartnerSearchPage() {
  return (
    <FilterProvider>
      <div className="min-h-screen">
        <PromoBanner />
        {/* Sekcja z profilami */}
        <section
          className="max-w-[2200px] mx-auto px-4 sm:px-8 py-16"
          aria-label="Lista profili tancerzy"
        >
          <h1 className="sr-only">Szukaj Partnera do Bachaty</h1>
          <div>
            <LatestProfiles />
          </div>
        </section>
      </div>
    </FilterProvider>
  );
}
