"use client";

import {
  FaSearch,
  FaMapMarkerAlt,
  FaUserGraduate,
  FaVenusMars,
} from "react-icons/fa";

export function PartnerSearch() {
  return (
    <div
      role="search"
      aria-label="Wyszukiwarka partnerów do tańca"
      className="bg-white rounded-xl shadow-sm overflow-hidden"
      itemScope
      itemType="http://schema.org/WebSite"
    >
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Wyszukaj Partnera
        </h2>
        <form
          itemProp="potentialAction"
          itemScope
          itemType="http://schema.org/SearchAction"
        >
          <meta
            itemProp="target"
            content="https://baciata.pl/szukam-partnera-do-tanca?q={search_term_string}"
          />

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

            <button
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 
                             text-white py-3 rounded-lg font-medium transition-all transform hover:scale-105 
                             hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
            >
              <FaSearch className="text-lg" />
              Szukaj
            </button>
          </div>
        </form>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t">
        <div className="flex items-center text-sm">
          <span className="text-gray-500 flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 bg-red-100 text-red-600 rounded-full font-medium">
              248
            </span>
            znalezionych profili
          </span>
        </div>
      </div>
    </div>
  );
}
