"use client";

import { PartnerSearch } from "./components/PartnerSearch";
import { HeroSection } from "./components/HeroSection";
import { LatestProfiles } from "./components/LatestProfiles";


export default function PartnerSearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-gray-50">
      <HeroSection />
      {/* Główna sekcja wyszukiwania */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 lg:sticky lg:top-24 lg:self-start">
            <PartnerSearch />
          </div>
          <div className="lg:col-span-2">
            <LatestProfiles />
          </div>
        </div>
      </section>
    </div>
  );
}
