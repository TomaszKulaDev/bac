"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  FaHandshake,
  FaClipboardList,
  FaUserPlus,
  FaShieldAlt,
  FaUserLock,
  FaEdit,
  FaEnvelope,
  FaExclamationTriangle,
  FaRegCalendarAlt,
  FaGavel,
  FaBalanceScale,
  FaFileContract,
  FaMusic,
} from "react-icons/fa";

export default function TermsOfService() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const sections = [
    {
      title: "1. Akceptacja warunków",
      icon: <FaHandshake className="text-amber-500" />,
      content:
        "Korzystając z naszej aplikacji, użytkownik wyraża zgodę na przestrzeganie niniejszych Warunków Korzystania z Usługi. W przypadku braku akceptacji któregokolwiek z postanowień, prosimy o niekorzystanie z aplikacji. Niniejsze warunki stanowią prawnie wiążącą umowę pomiędzy użytkownikiem a Baciata.pl dotyczącą korzystania z naszych usług.",
    },
    {
      title: "2. Opis usługi",
      icon: <FaClipboardList className="text-amber-500" />,
      content: [
        "Baciata.pl to platforma internetowa poświęcona tańcowi bachata, oferująca użytkownikom:",
        "Dostęp do informacji o wydarzeniach tanecznych, kursach i warsztatach bachaty w Polsce i za granicą",
        "Możliwość przeglądania i publikowania treści związanych z bachatą (artykuły, zdjęcia, filmy)",
        "Funkcje społecznościowe umożliwiające interakcję z innymi miłośnikami bachaty",
        "Dostęp do materiałów edukacyjnych związanych z nauką bachaty",
        "Możliwość zapisywania się na wydarzenia i kursy poprzez platformę",
      ],
    },
    {
      title: "3. Rejestracja i konto użytkownika",
      icon: <FaUserPlus className="text-amber-500" />,
      content: [
        "Aby uzyskać pełny dostęp do funkcjonalności platformy, użytkownik jest zobowiązany do rejestracji i utworzenia konta.",
        "Proces rejestracji wymaga podania prawdziwych i aktualnych danych osobowych.",
        "Użytkownik jest odpowiedzialny za zachowanie poufności swoich danych logowania.",
        "Każdy użytkownik może posiadać tylko jedno konto osobiste.",
        "Zastrzegamy sobie prawo do usunięcia lub zawieszenia konta użytkownika w przypadku naruszenia niniejszych Warunków.",
      ],
    },
    {
      title: "4. Prywatność i ochrona danych",
      icon: <FaShieldAlt className="text-amber-500" />,
      content: [
        "Ochrona danych osobowych użytkowników jest dla nas priorytetem.",
        "Dane użytkowników są przetwarzane zgodnie z naszą Polityką Prywatności, która jest integralną częścią niniejszych Warunków.",
        "Użytkownik wyraża zgodę na przetwarzanie swoich danych osobowych w zakresie niezbędnym do świadczenia usług.",
        "Szczegółowe informacje dotyczące przetwarzania danych osobowych znajdują się w Polityce Prywatności dostępnej na naszej stronie.",
      ],
    },
    {
      title: "5. Odpowiedzialność użytkownika",
      icon: <FaUserLock className="text-amber-500" />,
      content: [
        "Użytkownik ponosi pełną odpowiedzialność za wszelkie działania podejmowane w ramach swojego konta.",
        "Zabrania się publikowania treści naruszających prawo, obraźliwych, dyskryminujących lub naruszających prawa osób trzecich.",
        "Użytkownik zobowiązuje się do niepodejmowania działań mogących zakłócić prawidłowe funkcjonowanie platformy.",
        "W przypadku nieautoryzowanego użycia konta, użytkownik zobowiązany jest do niezwłocznego poinformowania nas o tym fakcie.",
        "Użytkownik ponosi odpowiedzialność za wszelkie treści publikowane za pośrednictwem swojego konta.",
      ],
    },
    {
      title: "6. Prawa własności intelektualnej",
      icon: <FaBalanceScale className="text-amber-500" />,
      content: [
        "Wszelkie prawa własności intelektualnej związane z platformą Baciata.pl, w tym znaki towarowe, logo, grafiki, teksty i oprogramowanie, są własnością Baciata.pl lub jej licencjodawców.",
        "Użytkownik może korzystać z treści dostępnych na platformie wyłącznie w zakresie dozwolonego użytku osobistego.",
        "Publikując treści na platformie, użytkownik zachowuje do nich prawa autorskie, jednocześnie udzielając Baciata.pl niewyłącznej, bezpłatnej licencji na ich wykorzystanie w celu świadczenia usług.",
        "Zabrania się kopiowania, modyfikowania i rozpowszechniania treści dostępnych na platformie bez uzyskania zgody właściciela praw.",
      ],
    },
    {
      title: "7. Ograniczenia odpowiedzialności",
      icon: <FaExclamationTriangle className="text-amber-500" />,
      content: [
        "Baciata.pl dokłada wszelkich starań, aby zapewnić prawidłowe funkcjonowanie platformy, jednak nie gwarantuje, że usługi będą świadczone nieprzerwanie i bez błędów.",
        "Nie ponosimy odpowiedzialności za szkody wynikające z korzystania lub niemożności korzystania z platformy.",
        "Nie ponosimy odpowiedzialności za treści publikowane przez użytkowników, jednak zastrzegamy sobie prawo do ich moderowania.",
        "Nie ponosimy odpowiedzialności za działania podejmowane przez użytkowników poza platformą, nawet jeśli zostały zainicjowane za jej pośrednictwem.",
      ],
    },
    {
      title: "8. Zmiany w warunkach",
      icon: <FaEdit className="text-amber-500" />,
      content:
        "Zastrzegamy sobie prawo do wprowadzania zmian w niniejszych Warunkach w dowolnym momencie. Wszelkie zmiany będą publikowane na naszej stronie internetowej i wchodzą w życie z dniem ich publikacji. O istotnych zmianach w Warunkach użytkownicy będą informowani za pośrednictwem poczty elektronicznej lub powiadomień na platformie. Dalsze korzystanie z platformy po wprowadzeniu zmian oznacza ich akceptację przez użytkownika.",
    },
    {
      title: "9. Rozwiązywanie sporów",
      icon: <FaGavel className="text-amber-500" />,
      content: [
        "Wszelkie spory wynikające z korzystania z platformy Baciata.pl będą rozstrzygane w pierwszej kolejności na drodze polubownej.",
        "W przypadku braku możliwości polubownego rozwiązania sporu, będzie on rozstrzygany przez sąd właściwy dla siedziby Baciata.pl.",
        "Niniejsze Warunki podlegają prawu polskiemu.",
        "W sprawach nieuregulowanych w niniejszych Warunkach zastosowanie mają odpowiednie przepisy prawa polskiego.",
      ],
    },
    {
      title: "10. Postanowienia końcowe",
      icon: <FaFileContract className="text-amber-500" />,
      content: [
        "Jeśli którekolwiek z postanowień niniejszych Warunków zostanie uznane za nieważne lub niewykonalne, pozostałe postanowienia pozostają w mocy.",
        "Niniejsze Warunki stanowią całość porozumienia pomiędzy użytkownikiem a Baciata.pl w zakresie korzystania z platformy.",
        "Brak egzekwowania któregokolwiek z postanowień niniejszych Warunków nie oznacza rezygnacji z prawa do jego egzekwowania w przyszłości.",
      ],
    },
    {
      title: "11. Obowiązek tańca",
      icon: <FaMusic className="text-amber-500" />,
      content:
        "Każdy użytkownik platformy zobowiązuje się do zatańczenia przynajmniej jednej Baciaty sensual podczas imprezy tanecznej z właścicielami platformy. W przypadku ich nieobecności na wydarzeniu, taniec ten ma przejąć moderator bądź administrator. Dodatkowo, użytkownik zobowiązuje się do zachowania pozytywnego nastawienia podczas tańca. W wypadku kiedy użytkownik nie będzie umiał poprowadzic falki albo jej wykonać jest zobowiązany zaprosić całą administrację strony do baru i postawienia kolejki nie mniej niz 25ml dowolnego płynu na osobe. W każdym innym wypadku konto zostanie zawieszone na 30 dni. Edycja: Powyższy punkt jest żartem i nie stanowi wiążącego zobowiązania.",
    },
    {
      title: "12. Kontakt",
      icon: <FaEnvelope className="text-amber-500" />,
      content:
        "W przypadku jakichkolwiek pytań lub wątpliwości dotyczących niniejszych Warunków Korzystania z Usługi, prosimy o kontakt pod adresem: terms@baciata.pl. Dołożymy wszelkich starań, aby udzielić odpowiedzi na Państwa pytania w możliwie najkrótszym czasie.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Nagłówek */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Warunki Korzystania z Usługi
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <FaRegCalendarAlt className="text-amber-500" />
            <p>Ostatnia aktualizacja: {new Date().toLocaleDateString()}</p>
          </div>
        </motion.div>

        {/* Wprowadzenie */}
        <motion.div
          className="bg-white shadow-md rounded-lg p-6 mb-8 border border-gray-100"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-amber-50 p-3 rounded-full">
              <FaFileContract className="text-amber-500 text-xl" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              Umowa między Tobą a Baciata.pl
            </h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Niniejszy dokument określa zasady korzystania z serwisu Baciata.pl.
            Prosimy o uważne zapoznanie się z poniższymi warunkami przed
            rozpoczęciem korzystania z naszych usług. Korzystanie z serwisu
            oznacza akceptację tych warunków. Warunki te tworzą prawnie wiążącą
            umowę między Tobą a Baciata.pl, regulującą Twoje korzystanie z
            naszej platformy.
          </p>
        </motion.div>

        {/* Główna treść */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100">
          <div className="divide-y divide-gray-200">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                className="p-6 hover:bg-gray-50 transition-colors"
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-amber-50 p-2 rounded-full">
                    {section.icon}
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {section.title}
                  </h2>
                </div>
                {Array.isArray(section.content) ? (
                  <ul className="space-y-3 pl-10">
                    {section.content.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-gray-600 text-sm leading-relaxed flex items-start"
                      >
                        <span className="text-amber-500 mr-2 flex-shrink-0">
                          •
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600 text-sm leading-relaxed pl-10">
                    {section.content}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stopka */}
        <motion.div
          className="mt-8 text-center bg-white p-6 rounded-lg shadow-md border border-gray-100"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex flex-col items-center gap-3">
            <FaEnvelope className="text-amber-500 text-xl" />
            <h3 className="text-lg font-semibold text-gray-800">
              Masz pytania dotyczące warunków?
            </h3>
            <p className="text-sm text-gray-600 max-w-lg mx-auto">
              Jeśli masz jakiekolwiek pytania dotyczące warunków korzystania z
              usługi lub potrzebujesz wyjaśnień, skontaktuj się z nami pod
              adresem:
            </p>
            <a
              href="mailto:terms@baciata.pl"
              className="mt-2 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md transition-colors duration-200 font-medium text-sm"
            >
              <FaEnvelope />
              terms@baciata.pl
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
