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
      className="bg-white p-4 rounded-lg shadow-lg h-fit sticky top-4"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Filtry</h3>
        {onReset && (
          <button
            onClick={onReset}
            className="text-sm text-purple-600 hover:text-purple-700"
          >
            Resetuj
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Styl tańca
          </label>
          <select
            value={filters.danceStyle}
            onChange={(e) =>
              onChange({ danceStyle: e.target.value as DanceStyleValue | "" })
            }
            className="w-full rounded-lg border-gray-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="">Wszystkie style</option>
            {DANCE_STYLES.map((style) => (
              <option key={style.value} value={style.value}>
                {style.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Poziom
          </label>
          <select
            value={filters.level}
            onChange={(e) =>
              onChange({ level: e.target.value as DanceLevel | "" })
            }
            className="w-full rounded-lg border-gray-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="">Wszystkie poziomy</option>
            {DANCE_LEVELS.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Płeć
          </label>
          <select
            value={filters.gender}
            onChange={(e) =>
              onChange({ gender: e.target.value as "" | "male" | "female" })
            }
            className="w-full rounded-lg border-gray-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="">Wszyscy</option>
            <option value="male">Prowadzący</option>
            <option value="female">Prowadzone</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={filters.availability}
            onChange={(e) =>
              onChange({
                availability: e.target.value as "all" | "active" | "inactive",
              })
            }
            className="w-full rounded-lg border-gray-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="all">Wszyscy</option>
            <option value="active">Tylko aktywni</option>
            <option value="inactive">Tylko nieaktywni</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
}
