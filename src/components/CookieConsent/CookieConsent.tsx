"use client";

import React, { useEffect, useState } from "react";
import { setCookie, getCookie } from "cookies-next";
import { CookieSettings } from "@/utils/cookies";
import {
  FaCookieBite,
  FaShieldAlt,
  FaChartLine,
  FaBullhorn,
} from "react-icons/fa";
import { CookieSettingsModal } from "./CookieSettings";

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

  if (!isVisible) return null;

  return (
    <>
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="cookie-title"
        aria-describedby="cookie-description"
        className={`fixed bottom-0 left-0 right-0 z-[9999] bg-white/95 backdrop-blur-md
                   border-t border-amber-100 shadow-lg animate-slide-up`}
      >
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center">
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <FaCookieBite
                  className="text-2xl text-amber-500"
                  aria-hidden="true"
                />
                <h3
                  id="cookie-title"
                  className="text-xl font-semibold text-gray-800"
                >
                  Szanujemy Twoją prywatność
                </h3>
              </div>
              <p id="cookie-description" className="text-gray-600">
                Używamy plików cookie, aby zapewnić najlepsze doświadczenia na
                naszej stronie. Możesz dostosować ustawienia lub zaakceptować
                wszystkie pliki cookie.
              </p>
            </div>
            <div
              className="flex flex-col sm:flex-row gap-3 min-w-[200px]"
              role="group"
              aria-label="Opcje zgody na pliki cookie"
            >
              <button
                onClick={() => setShowSettings(true)}
                className="px-4 py-2 rounded-lg border border-amber-200 
                          text-amber-700 hover:bg-amber-50 transition-colors
                          whitespace-nowrap"
                aria-haspopup="dialog"
                aria-expanded={showSettings}
              >
                Ustawienia
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 rounded-lg bg-gradient-to-r 
                        from-amber-500 to-red-500 text-white 
                        hover:from-amber-600 hover:to-red-600 
                        transition-colors whitespace-nowrap"
                aria-label="Zaakceptuj wszystkie pliki cookie"
              >
                Akceptuj wszystkie
              </button>
            </div>
          </div>
        </div>
      </div>

      <CookieSettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onSave={handleSaveSettings}
      />
    </>
  );
};
