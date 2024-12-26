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
        <section className="max-w-[1920px] mx-auto pl-8 pr-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
            <div className="lg:col-span-1">
              <PartnerSearch />
            </div>
            <div className="lg:col-span-5">
              <QuickAds />
              <LatestProfiles />
            </div>
          </div>
        </section>
      </div>
    </FilterProvider>
  );
}
