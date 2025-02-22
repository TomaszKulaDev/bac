"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaUserLock,
  FaDatabase,
  FaEnvelope,
} from "react-icons/fa";

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "1. Wprowadzenie",
      content:
        "Niniejsza Polityka Prywatności szczegółowo opisuje zasady, na jakich przetwarzamy dane osobowe użytkowników naszej aplikacji. Zależy nam na ochronie prywatności naszych użytkowników i zapewnieniu, że ich dane są przetwarzane zgodnie z obowiązującymi przepisami prawa, w tym z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych (RODO).",
    },
    {
      title: "2. Zbierane dane",
      content: [
        "Adres e-mail: Wykorzystywany do celów rejestracji i komunikacji z użytkownikiem.",
        "Imię i nazwisko: Używane do personalizacji konta użytkownika.",
        "Dane profilowe z kont Google i Facebook: Zbierane tylko w przypadku, gdy użytkownik zdecyduje się na logowanie za pomocą tych usług.",
      ],
    },
    {
      title: "3. Ochrona danych",
      content:
        "Stosujemy zaawansowane środki techniczne i organizacyjne, aby zapewnić bezpieczeństwo danych osobowych naszych użytkowników. Dane są przechowywane na zabezpieczonych serwerach, a dostęp do nich mają wyłącznie upoważnione osoby, które są zobowiązane do zachowania poufności. Regularnie przeprowadzamy audyty bezpieczeństwa, aby zapewnić, że nasze systemy są odporne na nieautoryzowany dostęp, utratę lub zmianę danych.",
    },
    {
      title: "4. Usuwanie Danych",
      content: [
        "Użytkownicy mogą zażądać usunięcia swoich danych poprzez:",
        "Usunięcie aplikacji w ustawieniach Facebook",
        "Wysłanie prośby na adres privacy@baciata.pl",
        "Wypełnienie formularza na stronie /data-deletion",
        "Po otrzymaniu żądania usunięcia danych, rozpoczniemy proces w ciągu 24 godzin",
        "Status żądania można sprawdzić używając otrzymanego kodu potwierdzenia",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Nagłówek */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Polityka Prywatności
          </h1>
          <p className="text-sm text-gray-500">
            Ostatnia aktualizacja: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Wprowadzenie */}
        <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
          <p className="text-gray-600 text-sm leading-relaxed">
            Niniejszy dokument określa zasady przetwarzania i ochrony danych
            osobowych w serwisie Baciata.pl. Prosimy o uważne zapoznanie się z
            poniższymi warunkami przed rozpoczęciem korzystania z naszych usług.
          </p>
        </div>

        {/* Główna treść */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="divide-y divide-gray-200">
            {sections.map((section, index) => (
              <div
                key={index}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-lg font-medium text-gray-900 mb-3">
                  {section.title}
                </h2>
                {Array.isArray(section.content) ? (
                  <ul className="space-y-2">
                    {section.content.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-gray-600 text-sm leading-relaxed flex items-start"
                      >
                        <span className="text-amber-500 mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {section.content}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stopka */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            W przypadku pytań dotyczących polityki prywatności, prosimy o
            kontakt:{" "}
            <a
              href="mailto:privacy@baciata.pl"
              className="text-amber-600 hover:text-amber-700 transition-colors"
            >
              privacy@baciata.pl
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
