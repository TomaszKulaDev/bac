"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaUser,
  FaChevronDown,
} from "react-icons/fa";
import { quickAds, QuickAd } from "../data/quickAds";
import { useFilters } from "../context/FilterContext";

export function QuickAds() {
  const { selectedLocation } = useFilters();
  const [filter, setFilter] = useState<
    "all" | "practice" | "social" | "course"
  >("all");
  const [expandedAd, setExpandedAd] = useState<string | null>(null);

  const sortedAds = quickAds
    .filter((ad) => {
      const typeMatch = filter === "all" || ad.type === filter;
      const locationMatch =
        !selectedLocation || ad.location === selectedLocation;
      return typeMatch && locationMatch;
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  return (
    <section className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Szybkie Ogłoszenia
          </h2>
          <p className="text-sm text-gray-500">
            Znaleziono {quickAds.length} ogłoszeń
          </p>
        </div>

        <div className="flex gap-2">
          {[
            { id: "all", label: "Wszystkie" },
            { id: "practice", label: "Praktis" },
            { id: "social", label: "Social" },
            { id: "course", label: "Kurs" },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setFilter(id as typeof filter)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all
                ${
                  filter === id
                    ? "bg-amber-500 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="hidden md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                Typ
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                Tytuł
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                Data
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                Lokalizacja
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                Autor
              </th>
              <th className="text-right py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {sortedAds.map((ad) => (
              <tr
                key={ad.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${
                      ad.type === "practice"
                        ? "bg-blue-50 text-blue-600"
                        : ad.type === "social"
                        ? "bg-green-50 text-green-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {ad.type === "practice"
                      ? "Praktis"
                      : ad.type === "social"
                      ? "Social"
                      : "Kurs"}
                  </span>
                </td>
                <td className="py-3 px-4 font-medium text-gray-900">
                  {ad.title}
                </td>
                <td className="py-3 px-4 text-gray-500">
                  {new Date(ad.date).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 text-gray-500">{ad.location}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">
                      {ad.author.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {ad.author.level}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-right">
                  <Link
                    href={`/szukam-partnera-do-tanca/ogloszenie/${ad.id}`}
                    className="text-amber-500 hover:text-amber-600"
                  >
                    Szczegóły
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {sortedAds.map((ad) => (
          <div
            key={ad.id}
            className="border border-gray-100 rounded-lg hover:border-amber-200 
                     transition-all duration-300"
          >
            <button
              onClick={() => setExpandedAd(expandedAd === ad.id ? null : ad.id)}
              className="w-full text-left p-4"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      ad.type === "practice"
                        ? "bg-blue-50 text-blue-600"
                        : ad.type === "social"
                        ? "bg-green-50 text-green-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    <FaCalendarAlt className="text-lg" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{ad.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <FaMapMarkerAlt />
                      {ad.location}
                      <span className="text-gray-300">•</span>
                      <FaClock />
                      {ad.time}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">
                    {ad.author.name}
                  </span>
                  <FaChevronDown
                    className={`transform transition-transform ${
                      expandedAd === ad.id ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
            </button>

            {expandedAd === ad.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-4 pb-4 border-t border-gray-100"
              >
                <p className="text-gray-600 mt-3">{ad.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      Poziom: {ad.author.level}
                    </span>
                    {ad.venue && (
                      <span className="text-sm text-gray-500">
                        • {ad.venue.name}
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/szukam-partnera-do-tanca/ogloszenie/${ad.id}`}
                    className="px-4 py-2 text-sm font-medium text-white 
                             bg-gradient-to-r from-amber-500 to-red-500 
                             rounded-lg hover:from-amber-600 hover:to-red-600 
                             transition-all duration-300"
                  >
                    Szczegóły
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/szukam-partnera-do-tanca/dodaj-ogloszenie"
          className="inline-flex items-center justify-center px-6 py-2.5 
                   bg-gradient-to-r from-amber-500 to-red-500 text-white 
                   rounded-lg font-medium hover:from-amber-600 hover:to-red-600 
                   transition-all duration-300"
        >
          Dodaj ogłoszenie
        </Link>
      </div>
    </section>
  );
}
