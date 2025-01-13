"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InstructorCard } from "./components/InstructorCard";
import { SearchBar } from "./components/SearchBar";
import { FilterSidebar } from "./components/FilterSidebar";
import { PageHeader } from "./components/PageHeader";
import { StatsSection } from "./components/StatsSection";
import { instructors } from "./data/instructors";
import { structuredData } from "./page.metadata";

export default function InstructorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    style: "all",
    priceRange: "all",
    location: "all",
  });

  // Obliczanie liczników dla filtrów
  const filterCounts = useMemo(() => {
    return {
      // Lokalizacje
      warszawa: instructors.filter((i) => i.location === "Warszawa").length,
      krakow: instructors.filter((i) => i.location === "Kraków").length,
      wroclaw: instructors.filter((i) => i.location === "Wrocław").length,
      poznan: instructors.filter((i) => i.location === "Poznań").length,
      gdansk: instructors.filter((i) => i.location === "Gdańsk").length,

      // Style
      sensual: instructors.filter((i) =>
        i.specialization.includes("Bachata Sensual")
      ).length,
      dominicana: instructors.filter((i) =>
        i.specialization.includes("Bachata Dominicana")
      ).length,
      moderna: instructors.filter((i) =>
        i.specialization.includes("Bachata Moderna")
      ).length,

      // Przedziały cenowe
      price100: instructors.filter((i) => i.hourlyRate <= 100).length,
      price150: instructors.filter(
        (i) => i.hourlyRate > 100 && i.hourlyRate <= 150
      ).length,
      price200: instructors.filter(
        (i) => i.hourlyRate > 150 && i.hourlyRate <= 200
      ).length,
      price200plus: instructors.filter((i) => i.hourlyRate > 200).length,
    };
  }, []);

  // Filtrowanie instruktorów
  const filteredInstructors = useMemo(() => {
    return instructors.filter((instructor) => {
      const matchesStyle =
        selectedFilters.style === "all" ||
        instructor.specialization.some(
          (spec: string) => spec.toLowerCase() === selectedFilters.style
        );

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
        (selectedFilters.priceRange === "200+" && instructor.hourlyRate > 200);

      const matchesLocation =
        selectedFilters.location === "all" ||
        instructor.location.toLowerCase() === selectedFilters.location;

      const matchesSearch =
        searchQuery === "" ||
        instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        instructor.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        instructor.specialization.some((spec: string) =>
          spec.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return (
        matchesStyle && matchesPriceRange && matchesLocation && matchesSearch
      );
    });
  }, [selectedFilters, searchQuery]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section z mapą Polski */}
        <div className="relative">
        

          {/* Główna zawartość hero section */}
          <PageHeader
            title="Instruktorzy Bachaty"
            subtitle="Znajdź swojego idealnego instruktora bachaty i rozpocznij taneczną przygodę już dziś!"
          />
        </div>

        <section id="search-section" className="py-12">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-[300px] flex-shrink-0">
                <div className="sticky top-4">
                  <FilterSidebar
                    selectedFilters={selectedFilters}
                    onFilterChange={(type, value) => {
                      setSelectedFilters((prev) => ({
                        ...prev,
                        [type]: value,
                      }));
                    }}
                    filterCounts={filterCounts}
                  />
                </div>
              </div>

              <div className="flex-1">
                <div className="mb-8">
                  <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Wyszukaj instruktora..."
                    lightMode
                  />

                  <div className="mt-4 flex flex-wrap gap-2">
                    {Object.entries(selectedFilters).map(
                      ([key, value]) =>
                        value !== "all" && (
                          <button
                            key={key}
                            onClick={() =>
                              setSelectedFilters((prev) => ({
                                ...prev,
                                [key]: "all",
                              }))
                            }
                            className="inline-flex items-center px-3 py-1.5 
                                   bg-purple-50 text-purple-800 rounded-full text-sm
                                   hover:bg-purple-100 transition-colors"
                          >
                            {value}
                            <span className="ml-1.5">×</span>
                          </button>
                        )
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  <AnimatePresence>
                    {filteredInstructors.map((instructor) => (
                      <motion.div
                        key={instructor.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <InstructorCard instructor={instructor} lightMode />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {filteredInstructors.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <p className="text-gray-600 mb-3">
                      Nie znaleziono instruktorów spełniających wybrane kryteria
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedFilters({
                          style: "all",
                          priceRange: "all",
                          location: "all",
                        });
                      }}
                      className="text-amber-600 hover:text-amber-700 font-medium"
                    >
                      Wyczyść filtry
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>

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
              <div
                className="bg-white rounded-xl shadow-md p-6 border border-gray-100 
                hover:border-purple-200 hover:shadow-lg transition-all"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Jak umówić się na lekcję?
                </h3>
                <p className="text-gray-600">
                  Wybierz instruktora, kliknij przycisk &quot;Umów lekcję&quot;
                  i wybierz dogodny termin z kalendarza. Potwierdzenie otrzymasz
                  mailowo.
                </p>
              </div>

              <div
                className="bg-white rounded-xl shadow-md p-6 border border-gray-100 
                hover:border-purple-200 hover:shadow-lg transition-all"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Jaki poziom zaawansowania jest wymagany?
                </h3>
                <p className="text-gray-600">
                  Nasi instruktorzy prowadzą zajęcia na wszystkich poziomach -
                  od początkującego do zaawansowanego. Każdy znajdzie coś dla
                  siebie.
                </p>
              </div>

              <div
                className="bg-white rounded-xl shadow-md p-6 border border-gray-100 
                hover:border-purple-200 hover:shadow-lg transition-all"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Czy mogę zmienić termin lekcji?
                </h3>
                <p className="text-gray-600">
                  Tak, możesz zmienić termin lekcji do 24 godzin przed
                  planowanymi zajęciami. Zmiany dokonasz w swoim profilu lub
                  kontaktując się z instruktorem.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
