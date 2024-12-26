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
      role="search"
      aria-label="Wyszukiwarka partnerów do tańca"
      className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#E76F51]/10"
      itemScope
      itemType="http://schema.org/WebSite"
    >
      <div className="p-6">
        <h2 className="text-xl font-bold text-[#293241] mb-4 flex items-center gap-2">
          <FaSearch className="text-[#E63946]" />
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
            <label className="text-sm font-medium text-[#293241]">
              Lokalizacja
            </label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-[#E63946]" />
              <select
                className="w-full pl-10 pr-4 py-3 rounded-lg border-[#E76F51]/20 
                               focus:border-[#E63946] focus:ring-[#E63946] focus:ring-opacity-50
                               bg-white hover:border-[#E76F51]/40 transition-colors"
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
            <label className="text-sm font-medium text-[#293241]">
              Styl tańca
            </label>
            <div className="relative">
              <FaMusic className="absolute left-3 top-1/2 -translate-y-1/2 text-[#E63946]" />
              <select
                className="w-full pl-10 pr-4 py-3 rounded-lg border-[#E76F51]/20 
                               focus:border-[#E63946] focus:ring-[#E63946] focus:ring-opacity-50
                               bg-white hover:border-[#E76F51]/40 transition-colors"
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
              <label className="text-sm font-medium text-[#293241]">
                Poziom
              </label>
              <div className="relative">
                <FaUserGraduate className="absolute left-3 top-1/2 -translate-y-1/2 text-[#E63946]" />
                <select
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-[#E76F51]/20 
                                 focus:border-[#E63946] focus:ring-[#E63946] focus:ring-opacity-50
                                 bg-white hover:border-[#E76F51]/40 transition-colors"
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
              <label className="text-sm font-medium text-[#293241]">
                Szukam
              </label>
              <div className="relative">
                <FaVenusMars className="absolute left-3 top-1/2 -translate-y-1/2 text-[#E63946]" />
                <select
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-[#E76F51]/20 
                                 focus:border-[#E63946] focus:ring-[#E63946] focus:ring-opacity-50
                                 bg-white hover:border-[#E76F51]/40 transition-colors"
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
            <label className="text-sm font-medium text-[#293241]">
              Przedział wiekowy
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Od"
                min="18"
                max="100"
                className="pl-4 pr-4 py-3 rounded-lg border-[#E76F51]/20 
                         focus:border-[#E63946] focus:ring-[#E63946] focus:ring-opacity-50
                         bg-white hover:border-[#E76F51]/40 transition-colors"
              />
              <input
                type="number"
                placeholder="Do"
                min="18"
                max="100"
                className="pl-4 pr-4 py-3 rounded-lg border-[#E76F51]/20 
                         focus:border-[#E63946] focus:ring-[#E63946] focus:ring-opacity-50
                         bg-white hover:border-[#E76F51]/40 transition-colors"
              />
            </div>
          </div>

          <button
            className="w-full bg-gradient-to-r from-[#E63946] to-[#B31B2C] 
                           hover:from-[#B31B2C] hover:to-[#912338] 
                           text-white py-3 rounded-lg font-medium transition-all 
                           transform hover:scale-105 hover:shadow-lg active:scale-95 
                           flex items-center justify-center gap-2"
          >
            <FaSearch className="text-lg" />
            Szukaj
          </button>
        </form>
      </div>

      <div className="px-6 py-4 bg-[#FDF6ED] border-t border-[#E76F51]/20">
        <div className="flex items-center text-sm">
          <span className="text-[#293241] flex items-center gap-2">
            <span
              className="inline-flex items-center justify-center w-6 h-6 
                           bg-[#E63946]/10 text-[#E63946] rounded-full font-medium"
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
