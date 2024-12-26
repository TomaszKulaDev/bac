"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaUser,
} from "react-icons/fa";

export default function AdDetailsPage() {
  const { id } = useParams();

  // W rzeczywistej aplikacji dane byłyby pobierane z API
  const ad = {
    id: "1",
    type: "practice",
    title: "Szukam partnera na praktis",
    description:
      "Praktis bachaty, poziom średniozaawansowany. Sala już opłacona.",
    date: "2024-03-15",
    time: "18:00-20:00",
    location: "Warszawa, Studio Tańca XYZ",
    author: {
      name: "Anna K.",
      level: "Średniozaawansowany",
      avatar: "/images/profiles/avatar1.jpg",
    },
    createdAt: "2024-03-10T12:00:00Z",
    expiresAt: "2024-03-15T20:00:00Z",
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link
        href="/szukam-partnera-do-tanca"
        className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-8"
      >
        <FaArrowLeft />
        Powrót do ogłoszeń
      </Link>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{ad.title}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-600 mb-6">{ad.description}</p>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-600">
                <FaCalendarAlt className="text-amber-500" />
                <span>{new Date(ad.date).toLocaleDateString("pl-PL")}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <FaClock className="text-amber-500" />
                <span>{ad.time}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <FaMapMarkerAlt className="text-amber-500" />
                <span>{ad.location}</span>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-6 rounded-lg">
            <h2 className="font-semibold text-gray-800 mb-4">
              Autor ogłoszenia
            </h2>

            <div className="flex items-center gap-4">
              {ad.author.avatar && (
                <img
                  src={ad.author.avatar}
                  alt={ad.author.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}

              <div>
                <p className="font-medium text-gray-800">{ad.author.name}</p>
                <p className="text-sm text-gray-600">{ad.author.level}</p>
              </div>
            </div>

            <button
              className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-amber-500 to-red-500 
                             text-white rounded-lg hover:from-amber-600 hover:to-red-600 
                             transition-all duration-300"
            >
              Napisz wiadomość
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
