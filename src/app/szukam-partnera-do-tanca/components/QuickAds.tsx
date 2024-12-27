"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaUser,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { quickAds, QuickAd } from "../data/quickAds";
import { useFilters } from "../context/FilterContext";
import { AddAdvertisementButton } from "./AddAdvertisementButton";

export function QuickAds() {
  const { selectedLocation } = useFilters();
  const [filter, setFilter] = useState<
    "all" | "practice" | "social" | "course"
  >("all");
  const [expandedAd, setExpandedAd] = useState<string | null>(null);
  const INITIAL_ADS_COUNT = 8;
  const [visibleAds, setVisibleAds] = useState(INITIAL_ADS_COUNT);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const ADS_PER_LOAD = 50;

  const filteredAds = quickAds
    .filter((ad) => {
      const typeMatch = filter === "all" || ad.type === filter;
      const locationMatch =
        !selectedLocation || ad.location === selectedLocation;
      return typeMatch && locationMatch;
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const displayedAds = filteredAds.slice(0, visibleAds);
  const hasMoreAds = filteredAds.length > visibleAds;

  const loadMore = () => {
    setVisibleAds((prev) => Math.min(prev + ADS_PER_LOAD, filteredAds.length));
  };

  const showLess = () => {
    setVisibleAds(INITIAL_ADS_COUNT);

    // Przewiń do góry sekcji z offsetem
    const quickAdsSection = document.getElementById("quick-ads");
    if (quickAdsSection) {
      const offset = 160; // Możesz dostosować tę wartość
      const elementPosition = quickAdsSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="quick-ads" className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center justify-between w-full sm:w-auto gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Szybkie Ogłoszenia
            </h2>
            <p className="text-sm text-gray-500">
              Znaleziono {filteredAds.length} ogłoszeń
            </p>
          </div>
          <AddAdvertisementButton />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-wrap gap-2">
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
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden sm:block p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label={isCollapsed ? "Rozwiń ogłoszenia" : "Zwiń ogłoszenia"}
          >
            {isCollapsed ? (
              <FaChevronDown className="text-gray-600" />
            ) : (
              <FaChevronUp className="text-gray-600" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              {displayedAds.map((ad) => (
                <div
                  key={ad.id}
                  className="bg-white border border-gray-100 rounded-xl overflow-hidden 
                             hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3
                        className="font-semibold text-gray-800 group-hover:text-amber-500 
                                   transition-colors line-clamp-1"
                      >
                        {ad.title}
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          ad.type === "practice"
                            ? "bg-blue-100 text-blue-700"
                            : ad.type === "social"
                            ? "bg-green-100 text-green-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {ad.type === "practice"
                          ? "Praktis"
                          : ad.type === "social"
                          ? "Social"
                          : "Kurs"}
                      </span>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <FaCalendarAlt className="text-amber-500" />
                          <span>{ad.date}</span>
                        </div>
                        <div className="w-1 h-1 bg-gray-300 rounded-full" />
                        <div className="flex items-center gap-1.5">
                          <FaClock className="text-amber-500" />
                          <span>{ad.time}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaMapMarkerAlt className="text-amber-500 flex-shrink-0" />
                        <div className="flex items-center gap-1.5 truncate">
                          <span>{ad.location}</span>
                          {ad.venue && (
                            <>
                              <div className="w-1 h-1 bg-gray-300 rounded-full flex-shrink-0" />
                              <span className="truncate">{ad.venue.name}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                          {ad.author.avatar ? (
                            <Image
                              src={ad.author.avatar}
                              alt={ad.author.name}
                              width={32}
                              height={32}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <FaUser className="w-full h-full p-2 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            {ad.author.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {ad.author.level}
                          </p>
                        </div>
                      </div>

                      <Link
                        href={`/szukam-partnera-do-tanca/ogloszenie/${ad.id}`}
                        className="px-4 py-2 text-sm font-medium text-white 
                                 bg-gradient-to-r from-amber-500 to-red-500 
                                 rounded-lg hover:from-amber-600 hover:to-red-600 
                                 transition-all duration-300 flex items-center gap-1.5"
                      >
                        Szczegóły
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {(hasMoreAds || visibleAds > INITIAL_ADS_COUNT) && (
              <div className="mt-6 text-center">
                {visibleAds > INITIAL_ADS_COUNT ? (
                  <button
                    onClick={showLess}
                    className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-red-500 
                             text-white rounded-lg font-medium hover:from-amber-600 
                             hover:to-red-600 transition-all duration-300
                             flex items-center justify-center gap-2 mx-auto"
                  >
                    <FaChevronUp className="text-sm" />
                    Pokaż mniej ogłoszeń
                  </button>
                ) : (
                  <button
                    onClick={loadMore}
                    className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-red-500 
                             text-white rounded-lg font-medium hover:from-amber-600 
                             hover:to-red-600 transition-all duration-300
                             flex items-center justify-center gap-2 mx-auto"
                  >
                    <FaChevronDown className="text-sm" />
                    Pokaż więcej ogłoszeń
                    <span className="text-sm opacity-75">
                      ({filteredAds.length - visibleAds})
                    </span>
                  </button>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
