import Link from "next/link";
import { Course } from "../types";

interface CourseNavigationProps {
  course: Course;
  currentLessonId?: string;
}

export const CourseNavigation: React.FC<CourseNavigationProps> = ({
  course,
  currentLessonId,
}) => {
  return (
    <nav className="w-64 bg-white rounded-lg shadow-lg p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">{course.title}</h2>
        <p className="text-sm text-gray-500">{course.totalDuration}</p>
      </div>

      <div className="space-y-4">
        {course.chapters.map((chapter) => (
          <div key={chapter.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900">{chapter.title}</h3>
              <span className="text-xs text-gray-500">{chapter.duration}</span>
            </div>

            <div className="ml-4 space-y-1">
              {chapter.lessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  href={`/nauka-tanca-bachata/lekcja/${lesson.id}`}
                  className={`block px-3 py-2 rounded-lg text-sm transition-colors
                    ${
                      currentLessonId === lesson.id
                        ? "bg-amber-500 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }
                    ${lesson.isCompleted ? "font-medium" : ""}
                  `}
                >
                  <div className="flex items-center gap-2">
                    {lesson.isCompleted && (
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                      </svg>
                    )}
                    <span>{lesson.title}</span>
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
