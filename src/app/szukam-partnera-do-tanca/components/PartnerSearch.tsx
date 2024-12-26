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
      className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden 
                border border-amber-500/10 w-full sticky top-24"
    >
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          Wyszukaj
        </h2>

        <form className="space-y-5">
          {/* Lokalizacja */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
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
                <option value="wroclaw">Wrocław</option>
                <option value="gdansk">Gdańsk</option>
              </select>
            </div>
          </div>

          {/* Style tańca */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
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
                <option value="zouk">Zouk</option>
              </select>
            </div>
          </div>

          {/* Poziom zaawansowania */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              Poziom
            </label>
            <div className="relative">
              <FaUserGraduate className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500" />
              <select
                className="w-full pl-10 pr-4 py-3 rounded-lg border-amber-200 
                             focus:border-amber-500 focus:ring-amber-500 focus:ring-opacity-50
                             bg-white hover:border-amber-300 transition-colors"
              >
                <option value="">Wybierz poziom</option>
                <option value="poczatkujacy">Początkujący</option>
                <option value="sredniozaawansowany">Średniozaawansowany</option>
                <option value="zaawansowany">Zaawansowany</option>
              </select>
            </div>
          </div>

          {/* Płeć */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              Szukam
            </label>
            <div className="relative">
              <FaVenusMars className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500" />
              <select
                className="w-full pl-10 pr-4 py-3 rounded-lg border-amber-200 
                             focus:border-amber-500 focus:ring-amber-500 focus:ring-opacity-50
                             bg-white hover:border-amber-300 transition-colors"
              >
                <option value="">Wybierz płeć</option>
                <option value="partner">Partnera</option>
                <option value="partnerka">Partnerki</option>
              </select>
            </div>
          </div>

          {/* Wiek */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              Przedział wiekowy
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Od"
                min="18"
                max="100"
                className="pl-4 pr-2 py-3 rounded-lg border-amber-200 
                        focus:border-amber-500 focus:ring-amber-500 focus:ring-opacity-50
                        bg-white hover:border-amber-300 transition-colors"
              />
              <input
                type="number"
                placeholder="Do"
                min="18"
                max="100"
                className="pl-4 pr-2 py-3 rounded-lg border-amber-200 
                        focus:border-amber-500 focus:ring-amber-500 focus:ring-opacity-50
                        bg-white hover:border-amber-300 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-red-500 
                     hover:from-amber-600 hover:to-red-600 text-white 
                     py-3.5 rounded-lg font-medium transition-all duration-300
                     transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]
                     flex items-center justify-center gap-2 mt-6"
          >
            <FaSearch className="text-lg" />
            Szukaj
          </button>
        </form>
      </div>

      <div className="px-6 py-4 bg-gradient-to-r from-amber-50 to-red-50 border-t border-amber-100">
        <p className="text-sm text-gray-600 flex items-center gap-2">
          <span className="bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-full font-medium">
            248
          </span>
          znalezionych profili
        </p>
      </div>
    </div>
  );
}
