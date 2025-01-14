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
  FaRunning,
  FaPeopleArrows,
  FaUserFriends,
} from "react-icons/fa";
import { CITIES } from "@/constants/cities";
import { DANCE_STYLES } from "@/constants/danceStyles";
import { useRouter } from "next/navigation";
import { useFilters } from "../context/FilterContext";
import { LoginPromptModal } from "./LoginPromptModal";
import { Gender } from "@/types/user";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import { DancerMarkers } from "../features/dancers-map/components/DancerMarkers";
import { MapLegend } from "../features/dancers-map/components/MapLegend";
import { useMapFilters } from "../features/dancers-map/hooks/useMapFilters";
import { LoadingSpinner } from "../features/dancers-map/components/LoadingSpinner";
import { useDancerMarkers } from "../features/dancers-map/hooks/useDancerMarkers";
import "leaflet/dist/leaflet.css";
import "../features/dancers-map/styles/map.css";

const STATS = [
  { value: "2500+", label: "Aktywnych tancerzy" },
  { value: "20", label: "Miast w Polsce" },
  { value: "11", label: "Styli tańca" },
] as const;

const POLAND_CENTER = [52.0685, 19.0409] as [number, number];
const MAP_CONFIG = {
  minZoom: 6,
  maxZoom: 13,
  bounds: [
    [49.002, 14.1224],
    [54.8357, 24.1457],
  ] as [[number, number], [number, number]],
};

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

  const { filters } = useMapFilters();
  const { markers, isLoading } = useDancerMarkers(filters);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

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
    <div className="relative bg-white">
      {/* Tło */}
      <div className="absolute inset-0 h-[50vh]">
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
      <div className="relative max-w-screen-xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl text-center mb-8"
        >
          Szukam Partnera do Bachaty
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 max-w-2xl mx-auto text-xl text-gray-300 text-center mb-12"
        >
          Największa społeczność tancerzy Bachaty w Polsce. Znajdź idealnego
          partnera do Bachaty w swojej okolicy.
        </motion.p>

        {/* Wyszukiwarka */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-5xl mx-auto mb-8"
        >
          <div className="bg-white shadow-xl rounded-lg p-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Płeć */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-3 flex items-center z-10">
                  <FaVenusMars className={iconClassName} />
                </div>
                <select
                  value={selectedGender}
                  onChange={(e) =>
                    handleFilterClick(() =>
                      setSelectedGender(e.target.value as Gender | "")
                    )
                  }
                  className={selectClassName}
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
                  className={`${selectClassName} min-w-[195px]`}
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
              >
                <FaSearch className="h-5 w-5" />
                <span>Szukaj</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Mapa */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative h-[600px] bg-white rounded-lg shadow-lg overflow-hidden">
            <MapContainer
              center={POLAND_CENTER}
              zoom={7}
              {...MAP_CONFIG}
              className="h-full w-full"
              zoomControl={false}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <ZoomControl position="bottomright" />
              <DancerMarkers
                selectedCity={selectedCity}
                onCitySelect={setSelectedCity}
              />
            </MapContainer>
            {isLoading && <LoadingSpinner />}
            <MapLegend />
          </div>
        </motion.div>
      </div>
      <LoginPromptModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
};
