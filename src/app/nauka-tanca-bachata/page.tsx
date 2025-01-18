"use client";

import React, { useState } from "react";
import LevelSelector from "./components/LevelSelector";
import LessonCard from "./components/LessonCard";

interface Lesson {
  id: string;
  title: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  thumbnail: string;
  description: string;
}

export default function BachataLearningPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>("all");

  const lessons: Lesson[] = [
    {
      id: "1",
      title: "Podstawowe kroki bachaty",
      level: "beginner",
      duration: "15:00",
      thumbnail: "/images/lessons/basic-steps.jpg",
      description:
        "Naucz się podstawowych kroków bachaty w prostych i przejrzystych instrukcjach.",
    },
    // Dodaj więcej lekcji
  ];

  const filteredLessons =
    selectedLevel === "all"
      ? lessons
      : lessons.filter((lesson) => lesson.level === selectedLevel);

  return (
    <div className="space-y-8">
      <LevelSelector
        selectedLevel={selectedLevel}
        onLevelChange={setSelectedLevel}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
}
