export const DANCE_LEVELS = [
  { value: "", label: "Poziom" },
  { value: "beginner", label: "Początkujący" },
  { value: "intermediate", label: "Średniozaawansowany" },
  { value: "advanced", label: "Zaawansowany" },
] as const;

// Typ dla wartości poziomów
export type DanceLevel = (typeof DANCE_LEVELS)[number]["value"];
