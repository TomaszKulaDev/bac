"use client";

import { useState } from "react";
import Link from "next/link";
import { FaFire, FaChartLine, FaRegEye } from "react-icons/fa";
import { motion } from "framer-motion";

interface TrendingTopic {
  id: string;
  title: string;
  views: number;
  slug: string;
  category: string;
  trend?: "up" | "down" | "stable";
  changePercent?: number;
}

export default function TrendingTopics() {
  const [activeTimeframe, setActiveTimeframe] = useState<
    "day" | "week" | "month"
  >("week");

  // Przykładowe dane - docelowo pobierane z API
  const trendingTopics: TrendingTopic[] = [
    {
      id: "1",
      title: "Jak zacząć przygodę z bachatą? Kompletny przewodnik",
      views: 1520,
      slug: "jak-zaczac-bachate",
      category: "Poradniki",
      trend: "up",
      changePercent: 12,
    },
    {
      id: "2",
      title: "Top 5 festiwali bachaty w 2024 roku",
      views: 1230,
      slug: "top-festiwale-bachaty-2024",
      category: "Wydarzenia",
      trend: "up",
      changePercent: 8,
    },
    {
      id: "3",
      title: "Najlepsze piosenki do nauki bachaty",
      views: 980,
      slug: "piosenki-do-nauki-bachaty",
      category: "Muzyka",
      trend: "stable",
      changePercent: 2,
    },
    {
      id: "4",
      title: "Bachata w parach - podstawowe kroki",
      views: 850,
      slug: "podstawowe-kroki-bachaty",
      category: "Nauka",
      trend: "down",
      changePercent: 5,
    },
    {
      id: "5",
      title: "Gdzie potańczyć bachatę w weekend?",
      views: 720,
      slug: "gdzie-tanczyc-bachate",
      category: "Social Dance",
      trend: "up",
      changePercent: 15,
    },
  ];

  // Animacja dla elementów listy
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-6">
      {/* Przełączniki czasowe */}
      <div className="flex rounded-none bg-gray-100 p-1 mb-6">
        <button
          onClick={() => setActiveTimeframe("day")}
          className={`flex-1 py-1.5 text-sm font-medium rounded-none transition-all ${
            activeTimeframe === "day"
              ? "bg-white text-amber-600 shadow-sm"
              : "text-gray-600 hover:text-amber-600"
          }`}
        >
          Dzisiaj
        </button>
        <button
          onClick={() => setActiveTimeframe("week")}
          className={`flex-1 py-1.5 text-sm font-medium rounded-none transition-all ${
            activeTimeframe === "week"
              ? "bg-white text-amber-600 shadow-sm"
              : "text-gray-600 hover:text-amber-600"
          }`}
        >
          Tydzień
        </button>
        <button
          onClick={() => setActiveTimeframe("month")}
          className={`flex-1 py-1.5 text-sm font-medium rounded-none transition-all ${
            activeTimeframe === "month"
              ? "bg-white text-amber-600 shadow-sm"
              : "text-gray-600 hover:text-amber-600"
          }`}
        >
          Miesiąc
        </button>
      </div>

      <motion.div
        className="space-y-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {trendingTopics.map((topic, index) => (
          <motion.div
            key={topic.id}
            variants={item}
            whileHover={{ x: 5 }}
            className="group"
          >
            <Link
              href={`/artykul/${topic.slug}`}
              className="flex items-start gap-6"
            >
              <span
                className="flex-shrink-0 w-12 h-12 rounded-none bg-amber-50 text-amber-600 
                         flex items-center justify-center font-bold text-xl shadow-sm
                         group-hover:bg-amber-100 transition-colors"
              >
                {index + 1}
              </span>

              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-amber-600 font-medium">
                    {topic.category}
                  </span>
                  {topic.trend && (
                    <span
                      className={`text-xs font-medium flex items-center gap-1 ${
                        topic.trend === "up"
                          ? "text-green-600"
                          : topic.trend === "down"
                          ? "text-red-600"
                          : "text-gray-600"
                      }`}
                    >
                      <FaChartLine
                        className={`w-3 h-3 ${
                          topic.trend === "up"
                            ? "rotate-0"
                            : topic.trend === "down"
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                      {topic.changePercent}%
                    </span>
                  )}
                </div>
                <h3 className="font-medium text-gray-800 group-hover:text-amber-600 transition-colors line-clamp-2">
                  {topic.title}
                </h3>
                <div className="flex items-center gap-2">
                  <FaRegEye className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    {topic.views.toLocaleString()} wyświetleń
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <div className="pt-4">
        <Link
          href="/popularne"
          className="block text-center py-3 text-amber-600 font-medium 
                 hover:text-amber-700 transition-colors bg-amber-50 hover:bg-amber-100
                 rounded-none"
        >
          Zobacz więcej popularnych tematów
        </Link>
      </div>
    </div>
  );
}
