import { Chapter } from "../types";

interface ChapterProgressProps {
  chapter: Chapter;
  isCurrentChapter: boolean;
}

export const ChapterProgress: React.FC<ChapterProgressProps> = ({
  chapter,
  isCurrentChapter,
}) => {
  const completedLessons = chapter.lessons.filter((l) => l.isCompleted).length;
  const progress = (completedLessons / chapter.lessons.length) * 100;

  return (
    <div
      className={`p-4 rounded-lg ${
        isCurrentChapter ? "bg-amber-50" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-gray-900">{chapter.title}</h4>
        <span className="text-sm text-gray-600">
          {completedLessons}/{chapter.lessons.length} lekcji
        </span>
      </div>
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-amber-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
