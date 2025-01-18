import Image from "next/image";
import Link from "next/link";

interface LessonCardProps {
  lesson: {
    id: string;
    title: string;
    level: string;
    duration: string;
    thumbnail: string;
    description: string;
  };
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image
          src={lesson.thumbnail}
          alt={lesson.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{lesson.title}</h3>
        <p className="mt-1 text-sm text-gray-500">{lesson.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-600">{lesson.duration}</span>
          <Link
            href={`/nauka-tanca-bachata/lekcja/${lesson.id}`}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Rozpocznij lekcję
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
