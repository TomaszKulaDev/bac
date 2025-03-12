import React, { useState } from "react";
import {
  FaShieldAlt,
  FaChartLine,
  FaBullhorn,
  FaTimes,
  FaCookieBite,
  FaCheck,
  FaInfoCircle,
  FaLock,
  FaRegCheckCircle,
  FaRegTimesCircle,
} from "react-icons/fa";
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
  const [activeTab, setActiveTab] = useState<string>("necessary");

  const cookieTypes = [
    {
      id: "necessary",
      icon: <FaShieldAlt className="text-xl text-gray-900" />,
      title: "Niezbędne",
      description:
        "Te pliki cookie są wymagane do działania podstawowych funkcji strony, takich jak logowanie, koszyk zakupowy czy formularze kontaktowe.",
      disabled: true,
      details:
        "Niezbędne pliki cookie zapewniają podstawową funkcjonalność strony. Strona nie może działać poprawnie bez tych plików cookie.",
    },
    {
      id: "analytics",
      icon: <FaChartLine className="text-xl text-gray-900" />,
      title: "Analityczne",
      description:
        "Pomagają nam zrozumieć, jak użytkownicy korzystają z naszej strony, co pozwala nam ulepszać jej funkcjonalność i zawartość.",
      disabled: false,
      details:
        "Analityczne pliki cookie pomagają nam zrozumieć, w jaki sposób odwiedzający wchodzą w interakcję z naszą stroną.",
    },
    {
      id: "marketing",
      icon: <FaBullhorn className="text-xl text-gray-900" />,
      title: "Marketingowe",
      description:
        "Używane do personalizacji reklam i śledzenia skuteczności kampanii marketingowych na różnych stronach internetowych.",
      disabled: false,
      details:
        "Marketingowe pliki cookie są używane do śledzenia odwiedzających na stronach internetowych i wyświetlania odpowiednich reklam.",
    },
  ];

  const handleAcceptAll = () => {
    setSettings({
      necessary: true,
      analytics: true,
      marketing: true,
    });
  };

  const handleRejectAll = () => {
    setSettings({
      necessary: true,
      analytics: false,
      marketing: false,
    });
  };

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const modalVariants = {
    hidden: { scale: 0.95, opacity: 0, y: 20 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        delay: 0.1,
      },
    },
    exit: {
      scale: 0.95,
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

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
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalVariants}
              className="relative bg-white shadow-2xl w-full max-w-xl overflow-hidden my-8 mx-auto"
              style={{ maxHeight: "calc(100vh - 100px)" }}
            >
              {/* Decorative header */}
              <div className="h-1.5 bg-[#ffd200]"></div>

              <div
                className="p-5 space-y-4 overflow-y-auto"
                style={{ maxHeight: "calc(100vh - 140px)" }}
              >
                {/* Header */}
                <div className="flex justify-between items-center">
                  <h2
                    id="settings-title"
                    className="text-xl font-semibold text-gray-800 flex items-center gap-2 tracking-tight"
                  >
                    <div className="p-1.5 bg-[#ffd200]">
                      <FaCookieBite className="text-lg text-gray-900" />
                    </div>
                    Ustawienia prywatności
                  </h2>
                  <button
                    onClick={onClose}
                    className="p-1.5 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#ffd200]"
                    aria-label="Zamknij ustawienia"
                  >
                    <FaTimes className="text-lg text-gray-500" />
                  </button>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">
                  Dostosuj swoje preferencje dotyczące plików cookie. Niektóre
                  pliki cookie są niezbędne do działania strony.
                </p>

                {/* Tabs */}
                <div className="flex border-b border-gray-200">
                  {cookieTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setActiveTab(type.id)}
                      className={`px-3 py-2 font-medium text-xs sm:text-sm transition-colors relative
                                ${
                                  activeTab === type.id
                                    ? "text-gray-900"
                                    : "text-gray-500 hover:text-gray-700"
                                }`}
                      aria-selected={activeTab === type.id}
                      role="tab"
                    >
                      <div className="flex items-center gap-1.5">
                        {type.id === "necessary" && (
                          <FaLock className="text-xs" />
                        )}
                        {type.title}
                        {settings[type.id as keyof CookieSettings] && (
                          <FaRegCheckCircle className="text-xs text-green-500" />
                        )}
                      </div>
                      {activeTab === type.id && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ffd200]"
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Cookie Types */}
                <div className="space-y-4 min-h-[180px]">
                  <AnimatePresence mode="wait">
                    {cookieTypes.map(
                      (type) =>
                        activeTab === type.id && (
                          <motion.div
                            key={type.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-3"
                          >
                            <div className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-100">
                              <div className="mt-1 p-2 bg-[#ffd200] shadow-sm">
                                {type.icon}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h3 className="font-semibold text-gray-800 flex items-center gap-2 text-sm">
                                    {type.title}
                                    {type.disabled && (
                                      <span className="text-xs px-2 py-0.5 bg-[#ffd200]/20 text-gray-900">
                                        Wymagane
                                      </span>
                                    )}
                                  </h3>
                                  <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={
                                        settings[
                                          type.id as keyof CookieSettings
                                        ]
                                      }
                                      disabled={type.disabled}
                                      onChange={(e) =>
                                        setSettings((prev) => ({
                                          ...prev,
                                          [type.id]: e.target.checked,
                                        }))
                                      }
                                      className="sr-only peer"
                                      aria-label={`Włącz ${type.title} pliki cookie`}
                                    />
                                    <div
                                      className={`
                                    w-10 h-5 bg-gray-200 
                                    peer-focus:outline-none peer-focus:ring-4 
                                    peer-focus:ring-[#ffd200]/30 
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
                                    after:h-4 after:w-4 
                                    after:transition-all
                                    ${
                                      type.disabled
                                        ? "opacity-50 cursor-not-allowed"
                                        : "peer-checked:bg-[#ffd200]"
                                    }
                                  `}
                                    ></div>
                                  </label>
                                </div>
                                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                                  {type.description}
                                </p>
                              </div>
                            </div>

                            <div className="bg-[#ffd200]/10 p-3 border border-[#ffd200]/20">
                              <div className="flex items-start gap-2">
                                <FaInfoCircle className="text-gray-900 mt-0.5 flex-shrink-0 text-xs" />
                                <p className="text-xs text-gray-700 leading-relaxed">
                                  {type.details}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )
                    )}
                  </AnimatePresence>
                </div>

                {/* Quick actions */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={handleAcceptAll}
                    className="flex-1 flex items-center justify-center gap-1.5 px-5 py-2.5 text-sm text-gray-900 bg-[#ffd200] hover:bg-[#e6bd00] transition-colors font-medium shadow-md"
                  >
                    <FaCheck className="text-sm" />
                    <span>Zaakceptuj wszystkie</span>
                  </button>
                  <button
                    onClick={handleRejectAll}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-500 hover:text-gray-600 transition-colors font-normal"
                  >
                    <FaRegTimesCircle className="text-xs" />
                    <span className="opacity-80">Odrzuć opcjonalne</span>
                  </button>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={onClose}
                    className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 
                             transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 font-normal"
                  >
                    Anuluj
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSave(settings)}
                    className="px-6 py-2.5 text-sm bg-[#ffd200] text-gray-900 
                             hover:bg-[#e6bd00] transition-colors shadow-md
                             focus:outline-none focus:ring-2 focus:ring-[#ffd200] focus:ring-offset-2 font-medium"
                  >
                    Zapisz ustawienia
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
