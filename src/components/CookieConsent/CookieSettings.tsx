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
      icon: <FaShieldAlt className="text-2xl text-amber-500" />,
      title: "Niezbędne",
      description:
        "Te pliki cookie są wymagane do działania podstawowych funkcji strony, takich jak logowanie, koszyk zakupowy czy formularze kontaktowe. Nie można ich wyłączyć.",
      disabled: true,
      details:
        "Niezbędne pliki cookie zapewniają podstawową funkcjonalność strony. Strona nie może działać poprawnie bez tych plików cookie, dlatego można je wyłączyć tylko zmieniając ustawienia przeglądarki.",
    },
    {
      id: "analytics",
      icon: <FaChartLine className="text-2xl text-blue-500" />,
      title: "Analityczne",
      description:
        "Pomagają nam zrozumieć, jak użytkownicy korzystają z naszej strony, co pozwala nam ulepszać jej funkcjonalność i zawartość.",
      disabled: false,
      details:
        "Analityczne pliki cookie pomagają nam zrozumieć, w jaki sposób odwiedzający wchodzą w interakcję z naszą stroną. Te informacje pomagają nam ulepszać naszą stronę i zapewniać lepsze doświadczenia użytkownika.",
    },
    {
      id: "marketing",
      icon: <FaBullhorn className="text-2xl text-green-500" />,
      title: "Marketingowe",
      description:
        "Używane do personalizacji reklam i śledzenia skuteczności kampanii marketingowych na różnych stronach internetowych.",
      disabled: false,
      details:
        "Marketingowe pliki cookie są używane do śledzenia odwiedzających na stronach internetowych. Ich celem jest wyświetlanie reklam, które są odpowiednie i angażujące dla poszczególnych użytkowników, a tym samym bardziej wartościowe dla wydawców i reklamodawców zewnętrznych.",
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
              className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden"
            >
              {/* Decorative header */}
              <div className="h-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600"></div>

              <div className="p-8 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                  <h2
                    id="settings-title"
                    className="text-2xl font-semibold text-gray-800 flex items-center gap-2.5 tracking-tight"
                  >
                    <div className="p-2 bg-amber-50 rounded-full">
                      <FaCookieBite className="text-xl text-amber-500" />
                    </div>
                    Ustawienia prywatności
                  </h2>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300"
                    aria-label="Zamknij ustawienia"
                  >
                    <FaTimes className="text-xl text-gray-500" />
                  </button>
                </div>

                <p className="text-gray-600 text-[15px] leading-relaxed">
                  Dostosuj swoje preferencje dotyczące plików cookie. Niektóre
                  pliki cookie są niezbędne do działania strony, podczas gdy
                  inne pomagają nam ulepszać doświadczenia użytkownika.
                </p>

                {/* Tabs */}
                <div className="flex border-b border-gray-200">
                  {cookieTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setActiveTab(type.id)}
                      className={`px-5 py-3 font-medium text-sm transition-colors relative
                                ${
                                  activeTab === type.id
                                    ? "text-amber-600"
                                    : "text-gray-500 hover:text-gray-700"
                                }`}
                      aria-selected={activeTab === type.id}
                      role="tab"
                    >
                      <div className="flex items-center gap-2">
                        {type.id === "necessary" && <FaLock className="text-xs" />}
                        {type.title}
                        {settings[type.id as keyof CookieSettings] && (
                          <FaRegCheckCircle className="text-xs text-green-500" />
                        )}
                      </div>
                      {activeTab === type.id && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Cookie Types */}
                <div className="space-y-6 min-h-[240px]">
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
                            className="space-y-5"
                          >
                            <div className="flex items-start gap-5 p-5 rounded-lg bg-gray-50 border border-gray-100">
                              <div className="mt-1 p-2.5 rounded-full bg-white shadow-sm">
                                {type.icon}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                                    {type.title}
                                    {type.disabled && (
                                      <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">
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
                                    w-12 h-6 bg-gray-200 
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
                                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                                  {type.description}
                                </p>
                              </div>
                            </div>

                            <div className="bg-amber-50 p-5 rounded-lg border border-amber-100">
                              <div className="flex items-start gap-3">
                                <FaInfoCircle className="text-amber-500 mt-0.5 flex-shrink-0" />
                                <div>
                                  <h4 className="font-medium text-amber-800 text-sm mb-1">Szczegółowe informacje</h4>
                                  <p className="text-sm text-amber-700/90 leading-relaxed">
                                    {type.details}
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            {type.id === "necessary" && (
                              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800">
                                <div className="flex items-start gap-2">
                                  <FaInfoCircle className="text-blue-500 mt-0.5 flex-shrink-0" />
                                  <p>
                                    Niezbędne pliki cookie są zawsze włączone, ponieważ są konieczne do prawidłowego działania strony.
                                  </p>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        )
                    )}
                  </AnimatePresence>
                </div>

                {/* Quick actions */}
                <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={handleAcceptAll}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors font-medium"
                  >
                    <FaCheck className="text-xs" />
                    Zaakceptuj wszystkie
                  </button>
                  <button
                    onClick={handleRejectAll}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                  >
                    <FaRegTimesCircle className="text-xs" />
                    Odrzuć opcjonalne
                  </button>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 
                             rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium"
                  >
                    Anuluj
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSave(settings)}
                    className="px-6 py-2.5 bg-gradient-to-r from-amber-500 
                             to-amber-600 text-white rounded-lg 
                             hover:from-amber-600 hover:to-amber-700 
                             transition-colors shadow-md shadow-amber-500/10
                             focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 font-medium"
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
