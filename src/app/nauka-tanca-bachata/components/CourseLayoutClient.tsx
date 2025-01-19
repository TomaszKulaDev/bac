"use client";

import { usePathname } from "next/navigation";
import { CourseNavigation } from "./CourseNavigation";

interface CourseLayoutClientProps {
  children: React.ReactNode;
}

export const CourseLayoutClient: React.FC<CourseLayoutClientProps> = ({
  children,
}) => {
  const pathname = usePathname();
  const currentCourse = {
    // Placeholder dla currentCourse
    id: "1",
    title: "Kurs Bachaty dla początkujących",
    totalDuration: "8h 30min",
    chapters: [],
    // ... reszta wymaganych pól
  };
  const currentLessonId = "placeholder-lesson-id";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Nauka Tańca Bachata
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Odkryj piękno bachaty i rozwiń swoje umiejętności taneczne
          </p>
        </header>
        <div className="flex gap-8">
          {pathname.includes("/lekcja/") && (
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
