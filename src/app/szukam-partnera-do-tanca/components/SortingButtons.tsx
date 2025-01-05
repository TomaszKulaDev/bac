"use client";

import { useFilters } from "../context/FilterContext";
import { Gender } from "@/types/user";
import {
  FaSortAmountDown,
  FaSortAmountUp,
  FaVenusMars,
  FaGraduationCap,
  FaMusic,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { CITIES } from "@/constants/cities";

interface SortingButtonsProps {
  profilesCount?: number;
}

const DANCE_STYLES = [
  { value: "", label: "Wszystkie style" },
  { value: "Bachata Sensual", label: "Bachata Sensual" },
  { value: "Bachata Dominicana", label: "Bachata Dominicana" },
  { value: "Bachata Impro", label: "Bachata Impro" },
  { value: "Salsa LA On1", label: "Salsa LA On1" },
  { value: "Salsa LA On2", label: "Salsa LA On2" },
  { value: "Salsa Rueda", label: "Salsa Rueda" },
  { value: "Zouk", label: "Zouk" },
  { value: "Kizomba", label: "Kizomba" },
  { value: "Urban Kiz", label: "Urban Kiz" },
  { value: "West Coast Swing", label: "West Coast Swing" },
];

export const SortingButtons = ({ profilesCount }: SortingButtonsProps) => {
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

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-semibold text-gray-800">
          Profile taneczne
        </h2>
        <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
          {profilesCount ?? 0}
        </span>
      </div>

      <div className="flex flex-wrap gap-3 w-full sm:w-auto">
        <div className="relative group flex-1 sm:flex-none">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <FaMusic className="h-5 w-5 text-gray-400 group-hover:text-amber-500 transition-colors" />
          </div>
          <select
            value={selectedDanceStyle}
            onChange={(e) => setSelectedDanceStyle(e.target.value)}
            className="block w-full pl-10 pr-4 py-2.5 text-base
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

        <div className="relative group flex-1 sm:flex-none">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <FaVenusMars className="h-5 w-5 text-gray-400 group-hover:text-amber-500 transition-colors" />
          </div>
          <select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value as Gender | "")}
            className="block w-full pl-10 pr-4 py-2.5 text-base
                     border-gray-200 rounded-lg shadow-sm
                     focus:border-amber-500 focus:ring-amber-500
                     bg-white hover:border-amber-300 transition-colors
                     cursor-pointer"
          >
            <option value="">Wszyscy</option>
            <option value="male">Mężczyźni</option>
            <option value="female">Kobiety</option>
          </select>
        </div>

        <div className="relative group flex-1 sm:flex-none">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <FaGraduationCap className="h-5 w-5 text-gray-400 group-hover:text-amber-500 transition-colors" />
          </div>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="block w-full pl-10 pr-4 py-2.5 text-base
                     border-gray-200 rounded-lg shadow-sm
                     focus:border-amber-500 focus:ring-amber-500
                     bg-white hover:border-amber-300 transition-colors
                     cursor-pointer"
          >
            <option value="">Wszystkie poziomy</option>
            <option value="beginner">Początkujący</option>
            <option value="intermediate">Średniozaawansowany</option>
            <option value="advanced">Zaawansowany</option>
          </select>
        </div>

        <div className="relative group flex-1 sm:flex-none">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <FaMapMarkerAlt className="h-5 w-5 text-gray-400 group-hover:text-amber-500 transition-colors" />
          </div>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="block w-full pl-10 pr-4 py-2.5 text-base
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

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() =>
            setSortOrder(sortOrder === "newest" ? "oldest" : "newest")
          }
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg
                   bg-gradient-to-r from-amber-500 to-amber-600
                   text-white font-medium shadow-sm
                   hover:from-amber-600 hover:to-amber-700
                   transition-all duration-200 flex-1 sm:flex-none
                   justify-center"
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
    </div>
  );
};
