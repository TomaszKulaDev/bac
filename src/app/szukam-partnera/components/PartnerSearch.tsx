"use client";

import { useState } from "react";
import {
  FaSearch,
  FaFilter,
  FaMapMarkerAlt,
  FaUserGraduate,
  FaVenusMars,
  FaCalendarAlt,
  FaMusic,
} from "react-icons/fa";

export function PartnerSearch() {
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  const danceStyles = [
    { id: "bachata", label: "Bachata" },
    { id: "salsa", label: "Salsa" },
    { id: "kizomba", label: "Kizomba" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Wyszukaj Partnera</h2>
          <button
            onClick={() => setIsAdvancedSearch(!isAdvancedSearch)}
            className="text-red-600 hover:text-red-700 flex items-center gap-2 text-sm font-medium"
          >
            <FaFilter />
            Filtry zaawansowane
          </button>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select className="w-full pl-10 pr-4 py-3 rounded-lg border-gray-200 focus:border-red-500 focus:ring-red-500">
              <option value="">Wybierz miasto</option>
              <option value="warszawa">Warszawa</option>
              <option value="krakow">Kraków</option>
              <option value="poznan">Poznań</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <FaUserGraduate className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select className="w-full pl-10 pr-4 py-3 rounded-lg border-gray-200 focus:border-red-500 focus:ring-red-500">
                <option value="">Poziom</option>
                <option value="beginner">Początkujący</option>
                <option value="intermediate">Średniozaawansowany</option>
                <option value="advanced">Zaawansowany</option>
              </select>
            </div>

            <div className="relative">
              <FaVenusMars className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select className="w-full pl-10 pr-4 py-3 rounded-lg border-gray-200 focus:border-red-500 focus:ring-red-500">
                <option value="">Szukam</option>
                <option value="F">Partnerki</option>
                <option value="M">Partnera</option>
              </select>
            </div>
          </div>

          {isAdvancedSearch && (
            <div className="space-y-4 pt-4 border-t">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Style tańca
                </label>
                <div className="flex flex-wrap gap-2">
                  {danceStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => {
                        setSelectedStyles((prev) =>
                          prev.includes(style.id)
                            ? prev.filter((id) => id !== style.id)
                            : [...prev, style.id]
                        );
                      }}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all
                        ${
                          selectedStyles.includes(style.id)
                            ? "bg-red-100 text-red-700 hover:bg-red-200"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                      {style.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <FaMusic className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select className="select-custom">
                    <option value="">Styl tańca</option>
                    <option value="social">Social</option>
                    <option value="performance">Pokazowy</option>
                    <option value="competition">Turniejowy</option>
                  </select>
                </div>

                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select className="w-full pl-10 pr-4 py-3 rounded-lg border-gray-200 focus:border-red-500 focus:ring-red-500">
                    <option value="">Dostępność</option>
                    <option value="weekdays">Dni powszednie</option>
                    <option value="weekends">Weekendy</option>
                    <option value="flexible">Elastyczna</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <button
            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 
                           text-white py-3 rounded-lg font-medium transition-all transform hover:scale-105 
                           hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
          >
            <FaSearch className="text-lg" />
            Szukaj
          </button>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 bg-red-100 text-red-600 rounded-full font-medium">
              248
            </span>
            znalezionych profili
          </span>
          <button className="text-red-600 hover:text-red-700 font-medium group flex items-center gap-1">
            <span>Zapisz wyszukiwanie</span>
            <span className="group-hover:translate-x-0.5 transition-transform">
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
