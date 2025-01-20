/**
 * Strona pojedynczej lekcji kursu tańca bachata.
 * Główne funkcjonalności:
 * - Pobieranie szczegółów lekcji na podstawie ID z parametrów URL
 * - Wyświetlanie widoku lekcji za pomocą komponentu LessonView
 * - Obsługa przypadku gdy lekcja nie zostanie znaleziona (przekierowanie do 404)
 * 
 * Komponent przyjmuje props:
 * - params: obiekt zawierający ID lekcji z dynamicznej ścieżki URL
 */

import { notFound } from "next/navigation";
import { LessonView } from "../../components/LessonView";
import { getLessonById } from "../../services/lessons";

interface LessonPageProps {
  params: {
    id: string;
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const lesson = await getLessonById(params.id);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <LessonView lesson={lesson} />
    </div>
  );
}
