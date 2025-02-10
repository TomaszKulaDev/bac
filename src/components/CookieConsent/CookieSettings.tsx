import React, { useState } from "react";
import { FaShieldAlt, FaChartLine, FaBullhorn, FaTimes } from "react-icons/fa";
import { CookieSettings } from "@/utils/cookies";
import { motion, AnimatePresence } from "framer-motion";

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

  const cookieTypes = [
    {
      id: "necessary",
      icon: <FaShieldAlt className="text-2xl text-amber-500" />,
      title: "Niezbędne",
      description:
        "Te pliki cookie są wymagane do działania podstawowych funkcji strony.",
      disabled: true,
    },
    {
      id: "analytics",
      icon: <FaChartLine className="text-2xl text-blue-500" />,
      title: "Analityczne",
      description:
        "Pomagają nam zrozumieć, jak użytkownicy korzystają z naszej strony.",
      disabled: false,
    },
    {
      id: "marketing",
      icon: <FaBullhorn className="text-2xl text-green-500" />,
      title: "Marketingowe",
      description:
        "Używane do personalizacji reklam i śledzenia skuteczności kampanii.",
      disabled: false,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          role="dialog"
          aria-labelledby="settings-title"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-white/95 backdrop-blur-md rounded-xl shadow-xl w-full max-w-2xl"
            >
              <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                    <FaShieldAlt className="text-amber-500" />
                    Ustawienia prywatności
                  </h2>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Zamknij ustawienia"
                  >
                    <FaTimes className="text-xl text-gray-500" />
                  </button>
                </div>

                {/* Cookie Types */}
                <div className="space-y-6">
                  {cookieTypes.map((type) => (
                    <motion.div
                      key={type.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="mt-1">{type.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-800">
                            {type.title}
                          </h3>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={
                                settings[type.id as keyof CookieSettings]
                              }
                              disabled={type.disabled}
                              onChange={(e) =>
                                setSettings((prev) => ({
                                  ...prev,
                                  [type.id]: e.target.checked,
                                }))
                              }
                              className="sr-only peer"
                            />
                            <div
                              className={`
                              w-11 h-6 bg-gray-200 
                              peer-focus:outline-none peer-focus:ring-4 
                              peer-focus:ring-amber-300 
                              rounded-full peer 
                              peer-checked:after:translate-x-full 
                              peer-checked:after:border-white 
                              after:content-[''] 
                              after:absolute after:top-[2px] 
                              after:left-[2px] 
                              after:bg-white 
                              after:border-gray-300 
                              after:border 
                              after:rounded-full 
                              after:h-5 after:w-5 
                              after:transition-all
                              ${
                                type.disabled
                                  ? "opacity-50 cursor-not-allowed"
                                  : "peer-checked:bg-amber-500"
                              }
                            `}
                            ></div>
                          </label>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {type.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 
                             rounded-lg transition-colors"
                  >
                    Anuluj
                  </button>
                  <button
                    onClick={() => onSave(settings)}
                    className="px-4 py-2 bg-gradient-to-r from-amber-500 
                             to-red-500 text-white rounded-lg 
                             hover:from-amber-600 hover:to-red-600 
                             transition-colors shadow-lg shadow-amber-500/20"
                  >
                    Zapisz ustawienia
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
