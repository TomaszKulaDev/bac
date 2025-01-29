/**
 * Komponent LessonCard odpowiada za wyświetlanie karty pojedynczej lekcji/kursu tańca.
 * Główne funkcjonalności:
 * - Wyświetlanie miniatury lekcji
 * - Pokazywanie poziomu zaawansowania z odpowiednim kolorem oznaczenia
 * - Wyświetlanie tytułu, opisu i czasu trwania lekcji
 * - Link do rozpoczęcia kursu, który kieruje do pierwszej lekcji danego kursu
 *
 * Komponent przyjmuje props:
 * - lesson: obiekt zawierający szczegóły lekcji (id, tytuł, poziom, czas trwania, miniatura, opis)
 */

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { mockCourses } from "../data/mockCourse";

interface LessonCardProps {
  lesson: {
    id: string;
    title: string;
    level:
      | "beginner"
      | "intermediate"
      | "advanced"
      | "isolations"
      | "lady-styling";
    duration: string;
    thumbnail: string;
    description: string;
  };
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-blue-100 text-blue-800";
      case "isolations":
        return "bg-purple-100 text-purple-800";
      case "lady-styling":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case "beginner":
        return "Początkujący";
      case "intermediate":
        return "Średniozaawansowany";
      case "advanced":
        return "Zaawansowany";
      case "isolations":
        return "Izolacje";
      case "lady-styling":
        return "Lady Styling";
      default:
        return level;
    }
  };

  const handleLessonClick = (e: React.MouseEvent, lessonId: string) => {
    e.preventDefault();

    if (!session) {
      // Jeśli użytkownik nie jest zalogowany, przekieruj do logowania
      router.push(`/login?callbackUrl=/nauka-tanca-bachata/lekcja/${lessonId}`);
      return;
    }

    // Jeśli jest zalogowany, przekieruj do lekcji
    router.push(`/nauka-tanca-bachata/lekcja/${lessonId}`);
  };

  // Pobieramy pierwszą lekcję z pierwszego rozdziału dla danego kursu
  const getFirstLessonId = (courseId: string) => {
    const course = mockCourses.find((c) => c.id === courseId);
    if (
      course &&
      course.chapters.length > 0 &&
      course.chapters[0].lessons.length > 0
    ) {
      return course.chapters[0].lessons[0].id;
    }
    return courseId; // fallback do ID kursu
  };

  const firstLessonId = getFirstLessonId(lesson.id);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div
        onClick={(e) => handleLessonClick(e, firstLessonId)}
        className="relative h-96 cursor-pointer transition-opacity hover:opacity-90"
      >
        <Image
          src={lesson.thumbnail}
          alt={lesson.title}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelBadgeColor(
              lesson.level
            )}`}
          >
            {getLevelLabel(lesson.level)}
          </span>
          <span className="text-sm text-gray-600">{lesson.duration}</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {lesson.title}
        </h3>
        <p className="text-sm text-gray-500 mb-4">{lesson.description}</p>
        <button
          onClick={(e) => handleLessonClick(e, firstLessonId)}
          className="inline-block px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
        >
          {session ? "Rozpocznij kurs" : "Zaloguj się aby rozpocząć"}
        </button>
      </div>
    </div>
  );
};

export default LessonCard;
