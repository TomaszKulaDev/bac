export const levelConfig = {
  unspecified: {
    label: "❓",
    color: "from-gray-400 to-gray-500",
    icon: "",
    description: "Poziom trudności nie został jeszcze określony",
  },
  beginner: {
    label: "Podstawowy",
    color: "from-emerald-400 to-emerald-500",
    icon: "🎓",
    description: "Podstawowe kroki i proste kombinacje",
  },
  intermediate: {
    label: "Średni",
    color: "from-amber-400 to-amber-500",
    icon: "⭐",
    description: "Rozbudowane kombinacje",
  },
  advanced: {
    label: "Zaawan",
    color: "from-red-400 to-red-500",
    icon: "🔥",
    description: "Skomplikowane sekwencje",
  },
} as const;

export const styleConfig = {
  unspecified: {
    label: "❓",
    color: "from-gray-400 to-gray-500",
    icon: "",
    description: "Styl nie został jeszcze określony",
  },
  sensual: {
    label: "Sensual",
    color: "from-pink-400 to-pink-500",
    icon: "❤️",
    description: "Bachata Sensual",
  },
  dominicana: {
    label: "Dominicana",
    color: "from-yellow-400 to-yellow-500",
    icon: "🌴",
    description: "Bachata Dominicana",
  },
  impro: {
    label: "Impro",
    color: "from-purple-400 to-purple-500",
    icon: "👥",
    description: "Bachata Moderna/Fusion",
  },
} as const;

export const tempoConfig = {
  unspecified: {
    label: "❓",
    color: "from-gray-400 to-gray-500",
    icon: "",
    description: "Tempo nie zostało jeszcze określone",
  },
  slow: {
    label: "Wolne",
    color: "from-blue-400 to-blue-500",
    icon: "🐢",
    description: "Wolne tempo (90-120 BPM)",
  },
  medium: {
    label: "Średnie",
    color: "from-green-400 to-green-500",
    icon: "👣",
    description: "Średnie tempo (120-140 BPM)",
  },
  fast: {
    label: "Szybkie",
    color: "from-red-400 to-red-500",
    icon: "🏃",
    description: "Szybkie tempo (140+ BPM)",
  },
} as const;
