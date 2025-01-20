import { Course, Lesson } from "../../types";
import { mockCourses } from "../mockCourse";

export const findLessonInCourses = (lessonId: string): Lesson | null => {
  for (const course of mockCourses) {
    for (const chapter of course.chapters) {
      const lesson = chapter.lessons.find((l) => l.id === lessonId);
      if (lesson) return lesson;
    }
  }
  return null;
};

export const findCourseByLessonId = (lessonId: string): Course | null => {
  return (
    mockCourses.find((course) =>
      course.chapters.some((chapter) =>
        chapter.lessons.some((lesson) => lesson.id === lessonId)
      )
    ) || null
  );
};

export const getFirstLessonFromCourse = (courseId: string): Lesson | null => {
  const course = mockCourses.find((c) => c.id === courseId);
  if (
    course &&
    course.chapters.length > 0 &&
    course.chapters[0].lessons.length > 0
  ) {
    return course.chapters[0].lessons[0];
  }
  return null;
};
