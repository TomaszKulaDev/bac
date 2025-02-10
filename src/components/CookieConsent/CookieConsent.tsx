"use client";

import React, { useEffect, useState } from "react";
import { setCookie, getCookie } from "cookies-next";
import { CookieSettings } from "@/utils/cookies";
import { FaCookieBite, FaShieldAlt } from "react-icons/fa";
import { CookieSettingsModal } from "./CookieSettings";
import { motion, AnimatePresence } from "framer-motion";

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const consent = getCookie("cookie-consent");
      if (!consent) {
        setIsVisible(true);
      }
    }, 1000);

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

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="cookie-title"
          aria-describedby="cookie-description"
          className="fixed bottom-0 left-0 right-0 z-[9999] bg-white/95 
                   backdrop-blur-md border-t border-amber-100 shadow-lg"
        >
          <div className="container mx-auto px-4 py-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 bg-amber-50 rounded-full">
                    <FaCookieBite className="text-2xl text-amber-500" />
                  </div>
                  <div className="space-y-2">
                    <h3
                      id="cookie-title"
                      className="text-xl font-semibold text-gray-800"
                    >
                      Szanujemy Twoją prywatność
                    </h3>
                    <p
                      id="cookie-description"
                      className="text-gray-600 leading-relaxed"
                    >
                      Używamy plików cookie, aby zapewnić najlepsze
                      doświadczenia na naszej stronie. Możesz dostosować
                      ustawienia lub zaakceptować wszystkie pliki cookie.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end">
                  <button
                    onClick={() => setShowSettings(true)}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 
                             rounded-lg border border-amber-200 text-amber-700 
                             hover:bg-amber-50 transition-colors font-medium
                             order-2 sm:order-1"
                  >
                    <FaShieldAlt />
                    Dostosuj ustawienia
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 
                             rounded-lg bg-gradient-to-r from-amber-500 to-red-500 
                             text-white hover:from-amber-600 hover:to-red-600 
                             transition-colors font-medium shadow-lg 
                             shadow-amber-500/20 order-1 sm:order-2"
                  >
                    <FaCookieBite />
                    Akceptuj wszystkie
                  </button>
                </div>
              </div>
            </div>
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
