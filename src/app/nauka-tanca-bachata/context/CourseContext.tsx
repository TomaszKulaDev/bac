import { createContext, useContext, useState } from "react";
import { Course } from "../types";

interface CourseContextType {
  currentCourse: Course | null;
  setCurrentCourse: (course: Course) => void;
  updateLessonProgress: (lessonId: string, completed: boolean) => void;
}

const CourseContext = createContext<CourseContextType | null>(null);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);

  const updateLessonProgress = (lessonId: string, completed: boolean) => {
    if (!currentCourse) return;

    setCurrentCourse({
      ...currentCourse,
      chapters: currentCourse.chapters.map((chapter) => ({
        ...chapter,
        lessons: chapter.lessons.map((lesson) =>
          lesson.id === lessonId
            ? { ...lesson, isCompleted: completed }
            : lesson
        ),
      })),
    });
  };

  return (
    <CourseContext.Provider
      value={{ currentCourse, setCurrentCourse, updateLessonProgress }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourse must be used within a CourseProvider");
  }
  return context;
};
