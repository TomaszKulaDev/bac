import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useDebounce } from "@/app/hooks/useDebounce";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  lightMode?: boolean;
  suggestions?: string[];
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Szukaj po nazwie, lokalizacji lub stylu tańca...",
  lightMode = false,
  suggestions = [],
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debouncedValue = useDebounce(value, 300);

  // Zamykanie sugestii przy kliknięciu poza komponentem
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtrowanie sugestii
  const filteredSuggestions = useMemo(() => {
    if (!debouncedValue) return [];

    return suggestions
      .filter((suggestion) =>
        suggestion.toLowerCase().includes(debouncedValue.toLowerCase())
      )
      .slice(0, 5); // Limitujemy do 5 sugestii
  }, [debouncedValue, suggestions]);

  return (
    <div ref={searchRef} className="relative w-full">
      <motion.div
        initial={false}
        animate={{
          scale: isFocused ? 1.02 : 1,
          boxShadow: isFocused
            ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
            : "none",
        }}
        className={`relative flex items-center rounded-xl overflow-hidden
          ${
            lightMode
              ? "bg-white border border-gray-200"
              : "bg-white/10 backdrop-blur-sm"
          }`}
      >
        {/* Ikona wyszukiwania */}
        <FaSearch
          className={`absolute left-4 w-5 h-5 
            ${lightMode ? "text-gray-400" : "text-white/60"}`}
        />

        {/* Pole wyszukiwania */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            setShowSuggestions(true);
          }}
          placeholder={placeholder}
          className={`w-full px-4 py-3 pl-12 pr-10 text-base
            ${
              lightMode
                ? "bg-transparent text-gray-900 placeholder-gray-500"
                : "bg-transparent text-white placeholder-white/60"
            }
            outline-none transition-colors`}
        />

        {/* Przycisk czyszczenia */}
        <AnimatePresence>
          {value && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => onChange("")}
              className={`absolute right-4 p-1 rounded-full
                ${
                  lightMode
                    ? "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }
                transition-colors`}
            >
              <FaTimes className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Lista sugestii */}
      <AnimatePresence>
        {showSuggestions && value && filteredSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute z-50 w-full mt-2 py-2 rounded-xl shadow-lg
              ${lightMode ? "bg-white" : "bg-gray-900/90 backdrop-blur-sm"}`}
          >
            {filteredSuggestions.map((suggestion, index) => (
              <motion.button
                key={suggestion}
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: { delay: index * 0.05 },
                }}
                onClick={() => {
                  onChange(suggestion);
                  setShowSuggestions(false);
                }}
                className={`w-full px-4 py-2 text-left hover:bg-amber-50
                  ${
                    lightMode
                      ? "text-gray-700 hover:text-amber-700"
                      : "text-white/90 hover:text-white"
                  }
                  transition-colors`}
              >
                {suggestion}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
