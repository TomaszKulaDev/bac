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
  Bars3Icon,
  XMarkIcon,
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    return <div role="alert">Brak danych kursu</div>;
  }

  const NavigationContent = () => (
    <>
      {/* Nagłówek kursu */}
      <div
        className="mb-6 bg-white rounded-2xl p-6 shadow-sm"
        itemScope
        itemType="https://schema.org/Course"
      >
        <h2 className="text-xl font-bold text-gray-900" itemProp="name">
          {course.title}
        </h2>
        <div className="flex items-center gap-2 mt-3 text-gray-600">
          <ClockIcon className="w-5 h-5" aria-hidden="true" />
          <span itemProp="timeRequired">{course.totalDuration}</span>
        </div>
      </div>

      {/* Lista rozdziałów */}
      <div className="space-y-4 pr-2" role="list">
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
              itemScope
              itemType="https://schema.org/Chapter"
              role="listitem"
            >
              {/* Nagłówek rozdziału */}
              <button
                onClick={() => toggleChapter(chapter.id)}
                className="w-full text-left p-6 focus:outline-none"
                aria-expanded={isExpanded}
                aria-controls={`chapter-content-${chapter.id}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <span
                      className="inline-block px-2.5 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full mb-2"
                      aria-label={`Rozdział ${index + 1} z ${
                        course.chapters.length
                      }`}
                    >
                      Rozdział {index + 1}
                    </span>
                    <h3 className="font-semibold text-gray-900" itemProp="name">
                      {chapter.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      <span itemProp="totalLessons">
                        {chapter.lessons.length}
                      </span>{" "}
                      lekcji
                    </p>
                  </div>
                  <ChevronDownIcon
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </div>
              </button>

              {/* Lista lekcji */}
              <div
                id={`chapter-content-${chapter.id}`}
                className={`overflow-hidden transition-all duration-300 ${
                  isExpanded ? "max-h-[1000px]" : "max-h-0"
                }`}
                role="region"
                aria-labelledby={`chapter-${chapter.id}`}
              >
                <div className="px-4 pb-4 space-y-1" role="list">
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
                      itemScope
                      itemType="https://schema.org/LearningResource"
                      role="listitem"
                      aria-current={
                        currentLessonId === lesson.id ? "page" : undefined
                      }
                    >
                      {/* Status lekcji */}
                      <span className="flex-shrink-0" aria-hidden="true">
                        {lesson.isCompleted ? (
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        ) : currentLessonId === lesson.id ? (
                          <PlayCircleIcon className="w-5 h-5 text-amber-500" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-gray-200" />
                        )}
                      </span>

                      <div className="flex-1 min-w-0">
                        <p
                          className="text-sm font-medium truncate"
                          itemProp="name"
                        >
                          {lesson.title}
                        </p>
                        <p
                          className="text-xs text-gray-500 mt-0.5"
                          itemProp="timeRequired"
                        >
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
    </>
  );

  return (
    <>
      {/* Przycisk mobilnego menu */}
      <button
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        className="lg:hidden fixed bottom-4 right-4 z-50 bg-amber-500 text-white p-4 rounded-full shadow-lg hover:bg-amber-600 transition-colors"
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-navigation"
        aria-label="Menu nawigacji kursu"
      >
        {isMobileMenuOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <Bars3Icon className="w-6 h-6" />
        )}
      </button>

      {/* Wersja desktopowa */}
      <nav
        className="hidden lg:block w-80 flex-shrink-0"
        aria-label="Nawigacja kursu"
        itemScope
        itemType="https://schema.org/Table"
      >
        <NavigationContent />
      </nav>

      {/* Wersja mobilna */}
      <div
        className={`
          lg:hidden fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm transition-opacity duration-300
          ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      <nav
        id="mobile-navigation"
        className={`
          lg:hidden fixed right-0 top-0 bottom-0 z-40 w-[85%] max-w-[360px] bg-gray-50 
          transform transition-transform duration-300 ease-in-out overflow-y-auto
          ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
        aria-label="Mobilna nawigacja kursu"
        itemScope
        itemType="https://schema.org/Table"
      >
        <div className="p-4 h-full overflow-y-auto">
          <NavigationContent />
        </div>
      </nav>
    </>
  );
};
