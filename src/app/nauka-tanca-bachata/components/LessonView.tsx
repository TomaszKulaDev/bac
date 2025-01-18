"use client";

import { useState, useCallback } from "react";
import { Lesson } from "../types";
import { PracticeMode } from "./PracticeMode";
import { LessonDetails } from "./LessonDetails";
import { ResourceList } from "./ResourceList";
import { VideoPlayer } from "./VideoPlayer";

interface LessonViewProps {
  lesson: Lesson;
}

export const LessonView: React.FC<LessonViewProps> = ({ lesson }) => {
  const [mode, setMode] = useState<"watch" | "practice">("watch");
  const [speed, setSpeed] = useState(1);
  const [mirror, setMirror] = useState(false);
  const [loopSection, setLoopSection] = useState<[number, number] | null>(null);

  const handleProgress = useCallback((progress: number) => {
    console.log("Progress:", progress);
  }, []);

  const handleDurationChange = useCallback((duration: number) => {
    console.log("Duration:", duration);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMode("watch")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              mode === "watch"
                ? "bg-amber-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Oglądaj
          </button>
          <button
            onClick={() => setMode("practice")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              mode === "practice"
                ? "bg-amber-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Ćwicz
          </button>
        </div>
      </div>

      {mode === "practice" ? (
        <PracticeMode
          lesson={lesson}
          onComplete={() => console.log("Lekcja zakończona")}
        />
      ) : (
        <div className="space-y-6">
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <VideoPlayer
              url={lesson.videoUrl}
              speed={speed}
              mirror={mirror}
              loopSection={loopSection}
              onProgress={handleProgress}
              onDurationChange={handleDurationChange}
            />
          </div>
          <LessonDetails lesson={lesson} />
          {lesson.resources && <ResourceList resources={lesson.resources} />}
        </div>
      )}
    </div>
  );
};
