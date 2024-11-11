import { DifficultyLevel, StyleType, TempoType } from '../types';
import { levelConfig } from '../constants';

type FilterOption = {
  label: string;
  icon: string;
  color: string;
  description: string;
  ariaLabel?: string;
  ariaDescription?: string;
};

export const DIFFICULTY_OPTIONS: Record<DifficultyLevel, FilterOption> = {
  unspecified: {
    label: "❓",
    color: "from-gray-400 to-gray-500",
    icon: "",
    description: "Poziom trudności nie został jeszcze przypisany do tego utworu",
    ariaLabel: "Poziom do określenia",
    ariaDescription: "Filtruj utwory, których poziom trudności nie został jeszcze określony"
  },
  beginner: {
    label: "Podstawowy",
    color: "from-emerald-400 to-emerald-500",
    icon: "🎓",
    description: "Podstawowe kroki i proste kombinacje, idealne na początek przygody z tańcem",
    ariaLabel: "Poziom podstawowy",
    ariaDescription: "Filtruj utwory odpowiednie dla początkujących tancerzy"
  },
  intermediate: {
    label: "Średniozaawansowany",
    color: "from-amber-400 to-amber-500",
    icon: "⭐",
    description: "Rozbudowane kombinacje i bardziej złożone figury taneczne",
    ariaLabel: "Poziom średniozaawansowany",
    ariaDescription: "Filtruj utwory o poziomie średniozaawansowanym"
  },
  advanced: {
    label: "Zaawansowany",
    color: "from-red-400 to-red-500",
    icon: "🔥",
    description: "Skomplikowane sekwencje i zaawansowane techniki dla doświadczonych tancerzy",
    ariaLabel: "Poziom zaawansowany",
    ariaDescription: "Filtruj utwory o poziomie zaawansowanym"
  },
};

export const STYLE_OPTIONS: Record<StyleType, FilterOption> = {
  unspecified: {
    label: "❓",
    color: "from-gray-400 to-gray-500",
    icon: "",
    description: "Styl tańca nie został jeszcze sklasyfikowany",
    ariaLabel: "Styl do określenia",
    ariaDescription: "Filtruj utwory, których styl nie został jeszcze określony"
  },
  sensual: {
    label: "Bachata Sensual",
    color: "from-pink-400 to-pink-500",
    icon: "❤️",
    description: "Zmysłowy i elegancki styl z płynnymi ruchami i romantyczną interpretacją",
    ariaLabel: "Bachata Sensual",
    ariaDescription: "Filtruj utwory w stylu Bachata Sensual"
  },
  dominicana: {
    label: "Bachata Dominicana",
    color: "from-yellow-400 to-yellow-500",
    icon: "🌴",
    description: "Autentyczny styl dominikański, charakteryzujący się energicznymi ruchami bioder",
    ariaLabel: "Bachata Dominicana",
    ariaDescription: "Filtruj utwory w stylu Bachata Dominicana"
  },
  impro: {
    label: "Impro",
    color: "from-purple-400 to-purple-500",
    icon: "👥",
    description: "Nowoczesne połączenie stylów z elementami improwizacji i fuzji",
    ariaLabel: "Impro",
    ariaDescription: "Filtruj utwory w stylu impro"
  },
};

export const TEMPO_OPTIONS: Record<TempoType, FilterOption> = {
  unspecified: {
    label: "❓",
    color: "from-gray-400 to-gray-500",
    icon: "",
    description: "Tempo utworu nie zostało jeszcze określone",
    ariaLabel: "Tempo do określenia",
    ariaDescription: "Filtruj utwory, których tempo nie zostało jeszcze określone"
  },
  slow: {
    label: "Tempo wolne",
    color: "from-blue-400 to-blue-500",
    icon: "🐢",
    description: "Spokojne tempo (90-120 BPM), idealne do nauki i doskonalenia techniki",
    ariaLabel: "Wolne tempo",
    ariaDescription: "Filtruj utwory o wolnym tempie, idealne do nauki"
  },
  medium: {
    label: "Tempo średnie",
    color: "from-green-400 to-green-500",
    icon: "👣",
    description: "Standardowe tempo bachaty (120-140 BPM), najbardziej popularne na parkiecie",
    ariaLabel: "Średnie tempo",
    ariaDescription: "Filtruj utwory o średnim tempie, najbardziej popularne na parkiecie"
  },
  fast: {
    label: "Tempo szybkie",
    color: "from-red-400 to-red-500",
    icon: "🏃",
    description: "Dynamiczne tempo (140+ BPM), wymagające dobrej techniki i kondycji",
    ariaLabel: "Szybkie tempo",
    ariaDescription: "Filtruj utwory o szybkim tempie, wymagające dobrej techniki i kondycji"
  },
};