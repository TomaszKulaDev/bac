"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaUserLock,
  FaDatabase,
  FaEnvelope,
  FaCookieBite,
  FaUserFriends,
  FaGlobe,
  FaExclamationTriangle,
  FaRegCalendarAlt,
} from "react-icons/fa";

export default function PrivacyPolicy() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const sections = [
    {
      title: "1. Wprowadzenie",
      icon: <FaShieldAlt className="text-amber-500" />,
      content:
        "Niniejsza Polityka Prywatności szczegółowo opisuje zasady, na jakich przetwarzamy dane osobowe użytkowników naszej aplikacji. Zależy nam na ochronie prywatności naszych użytkowników i zapewnieniu, że ich dane są przetwarzane zgodnie z obowiązującymi przepisami prawa, w tym z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych (RODO).",
    },
    {
      title: "2. Administrator danych",
      icon: <FaUserLock className="text-amber-500" />,
      content: [
        "Administratorem Twoich danych osobowych jest Baciata.pl z siedzibą w Warszawie.",
        "Kontakt w sprawach związanych z przetwarzaniem danych osobowych: privacy@baciata.pl",
        "Wyznaczyliśmy Inspektora Ochrony Danych, z którym możesz się skontaktować w sprawach ochrony swoich danych osobowych pod adresem e-mail: iod@baciata.pl",
      ],
    },
    {
      title: "3. Zbierane dane",
      icon: <FaDatabase className="text-amber-500" />,
      content: [
        "Adres e-mail: Wykorzystywany do celów rejestracji i komunikacji z użytkownikiem.",
        "Imię i nazwisko: Używane do personalizacji konta użytkownika.",
        "Dane profilowe z kont Google i Facebook: Zbierane tylko w przypadku, gdy użytkownik zdecyduje się na logowanie za pomocą tych usług.",
        "Informacje o urządzeniu: Typ urządzenia, system operacyjny, przeglądarka internetowa.",
        "Dane o aktywności: Informacje o sposobie korzystania z naszych usług, w tym czas spędzony na stronie, odwiedzone podstrony.",
      ],
    },
    {
      title: "4. Cele przetwarzania danych",
      icon: <FaGlobe className="text-amber-500" />,
      content: [
        "Świadczenie usług i realizacja umowy: Przetwarzamy Twoje dane, aby umożliwić Ci korzystanie z naszych usług.",
        "Komunikacja: Używamy Twoich danych kontaktowych, aby informować Cię o zmianach w naszych usługach, odpowiadać na zapytania i udzielać wsparcia.",
        "Poprawa jakości usług: Analizujemy dane o sposobie korzystania z naszych usług, aby je ulepszać i dostosowywać do potrzeb użytkowników.",
        "Marketing: Za Twoją zgodą, możemy przesyłać Ci informacje o naszych usługach, promocjach i wydarzeniach.",
      ],
    },
    {
      title: "5. Podstawy prawne przetwarzania",
      icon: <FaExclamationTriangle className="text-amber-500" />,
      content: [
        "Wykonanie umowy (art. 6 ust. 1 lit. b RODO): Przetwarzanie jest niezbędne do wykonania umowy, której jesteś stroną.",
        "Zgoda (art. 6 ust. 1 lit. a RODO): W niektórych przypadkach przetwarzamy Twoje dane na podstawie udzielonej przez Ciebie zgody.",
        "Prawnie uzasadniony interes (art. 6 ust. 1 lit. f RODO): Przetwarzanie jest niezbędne do celów wynikających z prawnie uzasadnionych interesów realizowanych przez administratora.",
        "Obowiązek prawny (art. 6 ust. 1 lit. c RODO): Przetwarzanie jest niezbędne do wypełnienia obowiązku prawnego ciążącego na administratorze.",
      ],
    },
    {
      title: "6. Ochrona danych",
      icon: <FaUserLock className="text-amber-500" />,
      content:
        "Stosujemy zaawansowane środki techniczne i organizacyjne, aby zapewnić bezpieczeństwo danych osobowych naszych użytkowników. Dane są przechowywane na zabezpieczonych serwerach, a dostęp do nich mają wyłącznie upoważnione osoby, które są zobowiązane do zachowania poufności. Regularnie przeprowadzamy audyty bezpieczeństwa, aby zapewnić, że nasze systemy są odporne na nieautoryzowany dostęp, utratę lub zmianę danych.",
    },
    {
      title: "7. Udostępnianie danych",
      icon: <FaUserFriends className="text-amber-500" />,
      content: [
        "Dostawcy usług: Możemy udostępniać Twoje dane zaufanym partnerom, którzy świadczą usługi w naszym imieniu (np. hosting, analityka).",
        "Podmioty powiązane: Możemy udostępniać dane w ramach naszej grupy spółek, jeśli jest to niezbędne do świadczenia usług.",
        "Wymogi prawne: Możemy udostępnić Twoje dane, jeśli jest to wymagane przez prawo lub w odpowiedzi na ważny proces prawny.",
        "Zgoda użytkownika: Możemy udostępniać Twoje dane za Twoją wyraźną zgodą.",
      ],
    },
    {
      title: "8. Pliki cookies",
      icon: <FaCookieBite className="text-amber-500" />,
      content: [
        "Używamy plików cookies i podobnych technologii, aby poprawić jakość naszych usług i doświadczenie użytkownika.",
        "Cookies niezbędne: Konieczne do prawidłowego funkcjonowania strony.",
        "Cookies analityczne: Pomagają nam zrozumieć, jak użytkownicy korzystają z naszej strony.",
        "Cookies marketingowe: Używane do wyświetlania spersonalizowanych reklam.",
        "Możesz zarządzać ustawieniami cookies w swojej przeglądarce lub za pomocą naszego narzędzia do zarządzania zgodami.",
      ],
    },
    {
      title: "9. Okres przechowywania danych",
      icon: <FaRegCalendarAlt className="text-amber-500" />,
      content: [
        "Przechowujemy Twoje dane osobowe tylko tak długo, jak jest to niezbędne do celów, dla których zostały zebrane.",
        "Dane związane z kontem użytkownika: Przechowywane do momentu usunięcia konta.",
        "Dane transakcyjne: Przechowywane zgodnie z wymogami prawa podatkowego i księgowego (zazwyczaj 5 lat).",
        "Dane marketingowe: Przechowywane do momentu wycofania zgody.",
      ],
    },
    {
      title: "10. Twoje prawa",
      icon: <FaShieldAlt className="text-amber-500" />,
      content: [
        "Prawo dostępu do danych: Masz prawo uzyskać informacje o tym, jakie dane na Twój temat przetwarzamy.",
        "Prawo do sprostowania: Możesz żądać poprawienia nieprawidłowych danych.",
        "Prawo do usunięcia: W określonych okolicznościach możesz żądać usunięcia swoich danych.",
        "Prawo do ograniczenia przetwarzania: Możesz żądać ograniczenia przetwarzania Twoich danych.",
        "Prawo do przenoszenia danych: Możesz otrzymać swoje dane w ustrukturyzowanym, powszechnie używanym formacie.",
        "Prawo do sprzeciwu: Możesz sprzeciwić się przetwarzaniu Twoich danych w określonych celach.",
      ],
    },
    {
      title: "11. Usuwanie Danych",
      icon: <FaDatabase className="text-amber-500" />,
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
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Polityka Prywatności
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
              <FaShieldAlt className="text-amber-500 text-xl" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              Ochrona Twoich danych jest naszym priorytetem
            </h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Niniejszy dokument określa zasady przetwarzania i ochrony danych
            osobowych w serwisie Baciata.pl. Prosimy o uważne zapoznanie się z
            poniższymi warunkami przed rozpoczęciem korzystania z naszych usług.
            Korzystając z naszej strony, akceptujesz praktyki opisane w
            niniejszej Polityce Prywatności.
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
              Masz pytania dotyczące swoich danych?
            </h3>
            <p className="text-sm text-gray-600 max-w-lg mx-auto">
              Jeśli masz jakiekolwiek pytania dotyczące naszej polityki
              prywatności lub sposobu, w jaki przetwarzamy Twoje dane,
              skontaktuj się z nami pod adresem:
            </p>
            <a
              href="mailto:privacy@baciata.pl"
              className="mt-2 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md transition-colors duration-200 font-medium text-sm"
            >
              <FaEnvelope />
              privacy@baciata.pl
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
