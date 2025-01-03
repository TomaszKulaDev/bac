"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";
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

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch("/api/profiles");
        const data = await response.json();
        setProfiles(data);
      } catch (error) {
        console.error("Błąd podczas pobierania profili:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[3/4] rounded-xl bg-gray-200" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
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

            {/* Gradient overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity"
            />

            {/* Informacje na hover */}
            <div
              className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 
                          group-hover:opacity-100 transition-opacity"
            >
              <div className="text-white space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold">{profile.name}</h3>
                </div>

                <div className="flex items-center gap-1.5 text-sm">
                  <FaMapMarkerAlt className="text-amber-400" />
                  <span>{profile.dancePreferences?.location}</span>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.dancePreferences?.styles.slice(0, 2).map((style) => (
                    <span
                      key={style}
                      className="px-2 py-1 bg-amber-500/30 backdrop-blur-sm 
                               rounded-full text-sm text-white"
                    >
                      {style}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Poziom zaawansowania */}
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
  );
};
