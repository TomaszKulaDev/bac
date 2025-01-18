import { Chapter } from "../types";
import { ChapterProgress } from "./ChapterProgress";

interface ProgressTrackerProps {
  course: {
    chapters: Chapter[];
  };
  currentChapter: Chapter;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  course,
  currentChapter,
}) => {
  const totalLessons = course.chapters.reduce(
    (acc, chapter) => acc + chapter.lessons.length,
    0
  );

  const completedLessons = course.chapters.reduce(
    (acc, chapter) => acc + chapter.lessons.filter((l) => l.isCompleted).length,
    0
  );

  const progress = (completedLessons / totalLessons) * 100;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Twój postęp</h3>
        <span className="text-sm font-medium text-gray-600">
          {completedLessons}/{totalLessons} lekcji
        </span>
      </div>

      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
        <div
          className="absolute left-0 top-0 h-full bg-amber-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="space-y-4">
        {course.chapters.map((chapter) => (
          <ChapterProgress
            key={chapter.id}
            chapter={chapter}
            isCurrentChapter={chapter.id === currentChapter.id}
          />
        ))}
      </div>
    </div>
  );
};
