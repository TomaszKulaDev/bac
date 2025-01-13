"use client";

import { useFilters } from "../context/FilterContext";
import { Gender } from "@/types/user";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  FaSortAmountDown,
  FaSortAmountUp,
  FaVenusMars,
  FaGraduationCap,
  FaPeopleArrows,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { CITIES } from "@/constants/cities";
import { LoginPromptModal } from "./LoginPromptModal";
import { DANCE_LEVELS } from "@/constants/levels";

interface SortingButtonsProps {
  profilesCount?: number;
}

const DANCE_STYLES = [
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
];

export const SortingButtons = ({ profilesCount }: SortingButtonsProps) => {
  const { data: session } = useSession();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const {
    sortOrder,
    setSortOrder,
    selectedGender,
    setSelectedGender,
    selectedLevel,
    setSelectedLevel,
    selectedDanceStyle,
    setSelectedDanceStyle,
    selectedLocation,
    setSelectedLocation,
  } = useFilters();

  const handleFilterClick = (action: () => void) => {
    if (!session) {
      setShowLoginModal(true);
      return;
    }
    action();
  };

  const handleSortClick = () => {
    if (!session) {
      setShowLoginModal(true);
      return;
    }
    setSortOrder(sortOrder === "newest" ? "oldest" : "newest");
  };

  const selectClassName = `
    block w-full pl-10 pr-3 py-3.5 text-base 
    border-0 rounded-md shadow-sm
    bg-white text-gray-700
    transition-all duration-200 ease-in-out
    hover:bg-gray-50
    focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50
    focus:border-amber-500 focus:outline-none
    disabled:opacity-50 disabled:cursor-not-allowed
    appearance-none cursor-pointer
  `;

  const iconClassName =
    "h-5 w-5 text-gray-400 transition-colors duration-200 group-hover:text-amber-500";

  return (
    <>
      <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Bachateros & Bachateras
            </h2>
            <motion.span
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium"
            >
              {profilesCount ?? 0}
            </motion.span>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSortClick}
            className="w-full sm:w-auto flex items-center justify-center gap-2 
                     px-4 py-3.5 rounded-md bg-amber-500 text-white font-medium
                     hover:bg-amber-600 transition-all duration-200
                     shadow-sm hover:shadow-md"
          >
            {sortOrder === "newest" ? (
              <>
                <FaSortAmountDown className="h-5 w-5" />
                <span>Od najnowszych</span>
              </>
            ) : (
              <>
                <FaSortAmountUp className="h-5 w-5" />
                <span>Od najstarszych</span>
              </>
            )}
          </motion.button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Płeć */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-3 flex items-center z-10">
              <FaVenusMars className={iconClassName} />
            </div>
            <select
              value={selectedGender}
              onChange={(e) =>
                handleFilterClick(() =>
                  setSelectedGender(e.target.value as Gender | "")
                )
              }
              className={selectClassName}
            >
              <option value="">Wszyscy</option>
              <option value="male">Partnerzy</option>
              <option value="female">Partnerki</option>
            </select>
          </div>

          {/* Lokalizacja */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-3 flex items-center z-10">
              <FaMapMarkerAlt className={iconClassName} />
            </div>
            <select
              value={selectedLocation}
              onChange={(e) =>
                handleFilterClick(() => setSelectedLocation(e.target.value))
              }
              className={selectClassName}
            >
              {CITIES.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.label}
                </option>
              ))}
            </select>
          </div>

          {/* Styl tańca */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-3 flex items-center z-10">
              <FaPeopleArrows className={iconClassName} />
            </div>
            <select
              value={selectedDanceStyle}
              onChange={(e) =>
                handleFilterClick(() => setSelectedDanceStyle(e.target.value))
              }
              className={selectClassName}
            >
              {DANCE_STYLES.map((style) => (
                <option key={style.value} value={style.value}>
                  {style.label}
                </option>
              ))}
            </select>
          </div>

          {/* Poziom */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-3 flex items-center z-10">
              <FaGraduationCap className={iconClassName} />
            </div>
            <select
              value={selectedLevel}
              onChange={(e) =>
                handleFilterClick(() => setSelectedLevel(e.target.value))
              }
              className={selectClassName}
            >
              {DANCE_LEVELS.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <LoginPromptModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
};
