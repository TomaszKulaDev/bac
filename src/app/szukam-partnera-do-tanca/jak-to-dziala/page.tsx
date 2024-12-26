"use client";

import {
  FaSearch,
  FaUserPlus,
  FaComments,
  FaCheckCircle,
} from "react-icons/fa";
import { PageHeader } from "../components/PageHeader";
import Link from "next/link";

export default function HowItWorksPage() {
  const steps = [
    {
      icon: FaUserPlus,
      title: "Utwórz profil",
      description:
        "Zarejestruj się za darmo i stwórz swój profil tancerza. Dodaj zdjęcie i opisz swoje doświadczenie.",
      details: [
        "Wybierz style tańca, które Cię interesują",
        "Określ swój poziom zaawansowania",
        "Dodaj zdjęcie profilowe",
        "Opisz swoje doświadczenie i oczekiwania",
      ],
    },
    {
      icon: FaSearch,
      title: "Szukaj partnera",
      description:
        "Przeglądaj profile innych tancerzy. Używaj filtrów, aby znaleźć osoby o podobnym poziomie.",
      details: [
        "Filtruj według stylu tańca",
        "Wybierz preferowaną lokalizację",
        "Określ poziom zaawansowania",
        "Sprawdź dostępność czasową",
      ],
    },
    {
      icon: FaComments,
      title: "Nawiąż kontakt",
      description:
        "Napisz do wybranych osób. Umów się na próbne spotkanie taneczne.",
      details: [
        "Przedstaw się i opisz swoje cele",
        "Zaproponuj miejsce spotkania",
        "Ustal dogodny termin",
        "Wymień się doświadczeniami",
      ],
    },
    {
      icon: FaCheckCircle,
      title: "Trenuj razem",
      description:
        "Rozpocznij regularne treningi i rozwijaj swoje umiejętności taneczne.",
      details: [
        "Ustal regularny harmonogram",
        "Wybierzcie szkołę tańca",
        "Planujcie wspólne wydarzenia",
        "Rozwijajcie się razem",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-16">
        <PageHeader title="Jak to działa?" />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white/95 backdrop-blur-sm rounded-xl p-8 
                       shadow-lg shadow-amber-500/10 border border-amber-500/10 
                       hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 
                              to-red-500 flex items-center justify-center"
                >
                  <step.icon className="text-2xl text-white" />
                </div>
                <span className="text-amber-700 text-sm font-medium">
                  Krok {index + 1}
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600 mb-4">{step.description}</p>

              <ul className="space-y-2">
                {step.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                    <p className="text-gray-600 text-sm">{detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/szukam-partnera-do-tanca">
            <button
              className="bg-gradient-to-r from-amber-500 to-red-500 
                       text-white px-8 py-3 rounded-lg hover:from-amber-600 
                       hover:to-red-600 transition-all duration-300 
                       transform hover:scale-[1.02]"
            >
              Rozpocznij przygodę
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
