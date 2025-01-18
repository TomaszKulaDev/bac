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
