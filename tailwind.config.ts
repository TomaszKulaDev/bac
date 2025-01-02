import type { Config } from "tailwindcss";

// Konfiguracja Tailwind CSS
const config: Config = {
  // Ścieżki do plików, w których Tailwind CSS będzie szukać klas do generowania stylów
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}", // Pliki w katalogu pages
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // Pliki w katalogu components
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // Pliki w katalogu app
  ],
  theme: {
    extend: {
      // Definicje niestandardowych tła gradientowych
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))", // Gradient radialny
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))", // Gradient stożkowy
      },
      // Definicje niestandardowych animacji
      animation: {
        "fade-in-up": "fadeInUp 0.3s ease-out", // Animacja fade-in-up
        "slide-up": "slideUp 0.3s ease-out",
        "scale-up": "scaleUp 0.2s ease-out",
      },
      // Definicje kluczowych klatek dla animacji
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" }, // Początkowy stan animacji
          "100%": { opacity: "1", transform: "translateY(0)" }, // Końcowy stan animacji
        },
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleUp: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      // Dodanie własnej klasy utility dla białego tła
      backgroundColor: {
        "global-white": "#ffffff",
        "music-page": "white",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      zIndex: {
        "cookie-banner": "9999",
      },
    },
  },
  // Wtyczki Tailwind CSS
  plugins: [
    require("@tailwindcss/aspect-ratio"), // Wtyczka do obsługi proporcji
  ],
};

export default config;
