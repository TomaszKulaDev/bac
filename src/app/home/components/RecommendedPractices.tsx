import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaChevronLeft,
  FaChevronRight,
  FaMapMarkerAlt,
  FaClock,
  FaUsers,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaMusic,
  FaHeart,
} from "react-icons/fa";

interface Practice {
  id: string;
  title: string;
  location: string;
  date: string;
  day: string;
  month: string;
  time: string;
  image: string;
  url: string;
  participants?: number;
  price?: string;
  danceStyles: Array<"sensual" | "kizomba" | "salsa">;
}

const recommendedPractices: Practice[] = [
  {
    id: "1",
    title: "Lemon Salsa - Praktis Bachaty",
    location: "Warszawa",
    date: "Piątek",
    day: "12",
    month: "MAJ",
    time: "19:00",
    image:
      "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    url: "/praktyki/warszawa-bachata-sredniozaawansowana",
    participants: 24,
    price: "25 zł",
    danceStyles: ["sensual"],
  },
  {
    id: "2",
    title: "Sabrosa - Salsa w Krakowie",
    location: "Kraków",
    date: "Sobota",
    day: "13",
    month: "MAJ",
    time: "20:00",
    image:
      "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    url: "/praktyki/krakow-social-dance",
    participants: 56,
    price: "30 zł",
    danceStyles: ["salsa"],
  },
  {
    id: "3",
    title: "Sun Salsa - Bachata praktis Tarnów",
    location: "Wrocław",
    date: "Niedziela",
    day: "14",
    month: "MAJ",
    time: "18:00",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    url: "/praktyki/wroclaw-bachata-sensual",
    participants: 18,
    price: "20 zł",
    danceStyles: ["sensual"],
  },
  {
    id: "4",
    title: "Open Practice - Debica",
    location: "Poznań",
    date: "Czwartek",
    day: "18",
    month: "MAJ",
    time: "19:30",
    image:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    url: "/praktyki/poznan-bachata-open",
    participants: 32,
    price: "15 zł",
    danceStyles: ["salsa", "kizomba"],
  },
  {
    id: "5",
    title: "Bachata Dominicana",
    location: "Gdańsk",
    date: "Sobota",
    day: "20",
    month: "MAJ",
    time: "19:00",
    image:
      "https://images.unsplash.com/photo-1524117074681-31bd4de22ad3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    url: "/praktyki/gdansk-bachata-dominicana",
    participants: 28,
    price: "25 zł",
    danceStyles: ["sensual"],
  },
  {
    id: "6",
    title: "Bachata Fusion",
    location: "Łódź",
    date: "Piątek",
    day: "26",
    month: "MAJ",
    time: "20:00",
    image:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    url: "/praktyki/lodz-bachata-fusion",
    participants: 42,
    price: "Wstęp wolny",
    danceStyles: ["sensual", "kizomba"],
  },
  {
    id: "7",
    title: "Warsztaty Bachaty",
    location: "Szczecin",
    date: "Sobota",
    day: "27",
    month: "MAJ",
    time: "16:00",
    image:
      "https://images.unsplash.com/photo-1547153760-18fc86324498?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    url: "/praktyki/szczecin-warsztaty-bachaty",
    participants: 35,
    price: "40 zł",
    danceStyles: ["sensual"],
  },
  {
    id: "8",
    title: "Bachata dla Początkujących",
    location: "Katowice",
    date: "Niedziela",
    day: "28",
    month: "MAJ",
    time: "17:00",
    image:
      "https://images.unsplash.com/photo-1566224425427-998683bb171e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    url: "/praktyki/katowice-bachata-poczatkujacy",
    participants: 20,
    price: "20 zł",
    danceStyles: ["sensual"],
  },
  {
    id: "9",
    title: "Bachata & Salsa Night",
    location: "Bydgoszcz",
    date: "Piątek",
    day: "2",
    month: "CZE",
    time: "21:00",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    url: "/praktyki/bydgoszcz-bachata-salsa-night",
    participants: 64,
    price: "35 zł",
    danceStyles: ["sensual", "salsa"],
  },
  {
    id: "10",
    title: "Bachata Masterclass",
    location: "Lublin",
    date: "Sobota",
    day: "3",
    month: "CZE",
    time: "14:00",
    image:
      "https://images.unsplash.com/photo-1535525153412-5a42439a210d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    url: "/praktyki/lublin-bachata-masterclass",
    participants: 30,
    price: "50 zł",
    danceStyles: ["sensual", "kizomba"],
  },
];

