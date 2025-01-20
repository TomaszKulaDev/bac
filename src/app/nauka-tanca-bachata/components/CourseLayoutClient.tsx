/**
 * Komponent CourseLayoutClient odpowiada za zarządzanie layoutem kursu tańca po stronie klienta.
 * Główne funkcjonalności:
 * - Wykrywanie aktualnej ścieżki URL i określanie czy to strona główna
 * - Pobieranie i wyświetlanie odpowiedniego kursu na podstawie URL
 * - Obsługa nawigacji między kursami i lekcjami
 * - Wyświetlanie nagłówka z tytułem i opisem kursu
 * - Renderowanie nawigacji bocznej (CourseNavigation) dla podstron kursu
 * 
 * Komponent przyjmuje props:
 * - children: komponenty potomne do wyrenderowania w głównej sekcji
 */

"use client";

import { usePathname } from "next/navigation";
import { CourseNavigation } from "./CourseNavigation";
import { mockCourses } from "../data/mockCourse";
import { Course, Chapter, Lesson } from "../types";

interface CourseLayoutClientProps {
  children: React.ReactNode;
}

export const CourseLayoutClient: React.FC<CourseLayoutClientProps> = ({
  children,
}) => {
  const pathname = usePathname();
  const isMainPage = pathname === "/nauka-tanca-bachata";

  // Pobierz ID kursu z URL
  const getCurrentCourse = (): Course => {
    const paths = pathname.split("/");
    const lastSegment = paths[paths.length - 1];

    // Najpierw sprawdź czy jesteśmy w widoku kursu
    const courseFromId = mockCourses.find(
      (course) => course.id === lastSegment
    );
    if (courseFromId) {
      console.log("Found course by ID:", courseFromId.id);
      return courseFromId;
    }

    // Jeśli nie znaleziono kursu po ID, sprawdź czy jesteśmy w lekcji
    if (paths.includes("lekcja")) {
      // Szukamy kursu, który zawiera lekcję o danym ID
      const courseWithLesson = mockCourses.find((course) =>
        course.chapters.some((chapter) =>
          chapter.lessons.some((lesson) => lesson.id === lastSegment)
        )
      );

      if (courseWithLesson) {
        console.log("Found course by lesson:", courseWithLesson.id);
        return courseWithLesson;
      }
    }

    // Jeśli nie znaleziono kursu ani po ID ani po lekcji, sprawdź czy mamy kurs w URL
    const courseIdFromPath = paths.find((segment) =>
      mockCourses.some((course) => course.id === segment)
    );

    if (courseIdFromPath) {
      const courseFromPath = mockCourses.find(
        (course) => course.id === courseIdFromPath
      );
      if (courseFromPath) {
        console.log("Found course from path:", courseFromPath.id);
        return courseFromPath;
      }
    }

    // Jeśli nic nie znaleziono, zwróć pierwszy kurs
    console.log("Returning default course");
    return mockCourses[0];
  };

  const currentCourse = getCurrentCourse();
  const currentLessonId = pathname.includes("/lekcja/")
    ? pathname.split("/").pop()
    : undefined;

  console.log("Debug info:", {
    pathname,
    currentCourseId: currentCourse.id,
    currentLessonId,
    availableCourseIds: mockCourses.map((c) => c.id),
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isMainPage && (
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900">
              {currentCourse.title}
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              {currentCourse.description}
            </p>
          </header>
        )}
        <div className={`${isMainPage ? "" : "flex gap-8"}`}>
          {!isMainPage && (
            <CourseNavigation
              course={currentCourse}
              currentLessonId={currentLessonId}
            />
          )}
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
};
