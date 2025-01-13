"use client";

import { useState } from "react";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";
import { PageHeader } from "../components/PageHeader";
import Link from "next/link";

export default function FAQPage() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqItems = [
    {
      question: "Czy muszę mieć doświadczenie w tańcu?",
      answer:
        "Nie, nie musisz mieć doświadczenia. Na naszej platformie znajdziesz partnerów na każdym poziomie zaawansowania, od początkujących po zaawansowanych tancerzy. Możesz określić swój poziom i szukać osób o podobnych umiejętnościach.",
    },
    {
      question: "Jak działa system dobierania partnerów?",
      answer:
        "System uwzględnia Twoje preferencje dotyczące stylu tańca, poziomu zaawansowania, lokalizacji i dostępności czasowej. Możesz używać filtrów, aby znaleźć idealnego partnera do tańca w swojej okolicy.",
    },
    {
      question: "Czy korzystanie z serwisu jest płatne?",
      answer:
        "Podstawowe funkcje serwisu są całkowicie bezpłatne. Możesz przeglądać profile, kontaktować się z innymi tancerzami i dodawać własne ogłoszenia. Oferujemy również konto premium z dodatkowymi możliwościami dla najbardziej aktywnych użytkowników.",
    },
    {
      question: "Jak mogę zwiększyć swoje szanse na znalezienie partnera?",
      answer:
        "Uzupełnij dokładnie swój profil, dodaj aktualne zdjęcie i szczegółowo opisz swoje doświadczenie oraz oczekiwania. Bądź aktywny w społeczności, odpowiadaj na wiadomości i regularnie aktualizuj swoją dostępność.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-16">
        <PageHeader title="Często Zadawane Pytania" />

        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-white/95 backdrop-blur-sm rounded-xl 
                       shadow-lg shadow-amber-500/10 border border-amber-500/10 
                       hover:shadow-xl transition-all duration-300"
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between"
                onClick={() =>
                  setOpenQuestion(openQuestion === index ? null : index)
                }
              >
                <div className="flex items-center gap-3">
                  <FaQuestionCircle className="text-amber-500 flex-shrink-0" />
                  <span className="font-semibold text-gray-800">
                    {item.question}
                  </span>
                </div>
                <FaChevronDown
                  className={`transform transition-transform duration-300 
                           text-amber-500 ${
                             openQuestion === index ? "rotate-180" : ""
                           }`}
                />
              </button>
              {openQuestion === index && (
                <div className="px-6 py-4 bg-amber-50/50">
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Nie znalazłeś odpowiedzi?</h2>
          <p className="mb-6 text-gray-600">
            Skontaktuj się z nami, a chętnie pomożemy!
          </p>
          <Link href="/szukam-partnera-do-bachaty">
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
