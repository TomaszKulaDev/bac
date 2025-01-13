"use client";

import { HeroSection } from "./components/HeroSection";
import { LatestProfiles } from "./components/LatestProfiles";
import { InviteBanner } from "./components/InviteBanner";
import { QuickAds } from "./components/QuickAds";
import { FilterProvider } from "./context/FilterContext";
import { jsonLd } from "./page.metadata";

export default function PartnerSearchPage() {
  return (
    <FilterProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen">
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
