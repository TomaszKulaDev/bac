"use client";

import { useState } from "react";
import { FaEnvelope, FaCheck, FaSpinner } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

type Frequency = "daily" | "weekly" | "monthly";
type Category =
  | "wszystkie"
  | "wydarzenia"
  | "porady"
  | "muzyka"
  | "społeczność";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState<1 | 2>(1);
  const [frequency, setFrequency] = useState<Frequency>("weekly");
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([
    "wszystkie",
  ]);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      // Walidacja emaila
      if (!email.includes("@") || !email.includes(".")) {
        setStatus("error");
        setMessage("Proszę podać poprawny adres email.");
        return;
      }

      setStep(2);
      return;
    }

    setStatus("loading");

    try {
      // Tutaj dodaj logikę zapisu do newslettera
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Symulacja opóźnienia

      // Dane do wysłania na backend
      const newsletterData = {
        email,
        name: name || undefined,
        frequency,
        categories: selectedCategories.includes("wszystkie")
          ? ["wszystkie"]
          : selectedCategories,
      };

      console.log("Zapisano do newslettera:", newsletterData);

      setStatus("success");
      setMessage(
        "Dziękujemy za zapisanie się do newslettera! Na Twój adres email wysłaliśmy link potwierdzający."
      );

      // Reset formularza
      setEmail("");
      setName("");
      setStep(1);
      setFrequency("weekly");
      setSelectedCategories(["wszystkie"]);
      setIsExpanded(false);
    } catch (error) {
      setStatus("error");
      setMessage("Wystąpił błąd. Spróbuj ponownie później.");
    }
  };

  const toggleCategory = (category: Category) => {
    if (category === "wszystkie") {
      setSelectedCategories(["wszystkie"]);
      return;
    }

    // Jeśli "wszystkie" jest zaznaczone, usuń je
    const newCategories = selectedCategories.filter((c) => c !== "wszystkie");

    // Dodaj lub usuń wybraną kategorię
    if (newCategories.includes(category)) {
      const filtered = newCategories.filter((c) => c !== category);
      setSelectedCategories(filtered.length === 0 ? ["wszystkie"] : filtered);
    } else {
      setSelectedCategories([...newCategories, category]);
    }
  };

  return (
    <div className="bg-white rounded-none p-6 border border-gray-100 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-none bg-amber-100 flex items-center justify-center shadow-sm">
          <FaEnvelope className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Newsletter</h2>
          <p className="text-sm text-gray-600">Bądź na bieżąco</p>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-6">
        Zapisz się do newslettera, aby otrzymywać najnowsze artykuły i
        informacje o wydarzeniach.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Twój adres email"
                  required
                  className="w-full px-4 py-3 rounded-none bg-white border border-gray-200 
                           placeholder:text-gray-400 focus:outline-none focus:ring-2 
                           focus:ring-amber-500 focus:border-transparent shadow-sm"
                />
              </div>

              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-sm text-amber-600 hover:text-amber-700 transition-colors"
                >
                  {isExpanded ? "Ukryj opcje" : "Więcej opcji"}
                </button>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 overflow-hidden"
                  >
                    <div className="relative">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Twoje imię (opcjonalnie)"
                        className="w-full px-4 py-3 rounded-none bg-white border border-gray-200 
                                 placeholder:text-gray-400 focus:outline-none focus:ring-2 
                                 focus:ring-amber-500 focus:border-transparent shadow-sm"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                className="w-full px-4 py-3 bg-amber-600 text-white font-medium 
                         rounded-none transition-all hover:bg-amber-700 
                         focus:outline-none focus:ring-2 focus:ring-amber-500 
                         focus:ring-offset-2 shadow-sm"
              >
                Kontynuuj
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Częstotliwość
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFrequency("daily")}
                    className={`py-2 text-sm font-medium rounded-none transition-colors ${
                      frequency === "daily"
                        ? "bg-amber-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Codziennie
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency("weekly")}
                    className={`py-2 text-sm font-medium rounded-none transition-colors ${
                      frequency === "weekly"
                        ? "bg-amber-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Co tydzień
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency("monthly")}
                    className={`py-2 text-sm font-medium rounded-none transition-colors ${
                      frequency === "monthly"
                        ? "bg-amber-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Co miesiąc
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategorie
                </label>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => toggleCategory("wszystkie")}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-none text-sm font-medium mr-2 mb-2 transition-colors ${
                      selectedCategories.includes("wszystkie")
                        ? "bg-amber-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {selectedCategories.includes("wszystkie") && (
                      <FaCheck className="w-3 h-3" />
                    )}
                    Wszystkie
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleCategory("wydarzenia")}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-none text-sm font-medium mr-2 mb-2 transition-colors ${
                      selectedCategories.includes("wydarzenia")
                        ? "bg-amber-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    disabled={selectedCategories.includes("wszystkie")}
                  >
                    {selectedCategories.includes("wydarzenia") && (
                      <FaCheck className="w-3 h-3" />
                    )}
                    Wydarzenia
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleCategory("porady")}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-none text-sm font-medium mr-2 mb-2 transition-colors ${
                      selectedCategories.includes("porady")
                        ? "bg-amber-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    disabled={selectedCategories.includes("wszystkie")}
                  >
                    {selectedCategories.includes("porady") && (
                      <FaCheck className="w-3 h-3" />
                    )}
                    Porady
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleCategory("muzyka")}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-none text-sm font-medium mr-2 mb-2 transition-colors ${
                      selectedCategories.includes("muzyka")
                        ? "bg-amber-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    disabled={selectedCategories.includes("wszystkie")}
                  >
                    {selectedCategories.includes("muzyka") && (
                      <FaCheck className="w-3 h-3" />
                    )}
                    Muzyka
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleCategory("społeczność")}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-none text-sm font-medium mr-2 mb-2 transition-colors ${
                      selectedCategories.includes("społeczność")
                        ? "bg-amber-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    disabled={selectedCategories.includes("wszystkie")}
                  >
                    {selectedCategories.includes("społeczność") && (
                      <FaCheck className="w-3 h-3" />
                    )}
                    Społeczność
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-medium 
                           rounded-none transition-all hover:bg-gray-50 
                           focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Wstecz
                </button>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex-1 px-4 py-3 bg-amber-600 text-white font-medium 
                           rounded-none transition-all hover:bg-amber-700 
                           focus:outline-none focus:ring-2 focus:ring-amber-500 
                           focus:ring-offset-2 disabled:opacity-50 
                           disabled:cursor-not-allowed shadow-sm"
                >
                  {status === "loading" ? (
                    <span className="flex items-center justify-center gap-2">
                      <FaSpinner className="w-4 h-4 animate-spin" />
                      Zapisywanie...
                    </span>
                  ) : (
                    "Zapisz się"
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      <AnimatePresence mode="wait">
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mt-4 p-3 rounded-none text-sm ${
              status === "success"
                ? "bg-green-50 text-green-800 border border-green-100"
                : "bg-red-50 text-red-800 border border-red-100"
            }`}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
