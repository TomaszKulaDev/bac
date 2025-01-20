import Image from "next/image";
import Link from "next/link";

interface LessonCardProps {
  lesson: {
    id: string;
    title: string;
    level: "beginner" | "intermediate" | "advanced" | "isolations";
    duration: string;
    thumbnail: string;
    description: string;
  };
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson }) => {
  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      case "isolations":
        return "bg-purple-100 text-purple-800";
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
      default:
        return level;
    }
  };

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
        <Link
          href={`/nauka-tanca-bachata/lekcja/${lesson.id}`}
          className="inline-block px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
        >
          Rozpocznij kurs
        </Link>
      </div>
    </div>
  );
};

export default LessonCard;
