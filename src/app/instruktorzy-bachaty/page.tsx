"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InstructorCard } from "./components/InstructorCard";
import { FilterBar } from "./components/FilterBar";
import { PageHeader } from "./components/PageHeader";
import { Instructor } from "@/types/instructor";

// Przykładowe dane instruktorów
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
  },
  {
    id: "2",
    name: "Marek Nowak",
    image: "/images/bachata-couple.jpg",
    location: "Kraków",
    level: "expert",
    specialization: ["Bachata Dominicana", "Partnerowanie"],
    instagram: "@marek.bachata",
    achievements: ["Vice Mistrz Polski 2023"],
  },
  // ... możesz dodać więcej instruktorów
];

export default function InstructorsPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <PageHeader
          title="Elitarni Instruktorzy Bachaty"
          subtitle="Poznaj naszych mistrzów tańca, którzy łączą pasję z profesjonalizmem"
        />

        {/* Filtry */}
        <FilterBar
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
        />

        {/* Grid instruktorów */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
          <AnimatePresence>
            {instructors
              .filter(
                (instructor) =>
                  selectedFilter === "all" ||
                  instructor.level === selectedFilter
              )
              .map((instructor) => (
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
