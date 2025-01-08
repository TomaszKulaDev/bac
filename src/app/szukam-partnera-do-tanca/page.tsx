"use client";

import { HeroSection } from "./components/HeroSection";
import { LatestProfiles } from "./components/LatestProfiles";
import { InviteBanner } from "./components/InviteBanner";
import { QuickAds } from "./components/QuickAds";
import { FilterProvider } from "./context/FilterContext";

export default function PartnerSearchPage() {
  return (
    <FilterProvider>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-gray-50">
        <HeroSection />
        <section className="max-w-[2200px] mx-auto px-4 sm:px-8 py-16">
          <div>
            <QuickAds />
            <InviteBanner />
            <LatestProfiles />
          </div>
        </section>
      </div>
    </FilterProvider>
  );
}
