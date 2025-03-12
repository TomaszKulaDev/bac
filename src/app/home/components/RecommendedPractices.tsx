import React, { useState, useRef, useEffect } from "react";
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
  FaGuitar,
  FaDrum,
  FaSignal,
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
  partnerStatus: "rotation" | "required" | "optional";
  rating: number;
  ratingCount: number;
  danceStyle:
    | "dominicana"
    | "sensual"
    | "moderna"
    | "fusion"
    | "traditional"
    | "urban"
    | "mixed";
}

const recommendedPractices: Practice[] = [
  {
    id: "1",
    title: "Praktyka Bachaty",
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
    partnerStatus: "rotation",
    rating: 4.5,
    ratingCount: 42,
    danceStyle: "dominicana",
  },
  {
    id: "2",
    title: "Social Dance",
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
    partnerStatus: "optional",
    rating: 4.8,
    ratingCount: 65,
    danceStyle: "mixed",
  },
  {
    id: "3",
    title: "Bachata Sensual",
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
    partnerStatus: "required",
    rating: 4.2,
    ratingCount: 28,
    danceStyle: "sensual",
  },
  {
    id: "4",
    title: "Open Practice",
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
    partnerStatus: "rotation",
    rating: 3.9,
    ratingCount: 17,
    danceStyle: "mixed",
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
    partnerStatus: "optional",
    rating: 4.7,
    ratingCount: 36,
    danceStyle: "dominicana",
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
    partnerStatus: "rotation",
    rating: 4.3,
    ratingCount: 51,
    danceStyle: "fusion",
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
    partnerStatus: "required",
    rating: 4.9,
    ratingCount: 22,
    danceStyle: "traditional",
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
    partnerStatus: "rotation",
    rating: 4.0,
    ratingCount: 15,
    danceStyle: "dominicana",
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
    partnerStatus: "optional",
    rating: 4.6,
    ratingCount: 78,
    danceStyle: "mixed",
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
    partnerStatus: "required",
    rating: 5.0,
    ratingCount: 12,
    danceStyle: "urban",
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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Function to navigate to previous month
  const previousMonth = () => {
    if (monthIndex > 0) {
      const newIndex = monthIndex - 1;
      setMonthIndex(newIndex);
      setActiveMonth(months[newIndex]);
    }
  };

  // Function to navigate to next month
  const nextMonth = () => {
    if (monthIndex < months.length - 1) {
      const newIndex = monthIndex + 1;
      setMonthIndex(newIndex);
      setActiveMonth(months[newIndex]);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

      // Calculate current index based on scroll position
      const itemWidth = 280; // Width of each card
      const newIndex = Math.round(scrollLeft / itemWidth);
      setCurrentIndex(Math.min(newIndex, recommendedPractices.length - 1));
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check

      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  // Update canScrollLeft and canScrollRight based on monthIndex
  useEffect(() => {
    setCanScrollLeft(monthIndex > 0);
    setCanScrollRight(monthIndex < months.length - 1);
  }, [monthIndex, months.length]);

  // Function to get the appropriate dance style badge
  const getDanceStyleBadge = (
    style:
      | "dominicana"
      | "sensual"
      | "moderna"
      | "fusion"
      | "traditional"
      | "urban"
      | "mixed"
  ) => {
    const styleConfig = {
      dominicana: {
        text: "Dominicana",
        classes: "bg-amber-100 text-amber-800",
        icon: <FaDrum className="w-3 h-3 mr-1.5" />,
      },
      sensual: {
        text: "Sensual",
        classes: "bg-pink-100 text-pink-800",
        icon: <FaHeart className="w-3 h-3 mr-1.5" />,
      },
      moderna: {
        text: "Moderna",
        classes: "bg-blue-100 text-blue-800",
        icon: <FaMusic className="w-3 h-3 mr-1.5" />,
      },
      fusion: {
        text: "Fusion",
        classes: "bg-purple-100 text-purple-800",
        icon: <FaMusic className="w-3 h-3 mr-1.5" />,
      },
      traditional: {
        text: "Traditional",
        classes: "bg-green-100 text-green-800",
        icon: <FaGuitar className="w-3 h-3 mr-1.5" />,
      },
      urban: {
        text: "Urban",
        classes: "bg-indigo-100 text-indigo-800",
        icon: <FaMusic className="w-3 h-3 mr-1.5" />,
      },
      mixed: {
        text: "Mixed Styles",
        classes: "bg-gray-100 text-gray-800",
        icon: <FaMusic className="w-3 h-3 mr-1.5" />,
      },
    };

    const { text, classes, icon } = styleConfig[style];

    return (
      <div
        className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${classes}`}
      >
        {icon}
        <span>{text}</span>
      </div>
    );
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

  // Function to get the appropriate difficulty level badge
  const getDifficultyBadge = (
    difficulty: "beginner" | "intermediate" | "advanced" | "all-levels"
  ) => {
    const difficultyConfig = {
      beginner: {
        text: "Początkujący",
        classes: "bg-green-100 text-green-800",
        bars: 1,
      },
      intermediate: {
        text: "Średniozaawansowany",
        classes: "bg-blue-100 text-blue-800",
        bars: 2,
      },
      advanced: {
        text: "Zaawansowany",
        classes: "bg-purple-100 text-purple-800",
        bars: 3,
      },
      "all-levels": {
        text: "Wszystkie poziomy",
        classes: "bg-gray-100 text-gray-800",
        bars: 0,
      },
    };

    const { text, classes, bars } = difficultyConfig[difficulty];

    return (
      <div
        className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${classes}`}
      >
        <FaSignal className="w-3 h-3 mr-1.5" />
        <span>{text}</span>
      </div>
    );
  };

  // Function to get the appropriate partner status badge
  const getPartnerStatusBadge = (
    status: "rotation" | "required" | "optional"
  ) => {
    // ... existing code ...
  };

  return (
    <div className="py-6 bg-gray-50">
      <div className="max-w-[1300px] mx-auto px-4">
        {/* Header section with improved styling */}
        <div className="flex flex-wrap items-center justify-between mb-5">
          <div className="flex items-center mb-3 sm:mb-0">
            <div className="bg-[#ffd200] rounded-full w-9 h-9 flex items-center justify-center mr-3 shadow-md">
              <FaCalendarAlt className="text-gray-900 w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold uppercase tracking-wide text-gray-900">
                PRAKTISY TANECZNE
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Szukasz miejsca gdzie możesz potanczyć? Znajdz praktisy i dołącz
                do tancerzy w Twojej okolicy.
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex space-x-2">
              <button
                onClick={previousMonth}
                disabled={!canScrollLeft}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  canScrollLeft
                    ? "bg-white text-gray-700 hover:bg-gray-100 shadow-sm border border-gray-200"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
                aria-label="Poprzedni miesiąc"
              >
                <FaChevronLeft className="w-3 h-3" />
              </button>

              <button className="px-3 py-1.5 text-sm rounded-full transition-colors bg-[#ffd200] text-gray-900 font-medium shadow-sm min-w-[90px] text-center">
                {activeMonth}
              </button>

              <button
                onClick={nextMonth}
                disabled={!canScrollRight}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  canScrollRight
                    ? "bg-white text-gray-700 hover:bg-gray-100 shadow-sm border border-gray-200"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
                aria-label="Następny miesiąc"
              >
                <FaChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Card navigation buttons positioned on the sides of the carousel */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10">
            <button
              onClick={scrollLeft}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors bg-white text-gray-700 hover:bg-gray-100 shadow-md border border-gray-200"
              aria-label="Przewiń w lewo"
            >
              <FaChevronLeft className="w-3 h-3" />
            </button>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10">
            <button
              onClick={scrollRight}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors bg-white text-gray-700 hover:bg-gray-100 shadow-md border border-gray-200"
              aria-label="Przewiń w prawo"
            >
              <FaChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div
            ref={scrollContainerRef}
            className="overflow-x-auto pb-5 scroll-smooth"
            onScroll={handleScroll}
            style={{
              scrollbarWidth: "none" /* Firefox */,
              msOverflowStyle: "none" /* IE and Edge */,
            }}
          >
            {/* CSS do ukrycia scrollbara dla WebKit (Chrome, Safari) */}
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            <div className="flex space-x-4 pl-1 pr-4">
              {filteredPractices.map((practice, index) => (
                <Link
                  key={practice.id}
                  href={practice.url}
                  className="block w-[270px] flex-shrink-0 bg-white hover:shadow-lg transition-all duration-300 group rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300"
                  style={{
                    transform: `scale(${index === currentIndex ? 1.02 : 1})`,
                    transformOrigin: "center center",
                  }}
                >
                  {/* Image section on top */}
                  <div className="h-[150px] relative overflow-hidden">
                    <Image
                      src={practice.image}
                      alt={practice.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 270px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      priority={index < 2}
                    />
                    <div className="absolute top-0 left-0 m-2.5 px-2 py-1 bg-[#ffd200] rounded-md text-xs font-bold text-gray-900">
                      {practice.date}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-medium text-gray-900 shadow-sm inline-block">
                        Dołącz do praktyki
                      </div>
                    </div>
                  </div>

                  {/* Content section */}
                  <div className="p-3.5">
                    <div className="flex justify-between items-start mb-2.5">
                      <h3 className="font-bold text-gray-900 text-base line-clamp-1 group-hover:text-[#ffd200] transition-colors flex-1 pr-2">
                        {practice.title}
                      </h3>
                      <div className="flex flex-col items-center bg-gray-50 rounded-lg px-2 py-1 border border-gray-100">
                        <span className="text-xs text-gray-500">
                          {practice.month}
                        </span>
                        <span className="text-base font-bold text-gray-900">
                          {practice.day}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <FaClock className="w-3.5 h-3.5 text-[#ffd200] mr-2" />
                        <span className="font-medium">{practice.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <FaMapMarkerAlt className="w-3.5 h-3.5 text-[#ffd200] mr-2" />
                        <span>{practice.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <FaUsers className="w-3.5 h-3.5 text-[#ffd200] mr-2" />
                        <span>{practice.participants} uczestników</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <FaMoneyBillWave className="w-3.5 h-3.5 text-[#ffd200] mr-2" />
                        <span>{practice.price || "Cena nie podana"}</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                      <div className="flex -space-x-2">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="w-6 h-6 rounded-full border-2 border-white overflow-hidden bg-gray-200"
                          >
                            {i < 2 && (
                              <Image
                                src={`https://randomuser.me/api/portraits/${
                                  i % 2 === 0 ? "women" : "men"
                                }/${((index * 3 + i) % 30) + 1}.jpg`}
                                alt="Uczestnik"
                                width={24}
                                height={24}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                        ))}
                        {practice.participants && practice.participants > 3 && (
                          <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
                            +{practice.participants - 3}
                          </div>
                        )}
                      </div>

                      {getDanceStyleBadge(practice.danceStyle)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Scroll indicators */}
          <div className="flex justify-center mt-4 space-x-1.5">
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
                    scrollContainerRef.current.scrollTo({
                      left: index * 270,
                      behavior: "smooth",
                    });
                  }
                }}
                aria-label={`Przejdź do praktyki ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Link
            href="/praktyki"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors flex items-center group bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 hover:shadow"
          >
            <span>Zobacz wszystkie praktyki</span>
            <svg
              className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform"
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
      </div>
    </div>
  );
};

export default RecommendedPractices;
