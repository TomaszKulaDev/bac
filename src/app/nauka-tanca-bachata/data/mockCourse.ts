import { Course } from "../types";
import { beginnerCourse } from "./courses/beginnerCourse";
import { sensualCourse } from "./courses/sensualCourse";
import { modernaCourse } from "./courses/modernaCourse";
import { isolationCourse } from "./courses/isolationCourse";

// Sprawdzamy czy wszystkie kursy mają rozdziały
const validateCourse = (course: Course): Course => {
  if (!course.chapters || course.chapters.length === 0) {
    console.warn(`Kurs ${course.id} nie ma zdefiniowanych rozdziałów!`);
  }
  return course;
};

export const mockCourses = [
  validateCourse(beginnerCourse),
  validateCourse(sensualCourse),
  validateCourse(modernaCourse),
  validateCourse(isolationCourse),
];

// Eksportujemy funkcję zamiast stałej
export const getDefaultCourse = (): Course => mockCourses[0];
