"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { UserProfile } from "@/types/user";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaCamera,
  FaMusic,
  FaGraduationCap,
  FaTicketAlt,
  FaChalkboardTeacher,
  FaTrophy,
  FaImage,
  FaUsers,
  FaVideo,
  FaCalendarAlt,
  FaStar,
  FaCertificate,
  FaMedal,
  FaPhotoVideo,
  FaHeart,
  FaShareAlt,
  FaClock,
  FaFilter,
  FaSearch,
  FaEdit,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaRuler,
} from "react-icons/fa";

const translateLevel = (level: string) => {
  const levels = {
    beginner: "Początkujący",
    intermediate: "Średniozaawansowany",
    advanced: "Zaawansowany",
  };
  return levels[level as keyof typeof levels] || level;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const slug = params?.slug as string;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("Pobieranie profilu dla:", slug); // Debug log
        const response = await fetch(`/api/profiles/by-name/${slug}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Otrzymane dane:", data); // Debug log
        setProfile(data);
      } catch (error) {
        console.error("Błąd:", error);
        setError("Nie udało się pobrać profilu");
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchProfile();
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{error}</h1>
          <p className="text-gray-600">Spróbuj odświeżyć stronę</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Nie znaleziono profilu
          </h1>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-[1200px] mx-auto px-4 py-6">
          <div className="flex items-center gap-6">
            <div className="relative w-32 h-32">
              <Image
                src={profile.image || "/default-avatar.png"}
                alt={profile.name}
                fill
                className="rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {profile.name}
              </h1>
              <p className="text-lg text-gray-600 mt-1">{profile.bio}</p>
              <div className="flex items-center gap-4 mt-4">
                <button className="px-6 py-2 bg-amber-500 text-white rounded-full font-medium hover:bg-amber-600 transition-colors">
                  Obserwuj
                </button>
                <button className="px-6 py-2 border border-gray-300 rounded-full font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  Wiadomość
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Galeria na pełną szerokość */}
      <div className="w-full bg-white py-1 border-b">
        {/* Kontener o maksymalnej szerokości 1200px */}
        <div className="max-w-[1200px] mx-auto">
          {/* Grid galerii */}
          <div className="grid grid-cols-12 gap-1">
            {/* Mniejsze elementy - pierwsze 5 */}
            {[
              { icon: FaMusic, label: "Występ" },
              { icon: FaGraduationCap, label: "Warsztaty" },
              { icon: FaTicketAlt, label: "Event" },
              { icon: FaChalkboardTeacher, label: "Lekcja" },
              { icon: FaTrophy, label: "Konkurs" },
            ].map((item, index) => (
              <div
                key={index}
                className="col-span-1 relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-sm overflow-hidden group cursor-pointer"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-gray-400 group-hover:text-amber-500 group-hover:scale-110 transition-all duration-200" />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                <div className="absolute bottom-1 left-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] text-gray-500 font-medium block text-center truncate">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}

            {/* Główne zdjęcie na środku */}
            <div className="col-span-2 row-span-2 relative aspect-[4/5] bg-gradient-to-br from-amber-500/10 to-amber-600/10 rounded-sm overflow-hidden group">
              <div className="absolute inset-0 flex items-center justify-center">
                <FaImage className="w-8 h-8 text-amber-500 group-hover:scale-110 transition-transform" />
              </div>
              <div className="absolute bottom-2 right-2">
                <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                  <FaCamera className="w-3 h-3" />
                  Główne
                </span>
              </div>
            </div>

            {/* Mniejsze elementy - ostatnie 5 */}
            {[
              { icon: FaUsers, label: "Grupa" },
              { icon: FaVideo, label: "Film" },
              { icon: FaCalendarAlt, label: "Wydarzenie" },
              { icon: FaStar, label: "Wyróżnione" },
              { icon: FaCertificate, label: "Certyfikat" },
            ].map((item, index) => (
              <div
                key={index}
                className="col-span-1 relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-sm overflow-hidden group cursor-pointer"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-gray-400 group-hover:text-amber-500 group-hover:scale-110 transition-all duration-200" />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                <div className="absolute bottom-1 left-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] text-gray-500 font-medium block text-center truncate">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}

            {/* Pozostałe elementy */}
            {[
              { icon: FaMedal, label: "Osiągnięcie" },
              { icon: FaPhotoVideo, label: "Media" },
              { icon: FaImage, label: "Galeria" },
              { icon: FaHeart, label: "Ulubione" },
              { icon: FaCamera, label: "Zdjęcia" },
              { icon: FaShareAlt, label: "Udostępnione" },
              { icon: FaClock, label: "Ostatnie" },
              { icon: FaFilter, label: "Filtry" },
              { icon: FaSearch, label: "Szukaj" },
              { icon: FaEdit, label: "Edytuj" },
            ].map((item, index) => (
              <div
                key={index}
                className="col-span-1 relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-sm overflow-hidden group cursor-pointer"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-gray-400 group-hover:text-amber-500 group-hover:scale-110 transition-all duration-200" />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                <div className="absolute bottom-1 left-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] text-gray-500 font-medium block text-center truncate">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ulepszona sekcja dostępności */}
      <div
        className="container mx-auto px-4 py-8"
        style={{ maxWidth: "900px" }}
      >
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Dostępność w tym tygodniu
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Preferowane godziny na taniec
                </p>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                Dostępny/a
              </span>
            </div>

            <div className="grid grid-cols-7 gap-3">
              {[
                { day: "Pon", hours: "20-22", available: true },
                { day: "Wt", hours: "19-21", available: true },
                { day: "Śr", hours: "-", available: false },
                { day: "Czw", hours: "20-22", available: true },
                { day: "Pt", hours: "18-22", available: true },
                { day: "Sob", hours: "16-22", available: true },
                { day: "Nd", hours: "16-20", available: true },
              ].map((item) => (
                <div key={item.day} className="text-center">
                  <div className="text-sm font-medium text-gray-900 mb-2">
                    {item.day}
                  </div>
                  <div
                    className={`
                    py-3 px-2 rounded-lg text-sm font-medium
                    ${
                      item.available
                        ? "bg-green-50 text-green-700 border border-green-100"
                        : "bg-gray-50 text-gray-400"
                    }
                  `}
                  >
                    {item.hours}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Grid z informacjami i aktywnością */}
        <div className="grid grid-cols-12 gap-8 mt-8">
          {/* Lewa kolumna - Ulubione wydarzenia */}
          <div className="col-span-12 md:col-span-4 space-y-6">
            {/* Informacje */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Informacje
                </h2>
                <dl className="space-y-4">
                  <div className="flex items-center gap-3">
                    <dt className="text-gray-500">
                      <FaStar className="w-4 h-4" />
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {translateLevel(profile?.dancePreferences?.level || "")}
                    </dd>
                  </div>
                  <div className="flex items-center gap-3">
                    <dt className="text-gray-500">
                      <FaClock className="w-4 h-4" />
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {profile?.dancePreferences?.availability}
                    </dd>
                  </div>
                  <div className="flex items-center gap-3">
                    <dt className="text-gray-500">
                      <FaMapMarkerAlt className="w-4 h-4" />
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {profile?.dancePreferences?.location}
                    </dd>
                  </div>
                  <div className="flex items-center gap-3">
                    <dt className="text-gray-500">
                      <FaBirthdayCake className="w-4 h-4" />
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {profile?.age} lat
                    </dd>
                  </div>
                  <div className="flex items-center gap-3">
                    <dt className="text-gray-500">
                      <FaRuler className="w-4 h-4" />
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {profile?.height} cm
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Ulepszone Ulubione wydarzenia */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Ulubione wydarzenia
                  </h2>
                  <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                    3 nadchodzące
                  </span>
                </div>
              </div>
              <div className="divide-y">
                {/* Pojedyncze wydarzenie */}
                <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                  <div className="flex items-start gap-4">
                    {/* Data wydarzenia */}
                    <div className="flex-shrink-0 w-14 text-center">
                      <div className="text-2xl font-bold text-amber-500">
                        15
                      </div>
                      <div className="text-xs font-medium text-gray-500 uppercase">
                        KWI
                      </div>
                    </div>

                    {/* Szczegóły wydarzenia z ikonami */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <FaCalendarAlt className="w-4 h-4 text-amber-500" />
                        <h3 className="font-medium text-gray-900 truncate group-hover:text-amber-600 transition-colors">
                          Warsaw Salsa Festival
                        </h3>
                        <span className="flex-shrink-0 w-2 h-2 rounded-full bg-green-500"></span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <FaMapMarkerAlt className="w-3.5 h-3.5" />
                        <span>Warszawa, Centrum</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium">
                          <FaMusic className="w-3 h-3 mr-1" />
                          Salsa
                        </span>
                        <span className="inline-flex items-center px-2 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">
                          <FaTicketAlt className="w-3 h-3 mr-1" />
                          Festiwal
                        </span>
                        <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                          <FaChalkboardTeacher className="w-3 h-3 mr-1" />
                          Warsztaty
                        </span>
                      </div>
                    </div>

                    {/* Akcje */}
                    <button className="p-2 text-gray-400 hover:text-amber-500 transition-colors">
                      <FaStar className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 border-t">
                <button className="w-full py-2 text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors">
                  Zobacz wszystkie wydarzenia
                </button>
              </div>
            </div>
          </div>

          {/* Prawa kolumna - Ulepszona Historia aktywności */}
          <div className="col-span-12 md:col-span-8">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Historia aktywności
                  </h2>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                      <FaFilter className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                      <FaSearch className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="relative space-y-8">
                  {/* Linia timeline */}
                  <div className="absolute left-8 top-0 bottom-0 w-px bg-amber-500 to-amber-100" />

                  {/* Pojedyncza aktywność */}
                  <div className="relative flex gap-6 group">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0 z-10 group-hover:scale-105 transition-transform">
                        <FaGraduationCap className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <FaStar className="w-3 h-3 text-white" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                              Instruktor
                            </span>
                            <span className="text-sm text-gray-500">•</span>
                            <time className="text-sm text-gray-500">
                              15 kwi 2024
                            </time>
                          </div>
                          <h3 className="text-lg font-medium text-gray-900 group-hover:text-amber-600 transition-colors">
                            Technika Bachaty
                          </h3>
                        </div>
                        <button className="p-2 text-gray-400 hover:text-amber-500 transition-colors rounded-lg hover:bg-gray-100">
                          <FaShareAlt className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                        Warsztaty z techniki prowadzenia i footworku w bachacie.
                        Zajęcia obejmowały zaawansowane techniki prowadzenia
                        oraz złożone kombinacje kroków.
                      </p>

                      <div className="flex items-center gap-4">
                        <div className="flex gap-2">
                          <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium">
                            Bachata
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                            6 godzin
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400">
                          <FaStar className="w-4 h-4 text-amber-400" />
                          <FaStar className="w-4 h-4 text-amber-400" />
                          <FaStar className="w-4 h-4 text-amber-400" />
                          <FaStar className="w-4 h-4 text-amber-400" />
                          <FaStar className="w-4 h-4 text-amber-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 border-t">
                <button className="w-full py-2 text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors">
                  Załaduj więcej
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
