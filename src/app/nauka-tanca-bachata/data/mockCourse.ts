/**
 * Moduł zawierający dane testowe kursów tańca bachata.
 * Główne funkcjonalności:
 * - Import i walidacja wszystkich dostępnych kursów
 * - Sprawdzanie poprawności struktury kursów (obecność rozdziałów)
 * - Eksport listy wszystkich kursów oraz domyślnego kursu
 *
 * Eksportuje:
 * - mockCourses: tablica wszystkich dostępnych kursów
 * - getDefaultCourse: funkcja zwracająca domyślny (pierwszy) kurs
 */

import { Course } from "../types";
import { beginnerCourse } from "./courses/bachataOdPodstaw";
// import { sensualCourse } from "./courses/bachataSensualSredniozaawansowany";
// import { bachataSensualZaawansowany } from "./courses/bachataSensualZaawansowany";
// import { isolationCourse } from "./courses/izolacje";
// import { ladyStylingBeginnerCourse } from "./courses/bachataLadyStylingPodstawy";

// Sprawdzamy czy wszystkie kursy mają rozdziały
const validateCourse = (course: Course): Course => {
  if (!course.chapters || course.chapters.length === 0) {
    console.warn(`Kurs ${course.id} nie ma zdefiniowanych rozdziałów!`);
  }
  return course;
};

export const mockCourses = [
  validateCourse(beginnerCourse),
  // validateCourse(sensualCourse),
  // validateCourse(bachataSensualZaawansowany),
  // validateCourse(isolationCourse),
  // validateCourse(ladyStylingBeginnerCourse),
];

// Eksportujemy funkcję zamiast stałej
export const getDefaultCourse = (): Course => mockCourses[0];
