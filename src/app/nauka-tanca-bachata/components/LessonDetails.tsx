/**
 * Komponent LessonDetails odpowiada za wyświetlanie szczegółowych informacji o lekcji.
 * Główne funkcjonalności:
 * - Wyświetlanie tytułu i opisu lekcji
 * - Pokazywanie czasu trwania lekcji
 * - Wyświetlanie liczby ćwiczeń praktycznych (jeśli są dostępne)
 *
 * Komponent przyjmuje props:
 * - lesson: obiekt zawierający szczegóły lekcji (tytuł, opis, czas trwania, ćwiczenia)
 */

import { Lesson } from "../types";
import { ClockIcon, BookOpenIcon } from "@heroicons/react/24/outline";

interface LessonDetailsProps {
  lesson: Lesson;
}

export const LessonDetails: React.FC<LessonDetailsProps> = ({ lesson }) => {
  const hasVideo = lesson.videos.some((video) => video.videoUrl.trim() !== "");

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">O lekcji</h2>
      <p className="text-gray-600 mb-6">{lesson.description}</p>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <ClockIcon className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-600">{lesson.duration}</span>
        </div>

        {!hasVideo && (
          <div className="flex items-center gap-2">
            <BookOpenIcon className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600">Lekcja tekstowa</span>
          </div>
        )}
      </div>
    </div>
  );
};
