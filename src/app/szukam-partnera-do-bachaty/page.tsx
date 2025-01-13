"use client";

import { HeroSection } from "./components/HeroSection";
import { LatestProfiles } from "./components/LatestProfiles";
import { FilterProvider } from "./context/FilterContext";

export default function PartnerSearchPage() {
  return (
    <FilterProvider>
      <div className="min-h-screen">
        <HeroSection />
        <section className="max-w-[2200px] mx-auto px-4 sm:px-8 py-16">
          <div>
            <LatestProfiles />
          </div>
        </section>
      </div>
    </FilterProvider>
  );
}
