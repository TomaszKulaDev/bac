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
  FaMusic,
  FaMapMarkerAlt,
  FaHeart,
  FaLock,
  FaUnlock,
  FaUserPlus,
  FaSignInAlt,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { CITIES } from "@/constants/cities";
import { LoginPromptModal } from "./LoginPromptModal";

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

  return (
    <>
      <div className="flex flex-col gap-4 bg-white p-4 rounded-xl shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Bachateros & Bachateras
            </h2>
            <span className="px-2 sm:px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
              {profilesCount ?? 0}
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSortClick}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg
                     bg-gradient-to-r from-amber-500 to-amber-600
                     text-white font-medium shadow-sm
                     hover:from-amber-600 hover:to-amber-700
                     transition-all duration-200"
          >
            {sortOrder === "newest" ? (
              <>
                <FaSortAmountDown className="h-4 w-4" />
                <span className="text-sm">Od najnowszych</span>
              </>
            ) : (
              <>
                <FaSortAmountUp className="h-4 w-4" />
                <span className="text-sm">Od najstarszych</span>
              </>
            )}
          </motion.button>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:justify-center">
          <div className="col-span-2 sm:col-span-1 relative group sm:flex-none sm:w-[200px]">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <FaMusic className="h-4 w-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
            </div>
            <select
              value={selectedDanceStyle}
              onChange={(e) =>
                handleFilterClick(() => setSelectedDanceStyle(e.target.value))
              }
              className="block w-full pl-9 pr-3 py-2 text-sm
                     border-gray-200 rounded-lg shadow-sm
                     focus:border-amber-500 focus:ring-amber-500
                     bg-white hover:border-amber-300 transition-colors
                     cursor-pointer"
            >
              {DANCE_STYLES.map((style) => (
                <option key={style.value} value={style.value}>
                  {style.label}
                </option>
              ))}
            </select>
          </div>

          <div className="relative group sm:flex-none sm:w-[140px]">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <FaVenusMars className="h-4 w-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
            </div>
            <select
              value={selectedGender}
              onChange={(e) =>
                handleFilterClick(() =>
                  setSelectedGender(e.target.value as Gender | "")
                )
              }
              className="block w-full pl-9 pr-3 py-2 text-sm
                     border-gray-200 rounded-lg shadow-sm
                     focus:border-amber-500 focus:ring-amber-500
                     bg-white hover:border-amber-300 transition-colors
                     cursor-pointer"
            >
              <option value="">Wszyscy</option>
              <option value="male">Partnerzy</option>
              <option value="female">Partnerki</option>
            </select>
          </div>

          <div className="relative group sm:flex-none sm:w-[180px]">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <FaGraduationCap className="h-4 w-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
            </div>
            <select
              value={selectedLevel}
              onChange={(e) =>
                handleFilterClick(() => setSelectedLevel(e.target.value))
              }
              className="block w-full pl-9 pr-3 py-2 text-sm
                     border-gray-200 rounded-lg shadow-sm
                     focus:border-amber-500 focus:ring-amber-500
                     bg-white hover:border-amber-300 transition-colors
                     cursor-pointer"
            >
              <option value="">Umiejętności</option>
              <option value="beginner">Początkujący</option>
              <option value="intermediate">Średniozaawansowany</option>
              <option value="advanced">Zaawansowany</option>
            </select>
          </div>

          <div className="relative group sm:flex-none sm:w-[160px]">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <FaMapMarkerAlt className="h-4 w-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
            </div>
            <select
              value={selectedLocation}
              onChange={(e) =>
                handleFilterClick(() => setSelectedLocation(e.target.value))
              }
              className="block w-full pl-9 pr-3 py-2 text-sm
                     border-gray-200 rounded-lg shadow-sm
                     focus:border-amber-500 focus:ring-amber-500
                     bg-white hover:border-amber-300 transition-colors
                     cursor-pointer"
            >
              {CITIES.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.label}
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
