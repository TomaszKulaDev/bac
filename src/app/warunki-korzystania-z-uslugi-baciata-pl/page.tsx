"use client";
import React from "react";
import { motion } from "framer-motion";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1e3b] to-[#2a4a7f] text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-0.5 rounded-full mb-6 inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="bg-[#0a1e3b] px-8 py-3 rounded-full">
              <span className="text-white font-medium text-lg">Baciata.pl</span>
            </div>
          </motion.div>

          <h1 className="text-4xl font-bold mb-4">
            Warunki Korzystania z Usługi
          </h1>
          <p className="text-white/70">
            Ostatnia aktualizacja: {new Date().toLocaleDateString()}
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-8">
          {[
            {
              title: "1. Akceptacja warunków",
              content:
                "Korzystając z naszej aplikacji, użytkownik wyraża zgodę na przestrzeganie niniejszych Warunków Korzystania z Usługi. W przypadku braku akceptacji któregokolwiek z postanowień, prosimy o niekorzystanie z aplikacji.",
            },
            {
              title: "2. Opis usługi",
              content:
                "Nasza aplikacja oferuje użytkownikom możliwość [szczegółowy opis funkcjonalności aplikacji], co ma na celu zapewnienie najwyższej jakości doświadczeń użytkownika.",
            },
            {
              title: "3. Rejestracja",
              content:
                "Aby uzyskać pełny dostęp do funkcjonalności aplikacji, użytkownik jest zobowiązany do rejestracji i utworzenia konta. Proces rejestracji wymaga podania prawdziwych i aktualnych danych osobowych.",
            },
            {
              title: "4. Prywatność",
              content:
                "Ochrona danych osobowych użytkowników jest dla nas priorytetem. Dane te są przetwarzane zgodnie z naszą Polityką Prywatności, która jest integralną częścią niniejszych Warunków.",
            },
            {
              title: "5. Odpowiedzialność użytkownika",
              content:
                "Użytkownik ponosi pełną odpowiedzialność za wszelkie działania podejmowane w ramach swojego konta. W przypadku nieautoryzowanego użycia konta, użytkownik zobowiązany jest do niezwłocznego poinformowania nas o tym fakcie.",
            },
            {
              title: "6. Zmiany w warunkach",
              content:
                "Zastrzegamy sobie prawo do wprowadzania zmian w niniejszych Warunkach w dowolnym momencie. Wszelkie zmiany będą publikowane na naszej stronie internetowej i wchodzą w życie z dniem ich publikacji.",
            },
            {
              title: "7. Kontakt",
              content:
                "W przypadku jakichkolwiek pytań lub wątpliwości dotyczących niniejszych Warunków Korzystania z Usługi, prosimy o kontakt pod adresem: terms@baciata.pl",
            },
          ].map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10
                hover:shadow-xl hover:shadow-yellow-400/10 transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-3">{section.title}</h2>
                  <p className="text-white/80">{section.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
