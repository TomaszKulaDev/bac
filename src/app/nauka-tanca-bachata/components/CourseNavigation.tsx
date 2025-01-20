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
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

interface CourseNavigationProps {
  course: Course;
  currentLessonId?: string;
}

export const CourseNavigation: React.FC<CourseNavigationProps> = ({
  course,
  currentLessonId,
}) => {
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) =>
      prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  console.log("Current course ID:", course.id);
  console.log("Current lesson ID:", currentLessonId);
  console.log("Course chapters:", course.chapters);

  console.log("Course data:", course);
  console.log("Chapters:", course?.chapters);

  if (!course || !course.chapters) {
    return <div>Brak danych kursu</div>;
  }

  return (
    <nav className="w-80 flex-shrink-0">
      {/* Nagłówek kursu */}
      <div className="mb-6 bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">{course.title}</h2>
        <div className="flex items-center gap-2 mt-3 text-gray-600">
          <ClockIcon className="w-5 h-5" />
          <span>{course.totalDuration}</span>
        </div>
      </div>

      {/* Lista rozdziałów */}
      <div className="space-y-4 pr-2">
        {course.chapters.map((chapter, index) => {
          const isExpanded = expandedChapters.includes(chapter.id);
          const completedLessons = chapter.lessons.filter(
            (l) => l.isCompleted
          ).length;
          const progress = (completedLessons / chapter.lessons.length) * 100;

          return (
            <div
              key={chapter.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              {/* Nagłówek rozdziału */}
              <button
                onClick={() => toggleChapter(chapter.id)}
                className="w-full text-left p-6 focus:outline-none"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <span className="inline-block px-2.5 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full mb-2">
                      Rozdział {index + 1}
                    </span>
                    <h3 className="font-semibold text-gray-900">
                      {chapter.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {completedLessons} z {chapter.lessons.length} lekcji
                      ukończonych
                    </p>
                  </div>
                  <ChevronDownIcon
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {/* Pasek postępu */}
                <div className="mt-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </button>

              {/* Lista lekcji */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isExpanded ? "max-h-[1000px]" : "max-h-0"
                }`}
              >
                <div className="px-4 pb-4 space-y-1">
                  {chapter.lessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      href={`/nauka-tanca-bachata/lekcja/${lesson.id}`}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all
                        ${
                          currentLessonId === lesson.id
                            ? "bg-amber-50 text-amber-900"
                            : "hover:bg-gray-50 text-gray-700"
                        }`}
                    >
                      {/* Status lekcji */}
                      <span className="flex-shrink-0">
                        {lesson.isCompleted ? (
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        ) : currentLessonId === lesson.id ? (
                          <PlayCircleIcon className="w-5 h-5 text-amber-500" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-gray-200" />
                        )}
                      </span>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
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
            </div>
          );
        })}
      </div>
    </nav>
  );
};
