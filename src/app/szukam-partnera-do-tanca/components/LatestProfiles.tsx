"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import {
  FaHeart,
  FaMapMarkerAlt,
  FaStar,
  FaClock,
  FaComment,
  FaEye,
} from "react-icons/fa";

interface Profile {
  id: string;
  name: string;
  age: number;
  info: {
    wolna: boolean;
    hetero: boolean;
    wPrzyszlosci: boolean;
    niePali: boolean;
    towarzysko: boolean;
    polski: boolean;
    wzrost: string;
    szkola: string;
    kot: string;
    katolik: boolean;
    rak: boolean;
  };
  stats: {
    views: number; // liczba wyświetleń
    likes: number; // liczba polubień
  };
  avatar: string;
}

const mockProfiles: Profile[] = [
  {
    id: "1",
    name: "Natka",
    age: 35,
    info: {
      wolna: true,
      hetero: true,
      wPrzyszlosci: true,
      niePali: true,
      towarzysko: true,
      polski: true,
      wzrost: "169 cm",
      szkola: "Szkoła średnia",
      kot: "Kot (lub kilka)",
      katolik: true,
      rak: true,
    },
    stats: {
      views: 516,
      likes: 159,
    },
    avatar: "/images/bachata-romance.jpg",
  },
];

// Dodajmy też fallback w przypadku braku zdjęcia
const DEFAULT_AVATAR = "/images/default-avatar.png";

export function LatestProfiles() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
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
        className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 transition-all duration-1000
                    ${
                      inView
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
      >
        {mockProfiles.map((profile) => (
          <article
            key={profile.id}
            className="group card-hover-effect bg-white rounded-lg shadow-sm overflow-hidden"
            itemScope
            itemType="http://schema.org/Person"
          >
            <div className="relative aspect-[4/5]">
              <Image
                src={profile.avatar}
                alt={`${profile.name} - ${profile.age} tancerz${
                  profile.name.endsWith("a") ? "ka" : ""
                } z miasta ${profile.info.wzrost}`}
                fill
                priority={profile.id === "1"}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform group-hover:scale-105"
                loading={profile.id === "1" ? "eager" : "lazy"}
                itemProp="image"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.src = DEFAULT_AVATAR;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Status online */}
              <div className="absolute top-2 right-2">
                <div className="w-3 h-3 bg-green-500 rounded-full ring-2 ring-white" />
              </div>

              {/* Informacje na zdjęciu */}
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <h3 className="font-semibold">
                  {profile.name}, {profile.age}
                </h3>
                <div className="flex items-center text-sm mt-1">
                  <FaMapMarkerAlt className="mr-1" />
                  {profile.info.wzrost}
                </div>
              </div>
            </div>

            {/* Statystyki i akcje */}
            <div className="p-3 bg-white">
              <div className="px-4 py-3 border-t border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <FaEye className="text-gray-400" />
                    {profile.stats.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaHeart className="text-gray-400" />
                    {profile.stats.likes}
                  </span>
                </div>
                <button
                  className="flex items-center gap-2 px-4 py-1.5 bg-gray-100 
                                 hover:bg-gray-200 rounded-full text-sm text-gray-700 
                                 font-medium transition-colors"
                >
                  <FaComment className="text-gray-500" />
                  Napisz
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
