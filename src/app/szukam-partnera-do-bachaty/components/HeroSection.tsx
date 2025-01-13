"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaVenusMars,
  FaPeopleArrows,
} from "react-icons/fa";
import { CITIES } from "@/constants/cities";
import { useRouter } from "next/navigation";
import { useFilters } from "../context/FilterContext";
import { LoginPromptModal } from "./LoginPromptModal";
import { Gender } from "@/types/user";
import { DANCE_STYLES } from "@/constants/danceStyles";

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
    const profilesSection = document.getElementById("profiles-section");
    if (profilesSection) {
      profilesSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const iconClassName =
    "h-5 w-5 text-gray-400 transition-colors duration-200 group-hover:text-amber-500";

  const selectClassName = `
    block w-full pl-10 pr-3 py-3.5 text-base border-0
    focus:ring-2 focus:ring-amber-500 rounded-md
    bg-white text-gray-700
    transition-all duration-200 ease-in-out
    hover:bg-gray-50
    focus:border-amber-500 focus:outline-none
    disabled:opacity-50 disabled:cursor-not-allowed
    appearance-none cursor-pointer
  `;

  return (
    <section
      aria-label="Wyszukiwarka partnerów do tańca"
      className="relative bg-gray-900"
    >
      {/* Hero Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/Hero-szukam-partnera-do-tanca.webp"
          alt="Para tańcząca bachatę - romantyczny taniec w półmroku"
          fill
          className="object-cover object-center brightness-[0.3]"
          priority
          quality={90}
          sizes="100vw"
          aria-hidden="true"
        />
      </div>

      {/* Zawartość główna */}
      <div className="relative max-w-screen-xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        {/* Główny nagłówek H1 zgodny z meta title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl text-center mb-4"
        >
          Szukasz Partnera do Bachaty?
        </motion.h1>

        {/* Podtytuł H2 z dodatkowym kontekstem */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold text-amber-400 sm:text-4xl text-center mb-8"
        >
          Znajdź Partnerkę do Bachaty w Swojej Okolicy
        </motion.h2>

        {/* Opis zgodny z meta description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 max-w-2xl mx-auto text-xl text-gray-300 text-center mb-12"
        >
          Największa społeczność tancerzy Bachaty w Polsce.
          <br /> Dołącz do aktywnych tancerzy i znajdź idealnego partnera do
          Bachaty w swojej okolicy.
        </motion.p>

        {/* Sekcja wyszukiwarki z nagłówkiem H3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <h3 className="sr-only">Wyszukiwarka partnerów do tańca</h3>
          <form
            role="search"
            onSubmit={(e) => e.preventDefault()}
            className="bg-white shadow-xl rounded-lg p-6"
            aria-label="Wyszukiwarka partnerów do tańca"
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Płeć */}
              <div className="relative group">
                <label htmlFor="gender-select" className="sr-only">
                  Wybierz płeć
                </label>
                <div className="absolute inset-y-0 left-3 flex items-center z-10">
                  <FaVenusMars className={iconClassName} aria-hidden="true" />
                </div>
                <select
                  id="gender-select"
                  value={selectedGender}
                  onChange={(e) =>
                    handleFilterClick(() =>
                      setSelectedGender(e.target.value as Gender | "")
                    )
                  }
                  className={selectClassName}
                  aria-label="Filtruj po płci"
                >
                  <option value="">Wszyscy</option>
                  <option value="male">Partnerzy</option>
                  <option value="female">Partnerki</option>
                </select>
              </div>

              {/* Lokalizacja */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-3 flex items-center z-10">
                  <FaMapMarkerAlt className={iconClassName} />
                </div>
                <select
                  value={selectedLocation}
                  onChange={(e) =>
                    handleFilterClick(() => setSelectedLocation(e.target.value))
                  }
                  className={selectClassName}
                >
                  {CITIES.map((city) => (
                    <option key={city.value} value={city.value}>
                      {city.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Styl tańca */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-3 flex items-center z-10">
                  <FaPeopleArrows className={iconClassName} />
                </div>
                <select
                  value={selectedDanceStyle}
                  onChange={(e) =>
                    handleFilterClick(() =>
                      setSelectedDanceStyle(e.target.value)
                    )
                  }
                  className={selectClassName}
                >
                  {DANCE_STYLES.map((style) => (
                    <option key={style.value} value={style.value}>
                      {style.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Poziom */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-3 flex items-center z-10">
                  <FaGraduationCap className={iconClassName} />
                </div>
                <select
                  value={selectedLevel}
                  onChange={(e) =>
                    handleFilterClick(() => setSelectedLevel(e.target.value))
                  }
                  className={selectClassName}
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
                         flex items-center justify-center gap-2 font-medium
                         shadow-sm hover:shadow-md"
                aria-label="Rozpocznij wyszukiwanie"
              >
                <FaSearch className="h-5 w-5" aria-hidden="true" />
                <span>Szukaj</span>
              </button>
            </div>
          </form>
        </motion.div>

        {/* Sekcja statystyk z nagłówkiem H3 */}
        <div className="mt-12">
          <h3 className="sr-only">Statystyki społeczności</h3>
          <dl className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { value: "2500+", label: "Aktywnych tancerzy" },
              { value: "20", label: "Miast w Polsce" },
              { value: "11", label: "Styli tańca" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="text-center"
              >
                <dt className="text-sm text-gray-300">{stat.label}</dt>
                <dd className="text-2xl font-bold text-amber-400">
                  {stat.value}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>

      <LoginPromptModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </section>
  );
};
