"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  FaBullhorn,
  FaCalendarAlt,
  FaInfoCircle,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
  FaRegClock,
} from "react-icons/fa";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface InfoMessage {
  id: string;
  type: "info" | "announcement" | "event" | "promo";
  content: string;
  link?: string;
  date?: string;
  isNew?: boolean;
  expiresAt?: string; // Format: "YYYY-MM-DD"
}

const messages: InfoMessage[] = [
  {
    id: "1",
    type: "announcement",
    content: "Nowe kursy bachaty - zapisz się już dziś i otrzymaj 15% zniżki!",
    link: "/kursy",
    isNew: true,
  },
  {
    id: "2",
    type: "event",
    content: "Wielki Festiwal Bachaty 2024 - Early Birds do 1 czerwca",
    link: "/festiwal-2024",
    date: "15-17 sierpnia 2024",
    expiresAt: "2024-06-01",
  },
  {
    id: "3",
    type: "info",
    content: "Aktualizacja harmonogramu praktyk na czerwiec już dostępna",
    link: "/praktyki",
  },
  {
    id: "4",
    type: "promo",
    content:
      "Kup bilet na Bachata Masters i otrzymaj darmowy wstęp na after party",
    link: "/promocje/bachata-masters",
    expiresAt: "2024-07-15",
  },
];

const InfoBar: React.FC = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeMessages, setActiveMessages] = useState<InfoMessage[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Filtruj wiadomości, które nie wygasły
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const filtered = messages.filter(
      (msg) => !msg.expiresAt || msg.expiresAt >= today
    );
    setActiveMessages(filtered);
  }, []);

  const getIcon = (type: InfoMessage["type"]) => {
    switch (type) {
      case "announcement":
        return <FaBullhorn className="w-4 h-4" />;
      case "event":
        return <FaCalendarAlt className="w-4 h-4" />;
      case "promo":
        return <FaRegClock className="w-4 h-4" />;
      default:
        return <FaInfoCircle className="w-4 h-4" />;
    }
  };

  const getBackgroundColor = (type: InfoMessage["type"]) => {
    switch (type) {
      case "announcement":
        return "bg-[#ffd200]";
      case "event":
        return "bg-blue-500";
      case "promo":
        return "bg-gradient-to-r from-purple-500 to-pink-500";
      default:
        return "bg-gray-800";
    }
  };

  const getTextColor = (type: InfoMessage["type"]) => {
    switch (type) {
      case "announcement":
        return "text-gray-900";
      default:
        return "text-white";
    }
  };

  // Przenieśmy funkcję nextMessage do useCallback, aby uniknąć nieskończonej pętli
  const nextMessage = useCallback(() => {
    if (activeMessages.length <= 1) return;

    setIsAnimating(true);
    setTimeout(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % activeMessages.length);
      setIsAnimating(false);
    }, 300);
  }, [activeMessages.length]);

  const previousMessage = useCallback(() => {
    if (activeMessages.length <= 1) return;

    setIsAnimating(true);
    setTimeout(() => {
      setCurrentMessageIndex(
        (prev) => (prev - 1 + activeMessages.length) % activeMessages.length
      );
      setIsAnimating(false);
    }, 300);
  }, [activeMessages.length]);

  // Automatyczne przewijanie wiadomości
  useEffect(() => {
    if (activeMessages.length <= 1 || isPaused) return;

    timerRef.current = setInterval(() => {
      nextMessage();
    }, 6000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [activeMessages.length, isPaused, nextMessage]);

  // Zapisz stan w localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("infoBarVisible");
    if (savedState === "false") {
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("infoBarVisible", "false");

    // Resetuj po 24 godzinach
    setTimeout(() => {
      localStorage.removeItem("infoBarVisible");
    }, 24 * 60 * 60 * 1000);
  };

  if (!isVisible || activeMessages.length === 0) return null;

  const currentMessage = activeMessages[currentMessageIndex];

  return (
    <div
      className={`w-full ${getBackgroundColor(
        currentMessage.type
      )} ${getTextColor(
        currentMessage.type
      )} shadow-md transition-all duration-300`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-[1300px] mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex-1 flex items-center justify-center relative px-8 sm:px-12">
            {activeMessages.length > 1 && (
              <button
                onClick={previousMessage}
                className="absolute left-0 w-8 h-8 flex items-center justify-center hover:bg-black/10 rounded-md transition-colors"
                aria-label="Poprzednia wiadomość"
              >
                <FaChevronLeft className="w-3 h-3" />
              </button>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={currentMessage.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex items-center space-x-3 py-2 flex-wrap md:flex-nowrap mt-0.5"
              >
                <div className="flex-shrink-0 bg-white/20 rounded-full p-2 flex items-center justify-center">
                  {getIcon(currentMessage.type)}
                </div>
                <span className="text-sm font-medium leading-tight flex-1 min-w-0">
                  {currentMessage.content}
                  {currentMessage.date && (
                    <span className="ml-2 font-bold inline-block">
                      {currentMessage.date}
                    </span>
                  )}
                  {currentMessage.isNew && (
                    <span className="ml-2 bg-white text-red-500 text-xs px-1.5 py-0.5 rounded-full font-bold animate-pulse inline-flex items-center">
                      NOWOŚĆ
                    </span>
                  )}
                </span>
                {currentMessage.link && (
                  <Link
                    href={currentMessage.link}
                    className="flex items-center space-x-1 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex-shrink-0"
                  >
                    <span>Więcej info</span>
                    <FaExternalLinkAlt className="w-3 h-3" />
                  </Link>
                )}
              </motion.div>
            </AnimatePresence>

            {activeMessages.length > 1 && (
              <button
                onClick={nextMessage}
                className="absolute right-0 w-8 h-8 flex items-center justify-center hover:bg-black/10 rounded-md transition-colors"
                aria-label="Następna wiadomość"
              >
                <FaChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Wskaźniki wiadomości */}
          {activeMessages.length > 1 && (
            <div className="hidden sm:flex items-center space-x-1 mr-4 mt-0.5">
              {activeMessages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsAnimating(true);
                    setTimeout(() => {
                      setCurrentMessageIndex(idx);
                      setIsAnimating(false);
                    }, 300);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    idx === currentMessageIndex
                      ? "bg-white w-3"
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                  aria-label={`Wiadomość ${idx + 1} z ${activeMessages.length}`}
                />
              ))}
            </div>
          )}

          <button
            onClick={handleClose}
            className="ml-2 p-2 hover:bg-black/10 rounded-md transition-colors mt-0.5"
            aria-label="Zamknij"
          >
            <FaTimes className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoBar;
