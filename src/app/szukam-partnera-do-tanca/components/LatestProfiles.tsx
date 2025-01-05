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

const translateLevel = (level: string) => {
  const levels = {
    beginner: "Początkujący",
    intermediate: "Średniozaawansowany",
    advanced: "Zaawansowany",
  };
  return levels[level as keyof typeof levels] || level;
};

const renderStyles = (styles: string[]) => {
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
        <span
          className="inline-block px-2 py-1 text-xs font-medium 
                      bg-white/10 backdrop-blur-sm rounded-full"
        >
          +{styles.length - 3}
        </span>
      )}
    </div>
  );
};

export const LatestProfiles = () => {
  const { sortOrder, selectedGender, selectedLevel, selectedDanceStyle } =
    useFilters();

  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filterProfiles = useCallback(
    (data: UserProfile[]) => {
      return data.filter((profile) => {
        const genderMatch =
          !selectedGender || profile.gender === selectedGender;
        const levelMatch =
          !selectedLevel || profile.dancePreferences?.level === selectedLevel;
        const styleMatch =
          !selectedDanceStyle ||
          profile.dancePreferences?.styles.includes(selectedDanceStyle);

        return genderMatch && levelMatch && styleMatch;
      });
    },
    [selectedGender, selectedLevel, selectedDanceStyle]
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
    <>
      <SortingButtons profilesCount={profiles.length} />

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 h-64 rounded-lg"
            />
          ))}
        </div>
      ) : profiles.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Nie znaleziono profili spełniających kryteria
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                className="block relative aspect-[3/4] rounded-xl overflow-hidden
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
                  sizes="(max-width: 768px) 50vw, 25vw"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Informacje o profilu */}
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <h3 className="font-semibold text-lg leading-tight mb-1">
                    {profile.name}
                  </h3>

                  {/* Lokalizacja i wzrost */}
                  <div className="flex items-center gap-3 text-sm text-white/90 mb-2">
                    {profile.dancePreferences?.location && (
                      <div className="flex items-center gap-1">
                        <FaMapMarkerAlt className="w-3.5 h-3.5" />
                        <span>{profile.dancePreferences.location}</span>
                      </div>
                    )}
                    {profile.height && (
                      <div className="flex items-center gap-1">
                        <FaRuler className="w-3.5 h-3.5" />
                        <span>{profile.height} cm</span>
                      </div>
                    )}
                  </div>

                  {/* Style tańca */}
                  {profile.dancePreferences?.styles &&
                    renderStyles(profile.dancePreferences.styles)}
                </div>
              </Link>

              {/* Przycisk polubienia - poza Link */}
              <button
                className="absolute top-3 right-3 p-2 rounded-full 
                          bg-white/90 backdrop-blur-sm hover:bg-white 
                          transition-colors z-20"
                onClick={(e) => {
                  e.stopPropagation();
                  // Logika polubienia - do zaimplementowania
                }}
              >
                <FaHeart
                  className="w-4 h-4 text-gray-400 hover:text-red-500 
                                   transition-colors"
                />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
};
