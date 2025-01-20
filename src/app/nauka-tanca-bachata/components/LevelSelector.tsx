/**
 * Komponent LevelSelector służy do wyświetlania i wybierania poziomów zaawansowania kursów tańca.
 * Wyświetla listę przycisków reprezentujących różne poziomy (wszystkie, izolacje, początkujący itd.).
 * Aktywny poziom jest wyróżniony kolorem, a kliknięcie przycisku powoduje zmianę wybranego poziomu.
 */

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
    { id: "isolations", label: "Izolacje" },
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
              ? "bg-amber-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {level.label}
        </button>
      ))}
    </div>
  );
};

export default LevelSelector;
