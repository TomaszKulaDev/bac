export const DANCE_STYLES = [
  { value: "", label: "Wszystkie style" },
  { value: "Bachata Sensual", label: "Bachata Sensual" },
  { value: "Bachata Dominicana", label: "Bachata Dominicana" },
  { value: "Bachata Impro", label: "Bachata Impro" },
  { value: "Salsa Cubana", label: "Salsa Cubana" },
  { value: "Salsa LA On1", label: "Salsa LA On1" },
  { value: "Salsa LA On2", label: "Salsa LA On2" },
  { value: "Salsa Rueda", label: "Salsa Rueda" },
  { value: "Zouk", label: "Zouk" },
  { value: "Kizomba", label: "Kizomba" },
  { value: "Urban Kiz", label: "Urban Kiz" },
  { value: "West Coast Swing", label: "West Coast Swing" },
] as const;

export type DanceStyleValue = (typeof DANCE_STYLES)[number]["value"];
