interface LevelSelectorProps {
  selectedLevel: string;
  onLevelChange: (level: string) => void;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({
  selectedLevel,
  onLevelChange,
}) => {
  const levels = [
    { id: "all", label: "Wszystkie poziomy" },
    { id: "beginner", label: "Początkujący" },
    { id: "intermediate", label: "Średniozaawansowany" },
    { id: "advanced", label: "Zaawansowany" },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {levels.map((level) => (
        <button
          key={level.id}
          onClick={() => onLevelChange(level.id)}
          className={`px-4 py-2 rounded-full transition-colors ${
            selectedLevel === level.id
              ? "bg-purple-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {level.label}
        </button>
      ))}
    </div>
  );
};

export default LevelSelector;
