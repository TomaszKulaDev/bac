"use client";

import { useState, useCallback } from "react";
import { Lesson } from "../types";
import { PracticeMode } from "./PracticeMode";
import { LessonDetails } from "./LessonDetails";
import { ResourceList } from "./ResourceList";
import { VideoPlayer } from "./VideoPlayer";
import { SpeedControl } from "./controls/SpeedControl";
import { MirrorToggle } from "./controls/MirrorToggle";
import { LoopSectionControl } from "./controls/LoopSectionControl";

interface LessonViewProps {
  lesson: Lesson;
}

export const LessonView: React.FC<LessonViewProps> = ({ lesson }) => {
  const [selectedVideo, setSelectedVideo] = useState(lesson.videos[0]);
  const [speed, setSpeed] = useState(1);
  const [mirror, setMirror] = useState(false);
  const [loopSection, setLoopSection] = useState<[number, number] | null>(null);
  const [videoDuration, setVideoDuration] = useState(0);

  const handleProgress = useCallback((progress: number) => {
    console.log("Progress:", progress);
  }, []);

  const handleDurationChange = useCallback((duration: number) => {
    setVideoDuration(duration);
  }, []);

  const getPerspectiveLabel = (perspective: string) => {
    const labels = {
      front: "Widok z przodu",
      back: "Widok z tyłu",
      side: "Widok z boku",
      detail: "Szczegóły techniczne",
    };
    return labels[perspective as keyof typeof labels] || perspective;
  };

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {/* Wybór perspektywy */}
        <div className="flex flex-wrap gap-3">
          {lesson.videos.map((video) => (
            <button
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedVideo.id === video.id
                  ? "bg-amber-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <div className="flex flex-col items-start">
                <span className="font-medium">
                  {getPerspectiveLabel(video.perspective)}
                </span>
                <span className="text-sm opacity-75">
                  Instruktor: {video.instructor}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Opis wybranego wideo */}
        <div className="bg-white rounded-lg p-4">
          <h3 className="font-medium text-gray-900">{selectedVideo.title}</h3>
          <p className="mt-1 text-sm text-gray-600">
            {selectedVideo.description}
          </p>
        </div>

        {/* Odtwarzacz */}
        <div className="flex flex-col gap-4">
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <VideoPlayer
              url={selectedVideo.videoUrl}
              speed={speed}
              mirror={mirror}
              loopSection={loopSection}
              onProgress={handleProgress}
              onDurationChange={handleDurationChange}
            />
          </div>

          {/* Kontrolki */}
          <div className="flex flex-wrap gap-4">
            <SpeedControl value={speed} onChange={setSpeed} />
            <MirrorToggle value={mirror} onChange={setMirror} />
            <LoopSectionControl
              value={loopSection}
              onChange={setLoopSection}
              duration={videoDuration}
            />
          </div>
        </div>

        <LessonDetails lesson={lesson} />
        {lesson.resources && <ResourceList resources={lesson.resources} />}
      </div>
    </div>
  );
};
