"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaMusic,
  FaVenusMars,
} from "react-icons/fa";
import { CITIES } from "@/constants/cities";
import { useRouter } from "next/navigation";
import { useFilters } from "../context/FilterContext";
import { LoginPromptModal } from "./LoginPromptModal";
import { Gender } from "@/types/user";

const DANCE_STYLES = [
  { value: "", label: "Wszystkie style" },
  { value: "Bachata Sensual", label: "Bachata Sensual" },
  { value: "Bachata Dominicana", label: "Bachata Dominicana" },
  { value: "Bachata Impro", label: "Bachata Impro" },
  { value: "Salsa Cubana", label: "Salsa Cubana" },
  { value: "Salsa LA On1", label: "Salsa LA On1" },
  { value: "Salsa LA On2", label: "Salsa LA On2" },
  { value: "Salsa Rueda", label: "Salsa Rueda" },
  { value: "Zouk", label: "Zouk" },
  { value: "Kizomba", label: "Kizomba" },
  { value: "Urban Kiz", label: "Urban Kiz" },
  { value: "West Coast Swing", label: "West Coast Swing" },
];

export const HeroSection = () => {
  const router = useRouter();
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

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedLocation) params.append("location", selectedLocation);
    if (selectedDanceStyle) params.append("style", selectedDanceStyle);
    if (selectedLevel) params.append("level", selectedLevel);
    if (selectedGender) params.append("gender", selectedGender);

    router.push(`/szukam-partnera-do-tanca/wyniki?${params.toString()}`);
  };

  return (
    <div className="relative bg-gray-900">
      {/* Tło */}
      <div className="absolute inset-0">
        <Image
          src="/images/Hero-szukam-partnera-do-tanca.webp"
          alt="Tancerze bachaty"
          fill
          className="object-cover object-center brightness-[0.3]"
          priority
          quality={90}
        />
      </div>

      {/* Zawartość */}
      <div className="relative max-w-screen-xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl text-center mb-8"
        >
          Znajdź partnera do tańca
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 max-w-lg mx-auto text-xl text-gray-300 text-center mb-12"
        >
          Dołącz do społeczności tancerzy i znajdź idealnego partnera do tańca w
          Twojej okolicy
        </motion.p>

        {/* Wyszukiwarka */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white shadow-xl rounded-lg p-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Płeć */}
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <FaVenusMars className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={selectedGender}
                  onChange={(e) =>
                    handleFilterClick(() =>
                      setSelectedGender(e.target.value as Gender | "")
                    )
                  }
                  className="block w-full pl-10 pr-3 py-3.5 text-base border-0
                           focus:ring-2 focus:ring-amber-500 rounded-md"
                >
                  <option value="">Wszyscy</option>
                  <option value="male">Partnerzy</option>
                  <option value="female">Partnerki</option>
                </select>
              </div>

              {/* Lokalizacja */}
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={selectedLocation}
                  onChange={(e) =>
                    handleFilterClick(() => setSelectedLocation(e.target.value))
                  }
                  className="block w-full pl-10 pr-3 py-3.5 text-base border-0
                           focus:ring-2 focus:ring-amber-500 rounded-md"
                >
                  {CITIES.map((city) => (
                    <option key={city.value} value={city.value}>
                      {city.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Styl tańca */}
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <FaMusic className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={selectedDanceStyle}
                  onChange={(e) =>
                    handleFilterClick(() =>
                      setSelectedDanceStyle(e.target.value)
                    )
                  }
                  className="block w-full pl-10 pr-3 py-3.5 text-base border-0
                           focus:ring-2 focus:ring-amber-500 rounded-md"
                >
                  {DANCE_STYLES.map((style) => (
                    <option key={style.value} value={style.value}>
                      {style.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Poziom */}
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <FaGraduationCap className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={selectedLevel}
                  onChange={(e) =>
                    handleFilterClick(() => setSelectedLevel(e.target.value))
                  }
                  className="block w-full pl-10 pr-3 py-3.5 text-base border-0
                           focus:ring-2 focus:ring-amber-500 rounded-md"
                >
                  <option value="">Poziom</option>
                  <option value="beginner">Początkujący</option>
                  <option value="intermediate">Średniozaawansowany</option>
                  <option value="advanced">Zaawansowany</option>
                </select>
              </div>

              {/* Przycisk wyszukiwania */}
              <button
                onClick={handleSearch}
                className="w-full bg-amber-500 text-white p-3.5 rounded-md
                         hover:bg-amber-600 transition-colors duration-200
                         flex items-center justify-center gap-2 font-medium"
              >
                <FaSearch className="h-5 w-5" />
                <span>Szukaj</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Statystyki */}
        <div className="mt-12 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
          {[
            { value: "500+", label: "Aktywnych tancerzy" },
            { value: "12", label: "Miast w Polsce" },
            { value: "3", label: "Style tańca" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="text-center"
            >
              <p className="text-2xl font-bold text-amber-400">{stat.value}</p>
              <p className="text-sm text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <LoginPromptModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
};
