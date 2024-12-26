"use client";

import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { FaHeart, FaMapMarkerAlt, FaStar, FaClock } from "react-icons/fa";

interface Profile {
  id: string;
  name: string;
  age: number;
  city: string;
  level: string;
  description: string;
  avatar: string;
  lastActive: string;
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
  },
  // Dodaj więcej profili...
];

export function LatestProfiles() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    delay: 200,
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Najnowsze Profile
          </h2>
          <p className="text-gray-500 mt-1">Odkryj tancerzy w Twojej okolicy</p>
        </div>
        <button className="text-red-600 hover:text-red-700 font-medium flex items-center gap-2 group">
          Zobacz wszystkie
          <span className="text-lg transition-transform group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>

      <div
        ref={ref}
        className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-1000 transform
                    ${
                      inView
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
      >
        {mockProfiles.map((profile) => (
          <div
            key={profile.id}
            className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden hover:-translate-y-1"
          >
            <div className="p-6">
              <div className="flex gap-6">
                <div className="relative">
                  <div className="relative w-28 h-28 rounded-xl overflow-hidden">
                    <Image
                      src={profile.avatar}
                      alt={profile.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-green-500 w-5 h-5 rounded-full border-2 border-white" />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {profile.name}, {profile.age}
                    </h3>
                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                      <FaHeart className="text-xl transform transition-transform group-hover:scale-110" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                    <FaMapMarkerAlt className="text-red-500" />
                    {profile.city}
                    <span className="mx-2">•</span>
                    <FaStar className="text-yellow-400" />
                    {profile.level}
                  </div>

                  <p className="text-gray-600 mt-3 line-clamp-2">
                    {profile.description}
                  </p>

                  <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                    <FaClock className="text-gray-400" />
                    Ostatnio aktywny/a: {profile.lastActive}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t flex justify-between items-center">
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium hover:bg-red-200 transition-colors">
                  Bachata
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium hover:bg-purple-200 transition-colors">
                  Salsa
                </span>
              </div>
              <button className="text-red-600 hover:text-red-700 font-medium group-hover:translate-x-1 transition-transform">
                Kontakt →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
