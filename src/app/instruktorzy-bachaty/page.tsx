"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InstructorCard } from "./components/InstructorCard";
import { SearchBar } from "./components/SearchBar";
import { CategoryTabs } from "./components/CategoryTabs";
import { Instructor } from "@/types/instructor";

const instructors: Instructor[] = [
  {
    id: "1",
    name: "Anna Kowalska",
    image: "/images/bachata-romance.jpg",
    location: "Warszawa",
    level: "master",
    specialization: ["Bachata Sensual", "Ladies Styling"],
    instagram: "@anna.bachata",
    achievements: ["Mistrzyni Polski 2023"],
    description: "Specjalizuję się w bachata sensual i ladies styling. Prowadzę zajęcia od 5 lat.",
  },
  // ... więcej instruktorów
];

export default function InstructorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Instruktorzy Bachaty
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Poznaj najlepszych instruktorów i rozpocznij swoją przygodę z bachatą
          </p>
        </div>

        {/* Search and Categories */}
        <div className="flex flex-col space-y-8 mb-12">
          <div className="max-w-2xl mx-auto w-full">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Znajdź swojego instruktora..."
            />
          </div>
          <CategoryTabs
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence>
            {instructors
              .filter(instructor =>
                (activeCategory === "all" || instructor.specialization.includes(activeCategory)) &&
                (searchQuery === "" ||
                  instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  instructor.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  instructor.specialization.some(spec =>
                    spec.toLowerCase().includes(searchQuery.toLowerCase())
                  ))
              )
              .map(instructor => (
                <InstructorCard
                  key={instructor.id}
                  instructor={instructor}
                  isHovered={hoveredCard === instructor.id}
                  onHover={setHoveredCard}
                />
              ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
