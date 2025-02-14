"use client";

import { LatestProfiles } from "./components/LatestProfiles";
import { FilterProvider } from "./context/FilterContext";

export default function PartnerSearchPage() {
  return (
    <FilterProvider>
      <div className="min-h-screen">
        {/* Sekcja z profilami */}
        <section
          className="max-w-[2200px] mx-auto px-4 sm:px-8 py-16"
          aria-label="Lista profili tancerzy"
        >
          <h1 className="sr-only">
            Szukam Partnera do Bachaty - Znajdź Partnera do Tańca w Swojej
            Okolicy
          </h1>
          <div>
            <LatestProfiles />
          </div>
        </section>
      </div>
    </FilterProvider>
  );
}
