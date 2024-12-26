"use client";

import { useInView } from "react-intersection-observer";
import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaComment,
  FaUser,
  FaCalendarAlt,
} from "react-icons/fa";
import { profiles, DancerInfo } from "../data/profiles";
import { useFilters } from "../context/FilterContext";

const DEFAULT_AVATAR = "/images/profiles/bachatamen.jpg";

export function LatestProfiles() {
  const { selectedLocation, selectedDanceStyle, selectedLevel } = useFilters();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const filteredProfiles = profiles.filter((profile) => {
    console.log({
      selectedLocation,
      profileLocation: profile.info.lokalizacja,
      isMatch:
        !selectedLocation || profile.info.lokalizacja === selectedLocation,
    });

    const locationMatch =
      !selectedLocation || profile.info.lokalizacja === selectedLocation;

    const styleMatch =
      !selectedDanceStyle ||
      profile.info.stylTanca
        .toLowerCase()
        .includes(selectedDanceStyle.toLowerCase());

    const levelMatch =
      !selectedLevel || profile.info.poziomZaawansowania === selectedLevel;

    return locationMatch && styleMatch && levelMatch;
  });

  return (
    <section aria-label="Profile tancerzy" className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Poznaj osoby w Twojej okolicy
          </h2>
          <p className="text-gray-500 mt-1">
            Przeglądaj profile i nawiąż kontakt
          </p>
        </div>
      </div>

      <div
        ref={ref}
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-1000
                    ${
                      inView
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
      >
        {filteredProfiles.slice(0, 8).map((profile) => (
          <article
            key={profile.id}
            className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
          >
            <div className="relative aspect-[3/4]">
              <Image
                src={profile.avatar || DEFAULT_AVATAR}
                alt={`${profile.name}, ${profile.age} lat - ${profile.info.stylTanca}`}
                fill
                priority={profile.id === "1"}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Informacje na zdjęciu */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-xl font-semibold">
                  {profile.name}, {profile.age}
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="inline-flex items-center gap-1 text-sm">
                    <FaMapMarkerAlt className="text-amber-400" />
                    {profile.info.lokalizacja}
                  </span>
                </div>
              </div>
            </div>

            {/* Tagi z informacjami */}
            <div className="p-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {/* Style tańca */}
                {profile.info.stylTanca.split(", ").map((styl, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full"
                  >
                    Styl: {styl}
                  </span>
                ))}

                {/* Preferowany styl */}
                <span className="px-2.5 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                  Cel: {profile.info.preferowanyStyl}
                </span>

                {/* Poziom */}
                <span className="px-2.5 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                  Poziom: {profile.info.poziomZaawansowania}
                </span>

                {/* Doświadczenie */}
                <span className="px-2.5 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                  Doświadczenie: {profile.info.doswiadczenie}
                </span>

                {/* Wzrost */}
                <span className="px-2.5 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                  <FaUser className="inline-block mr-1 text-gray-500" />
                  Wzrost: {profile.info.wzrost}
                </span>

                {/* Praktyki */}
                <span className="px-2.5 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                  Praktyki: {profile.info.praktyki}
                </span>

                {/* Socjale */}
                <span className="px-2.5 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                  Socjale: {profile.info.socjale}
                </span>

                {/* Dostępność */}
                <span className="px-2.5 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                  <FaCalendarAlt className="inline-block mr-1 text-gray-500" />
                  Dostępność: {profile.info.dostepnosc}
                </span>

                {/* Język */}
                <span className="px-2.5 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                  Język: {profile.info.jezyk}
                </span>

                {/* Zajęcia */}
                {profile.info.zajecia === "Instruktor" && (
                  <span className="px-2.5 py-1 text-xs font-medium text-white bg-amber-500 rounded-full">
                    Zajęcia: {profile.info.zajecia}
                  </span>
                )}

                {/* Palenie */}
                {profile.info.palenie === "Nie palę" && (
                  <span className="px-2.5 py-1 text-xs font-medium text-green-600 bg-green-100 rounded-full">
                    {profile.info.palenie}
                  </span>
                )}
              </div>

              <button
                className="w-full flex items-center justify-center gap-2 px-4 py-3 
                               bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700 
                               font-medium transition-colors"
              >
                <FaComment className="text-gray-500" />
                Chcę porozmawiać
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
