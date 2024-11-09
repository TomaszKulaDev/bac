import { DifficultyLevel, StyleType, TempoType } from '../types';
import { levelConfig } from '../constants';

type FilterOption = {
  label: string;
  icon: string;
  color: string;
  description: string;
};

export const DIFFICULTY_OPTIONS: Record<DifficultyLevel, FilterOption> = {
  unspecified: {
    label: "Poziom do określenia",
    color: "from-gray-400 to-gray-500",
    icon: "❓",
    description: "Poziom trudności nie został jeszcze przypisany do tego utworu"
  },
  beginner: {
    label: "Poziom podstawowy",
    color: "from-emerald-400 to-emerald-500",
    icon: "🎓",
    description: "Podstawowe kroki i proste kombinacje, idealne na początek przygody z tańcem"
  },
  intermediate: {
    label: "Poziom średniozaawansowany",
    color: "from-amber-400 to-amber-500",
    icon: "⭐",
    description: "Rozbudowane kombinacje i bardziej złożone figury taneczne"
  },
  advanced: {
    label: "Poziom zaawansowany",
    color: "from-red-400 to-red-500",
    icon: "🔥",
    description: "Skomplikowane sekwencje i zaawansowane techniki dla doświadczonych tancerzy"
  },
};

export const STYLE_OPTIONS: Record<StyleType, FilterOption> = {
  unspecified: {
    label: "Styl do określenia",
    color: "from-gray-400 to-gray-500",
    icon: "❓",
    description: "Styl tańca nie został jeszcze sklasyfikowany"
  },
  sensual: {
    label: "Bachata Sensual",
    color: "from-pink-400 to-pink-500",
    icon: "❤️",
    description: "Zmysłowy i elegancki styl z płynnymi ruchami i romantyczną interpretacją"
  },
  dominicana: {
    label: "Bachata Dominicana",
    color: "from-yellow-400 to-yellow-500",
    icon: "🌴",
    description: "Autentyczny styl dominikański, charakteryzujący się energicznymi ruchami bioder"
  },
  impro: {
    label: "Impro",
    color: "from-purple-400 to-purple-500",
    icon: "👥",
    description: "Nowoczesne połączenie stylów z elementami improwizacji i fuzji"
  },
};

export const TEMPO_OPTIONS: Record<TempoType, FilterOption> = {
  unspecified: {
    label: "Tempo do określenia",
    color: "from-gray-400 to-gray-500",
    icon: "❓",
    description: "Tempo utworu nie zostało jeszcze określone"
  },
  slow: {
    label: "Tempo wolne",
    color: "from-blue-400 to-blue-500",
    icon: "🐢",
    description: "Spokojne tempo (90-120 BPM), idealne do nauki i doskonalenia techniki"
  },
  medium: {
    label: "Tempo średnie",
    color: "from-green-400 to-green-500",
    icon: "👣",
    description: "Standardowe tempo bachaty (120-140 BPM), najbardziej popularne na parkiecie"
  },
  fast: {
    label: "Tempo szybkie",
    color: "from-red-400 to-red-500",
    icon: "🏃",
    description: "Dynamiczne tempo (140+ BPM), wymagające dobrej techniki i kondycji"
  },
};