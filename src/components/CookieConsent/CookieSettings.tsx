import React, { useState } from "react";
import { FaShieldAlt, FaChartLine, FaBullhorn, FaTimes } from "react-icons/fa";
import { CookieSettings } from "@/utils/cookies";

interface CookieSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: CookieSettings) => void;
}

export const CookieSettingsModal = ({
  isOpen,
  onClose,
  onSave,
}: CookieSettingsModalProps) => {
  const [settings, setSettings] = useState<CookieSettings>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-labelledby="settings-title"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="relative min-h-screen flex items-center justify-center p-4"
        role="document"
      >
        <div className="relative bg-white/95 backdrop-blur-md rounded-xl shadow-xl w-full max-w-2xl animate-scale-up">
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2
                id="settings-title"
                className="text-2xl font-semibold text-gray-800"
              >
                Ustawienia plików cookie
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Zamknij ustawienia"
              >
                <FaTimes className="text-xl" aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <FaShieldAlt
                    className="text-2xl text-amber-500"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3
                      id="necessary-cookies-title"
                      className="font-semibold text-gray-800"
                    >
                      Niezbędne
                    </h3>
                    <input
                      type="checkbox"
                      checked={settings.necessary}
                      disabled
                      className="form-checkbox text-amber-500"
                      aria-labelledby="necessary-cookies-title"
                      aria-describedby="necessary-cookies-description"
                    />
                  </div>
                  <p
                    id="necessary-cookies-description"
                    className="text-sm text-gray-600 mt-1"
                  >
                    Te pliki cookie są wymagane do działania podstawowych
                    funkcji strony.
                  </p>
                </div>
              </div>

              {/* Analogicznie dla pozostałych sekcji */}
            </div>

            <div
              className="flex justify-end gap-3 pt-6 border-t border-gray-100"
              role="group"
              aria-label="Przyciski akcji"
            >
              <button
                onClick={onClose}
                className="btn-secondary"
                aria-label="Anuluj zmiany"
              >
                Anuluj
              </button>
              <button
                onClick={() => onSave(settings)}
                className="btn-primary"
                aria-label="Zapisz ustawienia cookie"
              >
                Zapisz ustawienia
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
