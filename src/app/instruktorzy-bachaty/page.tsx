"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InstructorCard } from "./components/InstructorCard";
import { SearchBar } from "./components/SearchBar";
import { FilterSidebar } from "./components/FilterSidebar";
import { PageHeader } from "./components/PageHeader";
import { StatsSection } from "./components/StatsSection";
import { instructors } from "@/data/instructors";

export default function InstructorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    style: "all",
    priceRange: "all",
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-amber-50">
      {/* Header z wyszukiwarką */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-16">
          <PageHeader
            title="Znajdź Swojego Instruktora Bachaty"
            subtitle="Profesjonalni instruktorzy, elastyczne terminy, spersonalizowane lekcje"
            gradient="from-amber-500 via-amber-400 to-amber-600"
          />
          <div className="max-w-2xl mx-auto mt-12">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Szukaj po nazwie, lokalizacji lub stylu tańca..."
              lightMode
            />
          </div>
        </div>
      </div>

      {/* Główna zawartość */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar z filtrami */}
          <div className="lg:w-1/4 lg:sticky lg:top-8 lg:self-start">
            <FilterSidebar
              selectedFilters={selectedFilters}
              onFilterChange={(type, value) =>
                setSelectedFilters((prev) => ({ ...prev, [type]: value }))
              }
              lightMode
            />
          </div>

          {/* Lista instruktorów */}
          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              <AnimatePresence>
                {instructors
                  .filter((instructor) => {
                    const matchesStyle =
                      selectedFilters.style === "all" ||
                      instructor.specialization.includes(selectedFilters.style);

                    const matchesPriceRange =
                      selectedFilters.priceRange === "all" ||
                      (selectedFilters.priceRange === "100" &&
                        instructor.hourlyRate <= 100) ||
                      (selectedFilters.priceRange === "150" &&
                        instructor.hourlyRate > 100 &&
                        instructor.hourlyRate <= 150) ||
                      (selectedFilters.priceRange === "200" &&
                        instructor.hourlyRate > 150 &&
                        instructor.hourlyRate <= 200) ||
                      (selectedFilters.priceRange === "200+" &&
                        instructor.hourlyRate > 200);

                    const matchesSearch =
                      searchQuery === "" ||
                      instructor.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      instructor.location
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      instructor.specialization.some((spec) =>
                        spec.toLowerCase().includes(searchQuery.toLowerCase())
                      );

                    return matchesStyle && matchesPriceRange && matchesSearch;
                  })
                  .map((instructor) => (
                    <InstructorCard
                      key={instructor.id}
                      instructor={instructor}
                      lightMode
                    />
                  ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Sekcja statystyk */}
      <div className="bg-gradient-to-b from-amber-50 to-white">
        <StatsSection lightMode />
      </div>

      {/* Sekcja FAQ */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Często Zadawane Pytania
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Jak umówić się na lekcję?
              </h3>
              <p className="text-gray-600">
                Wybierz instruktora, kliknij przycisk &quot;Umów lekcję&quot; i
                wybierz dogodny termin z kalendarza. Potwierdzenie otrzymasz
                mailowo.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Jaki poziom zaawansowania jest wymagany?
              </h3>
              <p className="text-gray-600">
                Nasi instruktorzy prowadzą zajęcia na wszystkich poziomach - od
                początkującego do zaawansowanego. Każdy znajdzie coś dla siebie.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Czy mogę zmienić termin lekcji?
              </h3>
              <p className="text-gray-600">
                Tak, możesz zmienić termin lekcji do 24 godzin przed planowanymi
                zajęciami. Zmiany dokonasz w swoim profilu lub kontaktując się z
                instruktorem.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
