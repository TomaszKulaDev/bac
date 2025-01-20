/**
 * Komponent CourseNavigation odpowiada za wyświetlanie nawigacji kursu tańca.
 * Główne funkcjonalności:
 * - Wyświetlanie tytułu kursu i całkowitego czasu trwania
 * - Pokazywanie listy rozdziałów z ich tytułami i czasem trwania
 * - Wyświetlanie lekcji w ramach każdego rozdziału
 * - Oznaczanie aktualnie wybranej lekcji kolorem
 * - Oznaczanie ukończonych lekcji ikonką
 * - Linki do poszczególnych lekcji
 *
 * Komponent przyjmuje props:
 * - course: obiekt zawierający szczegóły kursu (tytuł, rozdziały, lekcje)
 * - currentLessonId?: opcjonalne ID aktualnie wyświetlanej lekcji
 */

import Link from "next/link";
import { Course } from "../types";
import {
  ClockIcon,
  CheckCircleIcon,
  PlayCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";

interface CourseNavigationProps {
  course: Course;
  currentLessonId?: string;
}

export const CourseNavigation: React.FC<CourseNavigationProps> = ({
  course,
  currentLessonId,
}) => {
  console.log("Current course ID:", course.id);
  console.log("Current lesson ID:", currentLessonId);
  console.log("Course chapters:", course.chapters);

  console.log("Course data:", course);
  console.log("Chapters:", course?.chapters);

  if (!course || !course.chapters) {
    return <div>Brak danych kursu</div>;
  }

  return (
    <nav className="w-80 flex-shrink-0 bg-gradient-to-b from-gray-50 to-white rounded-xl shadow-lg">
      {/* Nagłówek kursu */}
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">{course.title}</h2>
        <div className="flex items-center gap-2 mt-2 text-gray-600">
          <ClockIcon className="w-4 h-4" />
          <span className="text-sm">{course.totalDuration}</span>
        </div>
      </div>

      {/* Lista rozdziałów */}
      <div className="overflow-y-auto max-h-[calc(100vh-200px)] p-4 space-y-4">
        {course.chapters.map((chapter) => (
          <div key={chapter.id} className="bg-white rounded-lg shadow-sm">
            {/* Nagłówek rozdziału */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{chapter.title}</h3>
                <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                  {chapter.duration}
                </span>
              </div>

              {/* Pasek postępu */}
              <div className="relative h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-300"
                  style={{
                    width: `${
                      (chapter.lessons.filter((l) => l.isCompleted).length /
                        chapter.lessons.length) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>

            {/* Lista lekcji */}
            <div className="divide-y divide-gray-50">
              {chapter.lessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  href={`/nauka-tanca-bachata/lekcja/${lesson.id}`}
                  className={`flex items-center gap-3 p-4 transition-all group
                    ${
                      currentLessonId === lesson.id
                        ? "bg-amber-50 text-amber-900"
                        : "hover:bg-gray-50"
                    }`}
                >
                  {/* Status lekcji */}
                  <span className="flex-shrink-0">
                    {lesson.isCompleted ? (
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    ) : currentLessonId === lesson.id ? (
                      <PlayCircleIcon className="w-5 h-5 text-amber-500" />
                    ) : (
                      <ArrowRightCircleIcon className="w-5 h-5 text-gray-300 group-hover:text-amber-500 transition-colors" />
                    )}
                  </span>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {lesson.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {lesson.duration}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
};
