"use client";

import { useState } from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaUserGraduate,
  FaVenusMars,
  FaMusic,
  FaCalendarAlt,
  FaChevronDown,
} from "react-icons/fa";
import { useFilters } from "../context/FilterContext";

// Definicje opcji
const searchOptions = {
  locations: [
    { value: "all", label: "Wszystkie miasta" },
    { value: "Białystok", label: "Białystok" },
    { value: "Bielsko-Biała", label: "Bielsko-Biała" },
    { value: "Bytom", label: "Bytom" },
    { value: "Bydgoszcz", label: "Bydgoszcz" },
    { value: "Częstochowa", label: "Częstochowa" },
    { value: "Dąbrowa Górnicza", label: "Dąbrowa Górnicza" },
    { value: "Elbląg", label: "Elbląg" },
    { value: "Gdańsk", label: "Gdańsk" },
    { value: "Gdynia", label: "Gdynia" },
    { value: "Gliwice", label: "Gliwice" },
    { value: "Gorzów Wielkopolski", label: "Gorzów Wielkopolski" },
    { value: "Katowice", label: "Katowice" },
    { value: "Kielce", label: "Kielce" },
    { value: "Koszalin", label: "Koszalin" },
    { value: "Kraków", label: "Kraków" },
    { value: "Lublin", label: "Lublin" },
    { value: "Łódź", label: "Łódź" },
    { value: "Mielec", label: "Mielec" },
    { value: "Olsztyn", label: "Olsztyn" },
    { value: "Opole", label: "Opole" },
    { value: "Płock", label: "Płock" },
    { value: "Poznań", label: "Poznań" },
    { value: "Radom", label: "Radom" },
    { value: "Ruda Śląska", label: "Ruda Śląska" },
    { value: "Rybnik", label: "Rybnik" },
    { value: "Rzeszów", label: "Rzeszów" },
    { value: "Sosnowiec", label: "Sosnowiec" },
    { value: "Szczecin", label: "Szczecin" },
    { value: "Tarnów", label: "Tarnów" },
    { value: "Toruń", label: "Toruń" },
    { value: "Tychy", label: "Tychy" },
    { value: "Wałbrzych", label: "Wałbrzych" },
    { value: "Warszawa", label: "Warszawa" },
    { value: "Włocławek", label: "Włocławek" },
    { value: "Wrocław", label: "Wrocław" },
    { value: "Zabrze", label: "Zabrze" },
    { value: "Zielona Góra", label: "Zielona Góra" },
  ],
  danceStyle: [
    { value: "bachata", label: "Bachata" },
    { value: "salsa", label: "Salsa" },
    { value: "kizomba", label: "Kizomba" },
    { value: "zouk", label: "Zouk" },
  ],
  level: [
    { value: "beginner", label: "Początkujący" },
    { value: "intermediate", label: "Średniozaawansowany" },
    { value: "advanced", label: "Zaawansowany" },
  ],
  gender: [
    { value: "partner", label: "Partnera" },
    { value: "partnerka", label: "Partnerki" },
  ],
};

export function PartnerSearch() {
  const {
    setSelectedLocation,
    setSelectedDanceStyle,
    setSelectedLevel,
    filteredCount,
  } = useFilters();
  const [openSelect, setOpenSelect] = useState<string | null>(null);

  // Stan dla wybranych wartości
  const [selectedValues, setSelectedValues] = useState<{
    location: string;
    danceStyle: string;
    level: string;
    gender: string;
  }>({
    location: "",
    danceStyle: "",
    level: "",
    gender: "",
  });

  const handleSelect = (type: string, value: string, label: string) => {
    console.log("handleSelect:", { type, value, label });

    setSelectedValues((prev) => ({
      ...prev,
      [type]: label,
    }));

    switch (type) {
      case "location":
        console.log("Before setSelectedLocation:", {
          value,
          formattedValue:
            value === "all"
              ? ""
              : value.charAt(0).toUpperCase() + value.slice(1),
        });
        setSelectedLocation(value);
        break;
      case "danceStyle":
        setSelectedDanceStyle(value);
        break;
      case "level":
        setSelectedLevel(value);
        break;
    }
    setOpenSelect(null);
  };

  const CustomSelect = ({
    type,
    label,
    icon: Icon,
    options,
    placeholder,
  }: {
    type: string;
    label: string;
    icon: any;
    options: Array<{ value: string; label: string }>;
    placeholder: string;
  }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 block">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpenSelect(openSelect === type ? null : type)}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-amber-200 
                    bg-white hover:border-amber-300 transition-colors
                    flex items-center justify-between text-left"
        >
          <div className="flex items-center">
            <Icon className="absolute left-3 text-amber-500" />
            <span
              className={
                selectedValues[type as keyof typeof selectedValues]
                  ? "text-gray-900"
                  : "text-gray-500"
              }
            >
              {selectedValues[type as keyof typeof selectedValues] ||
                placeholder}
            </span>
          </div>
          <FaChevronDown
            className={`text-amber-500 transition-transform ${
              openSelect === type ? "rotate-180" : ""
            }`}
          />
        </button>

        {openSelect === type && (
          <div
            className="absolute z-50 w-full mt-1 bg-white border border-amber-200 
                         rounded-lg shadow-lg overflow-hidden"
          >
            <div className="max-h-60 overflow-y-auto">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(type, option.value, option.label)}
                  className="w-full px-4 py-3 text-left hover:bg-amber-50 
                           transition-colors flex items-center gap-2
                           text-gray-700 hover:text-gray-900"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div
      id="partner-search"
      className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden 
                border border-amber-500/10 w-full sticky top-24"
    >
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Wyszukaj</h2>

        <form className="space-y-5">
          <CustomSelect
            type="location"
            label="Lokalizacja"
            icon={FaMapMarkerAlt}
            options={searchOptions.locations}
            placeholder="Wybierz miasto"
          />

          <CustomSelect
            type="danceStyle"
            label="Styl tańca"
            icon={FaMusic}
            options={searchOptions.danceStyle}
            placeholder="Wybierz styl"
          />

          <CustomSelect
            type="level"
            label="Poziom"
            icon={FaUserGraduate}
            options={searchOptions.level}
            placeholder="Wybierz poziom"
          />

          <CustomSelect
            type="gender"
            label="Szukam"
            icon={FaVenusMars}
            options={searchOptions.gender}
            placeholder="Wybierz płeć"
          />

          {/* Przedział wiekowy */}
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
                          focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20
                          bg-white hover:border-amber-300 transition-colors"
              />
              <input
                type="number"
                placeholder="Do"
                min="18"
                max="100"
                className="pl-4 pr-2 py-3 rounded-lg border-amber-200 
                          focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20
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
            {filteredCount}
          </span>
          {filteredCount === 1
            ? "znaleziony profil"
            : filteredCount % 10 >= 2 &&
              filteredCount % 10 <= 4 &&
              (filteredCount % 100 < 10 || filteredCount % 100 >= 20)
            ? "znalezione profile"
            : "znalezionych profili"}
        </p>
      </div>
    </div>
  );
}
