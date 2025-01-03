"use client";

import { PartnerSearch } from "./components/PartnerSearch";
import { HeroSection } from "./components/HeroSection";
import { LatestProfiles } from "./components/LatestProfiles";
import { QuickAds } from "./components/QuickAds";
import { FilterProvider } from "./context/FilterContext";

export default function PartnerSearchPage() {
  return (
    <FilterProvider>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-gray-50">
        <HeroSection />
        <section className="max-w-[2200px] mx-auto pl-8 pr-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
            <div>
              <PartnerSearch />
            </div>
            <div>
              <QuickAds />
              <LatestProfiles />
            </div>
          </div>
        </section>
      </div>
    </FilterProvider>
  );
}