const RecommendedPractices: React.FC = () => {
  // Define all available months
  const months = [
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
  ];
  const [monthIndex, setMonthIndex] = useState(0);
  const [activeMonth, setActiveMonth] = useState(months[monthIndex]);

  // Rozdzielenie stanów dla przewijania kart i nawigacji miesiąca
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Function to navigate to previous month - uproszczona logika
  const previousMonth = () => {
    if (monthIndex > 0) {
      const newIndex = monthIndex - 1;
      setMonthIndex(newIndex);
      setActiveMonth(months[newIndex]);
    }
  };

  // Function to navigate to next month - uproszczona logika
  const nextMonth = () => {
    if (monthIndex < months.length - 1) {
      const newIndex = monthIndex + 1;
      setMonthIndex(newIndex);
      setActiveMonth(months[newIndex]);
    }
  };

  // Funkcja do przewijania dostosowana do szerokości ekranu
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = window.innerWidth < 640 ? window.innerWidth - 32 : 300;
      scrollContainerRef.current.scrollBy({
        left: -cardWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = window.innerWidth < 640 ? window.innerWidth - 32 : 300;
      scrollContainerRef.current.scrollBy({
        left: cardWidth,
        behavior: "smooth",
      });
    }
  };

  // Map month names to their abbreviations for filtering
  const monthAbbreviations: Record<string, string> = {
    Maj: "MAJ",
    Czerwiec: "CZE",
    Lipiec: "LIP",
    Sierpień: "SIE",
    Wrzesień: "WRZ",
    Październik: "PAŹ",
    Listopad: "LIS",
    Grudzień: "GRU",
  };

  // Filtrowanie wydarzeń na podstawie aktywnego miesiąca
  const filteredPractices = recommendedPractices.filter(
    (practice) => monthAbbreviations[activeMonth] === practice.month
  );

  // Zmodyfikowana funkcja obsługująca przewijanie
  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

      // Calculate current index based on scroll position and screen size
      const itemWidth = window.innerWidth < 640 ? window.innerWidth - 32 : 300;
      const newIndex = Math.round(scrollLeft / itemWidth);
      setCurrentIndex(Math.min(newIndex, filteredPractices.length - 1));
    }
  }, [
    filteredPractices.length,
    setCanScrollLeft,
    setCanScrollRight,
    setCurrentIndex,
  ]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check

      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, [handleScroll]);

  // Reset scroll position when month changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
      setCurrentIndex(0);
    }
  }, [activeMonth]);

  // Funkcja zwracająca kolor dla danego stylu tańca
  const getDanceStyleColor = (style: "sensual" | "kizomba" | "salsa") => {
    const styleColors = {
      sensual: "#FFD200", // żółty - główny kolor strony
      kizomba: "#3B82F6", // niebieski - kontrastujący
      salsa: "#F97316", // pomarańczowy - energetyczny
    };

    return styleColors[style];
  };

  // Funkcja zwracająca skróconą nazwę stylu tańca
  const getShortStyleName = (style: "sensual" | "kizomba" | "salsa") => {
    const styleNames = {
      sensual: "BACHATA",
      kizomba: "KIZO",
      salsa: "SALSA",
    };

    return styleNames[style];
  };

  return (
    <div className="bg-gray-50 min-h-[250px]">
      <div className="max-w-[1300px] mx-auto px-4 h-full flex flex-col">
        {/* Header section - uproszczony na mobile */}
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center">
            <div className="bg-[#ffd200] w-7 h-7 flex items-center justify-center mr-2 rounded-md shadow-sm">
              <FaCalendarAlt className="text-gray-900 w-3.5 h-3.5" />
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                PRAKTISY TANECZNE
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={previousMonth}
              disabled={monthIndex <= 0}
              className={`w-6 h-6 flex items-center justify-center transition-colors ${
                monthIndex > 0
                  ? "bg-white text-gray-700 hover:bg-gray-100 shadow-sm border border-gray-200"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
              aria-label="Poprzedni miesiąc"
            >
              <FaChevronLeft className="w-2.5 h-2.5" />
            </button>

            <button className="px-3 py-1 text-xs transition-colors bg-[#ffd200] text-gray-900 font-medium shadow-sm min-w-[60px] text-center">
              {activeMonth}
            </button>

            <button
              onClick={nextMonth}
              disabled={monthIndex >= months.length - 1}
              className={`w-6 h-6 flex items-center justify-center transition-colors ${
                monthIndex < months.length - 1
                  ? "bg-white text-gray-700 hover:bg-gray-100 shadow-sm border border-gray-200"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
              aria-label="Następny miesiąc"
            >
              <FaChevronRight className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>

        {/* Drugi wiersz z informacją o liczbie praktyk i linkiem "Zobacz wszystkie" */}
        <div className="flex items-center justify-between mb-2 mt-1">
          <div className="text-xs text-gray-500">
            <span>
              W {activeMonth} jest: {filteredPractices.length} wydarzeń
              {filteredPractices.length === 1
                ? "a"
                : filteredPractices.length > 1 && filteredPractices.length < 5
                ? "i"
                : ""}
            </span>
          </div>

          <Link
            href="/praktyki"
            className="text-xs font-medium text-gray-700 hover:text-gray-900 transition-colors flex items-center group bg-white px-2 py-0.5 shadow-sm border border-gray-200 hover:shadow"
          >
            <span>Zobacz wszystkie</span>
            <svg
              className="w-2.5 h-2.5 ml-1 transform group-hover:translate-x-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        <div className="relative flex-1">
          {/* Card navigation buttons - bardziej widoczne */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 z-10">
            <button
              onClick={scrollLeft}
              className="w-8 h-8 flex items-center justify-center transition-colors bg-white text-gray-700 hover:bg-gray-100 shadow-md border border-gray-200 rounded-full"
              aria-label="Przewiń w lewo"
            >
              <FaChevronLeft className="w-3 h-3" />
            </button>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 z-10">
            <button
              onClick={scrollRight}
              className="w-8 h-8 flex items-center justify-center transition-colors bg-white text-gray-700 hover:bg-gray-100 shadow-md border border-gray-200 rounded-full"
              aria-label="Przewiń w prawo"
            >
              <FaChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div
            ref={scrollContainerRef}
            className="overflow-x-auto h-full scroll-smooth snap-x snap-mandatory"
            onScroll={handleScroll}
            style={{
              scrollbarWidth: "none" /* Firefox */,
              msOverflowStyle: "none" /* IE and Edge */,
            }}
          >
            {/* CSS do ukrycia scrollbara */}
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {/* Zmodyfikowany układ kart - zwiększona wysokość */}
            <div className="flex space-x-3 pl-1 pr-4 h-full py-0">
              {filteredPractices.length === 0 ? (
                <div className="w-full flex items-center justify-center text-gray-500 text-sm py-10">
                  Brak praktyk w wybranym miesiącu
                </div>
              ) : (
                filteredPractices.map((practice, index) => (
                  <Link
                    key={practice.id}
                    href={practice.url}
                    className="w-[calc(100vw-48px)] sm:w-[300px] h-[170px] sm:h-[185px] flex-shrink-0 bg-white hover:shadow-lg transition-all duration-300 group overflow-hidden border border-gray-200 hover:border-gray-300 flex snap-center"
                    style={{
                      transform: `scale(${index === currentIndex ? 1.02 : 1})`,
                      transformOrigin: "center center",
                    }}
                  >
                    {/* Image section - data w prawym górnym rogu zarówno na mobile jak i desktop */}
                    <div className="w-[140px] sm:w-[120px] relative overflow-hidden">
                      <Image
                        src={practice.image}
                        alt={practice.title}
                        fill
                        sizes="(max-width: 640px) 140px, 120px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        priority={index < 2}
                      />
                      <div className="absolute top-0 left-0 m-2 px-2 py-0.5 bg-[#ffd200] text-xs font-bold text-gray-900">
                        {practice.date}
                      </div>

                      {/* Data w prawym górnym rogu (zarówno na mobile jak i desktop) */}
                      <div className="absolute top-0 right-0 m-2 flex flex-col items-center bg-gray-50 px-2 py-0.5 border border-gray-100 text-center min-w-[36px]">
                        <span className="text-[10px] text-gray-500 leading-none">
                          {practice.month}
                        </span>
                        <span className="text-sm font-bold text-gray-900 leading-none">
                          {practice.day}
                        </span>
                      </div>
                    </div>

                    {/* Content section - zwiększony padding bez zmiany line-height */}
                    <div className="flex-1 p-3 flex flex-col overflow-hidden">
                      {/* Tytuł - unchanged */}
                      <div className="mb-1">
                        <h3 className="font-bold text-gray-900 text-sm line-clamp-2">
                          {practice.title || "Brak tytułu"}
                        </h3>
                      </div>

                      {/* Tagi stylów tańca - unchanged */}
                      <div className="mb-2">
                        {practice.danceStyles.map((style, idx) => (
                          <div
                            key={idx}
                            className="text-xs font-medium px-2 py-0.5 text-white inline-block"
                            style={{
                              backgroundColor: getDanceStyleColor(style),
                            }}
                          >
                            {getShortStyleName(style)}
                          </div>
                        ))}
                      </div>

                      {/* Informacje o praktyce - usunięta data z sekcji informacji na desktop */}
                      <div className="space-y-1.5 flex-1 text-xs">
                        <div className="flex items-center text-gray-600">
                          <FaClock className="w-3 h-3 text-[#ffd200] mr-1.5 flex-shrink-0" />
                          <span className="font-medium">{practice.time}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FaMapMarkerAlt className="w-3 h-3 text-[#ffd200] mr-1.5 flex-shrink-0" />
                          <span className="truncate">{practice.location}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FaMoneyBillWave className="w-3 h-3 text-[#ffd200] mr-1.5 flex-shrink-0" />
                          <span>{practice.price || "Cena nie podana"}</span>
                        </div>
                      </div>

                      {/* Uczestnicy i data - usunięta data z dolnej części */}
                      <div className="pt-1 pb-1.5 border-t border-gray-100 flex items-center justify-between mt-auto">
                        {/* Awatary użytkowników - bez zmian */}
                        <div className="flex -space-x-1.5 items-center">
                          {[...Array(2)].map((_, i) => (
                            <div
                              key={i}
                              className="w-6 h-6 rounded-full border-2 border-white overflow-hidden bg-gray-200"
                            >
                              <Image
                                src={`https://randomuser.me/api/portraits/${
                                  i % 2 === 0 ? "women" : "men"
                                }/${((index * 3 + i) % 30) + 1}.jpg`}
                                alt="Uczestnik"
                                width={24}
                                height={24}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                          {practice.participants &&
                            practice.participants > 2 && (
                              <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-medium text-gray-600">
                                +{practice.participants - 2}
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Scroll indicators - przesunięte niżej */}
          <div className="absolute bottom-[-16px] left-0 right-0 flex justify-center space-x-1.5">
            {filteredPractices.map((_, index) => (
              <button
                key={index}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "bg-[#ffd200] w-6 h-2"
                    : "bg-gray-300 hover:bg-gray-400 w-2 h-2"
                }`}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    const cardWidth =
                      window.innerWidth < 640 ? window.innerWidth - 48 : 300;
                    scrollContainerRef.current.scrollTo({
                      left: index * cardWidth,
                      behavior: "smooth",
                    });
                  }
                }}
                aria-label={`Przejdź do praktyki ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedPractices;
