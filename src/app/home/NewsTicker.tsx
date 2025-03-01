"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface NewsItem {
  id: string;
  text: string;
  link: string;
  category: "wydarzenie" | "kurs" | "muzyka" | "artykuł" | "konkurs";
}

export default function NewsTicker() {
  // Sample news items - in a real app, these would come from an API or CMS
  const newsItems: NewsItem[] = [
    {
      id: "1",
      text: "Mistrzostwa Polski w Bachacie 2024 - Rejestracja już otwarta!",
      link: "/wydarzenia/mistrzostwa-polski-bachata-2024",
      category: "wydarzenie",
    },
    {
      id: "2",
      text: "Nowy kurs bachaty dla początkujących startuje w przyszłym tygodniu",
      link: "/kursy/bachata-dla-poczatkujacych",
      category: "kurs",
    },
    {
      id: "3",
      text: "Romeo Santos ogłasza europejską trasę koncertową - sprawdź daty",
      link: "/artykul/romeo-santos-trasa-europa",
      category: "muzyka",
    },
    {
      id: "4",
      text: "Międzynarodowy Festiwal Bachaty w Warszawie - Bilety w przedsprzedaży",
      link: "/wydarzenia/festiwal-bachaty-warszawa",
      category: "wydarzenie",
    },
    {
      id: "5",
      text: "10 najlepszych piosenek do nauki bachaty - Nowy artykuł już dostępny",
      link: "/artykul/najlepsze-piosenki-do-nauki-bachaty",
      category: "artykuł",
    },
    {
      id: "6",
      text: "Poland Bachata League - Zgłoszenia do nowej edycji konkursu otwarte",
      link: "/konkursy/poland-bachata-league",
      category: "konkurs",
    },
  ];

  const [isPaused, setIsPaused] = useState(false);
  const tickerRef = useRef<HTMLDivElement>(null);
  const [tickerWidth, setTickerWidth] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Set initial window width
    setWindowWidth(window.innerWidth);

    // Calculate the total width of the ticker content
    if (tickerRef.current) {
      setTickerWidth(tickerRef.current.scrollWidth);
      setIsInitialized(true);
    }

    // Update dimensions on window resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (tickerRef.current) {
        setTickerWidth(tickerRef.current.scrollWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Get category label and color
  const getCategoryInfo = (category: NewsItem["category"]) => {
    switch (category) {
      case "wydarzenie":
        return { label: "WYDARZENIE", bgColor: "bg-amber-800/40" };
      case "kurs":
        return { label: "KURS", bgColor: "bg-amber-700/40" };
      case "muzyka":
        return { label: "MUZYKA", bgColor: "bg-amber-600/40" };
      case "artykuł":
        return { label: "ARTYKUŁ", bgColor: "bg-amber-500/40" };
      case "konkurs":
        return { label: "KONKURS", bgColor: "bg-amber-900/40" };
      default:
        return { label: "AKTUALNOŚĆ", bgColor: "bg-white/20" };
    }
  };

  // Animation duration based on content length and window width
  const animationDuration = Math.max(30, (tickerWidth / windowWidth) * 25);

  return (
    <div
      className="bg-gradient-to-r from-amber-700 to-amber-800 text-white py-3 overflow-hidden relative border-y border-amber-500/20 shadow-md"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-[1600px] mx-auto px-4 relative">
        {/* Label */}
        <div className="absolute left-4 top-0 bottom-0 flex items-center z-10">
          <div className="bg-white text-amber-800 font-bold px-4 py-1.5 rounded-sm shadow-sm text-sm tracking-wider flex items-center gap-1.5 border-l-4 border-amber-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                clipRule="evenodd"
              />
            </svg>
            AKTUALNOŚCI
          </div>
        </div>

        {/* Gradient fade effect on the left */}
        <div className="absolute left-[140px] top-0 bottom-0 w-24 bg-gradient-to-r from-amber-700 to-transparent z-[5]"></div>

        {/* Ticker content */}
        <div className="ml-[160px] overflow-hidden">
          {/* Static initial content to show immediately */}
          {!isInitialized && (
            <div className="flex items-center gap-12 whitespace-nowrap">
              {newsItems.slice(0, 3).map((item) => {
                const categoryInfo = getCategoryInfo(item.category);
                return (
                  <Link
                    href={item.link}
                    key={`static-${item.id}`}
                    className="flex items-center gap-3 hover:underline font-medium group"
                  >
                    <span
                      className={`${categoryInfo.bgColor} text-white text-xs font-bold px-2.5 py-1 rounded-sm tracking-wide shadow-sm`}
                    >
                      {categoryInfo.label}
                    </span>
                    <span className="group-hover:text-amber-200 transition-colors duration-200">
                      {item.text}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Animated ticker once initialized */}
          {isInitialized && (
            <motion.div
              ref={tickerRef}
              className="flex items-center gap-12 whitespace-nowrap"
              initial={{ x: 0 }}
              animate={{
                x: isPaused ? 0 : [0, -tickerWidth],
              }}
              transition={{
                x: {
                  duration: isPaused ? 0 : animationDuration,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "loop",
                },
              }}
            >
              {newsItems.map((item) => {
                const categoryInfo = getCategoryInfo(item.category);
                return (
                  <Link
                    href={item.link}
                    key={item.id}
                    className="flex items-center gap-3 hover:underline font-medium group"
                  >
                    <span
                      className={`${categoryInfo.bgColor} text-white text-xs font-bold px-2.5 py-1 rounded-sm tracking-wide shadow-sm`}
                    >
                      {categoryInfo.label}
                    </span>
                    <span className="group-hover:text-amber-200 transition-colors duration-200">
                      {item.text}
                    </span>
                  </Link>
                );
              })}

              {/* Duplicate items to ensure continuous flow */}
              {newsItems.map((item) => {
                const categoryInfo = getCategoryInfo(item.category);
                return (
                  <Link
                    href={item.link}
                    key={`${item.id}-duplicate`}
                    className="flex items-center gap-3 hover:underline font-medium group"
                  >
                    <span
                      className={`${categoryInfo.bgColor} text-white text-xs font-bold px-2.5 py-1 rounded-sm tracking-wide shadow-sm`}
                    >
                      {categoryInfo.label}
                    </span>
                    <span className="group-hover:text-amber-200 transition-colors duration-200">
                      {item.text}
                    </span>
                  </Link>
                );
              })}
            </motion.div>
          )}
        </div>

        {/* Gradient fade effect on the right */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-amber-800 to-transparent z-[5]"></div>
      </div>
    </div>
  );
}
