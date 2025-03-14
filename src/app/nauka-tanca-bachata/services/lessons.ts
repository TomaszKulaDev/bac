/**
 * Serwis odpowiedzialny za operacje na lekcjach kursu tańca bachata.
 * Główne funkcjonalności:
 * - Pobieranie szczegółów lekcji na podstawie ID
 * - Obsługa przypadku gdy ID wskazuje na kurs (zwraca pierwszą lekcję)
 * - Zwracanie null gdy nie znaleziono lekcji ani kursu
 */

import { Lesson } from "../types";
import { mockCourses } from "../data/mockCourse";
import {
  findLessonInCourses,
  getFirstLessonFromCourse,
} from "../data/courses/helpers";

export async function getLessonById(id: string): Promise<Lesson | null> {
  // Najpierw sprawdź czy to ID lekcji
  const lessonById = findLessonInCourses(id);
  if (lessonById) return lessonById;

  // Jeśli nie znaleziono lekcji, sprawdź czy to ID kursu i zwróć pierwszą lekcję
  const firstLesson = getFirstLessonFromCourse(id);
  if (firstLesson) return firstLesson;

  return null;
}
