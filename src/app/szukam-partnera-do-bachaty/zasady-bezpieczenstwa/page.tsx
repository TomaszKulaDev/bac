"use client";

import {
  FaShieldAlt,
  FaUserShield,
  FaLock,
  FaExclamationCircle,
} from "react-icons/fa";
import { PageHeader } from "../components/PageHeader";

export default function SafetyRulesPage() {
  const safetyRules = [
    {
      icon: FaShieldAlt,
      title: "Bezpieczne spotkania",
      description:
        "Podstawowe zasady bezpieczeństwa podczas spotkań z partnerami tanecznymi",
      rules: [
        "Pierwsze spotkanie zawsze w miejscu publicznym, najlepiej w szkole tanecznej podczas zajęć",
        "Poinformuj zaufaną osobę o planowanym spotkaniu",
        "Zachowaj czujność i zdrowy rozsądek",
        "Unikaj spotkań w miejscach prywatnych",
        "Miej przy sobie naładowany telefon",
      ],
    },
    {
      icon: FaUserShield,
      title: "Ochrona danych",
      description: "Jak chronić swoje dane osobowe i zachować prywatność",
      rules: [
        "Nie podawaj prywatnych danych osobowych",
        "Chroń swoje dane kontaktowe",
        "Używaj bezpiecznych metod komunikacji",
        "Zgłaszaj podejrzane zachowania",
        "Regularnie zmieniaj hasło do konta",
        "Unikaj podejrzanych linków i załączników",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-16">
        <PageHeader title="Zasady Bezpieczeństwa" />

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {safetyRules.map((category, index) => (
            <div
              key={index}
              className="bg-white/95 backdrop-blur-sm rounded-xl p-8 
                       shadow-lg shadow-amber-500/10 border border-amber-500/10
                       hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 
                              to-red-500 flex items-center justify-center"
                >
                  <category.icon className="text-2xl text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">{category.title}</h2>
                  <p className="text-amber-700 text-sm">
                    {category.description}
                  </p>
                </div>
              </div>
              <ul className="space-y-4 mt-6">
                {category.rules.map((rule, ruleIndex) => (
                  <li key={ruleIndex} className="flex items-start gap-3">
                    <FaExclamationCircle className="text-amber-500 mt-1 flex-shrink-0" />
                    <p className="text-gray-700">{rule}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 
                     rounded-xl shadow-lg mb-16 border border-amber-200"
        >
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-12 h-12 rounded-full bg-red-500 
                         flex items-center justify-center"
            >
              <FaLock className="text-2xl text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-red-600">Zgłoś problem</h2>
              <p className="text-red-700 text-sm">
                Twoje bezpieczeństwo jest dla nas priorytetem
              </p>
            </div>
          </div>
          <p className="mb-6 text-gray-700">
            Jeśli zauważyłeś niepokojące zachowanie lub chcesz zgłosić
            naruszenie zasad, skontaktuj się z nami natychmiast.
          </p>
          <button
            className="bg-gradient-to-r from-amber-500 to-red-500 
                     text-white px-8 py-3 rounded-lg hover:from-amber-600 
                     hover:to-red-600 transition-all duration-300 
                     transform hover:scale-[1.02] flex items-center gap-2"
          >
            <FaExclamationCircle />
            Zgłoś naruszenie
          </button>
        </div>
      </div>
    </div>
  );
}
