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
import { Lesson, LessonVideo } from "../types";
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
import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaTiktok,
  FaGlobe,
} from "react-icons/fa";
import { TimelineMenu } from "./TimelineMenu";

interface LessonViewProps {
  lesson: Lesson;
}

const InstructorCredits: React.FC<{ instructorName: string }> = ({
  instructorName,
}) => {
  const instructor = Object.values(instructors).find(
    (inst) => inst.name === instructorName
  );

  if (!instructor) return null;

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <h3 className="font-medium text-lg mb-4">{instructor.title}</h3>

      {instructor.bio && (
        <p className="mb-4 text-sm text-gray-600">{instructor.bio}</p>
      )}

      {instructor.partners ? (
        // Wyświetlanie dla par
        <div className="flex flex-col sm:flex-row gap-6">
          {instructor.partners.map((partner) => (
            <div key={partner.name} className="flex-1">
              <div className="flex items-center gap-4">
                <Image
                  src={partner.avatar}
                  alt={partner.name}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
                <div>
                  <h4 className="font-medium">{partner.name}</h4>
                  <p className="text-sm text-gray-600">
                    {partner.role === "leader" ? "Partner" : "Partnerka"}
                  </p>
                </div>
              </div>

              {partner.socialMedia && (
                <div className="mt-3 flex gap-4">
                  {partner.socialMedia.map((social) => {
                    const Icon = {
                      Instagram: FaInstagram,
                      Facebook: FaFacebook,
                      YouTube: FaYoutube,
                      TikTok: FaTiktok,
                      Website: FaGlobe,
                    }[social.platform];

                    return (
                      <a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-amber-500 transition-colors"
                      >
                        {Icon && <Icon className="w-5 h-5" />}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        // Wyświetlanie dla pojedynczego instruktora
        <div className="flex items-center gap-4">
          {instructor.avatar && (
            <Image
              src={instructor.avatar}
              alt={instructor.name}
              width={64}
              height={64}
              className="rounded-full"
            />
          )}
          <div>
            <h4 className="font-medium">{instructor.name}</h4>
            {instructor.socialMedia && (
              <div className="mt-3 flex gap-4">
                {instructor.socialMedia.map((social) => {
                  const Icon = {
                    Instagram: FaInstagram,
                    Facebook: FaFacebook,
                    YouTube: FaYoutube,
                    TikTok: FaTiktok,
                    Website: FaGlobe,
                  }[social.platform];

                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-amber-500 transition-colors"
                    >
                      {Icon && <Icon className="w-5 h-5" />}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const LessonView: React.FC<LessonViewProps> = ({ lesson }) => {
  const [selectedVideo, setSelectedVideo] = useState<LessonVideo | null>(
    lesson.content.videos?.[0] || null
  );
  const [speed, setSpeed] = useState(1);
  const [mirror, setMirror] = useState(false);
  const [loopSection, setLoopSection] = useState<[number, number] | null>(null);
  const [imageError, setImageError] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const handleProgress = (time: number) => {
    setCurrentTime(time);
    if (selectedVideo) {
      selectedVideo.currentTime = time;
    }
  };

  const handleDurationChange = useCallback((duration: number) => {
    setVideoDuration(duration);
  }, []);

  const handleSpeedChange = useCallback((newSpeed: number) => {
    setSpeed(newSpeed);
  }, []);

  const handleMirrorChange = useCallback((newMirror: boolean) => {
    setMirror(newMirror);
  }, []);

  const handleTimeSelect = (time: number) => {
    if (selectedVideo) {
      // Implementacja przewijania do wybranego momentu
      const player = document.querySelector("video, iframe");
      if (player) {
        if (player instanceof HTMLVideoElement) {
          player.currentTime = time;
        } else if (player instanceof HTMLIFrameElement) {
          // YouTube player będzie obsługiwany przez YouTubePlayer komponent
          // poprzez onTimeSelect prop
        }
      }
    }
  };

  const getPerspectiveLabel = (perspective: string) => {
    const labels = {
      front: "Widok z przodu",
      back: "Widok z tyłu",
      side: "Widok z boku",
      detail: "Szczegóły techniczne",
    };
    return labels[perspective as keyof typeof labels] || perspective;
  };

  const InstructorAvatar = ({ instructor }: { instructor: string }) => {
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
          <>
            <div className="flex flex-col gap-4">
              <div className="flex">
                {/* Nowe menu z timelineMarkers */}
                {selectedVideo.timeMarkers && (
                  <TimelineMenu
                    markers={selectedVideo.timeMarkers}
                    currentTime={currentTime}
                    onTimeSelect={handleTimeSelect}
                  />
                )}

                {/* Player */}
                <div className="flex-1 aspect-video bg-black rounded-lg overflow-hidden">
                  <VideoPlayer
                    videos={[adaptedVideo]}
                    speed={speed}
                    mirror={mirror}
                    loopSection={loopSection}
                    onProgress={handleProgress}
                    onDurationChange={handleDurationChange}
                    onLoopSectionChange={setLoopSection}
                    onTimeSelect={handleTimeSelect}
                  />
                </div>
              </div>

              {/* Kontrolki */}
              <div className="flex flex-wrap gap-4">
                <SpeedControl value={speed} onChange={handleSpeedChange} />
                <MirrorToggle value={mirror} onChange={handleMirrorChange} />
              </div>
            </div>

            {selectedVideo && (
              <InstructorCredits instructorName={selectedVideo.instructor} />
            )}
          </>
        )}

        {/* Szczegóły lekcji */}
        {shouldShowLessonDetails && <LessonDetails lesson={lesson} />}
      </div>
    </div>
  );
};
