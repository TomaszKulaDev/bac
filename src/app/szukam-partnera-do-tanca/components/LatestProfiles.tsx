"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkerAlt, FaRuler } from "react-icons/fa";
import { UserProfile } from "@/types/user";

const translateLevel = (level: string) => {
  const levels = {
    beginner: "Początkujący",
    intermediate: "Średniozaawansowany",
    advanced: "Zaawansowany",
  };
  return levels[level as keyof typeof levels] || level;
};

export const LatestProfiles = () => {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProfiles = async () => {
    try {
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/profiles?t=${timestamp}`, {
        next: {
          revalidate: 0,
        },
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Pobrane profile:", data);
      setProfiles(data);
    } catch (error) {
      console.error("Błąd podczas pobierania profili:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();

    // Opcjonalnie: odświeżaj co jakiś czas
    const interval = setInterval(fetchProfiles, 30000); // co 30 sekund
    return () => clearInterval(interval);
  }, []);

  const renderStyles = (styles: string[]) => {
    if (!styles?.length) return null;

    const visibleStyles = styles.slice(0, 2);
    const remainingCount = styles.length - 2;

    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {visibleStyles.map((style) => (
          <span
            key={style}
            className="px-2 py-1 bg-amber-500/30 backdrop-blur-sm 
                     rounded-full text-sm text-white"
          >
            {style}
          </span>
        ))}
        {remainingCount > 0 && (
          <button
            onClick={(e) => {
              e.preventDefault(); // Zapobiegamy nawigacji do profilu
              e.stopPropagation(); // Zatrzymujemy propagację
              const remainingStyles = styles.slice(2);
              setSelectedStyles(remainingStyles);
              setIsModalOpen(true);
            }}
            className="px-2 py-1 bg-amber-600/30 backdrop-blur-sm 
                     rounded-full text-sm text-white hover:bg-amber-600/50 
                     transition-colors duration-200 z-20"
          >
            +{remainingCount}
          </button>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-12">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[3/4] rounded-xl bg-gray-200" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-12">
        {profiles.map((profile) => (
          <motion.div
            key={profile.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative group cursor-pointer"
          >
            {/* Główne zdjęcie */}
            <div
              className="relative aspect-[3/4] rounded-xl overflow-hidden 
                           ring-2 ring-transparent group-hover:ring-amber-500/50 
                           transition-all duration-300"
            >
              <Image
                src={profile.image ?? "/images/default-avatar.png"}
                alt={profile.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />

              {/* Gradient overlay - zawsze widoczny */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100" />

              {/* Informacje - zawsze widoczne */}
              <div className="absolute inset-0 p-4 flex flex-col justify-end">
                <div className="text-white space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold">{profile.name}</h3>
                    {profile.age && (
                      <span className="text-sm text-gray-200">
                        {profile.age} lat
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-sm">
                      <FaMapMarkerAlt className="text-amber-400" />
                      <span>{profile.dancePreferences?.location}</span>
                    </div>

                    {profile.height && (
                      <div className="flex items-center gap-1.5 text-sm">
                        <FaRuler className="text-amber-400" />
                        <span>{profile.height} cm</span>
                      </div>
                    )}
                  </div>

                  {renderStyles(profile.dancePreferences?.styles || [])}
                </div>
              </div>

              {/* Poziom zaawansowania - zawsze widoczny */}
              <div className="absolute top-3 left-3">
                <span
                  className="bg-white/95 backdrop-blur-sm text-amber-700 px-2 py-1 
                               rounded-full text-sm font-medium"
                >
                  {translateLevel(profile.dancePreferences?.level || "")}
                </span>
              </div>
            </div>

            {/* Link do profilu */}
            <Link
              href={`/profile/${profile.id}`}
              className="absolute inset-0 z-10"
            >
              <span className="sr-only">Zobacz profil</span>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Modal ze stylami */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Overlay */}
            <div
              className={`fixed inset-0 bg-black/50 z-[101] transition-opacity duration-300
                ${
                  isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              onClick={() => setIsModalOpen(false)}
            />

            {/* Modal */}
            <div
              className={`fixed inset-y-0 right-0 w-64 bg-white shadow-xl z-[102]
                transform transition-transform duration-300
                ${isModalOpen ? "translate-x-0" : "translate-x-full"}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 space-y-4">
                {/* Nagłówek */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Style tańca
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 text-gray-500 hover:text-gray-700 
                             hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M6 6l8 8m0-8l-8 8"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>

                {/* Lista styli */}
                <div className="space-y-1">
                  {selectedStyles.map((style) => (
                    <div
                      key={style}
                      className="flex items-center gap-3 px-4 py-3 
                               rounded-lg text-gray-600 hover:bg-gray-50 
                               transition-colors"
                    >
                      <span className="w-5 h-5 text-amber-500">•</span>
                      <span className="font-medium">{style}</span>
                    </div>
                  ))}
                </div>

                {/* Informacja o szkole */}
                <Link
                  href="/szkola-tanca-xyz"
                  className="flex items-center gap-3 px-4 py-3 
                           bg-amber-50 text-gray-600 hover:bg-amber-100/50
                           rounded-lg transition-colors group"
                >
                  <div
                    className="w-8 h-8 bg-amber-100 rounded-full 
                                flex items-center justify-center 
                                group-hover:bg-amber-200 transition-colors"
                  >
                    <span className="text-amber-600">💃</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      Chcesz nauczyć się więcej?
                    </div>
                    <div className="text-xs text-gray-500">
                      Sprawdź szkołę tańca XYZ
                    </div>
                  </div>
                </Link>

                {/* Baner instruktora */}
                <Link
                  href="/zostan-instruktorem"
                  className="flex items-center gap-3 px-4 py-3 
                           bg-amber-50 text-gray-600 hover:bg-amber-100/50
                           rounded-lg transition-colors group"
                >
                  <div
                    className="w-8 h-8 bg-amber-100 rounded-full 
                                flex items-center justify-center 
                                group-hover:bg-amber-200 transition-colors"
                  >
                    <span className="text-amber-600">👋</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      Zostań instruktorem
                    </div>
                    <div className="text-xs text-gray-500">
                      Dołącz do naszej społeczności
                    </div>
                  </div>
                </Link>

                {/* Stopka */}
                <div className="pt-4 border-t">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="w-full px-4 py-2 text-sm font-medium 
                             text-center text-white bg-amber-500 
                             hover:bg-amber-600 rounded-lg 
                             transition-colors"
                  >
                    Zamknij
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
