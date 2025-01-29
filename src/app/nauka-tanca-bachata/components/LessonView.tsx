/**
 * Komponent LessonView odpowiada za wyświetlanie pojedynczej lekcji kursu tańca.
 * Główne funkcjonalności:
 * - Wyświetlanie odtwarzacza wideo z kontrolkami (prędkość, odbicie lustrzane, sekcja zapętlenia)
 * - Wybór różnych perspektyw nagrania (przód, tył, bok, szczegóły)
 * - Wyświetlanie avatara i informacji o instruktorze
 * - Wyświetlanie opisu lekcji i szczegółów
 *
 * Komponent zarządza stanem:
 * - Aktualnie wybrane wideo
 * - Ustawienia odtwarzacza (prędkość, odbicie)
 * - Sekcja zapętlenia
 * - Czas trwania wideo
 */

"use client";

import { useState, useCallback, useMemo } from "react";
import { Lesson } from "../types";
import { LessonDetails } from "./LessonDetails";
import { VideoPlayer } from "./VideoPlayer";
import { SpeedControl } from "./controls/SpeedControl";
import { MirrorToggle } from "./controls/MirrorToggle";
import Image from "next/image";
import {
  adaptLessonVideoToInstructorVideo,
  InstructorVideo,
} from "../types/index";
import { TextContent } from "./TextContent";
// import { HistoryLesson } from "./lessons/HistoryLesson";
import { AuthorLesson } from "./lessons/AuthorLesson";
import {
  instructors,
  INSTRUCTOR_KEYS,
  INSTRUCTOR_NAMES,
} from "../data/instructors";

interface LessonViewProps {
  lesson: Lesson;
}

export const LessonView: React.FC<LessonViewProps> = ({ lesson }) => {
  const [selectedVideo, setSelectedVideo] = useState(
    lesson.type === "video" ? lesson.content.videos?.[0] : null
  );
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

  const handleSpeedChange = useCallback((newSpeed: number) => {
    setSpeed(newSpeed);
  }, []);

  const handleMirrorChange = useCallback((newMirror: boolean) => {
    setMirror(newMirror);
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

  const InstructorAvatar: React.FC<{ instructor: string }> = ({
    instructor,
  }) => {
    const [imageError, setImageError] = useState(false);

    const getInstructorImagePath = (instructorName: string) => {
      const instructorKey = Object.entries(INSTRUCTOR_NAMES).find(
        ([_, name]) => name === instructorName
      )?.[0];

      if (!instructorKey) {
        setImageError(true);
        return "";
      }

      return `/images/instructors/${instructorKey}.jpg`;
    };

    if (imageError) {
      return (
        <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center">
          <span className="text-amber-700 text-lg font-medium">
            {instructor
              .split(" ")
              .map((name) => name[0])
              .join("")}
          </span>
        </div>
      );
    }

    return (
      <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm">
        <Image
          src={getInstructorImagePath(instructor)}
          alt={instructor}
          fill
          className="object-cover"
          sizes="56px"
          onError={() => setImageError(true)}
        />
      </div>
    );
  };

  const adaptedVideo = useMemo(() => {
    if (!selectedVideo) return null;
    return adaptLessonVideoToInstructorVideo(selectedVideo);
  }, [selectedVideo]);

  const hasValidVideo = useMemo(() => {
    return selectedVideo && selectedVideo.videoUrl.trim() !== "";
  }, [selectedVideo]);

  const renderTextContent = () => {
    if (lesson.type !== "text") return null;

    if (lesson.content.textContent?.component) {
      switch (lesson.content.textContent.component) {
        case "AuthorLesson":
          return <AuthorLesson />;
        default:
          return null;
      }
    }

    return lesson.content.textContent?.sections ? (
      <TextContent sections={lesson.content.textContent.sections} />
    ) : null;
  };

  const shouldShowLessonDetails = useMemo(() => {
    // Pokaż szczegóły jeśli to lekcja wideo
    if (lesson.type === "video") return true;

    // Pokaż szczegóły jeśli lekcja tekstowa ma też wideo
    if (lesson.content.videos?.some((v) => v.videoUrl.trim() !== ""))
      return true;

    // W przeciwnym razie ukryj
    return false;
  }, [lesson]);

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {/* Wybór perspektywy tylko jeśli są wideo */}
        {lesson.type === "video" &&
          lesson.content.videos?.some((v) => v.videoUrl.trim() !== "") && (
            <div className="flex flex-wrap gap-3">
              {lesson.content.videos?.map((video) => (
                <button
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className={`flex items-center gap-4 px-5 py-3 rounded-lg transition-colors ${
                    selectedVideo?.id === video.id
                      ? "bg-amber-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <InstructorAvatar instructor={video.instructor} />
                  <div className="flex flex-col items-start">
                    <span className="font-medium text-base">
                      {getPerspectiveLabel(video.projectNameOfficial)}
                    </span>
                    <span className="text-sm opacity-75">
                      {video.instructor}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

        {/* Treść tekstowa */}
        {lesson.type === "text" && renderTextContent()}

        {/* Odtwarzacz tylko jeśli jest wideo */}
        {hasValidVideo && selectedVideo && adaptedVideo && (
          <div className="flex flex-col gap-4">
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <VideoPlayer
                videos={[adaptedVideo]}
                speed={speed}
                mirror={mirror}
                loopSection={loopSection}
                onProgress={handleProgress}
                onDurationChange={handleDurationChange}
                onLoopSectionChange={setLoopSection}
              />
            </div>

            {/* Kontrolki */}
            <div className="flex flex-wrap gap-4">
              <SpeedControl value={speed} onChange={handleSpeedChange} />
              <MirrorToggle value={mirror} onChange={handleMirrorChange} />
            </div>
          </div>
        )}

        {/* Szczegóły lekcji tylko w określonych przypadkach */}
        {shouldShowLessonDetails && <LessonDetails lesson={lesson} />}
      </div>
    </div>
  );
};
