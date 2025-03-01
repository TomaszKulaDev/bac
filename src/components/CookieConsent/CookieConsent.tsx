"use client";

import React, { useEffect, useState } from "react";
import { setCookie, getCookie } from "cookies-next";
import { CookieSettings } from "@/utils/cookies";
import { FaCookieBite, FaShieldAlt, FaTimes, FaCog, FaLock } from "react-icons/fa";
import { CookieSettingsModal } from "./CookieSettings";
import { motion, AnimatePresence } from "framer-motion";

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const consent = getCookie("cookie-consent");
      if (!consent) {
        setIsVisible(true);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleAcceptAll = () => {
    try {
      setCookie("cookie-consent", "all", {
        maxAge: 365 * 24 * 60 * 60,
        path: "/",
        sameSite: "strict",
      });
      setIsVisible(false);
    } catch (error) {
      console.error("Błąd podczas akceptacji wszystkich cookies:", error);
    }
  };

  const handleSaveSettings = (settings: CookieSettings) => {
    try {
      setCookie("cookie-consent", JSON.stringify(settings), {
        maxAge: 365 * 24 * 60 * 60,
        path: "/",
        sameSite: "strict",
      });
      setShowSettings(false);
      setIsVisible(false);
    } catch (error) {
      console.error("Błąd podczas zapisywania ustawień cookies:", error);
    }
  };

  const toggleMinimize = () => {
    setMinimized(!minimized);
  };

  const cookieVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", damping: 25, stiffness: 300 },
    },
    exit: { y: 100, opacity: 0, transition: { duration: 0.3 } },
    minimized: { height: "auto", y: 0, opacity: 1 },
    expanded: { height: "auto", y: 0, opacity: 1 },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial="hidden"
          animate={minimized ? "minimized" : "visible"}
          exit="exit"
          variants={cookieVariants}
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="cookie-title"
          aria-describedby="cookie-description"
          className="fixed bottom-6 left-0 right-0 z-[9999] mx-auto max-w-4xl"
        >
          <div className="relative mx-4 rounded-xl bg-white shadow-[0_10px_40px_-5px_rgba(0,0,0,0.15)] overflow-hidden border border-gray-100">
            {/* Decorative header */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600"></div>

            {/* Minimize/Expand button */}
            <button
              onClick={toggleMinimize}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors z-10 rounded-full hover:bg-gray-100"
              aria-label={
                minimized
                  ? "Rozwiń informacje o cookies"
                  : "Zwiń informacje o cookies"
              }
            >
              {minimized ? (
                <FaCog className="text-lg" />
              ) : (
                <FaTimes className="text-lg" />
              )}
            </button>

            <AnimatePresence mode="wait">
              {minimized ? (
                <motion.div
                  key="minimized"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gradient-to-br from-amber-50 to-amber-100 rounded-full shadow-sm">
                      <FaCookieBite className="text-lg text-amber-600" />
                    </div>
                    <p className="font-medium text-gray-800">
                      Ustawienia plików cookie
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleAcceptAll}
                      className="px-4 py-2 text-sm bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors shadow-sm font-medium"
                    >
                      Akceptuj wszystkie
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="expanded"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8"
                >
                  <div className="flex flex-col gap-6">
                    <div className="flex items-start gap-5">
                      <div className="flex-shrink-0 p-3.5 bg-gradient-to-br from-amber-50 to-amber-100 rounded-full shadow-sm">
                        <FaCookieBite className="text-2xl text-amber-500" />
                      </div>
                      <div className="space-y-3">
                        <h3
                          id="cookie-title"
                          className="text-2xl font-semibold text-gray-800 tracking-tight"
                        >
                          Szanujemy Twoją prywatność
                        </h3>
                        <p
                          id="cookie-description"
                          className="text-gray-600 leading-relaxed text-[15px]"
                        >
                          Używamy plików cookie, aby zapewnić najlepsze
                          doświadczenia na naszej stronie. Pliki cookie pomagają
                          nam analizować ruch na stronie, dostosowywać treści i
                          zapewniać funkcje mediów społecznościowych.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowSettings(true)}
                        className="flex items-center justify-center gap-2 px-5 py-3.5 
                                 rounded-lg border-2 border-gray-200 text-gray-700 
                                 hover:bg-gray-50 hover:border-gray-300 transition-all font-medium
                                 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2"
                      >
                        <FaShieldAlt className="text-amber-500" />
                        Dostosuj ustawienia
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAcceptAll}
                        className="flex items-center justify-center gap-2 px-6 py-3.5 
                                 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 
                                 text-white hover:from-amber-600 hover:to-amber-700 
                                 transition-all font-medium shadow-md 
                                 shadow-amber-500/10 focus:outline-none focus:ring-2 
                                 focus:ring-amber-500 focus:ring-offset-2"
                      >
                        <FaLock className="text-sm" />
                        Akceptuj wszystkie
                      </motion.button>
                    </div>

                    <div className="text-center text-xs text-gray-500 mt-1 border-t border-gray-100 pt-4">
                      <p className="max-w-2xl mx-auto">
                        Klikając &quot;Akceptuj wszystkie&quot;, wyrażasz zgodę na
                        używanie wszystkich plików cookie zgodnie z naszą{" "}
                        <a
                          href="/polityka-prywatnosci"
                          className="text-amber-600 hover:text-amber-700 underline"
                        >
                          Polityką Prywatności
                        </a>
                        .
                        Możesz zmienić swoje preferencje w dowolnym momencie w
                        ustawieniach prywatności.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      <CookieSettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onSave={handleSaveSettings}
      />
    </AnimatePresence>
  );
};
