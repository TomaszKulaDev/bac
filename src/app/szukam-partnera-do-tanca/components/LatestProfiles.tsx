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
  city: string;
  level: string;
  description: string;
  avatar: string;
  lastActive: string;
  stats: {
    views: number;
    likes: number;
  };
}

const mockProfiles: Profile[] = [
  {
    id: "1",
    name: "Marta",
    age: 28,
    city: "Warszawa",
    level: "Średniozaawansowany",
    avatar: "/avatars/profile-1.jpg",
    description:
      "Szukam partnera do regularnych treningów bachaty. Preferuję styl sensual i dominicana.",
    lastActive: "2024-03-21",
    stats: {
      views: 516,
      likes: 159,
    },
  },
  {
    id: "2",
    name: "Piotr",
    age: 32,
    city: "Kraków",
    level: "Zaawansowany",
    avatar: "/avatars/profile-2.jpg",
    description: "Instruktor bachaty poszukuje partnerki do pokazów i zawodów.",
    lastActive: "2024-03-20",
    stats: {
      views: 345,
      likes: 100,
    },
  },
  // Dodaj więcej profili...
];

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
                alt={`${profile.name} - ${profile.level} tancerz${
                  profile.name.endsWith("a") ? "ka" : ""
                } z miasta ${profile.city}`}
                fill
                priority={profile.id === "1"}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform group-hover:scale-105"
                loading={profile.id === "1" ? "eager" : "lazy"}
                itemProp="image"
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
                  {profile.city}
                </div>
              </div>
            </div>

            {/* Statystyki i akcje */}
            <div className="p-3 bg-white">
              <div className="flex justify-between items-center text-sm text-gray-600">
                <div className="flex items-center gap-3">
                  <span className="flex items-center">
                    <FaEye className="mr-1 text-gray-400" />
                    {profile.stats.views}
                  </span>
                  <span className="flex items-center">
                    <FaHeart className="mr-1 text-gray-400" />
                    {profile.stats.likes}
                  </span>
                </div>
                <button className="btn-primary text-sm px-4 py-1.5">
                  <FaComment className="mr-1" />
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
