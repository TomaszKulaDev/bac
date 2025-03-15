"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  FaBullhorn,
  FaCalendarAlt,
  FaInfoCircle,
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
  FaRegClock,
} from "react-icons/fa";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { InfoMessage, infoMessages } from "../data/articlesData";

// Wydzielenie stałych wartości poza komponent
const ANIMATION_DURATION = 300;
const AUTO_SCROLL_INTERVAL = 6000;

// Wydzielenie komponentu MessageIcon dla lepszej organizacji kodu
const MessageIcon = ({ type }: { type: InfoMessage["type"] }) => {
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

// Wydzielenie komponentu MessageIndicators dla lepszej organizacji kodu
const MessageIndicators = ({
  count,
  currentIndex,
  onSelect,
}: {
  count: number;
  currentIndex: number;
  onSelect: (index: number) => void;
}) => {
  return (
    <div className="hidden sm:flex items-center space-x-1 mr-4 mt-0.5">
      {Array.from({ length: count }).map((_, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(idx)}
          className={`w-1.5 h-1.5 rounded-full transition-all ${
            idx === currentIndex
              ? "bg-white w-3"
              : "bg-white/50 hover:bg-white/70"
          }`}
          aria-label={`Wiadomość ${idx + 1} z ${count}`}
        />
      ))}
    </div>
  );
};

const InfoBar: React.FC = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeMessages, setActiveMessages] = useState<InfoMessage[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Filtruj wiadomości, które nie wygasły - wykonywane tylko raz przy montowaniu
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const filtered = infoMessages.filter(
      (msg) => !msg.expiresAt || msg.expiresAt >= today
    );
    setActiveMessages(filtered);
  }, []);

  // Memoizacja funkcji stylów dla lepszej wydajności
  const getBackgroundColor = useCallback((type: InfoMessage["type"]) => {
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
  }, []);

  const getTextColor = useCallback((type: InfoMessage["type"]) => {
    switch (type) {
      case "announcement":
        return "text-gray-900";
      default:
        return "text-white";
    }
  }, []);

  // Funkcje zmiany wiadomości
  const changeMessage = useCallback((newIndex: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentMessageIndex(newIndex);
      setIsAnimating(false);
    }, ANIMATION_DURATION);
  }, []);

  const nextMessage = useCallback(() => {
    if (activeMessages.length <= 1) return;
    changeMessage((currentMessageIndex + 1) % activeMessages.length);
  }, [activeMessages.length, currentMessageIndex, changeMessage]);

  const previousMessage = useCallback(() => {
    if (activeMessages.length <= 1) return;
    changeMessage(
      (currentMessageIndex - 1 + activeMessages.length) % activeMessages.length
    );
  }, [activeMessages.length, currentMessageIndex, changeMessage]);

  const selectMessage = useCallback(
    (index: number) => {
      if (isAnimating || index === currentMessageIndex) return;
      changeMessage(index);
    },
    [isAnimating, currentMessageIndex, changeMessage]
  );

  // Automatyczne przewijanie wiadomości
  useEffect(() => {
    if (activeMessages.length <= 1 || isPaused) return;

    timerRef.current = setInterval(nextMessage, AUTO_SCROLL_INTERVAL);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [activeMessages.length, isPaused, nextMessage]);

  // Wczesny return jeśli nie ma aktywnych wiadomości
  if (activeMessages.length === 0) return null;

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
                className="absolute left-0 w-8 h-8 flex items-center justify-center hover:bg-black/10 rounded-md transition-colors mt-1"
                aria-label="Poprzednia wiadomość"
                disabled={isAnimating}
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
                transition={{ duration: ANIMATION_DURATION / 1000 }}
                className="flex items-center space-x-3 py-2 flex-wrap md:flex-nowrap mt-0.5"
              >
                <div className="flex-shrink-0 bg-white/20 rounded-full p-2 flex items-center justify-center">
                  <MessageIcon type={currentMessage.type} />
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
                className="absolute right-0 w-8 h-8 flex items-center justify-center hover:bg-black/10 rounded-md transition-colors mt-1"
                aria-label="Następna wiadomość"
                disabled={isAnimating}
              >
                <FaChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Wskaźniki wiadomości */}
          {activeMessages.length > 1 && (
            <MessageIndicators
              count={activeMessages.length}
              currentIndex={currentMessageIndex}
              onSelect={selectMessage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoBar;
