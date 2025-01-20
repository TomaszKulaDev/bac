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
    {
      id: "all",
      label: "Wszystkie poziomy",
      ariaLabel: "Pokaż wszystkie poziomy kursów bachaty",
    },
    {
      id: "isolations",
      label: "Izolacje",
      ariaLabel: "Pokaż kursy izolacji w bachacie",
    },
    {
      id: "beginner",
      label: "Podstawy",
      ariaLabel: "Pokaż kursy bachaty dla początkujących",
    },
    {
      id: "intermediate",
      label: "Średniozaawansowany",
      ariaLabel: "Pokaż kursy bachaty dla średniozaawansowanych",
    },
    {
      id: "advanced",
      label: "Zaawansowany",
      ariaLabel: "Pokaż kursy bachaty dla zaawansowanych",
    },
    {
      id: "lady-styling",
      label: "Lady Styling",
      ariaLabel: "Pokaż kursy Lady Styling",
    },
  ];

  return (
    <nav aria-label="Wybór poziomu kursu bachaty" className="mb-8">
      <h2 className="sr-only">Filtry poziomów zaawansowania</h2>
      <div
        className="inline-flex flex-wrap gap-4"
        role="radiogroup"
        aria-label="Poziomy zaawansowania"
      >
        {levels.map((level) => (
          <button
            key={level.id}
            onClick={() => onLevelChange(level.id)}
            aria-checked={selectedLevel === level.id}
            aria-label={level.ariaLabel}
            role="radio"
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
    </nav>
  );
};

export default LevelSelector;
