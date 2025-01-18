import { Exercise } from "../../types";

interface PracticeExerciseProps {
  exercise: Exercise;
  onComplete: (exerciseId: string) => void;
}

export const PracticeExercise: React.FC<PracticeExerciseProps> = ({
  exercise,
  onComplete,
}) => {
  return (
    <div className="p-4 border rounded-lg bg-white">
      <h3 className="font-medium text-gray-900">{exercise.title}</h3>
      <p className="mt-1 text-sm text-gray-600">{exercise.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">{exercise.duration}</span>
          <span
            className={`px-2 py-0.5 text-xs font-medium rounded-full ${
              exercise.difficulty === "easy"
                ? "bg-green-100 text-green-800"
                : exercise.difficulty === "medium"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {exercise.difficulty}
          </span>
        </div>
        <button
          onClick={() => onComplete(exercise.id)}
          className="px-4 py-2 text-sm font-medium text-white bg-amber-500 rounded-md hover:bg-amber-600 transition-colors"
        >
          Zakończ ćwiczenie
        </button>
      </div>
    </div>
  );
};
