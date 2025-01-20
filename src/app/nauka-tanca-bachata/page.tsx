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
import { Course } from "./types";

export default function BachataLearningPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>("all");

  const filteredCourses =
    selectedLevel === "all"
      ? mockCourses
      : mockCourses.filter((course) => course.level === selectedLevel);

  console.log(
    "Filtered courses:",
    filteredCourses.map((c) => c.id)
  );

  return (
    <div className="space-y-8">
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
              level: course.level,
              duration: course.totalDuration,
              thumbnail: course.thumbnail,
              description: course.description,
            }}
          />
        ))}
      </div>
    </div>
  );
}
