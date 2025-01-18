import Image from "next/image";
import { Course } from "../types";
import { ClockIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import { StarRating } from "./StarRating";

interface CourseOverviewProps {
  course: Course;
}

const getLevelColor = (level: Course["level"]) => {
  const colors = {
    beginner: "bg-green-100 text-green-800",
    intermediate: "bg-yellow-100 text-yellow-800",
    advanced: "bg-red-100 text-red-800",
  };
  return colors[level];
};

const getLevelLabel = (level: Course["level"]) => {
  const labels = {
    beginner: "Początkujący",
    intermediate: "Średniozaawansowany",
    advanced: "Zaawansowany",
  };
  return labels[level];
};

export const CourseOverview: React.FC<CourseOverviewProps> = ({ course }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-start gap-6">
        <div className="relative w-1/3 aspect-video rounded-lg overflow-hidden">
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover"
          />
          {course.isPopular && (
            <div className="absolute top-2 right-2 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Popularny
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium 
              ${getLevelColor(course.level)}`}
            >
              {getLevelLabel(course.level)}
            </span>
            <div className="flex items-center gap-1">
              <StarRating rating={course.rating} />
              <span className="text-sm text-gray-600">
                ({course.studentsCount} uczniów)
              </span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {course.title}
          </h2>

          <p className="text-gray-600 mb-4">{course.description}</p>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <ClockIcon className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">
                {course.totalDuration}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpenIcon className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">
                {course.chapters.length} rozdziałów
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-6 py-3 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors">
              Rozpocznij kurs
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Program kursu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
