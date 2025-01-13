"use client";

import { DANCE_STYLES, DanceStyleValue } from "@/constants/danceStyles";
import { MapFilters } from "../types";
import { motion } from "framer-motion";
import { DANCE_LEVELS, DanceLevel } from "@/constants/levels";

interface MapControlsProps {
  filters: MapFilters;
  onChange: (filters: Partial<MapFilters>) => void;
  onReset?: () => void;
}

export function MapControls({ filters, onChange, onReset }: MapControlsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white p-5 rounded-xl shadow-lg h-fit sticky top-4 border border-gray-100"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Filtry mapy</h3>
        {onReset && (
          <button
            onClick={onReset}
            className="text-sm text-amber-600 hover:text-amber-700 flex items-center gap-1.5 
                     transition-all duration-200 hover:gap-2"
          >
            <span>Resetuj</span>
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div className="filter-group">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Styl tańca
          </label>
          <select
            value={filters.danceStyle}
            onChange={(e) =>
              onChange({ danceStyle: e.target.value as DanceStyleValue | "" })
            }
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-1.5 px-3 text-sm
                     hover:bg-gray-100 transition-colors duration-200
                     focus:outline-none focus:ring-0 focus:border-gray-300"
          >
            <option value="">Wszystkie style</option>
            {DANCE_STYLES.map((style) => (
              <option key={style.value} value={style.value}>
                {style.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Poziom zaawansowania
          </label>
          <select
            value={filters.level}
            onChange={(e) =>
              onChange({ level: e.target.value as DanceLevel | "" })
            }
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-1.5 px-3 text-sm
                     hover:bg-gray-100 transition-colors duration-200
                     focus:outline-none focus:ring-0 focus:border-gray-300"
          >
            <option value="">Wszystkie poziomy</option>
            {DANCE_LEVELS.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Rola w tańcu
          </label>
          <select
            value={filters.gender}
            onChange={(e) =>
              onChange({ gender: e.target.value as "" | "male" | "female" })
            }
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-1.5 px-3 text-sm
                     hover:bg-gray-100 transition-colors duration-200
                     focus:outline-none focus:ring-0 focus:border-gray-300"
          >
            <option value="">Wszyscy</option>
            <option value="male">Prowadzący</option>
            <option value="female">Prowadzone</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Status aktywności
          </label>
          <select
            value={filters.availability}
            onChange={(e) =>
              onChange({
                availability: e.target.value as "all" | "active" | "inactive",
              })
            }
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-1.5 px-3 text-sm
                     hover:bg-gray-100 transition-colors duration-200
                     focus:outline-none focus:ring-0 focus:border-gray-300"
          >
            <option value="all">Wszyscy</option>
            <option value="active">Tylko aktywni</option>
            <option value="inactive">Tylko nieaktywni</option>
          </select>
        </div>

        <button
          onClick={onReset}
          className="w-full mt-4 px-4 py-2 text-sm font-medium text-amber-600 
                   bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors duration-200
                   flex items-center justify-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Resetuj wszystkie filtry
        </button>
      </div>
    </motion.div>
  );
}
