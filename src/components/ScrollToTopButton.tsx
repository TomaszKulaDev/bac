"use client";

import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed bottom-8 right-8 z-40"
        >
          <button
            onClick={scrollToTop}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative outline-none"
            aria-label="Przewiń do góry"
            title="Przewiń do góry strony"
          >
            {/* Główny kontener */}
            <div className="relative w-16 h-16">
              {/* Tło przycisku */}
              <motion.div
                className="absolute inset-0 bg-white rounded-2xl shadow-lg"
                animate={{
                  rotate: isHovered ? 45 : 0,
                  borderRadius: isHovered ? "16px" : "32px",
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Wskaźnik postępu - górna linia */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-1 bg-[#ffd200] origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: scrollProgress }}
                transition={{ duration: 0.2 }}
                style={{
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                }}
              />

              {/* Wskaźnik postępu - prawa linia */}
              <motion.div
                className="absolute top-0 bottom-0 right-0 w-1 bg-[#ffd200] origin-top"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: scrollProgress }}
                transition={{ duration: 0.2 }}
                style={{
                  borderTopRightRadius: "8px",
                  borderBottomRightRadius: "8px",
                }}
              />

              {/* Kontener ikony */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    rotate: isHovered ? 360 : 0,
                    scale: isHovered ? 1.2 : 1,
                  }}
                  transition={{
                    duration: 0.5,
                    rotate: { type: "spring", stiffness: 200 },
                  }}
                >
                  <FaArrowUp
                    className="w-6 h-6 text-gray-800 transition-colors duration-300"
                    style={{
                      color: isHovered ? "#ffd200" : "#1a1a1a",
                    }}
                  />
                </motion.div>
              </div>

              {/* Licznik procentowy */}
              <motion.div
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, y: -10 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : -10,
                }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-sm font-medium text-gray-600">
                  {Math.round(scrollProgress * 100)}%
                </span>
              </motion.div>
            </div>

            {/* Efekty hover */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              animate={{
                boxShadow: isHovered
                  ? "0 0 0 3px rgba(255, 210, 0, 0.2)"
                  : "0 0 0 0px rgba(255, 210, 0, 0)",
                rotate: isHovered ? 45 : 0,
                borderRadius: isHovered ? "16px" : "32px",
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Animowane kropki w rogach */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-[#ffd200] rounded-full"
                initial={{ scale: 0 }}
                animate={{
                  scale: isHovered ? 1 : 0,
                  opacity: isHovered ? [0.5, 1, 0.5] : 0,
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                style={{
                  top: i < 2 ? "-3px" : "auto",
                  bottom: i >= 2 ? "-3px" : "auto",
                  left: i % 2 === 0 ? "-3px" : "auto",
                  right: i % 2 === 1 ? "-3px" : "auto",
                }}
              />
            ))}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
