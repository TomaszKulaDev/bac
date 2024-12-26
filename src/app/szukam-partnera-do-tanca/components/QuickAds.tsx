"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUser } from "react-icons/fa";
import { quickAds, QuickAd } from "../data/quickAds";
import { useFilters } from "../context/FilterContext";

export function QuickAds() {
  const { selectedLocation } = useFilters();
  const [filter, setFilter] = useState<
    "all" | "practice" | "social" | "course"
  >("all");

  const sortedAds = quickAds
    .filter((ad) => {
      console.log("QuickAds - Filtering:", {
        selectedLocation,
        adLocation: ad.location,
        isLocationMatch: !selectedLocation || ad.location === selectedLocation,
        locationComparison: {
          selectedLocationCase: selectedLocation,
          adLocationCase: ad.location,
          areEqual: ad.location === selectedLocation,
        },
      });

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

      <div className="space-y-4">
        {sortedAds.map((ad) => (
          <motion.div
            key={ad.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative bg-gradient-to-r from-amber-50/80 to-amber-50/40 
                     rounded-lg p-4 hover:shadow-md transition-all border border-amber-100/50"
          >
            <Link href={`/szukam-partnera-do-tanca/ogloszenie/${ad.id}`}>
              <div className="flex justify-between items-start gap-4">
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`px-2 py-0.5 text-xs font-medium rounded-full
                      ${
                        ad.type === "practice"
                          ? "bg-blue-100 text-blue-700"
                          : ad.type === "social"
                          ? "bg-green-100 text-green-700"
                          : ad.type === "course"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {ad.type === "practice"
                        ? "Praktis"
                        : ad.type === "social"
                        ? "Social"
                        : ad.type === "course"
                        ? "Kurs"
                        : "Inne"}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(ad.createdAt).toLocaleDateString("pl-PL")}
                    </span>
                  </div>

                  <h3
                    className="font-semibold text-gray-800 group-hover:text-amber-600 
                               transition-colors line-clamp-1"
                  >
                    {ad.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {ad.description}
                  </p>

                  <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt className="text-amber-500" />
                      {new Date(ad.date).toLocaleDateString("pl-PL")}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaClock className="text-amber-500" />
                      {ad.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-amber-500" />
                      {ad.location}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <FaUser className="text-amber-500" />
                    {ad.author.name}
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    {ad.author.level}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/szukam-partnera-do-tanca/dodaj-ogloszenie"
          className="inline-flex items-center justify-center px-6 py-2.5 
                   bg-gradient-to-r from-amber-500 to-red-500 text-white 
                   rounded-lg font-medium hover:from-amber-600 hover:to-red-600 
                   transition-all duration-300 shadow-sm hover:shadow-md"
        >
          Dodaj ogłoszenie
        </Link>
      </div>
    </section>
  );
}
