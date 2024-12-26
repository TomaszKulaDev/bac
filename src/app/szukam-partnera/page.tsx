"use client";

import { PartnerSearch } from "./components/PartnerSearch";
import { HeroSection } from "./components/HeroSection";
import { QuickStats } from "./components/QuickStats";
import { LatestProfiles } from "./components/LatestProfiles";
import { SuccessStories } from "./components/SuccessStories";

export default function PartnerSearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-gray-50">
      <HeroSection />

      {/* Sekcja statystyk z animowanym tłem */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-purple-500/5 animate-gradient-x" />
        <QuickStats />
      </div>

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

      {/* Historie sukcesu z efektem paralaksy */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50" />
        <SuccessStories />
      </div>
    </div>
  );
}
