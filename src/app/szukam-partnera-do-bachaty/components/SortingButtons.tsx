"use client";

import { useFilters } from "../context/FilterContext";
import { Gender } from "@/types/user";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  FaVenusMars,
  FaGraduationCap,
  FaPeopleArrows,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { LoginPromptModal } from "./LoginPromptModal";
import { CITIES } from "@/constants/cities";
import { DANCE_LEVELS } from "@/constants/levels";
import { DANCE_STYLES } from "@/constants/danceStyles";

interface SortingButtonsProps {
  profilesCount?: number;
}

export const SortingButtons = ({ profilesCount }: SortingButtonsProps) => {
  const { data: session } = useSession();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const {
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
