"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaUserLock,
  FaDatabase,
  FaEnvelope,
} from "react-icons/fa";

const sections = [
  {
    icon: FaShieldAlt,
    title: "Wprowadzenie",
    content:
      "Niniejsza Polityka Prywatności szczegółowo opisuje zasady, na jakich przetwarzamy dane osobowe użytkowników naszej aplikacji. Zależy nam na ochronie prywatności naszych użytkowników i zapewnieniu, że ich dane są przetwarzane zgodnie z obowiązującymi przepisami prawa, w tym z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych (RODO).",
  },
  {
    icon: FaDatabase,
    title: "Zbierane dane",
    content: [
      "Adres e-mail: Wykorzystywany do celów rejestracji i komunikacji z użytkownikiem.",
      "Imię i nazwisko: Używane do personalizacji konta użytkownika.",
      "Dane profilowe z kont Google i Facebook: Zbierane tylko w przypadku, gdy użytkownik zdecyduje się na logowanie za pomocą tych usług.",
    ],
  },
  {
    icon: FaUserLock,
    title: "Ochrona danych",
    content:
      "Stosujemy zaawansowane środki techniczne i organizacyjne, aby zapewnić bezpieczeństwo danych osobowych naszych użytkowników. Dane są przechowywane na zabezpieczonych serwerach, a dostęp do nich mają wyłącznie upoważnione osoby, które są zobowiązane do zachowania poufności. Regularnie przeprowadzamy audyty bezpieczeństwa, aby zapewnić, że nasze systemy są odporne na nieautoryzowany dostęp, utratę lub zmianę danych.",
  },
  {
    icon: FaEnvelope,
    title: "Usuwanie Danych",
    content: [
      "Użytkownicy mogą zażądać usunięcia swoich danych poprzez:",
      "Usunięcie aplikacji w ustawieniach Facebook",
      "Wysłanie prośby na adres privacy@baciata.pl",
      "Wypełnienie formularza na stronie /data-deletion",
      "Po otrzymaniu żądania usunięcia danych, rozpoczniemy proces w ciągu 24 godzin",
      "Status żądania można sprawdzić używając otrzymanego kodu potwierdzenia",
    ],
  },
  // ... więcej sekcji
];

export default function PrivacyPolicy() {
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

          <h1 className="text-4xl font-bold mb-4">Polityka Prywatności</h1>
          <p className="text-white/70">
            Ostatnia aktualizacja: {new Date().toLocaleDateString()}
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10
                hover:shadow-xl hover:shadow-yellow-400/10 transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <motion.div
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-0.5 rounded-xl"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="bg-[#0a1e3b]/90 p-2.5 rounded-xl backdrop-blur-sm">
                    <section.icon className="h-6 w-6 text-yellow-400" />
                  </div>
                </motion.div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-3">{section.title}</h2>
                  {Array.isArray(section.content) ? (
                    <ul className="space-y-2">
                      {section.content.map((item, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + idx * 0.1 }}
                          className="flex items-center text-white/80"
                        >
                          <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-white/80">{section.content}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div
            className="inline-flex items-center space-x-2 text-white/60 bg-white/5 
            backdrop-blur-sm px-4 py-2 rounded-full border border-white/10"
          >
            <FaEnvelope className="h-4 w-4" />
            <span>privacy@baciata.pl</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
