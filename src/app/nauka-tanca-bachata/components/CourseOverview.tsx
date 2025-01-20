/**
 * Komponent CourseOverview odpowiada za wyświetlanie ogólnego przeglądu kursu tańca.
 * Główne funkcjonalności:
 * - Wyświetlanie miniatury kursu z opcjonalnym znacznikiem "Popularny"
 * - Pokazywanie poziomu zaawansowania z odpowiednim kolorem oznaczenia
 * - Wyświetlanie tytułu i opisu kursu
 * - Informacje o czasie trwania i liczbie rozdziałów
 * - Przyciski do rozpoczęcia kursu i wyświetlenia programu
 *
 * Komponent przyjmuje props:
 * - course: obiekt zawierający szczegóły kursu (tytuł, poziom, czas trwania, miniatura, opis, rozdziały)
 */

import Image from "next/image";
import { Course } from "../types";
import { ClockIcon, BookOpenIcon } from "@heroicons/react/24/outline";

interface CourseOverviewProps {
  course: Course;
}

// "lady-styling" jest w cudzysłowach ponieważ zawiera myślnik (-).
// W JavaScript, klucze obiektów zawierające znaki specjalne muszą być w cudzysłowach.
// Pozostałe klucze są pojedynczymi słowami, więc nie wymagają cudzysłowów.
const levelColors = {
  beginner: "bg-green-100 text-green-800",
  intermediate: "bg-yellow-100 text-yellow-800",
  advanced: "bg-blue-100 text-blue-800",
  isolations: "bg-purple-100 text-purple-800",
  "lady-styling": "bg-pink-100 text-pink-800", // dodany kolor różowy dla lady styling
};

const levelLabels = {
  beginner: "Początkujący",
  intermediate: "Średniozaawansowany",
  advanced: "Zaawansowany",
  isolations: "Izolacje",
  "lady-styling": "Lady Styling", // myślnik wymaga cudzysłowów
};

const getLevelColor = (level: Course["level"]) => {
  return levelColors[level];
};

const getLevelLabel = (level: Course["level"]) => {
  return levelLabels[level];
};

export const CourseOverview: React.FC<CourseOverviewProps> = ({ course }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-start gap-6">
        <div className="relative w-1/3 aspect-video rounded-lg overflow-hidden">
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover"
          />
          {course.isPopular && (
            <div className="absolute top-2 right-2 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Popularny
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium 
              ${getLevelColor(course.level)}`}
            >
              {getLevelLabel(course.level)}
            </span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {course.title}
          </h2>

          <p className="text-gray-600 mb-4">{course.description}</p>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <ClockIcon className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">
                {course.totalDuration}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpenIcon className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">
                {course.chapters.length} rozdziałów
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-6 py-3 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors">
              Rozpocznij kurs
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Program kursu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
