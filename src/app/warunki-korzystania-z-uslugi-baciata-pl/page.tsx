"use client";
import React from "react";
import { motion } from "framer-motion";

export default function TermsOfService() {
  const sections = [
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
    {
      title: "8. Obowiązek tańca",
      content:
        "Każdy użytkownik platformy zobowiązuje się do zatańczenia przynajmniej jednej Baciaty sensual podczas imprezy tanecznej z właścicielami platformy. W przypadku ich nieobecności na wydarzeniu, taniec ten ma przejąć moderator bądź administrator. Dodatkowo, użytkownik zobowiązuje się do zachowania pozytywnego nastawienia podczas tańca. W wypadku kiedy użytkownik nie będzie umiał poprowadzic falki albo jej wykonać jest zobowiązany zaprosić całą administrację strony do baru i postawienia kolejki nie mniej niz 25ml dowolnego płynu na osobe. W każdym innym wypadku konto zostanie zawieszone na 30 dni. Edycja: Powyższy punkt jest żartem i nie stanowi wiążącego zobowiązania.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Nagłówek */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Warunki Korzystania z Usługi
          </h1>
          <p className="text-sm text-gray-500">
            Ostatnia aktualizacja: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Wprowadzenie */}
        <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
          <p className="text-gray-600 text-sm leading-relaxed">
            Niniejszy dokument określa zasady korzystania z serwisu Baciata.pl.
            Prosimy o uważne zapoznanie się z poniższymi warunkami przed
            rozpoczęciem korzystania z naszych usług. Korzystanie z serwisu
            oznacza akceptację tych warunków.
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
                <p className="text-gray-600 text-sm leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stopka */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            W przypadku pytań dotyczących warunków korzystania z usługi, prosimy
            o kontakt:{" "}
            <a
              href="mailto:terms@baciata.pl"
              className="text-amber-600 hover:text-amber-700 transition-colors"
            >
              terms@baciata.pl
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
