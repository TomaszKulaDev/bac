export const levelConfig = {
  unspecified: {
    label: "Do określenia",
    color: "from-gray-400 to-gray-500",
    icon: "❓",
  },
  beginner: {
    label: "Początkujący",
    color: "from-emerald-400 to-emerald-500",
    icon: "🎓",
  },
  intermediate: {
    label: "Średni",
    color: "from-amber-400 to-amber-500",
    icon: "⭐",
  },
  advanced: {
    label: "Zaawansowany",
    color: "from-red-400 to-red-500",
    icon: "🔥",
  },
} as const;

export const styleConfig = {
  impro: {
    label: "Impro",
    color: "from-purple-400 to-purple-500",
    icon: "💃",
  },
} as const;
