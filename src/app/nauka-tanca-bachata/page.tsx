/**
 * Strona główna kursu tańca bachata.
 * Główne funkcjonalności:
 * - Wyświetlanie listy dostępnych kursów
 * - Filtrowanie kursów według poziomu zaawansowania
 * - Responsywny układ kart kursów (1-3 kolumny)
 *
 * Komponent korzysta z:
 * - LevelSelector do wyboru poziomu zaawansowania
 * - LessonCard do wyświetlania pojedynczego kursu
 * - mockCourses jako źródła danych o kursach
 */

"use client";

import React, { useState } from "react";
import LevelSelector from "./components/LevelSelector";
import LessonCard from "./components/LessonCard";
import { mockCourses } from "./data/mockCourse";
import { useNaukaBachataVideos } from "./hooks/useNaukaBachataVideos";
import { BachataVideoGrid } from "./components/BachataVideoGrid";

export default function BachataLearningPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const { videos, isLoading, error } = useNaukaBachataVideos();

  const filteredCourses =
    selectedLevel === "all"
      ? mockCourses
      : mockCourses.filter((course) => course.level === selectedLevel);

  return (
    <div className="space-y-2">
      {/* Sekcja Social Dance Videos */}
      <section className="space-y-4">
        <BachataVideoGrid videos={videos} isLoading={isLoading} error={error} />
      </section>

      {/* Sekcja Kursów */}
      <section className="space-y-6">
        <div className="border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Crash Cours Bachaty
          </h2>
          <p className="text-gray-600 mt-2">
            Odkryj unikalne kursy bachaty prowadzone przez międzynarodowych
            instruktorów! Każdy z nich prezentuje własne podejście do tańca i
            techniki ruchu. Znajdź idealny kurs dla siebie, niezależnie od
            poziomu zaawansowania.
          </p>
        </div>

        <LevelSelector
          selectedLevel={selectedLevel}
          onLevelChange={setSelectedLevel}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <LessonCard
              key={course.id}
              lesson={{
                id: course.id,
                title: course.title,
                duration: course.totalDuration,
                thumbnail: course.thumbnail,
                description: course.description,
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
