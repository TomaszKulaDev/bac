"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkerAlt, FaRuler, FaHeart } from "react-icons/fa";
import { Gender, UserProfile } from "@/types/user";
import { useFilters } from "@/app/szukam-partnera-do-tanca/context/FilterContext";
import { sortBy } from "lodash";
import { SortingButtons } from "./SortingButtons";
import Modal from "@/components/ui/Modal";

const translateLevel = (level: string) => {
  const levels = {
    beginner: "Początkujący",
    intermediate: "Średniozaawansowany",
    advanced: "Zaawansowany",
  };
  return levels[level as keyof typeof levels] || level;
};

export const LatestProfiles = () => {
  const {
    sortOrder,
    selectedGender,
    selectedLevel,
    selectedDanceStyle,
    selectedLocation,
  } = useFilters();

  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [isStylesModalOpen, setIsStylesModalOpen] = useState(false);

  const filterProfiles = useCallback(
    (data: UserProfile[]) => {
      return data.filter((profile) => {
        const locationMatch =
          !selectedLocation ||
          profile.dancePreferences?.location === selectedLocation;
        const genderMatch =
          !selectedGender || profile.gender === selectedGender;
        const levelMatch =
          !selectedLevel || profile.dancePreferences?.level === selectedLevel;
        const styleMatch =
          !selectedDanceStyle ||
          profile.dancePreferences?.styles.includes(selectedDanceStyle);

        return locationMatch && genderMatch && levelMatch && styleMatch;
      });
    },
    [selectedLocation, selectedGender, selectedLevel, selectedDanceStyle]
  );

  const sortProfiles = useCallback(
    (data: UserProfile[]) => {
      return [...data].sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
      });
    },
    [sortOrder]
  );

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/profiles");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const filteredData = filterProfiles(data);
        const sortedData = sortProfiles(filteredData);

        setProfiles(sortedData);
      } catch (error) {
        console.error("Error fetching profiles:", error);
        setError(
          error instanceof Error ? error.message : "Unknown error occurred"
        );
        setProfiles([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, [filterProfiles, sortProfiles]);

  const renderStyles = useCallback((styles: string[]) => {
    if (!styles || styles.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-1">
        {styles.slice(0, 3).map((style, index) => (
          <span
            key={index}
            className="inline-block px-2 py-1 text-xs font-medium 
                     bg-white/10 backdrop-blur-sm rounded-full"
          >
            {style}
          </span>
        ))}
        {styles.length > 3 && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setSelectedStyles(styles);
              setIsStylesModalOpen(true);
            }}
            className="inline-block px-2 py-1 text-xs font-medium 
                     bg-white/10 backdrop-blur-sm rounded-full
                     hover:bg-white/20 transition-colors"
          >
            +{styles.length - 3}
          </button>
        )}
      </div>
    );
  }, []);

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Błąd: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
        >
          Spróbuj ponownie
        </button>
      </div>
    );
  }

  return (
    <div
      id="profiles-section"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="mb-8">
        <SortingButtons profilesCount={profiles.length} />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 h-48 rounded-lg"
            />
          ))}
        </div>
      ) : profiles.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Nie znaleziono profili spełniających kryteria
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {profiles.map((profile) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative group"
            >
              <Link
                href={`/profile/${
                  profile.slug ||
                  encodeURIComponent(
                    profile.name.toLowerCase().replace(/\s+/g, "-")
                  )
                }`}
                className="block relative aspect-[4/5] rounded-lg overflow-hidden
                         ring-1 ring-gray-200 group-hover:ring-amber-500/50 
                         transition-all duration-300 bg-gray-100"
              >
                {/* Zdjęcie */}
                <Image
                  src={profile.image ?? "/images/default-avatar.png"}
                  alt={profile.name}
                  fill
                  className="object-cover transition-transform duration-300 
                           group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 
                         (max-width: 768px) 50vw,
                         (max-width: 1024px) 33vw,
                         25vw"
                />

                {/* Gradient overlay - delikatniejszy */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Informacje o profilu - mniejsze i bardziej kompaktowe */}
                <div className="absolute inset-x-0 bottom-0 p-3 text-white">
                  <h3 className="font-medium text-base leading-tight mb-0.5">
                    {profile.name}
                  </h3>

                  {/* Lokalizacja i wzrost */}
                  <div className="flex items-center gap-2 text-xs text-white/90 mb-1.5">
                    {profile.dancePreferences?.location && (
                      <div className="flex items-center gap-1">
                        <FaMapMarkerAlt className="w-3 h-3" />
                        <span>{profile.dancePreferences.location}</span>
                      </div>
                    )}
                    {profile.height && (
                      <div className="flex items-center gap-1">
                        <FaRuler className="w-3 h-3" />
                        <span>{profile.height} cm</span>
                      </div>
                    )}
                  </div>

                  {/* Style tańca - mniejsze tagi */}
                  {profile.dancePreferences?.styles &&
                    renderStyles(profile.dancePreferences.styles)}
                </div>
              </Link>

              {/* Przycisk polubienia - mniejszy */}
              <button
                className="absolute top-2 right-2 p-1.5 rounded-full 
                          bg-white/90 backdrop-blur-sm hover:bg-white 
                          transition-colors z-20"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <FaHeart
                  className="w-3.5 h-3.5 text-gray-400 hover:text-red-500 
                                   transition-colors"
                />
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal ze stylami */}
      <Modal
        isOpen={isStylesModalOpen}
        onClose={() => {
          setIsStylesModalOpen(false);
          setSelectedStyles([]);
        }}
        title="Style tańca"
      >
        <div className="flex flex-col divide-y divide-gray-100">
          {/* Sekcja ze stylami */}
          <div className="p-6">
            <div className="flex flex-wrap gap-2">
              {selectedStyles.map((style, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-4 py-2 
                           bg-white border border-gray-200 
                           text-sm font-medium text-gray-700 
                           rounded-full shadow-sm hover:bg-gray-50 
                           transition-colors duration-150"
                >
                  {style}
                </span>
              ))}
            </div>
          </div>

          {/* Sekcja z reklamą */}
          <div className="p-6 bg-gradient-to-r from-amber-50 to-amber-100">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  Chcesz nauczyć się nowego stylu?
                </h3>
                <p className="text-sm text-gray-600">
                  Znajdź najlepszych instruktorów w Twojej okolicy
                </p>
              </div>
              <button
                onClick={() => {
                  // Tutaj logika przekierowania do wyszukiwarki instruktorów
                  setIsStylesModalOpen(false);
                }}
                className="px-4 py-2 bg-amber-500 text-white 
                         font-medium rounded-lg shadow-sm 
                         hover:bg-amber-600 transition-colors 
                         duration-150"
              >
                Znajdź instruktora
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
