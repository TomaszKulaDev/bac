import { Lesson } from "../types";
import { ClockIcon, BookOpenIcon } from "@heroicons/react/24/outline";

interface LessonDetailsProps {
  lesson: Lesson;
}

export const LessonDetails: React.FC<LessonDetailsProps> = ({ lesson }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">O lekcji</h2>
      <p className="text-gray-600 mb-6">{lesson.description}</p>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <ClockIcon className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-600">{lesson.duration}</span>
        </div>
        {lesson.practiceExercises && (
          <div className="flex items-center gap-2">
            <BookOpenIcon className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600">
              {lesson.practiceExercises.length} ćwiczeń
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
