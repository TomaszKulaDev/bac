"use client";

import {
  FaSearch,
  FaMapMarkerAlt,
  FaUserGraduate,
  FaVenusMars,
  FaMusic,
  FaCalendarAlt,
} from "react-icons/fa";

export function PartnerSearch() {
  return (
    <div
      id="partner-search"
      role="search"
      aria-label="Wyszukiwarka partnerów do tańca"
      className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-amber-500/10"
      itemScope
      itemType="http://schema.org/WebSite"
    >
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaSearch className="text-amber-500" />
          Wyszukaj Partnera
        </h2>

        <form
          className="space-y-4"
          itemProp="potentialAction"
          itemScope
          itemType="http://schema.org/SearchAction"
        >
          <meta
            itemProp="target"
            content="https://baciata.pl/szukam-partnera-do-tanca?q={search_term_string}"
          />

          {/* Lokalizacja */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Lokalizacja
            </label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500" />
              <select
                className="w-full pl-10 pr-4 py-3 rounded-lg border-amber-200 
                         focus:border-amber-500 focus:ring-amber-500 focus:ring-opacity-50
                         bg-white hover:border-amber-300 transition-colors"
              >
                <option value="">Wybierz miasto</option>
                <option value="warszawa">Warszawa</option>
                <option value="krakow">Kraków</option>
                <option value="poznan">Poznań</option>
              </select>
            </div>
          </div>

          {/* Style tańca */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Styl tańca
            </label>
            <div className="relative">
              <FaMusic className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500" />
              <select
                className="w-full pl-10 pr-4 py-3 rounded-lg border-amber-200 
                         focus:border-amber-500 focus:ring-amber-500 focus:ring-opacity-50
                         bg-white hover:border-amber-300 transition-colors"
              >
                <option value="">Wybierz styl</option>
                <option value="bachata">Bachata</option>
                <option value="salsa">Salsa</option>
                <option value="kizomba">Kizomba</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Poziom */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Poziom
              </label>
              <div className="relative">
                <FaUserGraduate className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500" />
                <select
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-amber-200 
                           focus:border-amber-500 focus:ring-amber-500 focus:ring-opacity-50
                           bg-white hover:border-amber-300 transition-colors"
                >
                  <option value="">Poziom</option>
                  <option value="beginner">Początkujący</option>
                  <option value="intermediate">Średniozaawansowany</option>
                  <option value="advanced">Zaawansowany</option>
                </select>
              </div>
            </div>

            {/* Płeć */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Szukam
              </label>
              <div className="relative">
                <FaVenusMars className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500" />
                <select
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-amber-200 
                           focus:border-amber-500 focus:ring-amber-500 focus:ring-opacity-50
                           bg-white hover:border-amber-300 transition-colors"
                >
                  <option value="">Szukam</option>
                  <option value="F">Partnerki</option>
                  <option value="M">Partnera</option>
                </select>
              </div>
            </div>
          </div>

          {/* Wiek */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Przedział wiekowy
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Od"
                min="18"
                max="100"
                className="pl-4 pr-4 py-3 rounded-lg border-amber-200 
                         focus:border-amber-500 focus:ring-amber-500 focus:ring-opacity-50
                         bg-white hover:border-amber-300 transition-colors"
              />
              <input
                type="number"
                placeholder="Do"
                min="18"
                max="100"
                className="pl-4 pr-4 py-3 rounded-lg border-amber-200 
                         focus:border-amber-500 focus:ring-amber-500 focus:ring-opacity-50
                         bg-white hover:border-amber-300 transition-colors"
              />
            </div>
          </div>

          <button
            className="w-full bg-gradient-to-r from-amber-500 to-red-500 
                     hover:from-amber-600 hover:to-red-600 
                     text-white py-3 rounded-lg font-medium transition-all 
                     transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] 
                     flex items-center justify-center gap-2"
          >
            <FaSearch className="text-lg" />
            Szukaj
          </button>
        </form>
      </div>

      <div className="px-6 py-4 bg-gradient-to-r from-amber-50 to-red-50 border-t border-amber-200">
        <div className="flex items-center text-sm">
          <span className="text-gray-700 flex items-center gap-2">
            <span
              className="inline-flex items-center justify-center w-6 h-6 
                       bg-amber-500/10 text-amber-600 rounded-full font-medium"
            >
              248
            </span>
            znalezionych profili
          </span>
        </div>
      </div>
    </div>
  );
}
