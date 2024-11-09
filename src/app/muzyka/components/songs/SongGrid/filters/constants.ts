import { DifficultyLevel, StyleType, TempoType } from '../types';
import { levelConfig } from '../constants';

type FilterOption = {
  label: string;
  icon: string;
  color: string;
};

export const DIFFICULTY_OPTIONS: Record<DifficultyLevel, FilterOption> = {
  unspecified: {
    label: "Do określenia",
    color: "from-gray-400 to-gray-500",
    icon: "❓",
  },
  beginner: levelConfig.beginner,
  intermediate: levelConfig.intermediate,
  advanced: levelConfig.advanced,
};

export const STYLE_OPTIONS: Record<StyleType, FilterOption> = {
  unspecified: {
    label: "Do określenia",
    color: "from-gray-400 to-gray-500",
    icon: "❓",
  },
  sensual: {
    label: "Sensual",
    color: "from-pink-400 to-pink-500",
    icon: "💖",
  },
  dominicana: {
    label: "Dominicana",
    color: "from-yellow-400 to-yellow-500",
    icon: "🌴",
  },
  impro: {
    label: "Impro",
    color: "from-purple-400 to-purple-500",
    icon: "💃",
  },
};

export const TEMPO_OPTIONS: Record<TempoType, FilterOption> = {
  unspecified: {
    label: "Do określenia",
    color: "from-gray-400 to-gray-500",
    icon: "❓",
  },
  slow: {
    label: "Wolne",
    color: "from-blue-400 to-blue-500",
    icon: "🐢",
  },
  medium: {
    label: "Średnie",
    color: "from-green-400 to-green-500",
    icon: "🚶",
  },
  fast: {
    label: "Szybkie",
    color: "from-red-400 to-red-500",
    icon: "🏃",
  },
};