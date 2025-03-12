import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaChevronLeft,
  FaChevronRight,
  FaMapMarkerAlt,
  FaClock,
  FaUsers,
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
    image: "/images/dance1.jpg",
    url: "/praktyki/warszawa-bachata-sredniozaawansowana",
    participants: 24,
  },
  {
    id: "2",
    title: "Social Dance",
    location: "Kraków",
    date: "Sobota",
    day: "13",
    month: "MAJ",
    time: "20:00",
    image: "/images/dance2.jpg",
    url: "/praktyki/krakow-social-dance",
    participants: 56,
  },
  {
    id: "3",
    title: "Bachata Sensual",
    location: "Wrocław",
    date: "Niedziela",
    day: "14",
    month: "MAJ",
    time: "18:00",
    image: "/images/dance3.jpg",
    url: "/praktyki/wroclaw-bachata-sensual",
    participants: 18,
  },
  {
    id: "4",
    title: "Open Practice",
    location: "Poznań",
    date: "Czwartek",
    day: "18",
    month: "MAJ",
    time: "19:30",
    image: "/images/dance4.jpg",
    url: "/praktyki/poznan-bachata-open",
    participants: 32,
  },
  {
    id: "5",
    title: "Bachata Dominicana",
    location: "Gdańsk",
    date: "Sobota",
    day: "20",
    month: "MAJ",
    time: "19:00",
    image: "/images/dance5.jpg",
    url: "/praktyki/gdansk-bachata-dominicana",
    participants: 28,
  },
  {
    id: "6",
    title: "Bachata Fusion",
    location: "Łódź",
    date: "Piątek",
    day: "26",
    month: "MAJ",
    time: "20:00",
    image: "/images/dance6.jpg",
    url: "/praktyki/lodz-bachata-fusion",
    participants: 42,
  },
  {
    id: "7",
    title: "Warsztaty Bachaty",
    location: "Szczecin",
    date: "Sobota",
    day: "27",
    month: "MAJ",
    time: "16:00",
    image: "/images/dance7.jpg",
    url: "/praktyki/szczecin-warsztaty-bachaty",
    participants: 35,
  },
  {
    id: "8",
    title: "Bachata dla Początkujących",
    location: "Katowice",
    date: "Niedziela",
    day: "28",
    month: "MAJ",
    time: "17:00",
    image: "/images/dance8.jpg",
    url: "/praktyki/katowice-bachata-poczatkujacy",
    participants: 20,
  },
  {
    id: "9",
    title: "Bachata & Salsa Night",
    location: "Bydgoszcz",
    date: "Piątek",
    day: "2",
    month: "CZE",
    time: "21:00",
    image: "/images/dance9.jpg",
    url: "/praktyki/bydgoszcz-bachata-salsa-night",
    participants: 64,
  },
  {
    id: "10",
    title: "Bachata Masterclass",
    location: "Lublin",
    date: "Sobota",
    day: "3",
    month: "CZE",
    time: "14:00",
    image: "/images/dance10.jpg",
    url: "/praktyki/lublin-bachata-masterclass",
    participants: 30,
  },
];

const RecommendedPractices: React.FC = () => {
  const [activeMonth, setActiveMonth] = useState("Maj");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  // Filtrowanie wydarzeń na podstawie aktywnego miesiąca
  const filteredPractices = recommendedPractices.filter(
    (practice) =>
      (activeMonth === "Maj" && practice.month === "MAJ") ||
      (activeMonth === "Czerwiec" && practice.month === "CZE")
  );

  return (
    <div className="py-8">
      <div className="max-w-[1300px] mx-auto px-4">
        {/* Header section */}
        <div className="flex flex-wrap items-center justify-between mb-6">
          <div className="flex items-center mb-2 sm:mb-0">
            <div className="bg-[#ffd200] rounded-full w-9 h-9 flex items-center justify-center mr-3 shadow-sm">
              <span className="font-bold text-black text-base">P</span>
            </div>
            <h2 className="text-base font-bold uppercase tracking-wide">
              POLECANE PRAKTYKI
            </h2>
          </div>

          <div className="flex items-center">
            <div className="flex space-x-2 mr-4">
              <button
                className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                  activeMonth === "Maj"
                    ? "bg-[#ffd200] text-gray-900 font-medium"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() => setActiveMonth("Maj")}
              >
                Maj
              </button>
              <button
                className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                  activeMonth === "Czerwiec"
                    ? "bg-[#ffd200] text-gray-900 font-medium"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() => setActiveMonth("Czerwiec")}
              >
                Czerwiec
              </button>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={scrollLeft}
                disabled={!canScrollLeft}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  canScrollLeft
                    ? "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
                aria-label="Przewiń w lewo"
              >
                <FaChevronLeft className="w-3 h-3" />
              </button>
              <button
                onClick={scrollRight}
                disabled={!canScrollRight}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  canScrollRight
                    ? "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
                aria-label="Przewiń w prawo"
              >
                <FaChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto pb-6 scroll-smooth"
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
                  className="block w-[280px] flex-shrink-0 bg-white hover:shadow-lg transition-all duration-300 group border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300"
                  style={{
                    transform: `scale(${index === currentIndex ? 1.02 : 1})`,
                  }}
                >
                  <div className="flex h-[140px]">
                    {/* Date column - standaryzowana szerokość */}
                    <div className="w-[80px] bg-gray-50 flex flex-col items-center justify-center py-4 border-r border-gray-200 group-hover:bg-[#ffd200]/10 transition-colors">
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {practice.month}
                      </div>
                      <div className="text-2xl font-bold text-gray-900 my-1">
                        {practice.day}
                      </div>
                      <div className="text-xs font-medium text-gray-600">
                        {practice.date}
                      </div>
                    </div>

                    {/* Content column - standaryzowana wysokość */}
                    <div className="flex-1 p-3">
                      <h3 className="font-bold text-gray-900 mb-2 text-base line-clamp-2 group-hover:text-[#ffd200] transition-colors">
                        {practice.title}
                      </h3>
                      <div className="space-y-1.5">
                        <div className="flex items-center text-xs text-gray-600">
                          <FaClock className="w-3 h-3 text-[#ffd200] mr-1.5" />
                          <span className="font-medium">{practice.time}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-600">
                          <FaMapMarkerAlt className="w-3 h-3 text-[#ffd200] mr-1.5" />
                          <span>{practice.location}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-600">
                          <FaUsers className="w-3 h-3 text-[#ffd200] mr-1.5" />
                          <span>{practice.participants} uczestników</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="h-[160px] relative overflow-hidden bg-gray-100">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <FaUsers className="w-6 h-6 text-gray-400" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-between items-end">
                      <div className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-medium text-gray-900 shadow-sm group-hover:bg-[#ffd200] transition-colors duration-300">
                        Dołącz do praktyki
                      </div>
                      <div className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                        {index + 1}/{filteredPractices.length}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Scroll indicators */}
          <div className="flex justify-center mt-4 space-x-1">
            {filteredPractices.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-[#ffd200] w-4"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollTo({
                      left: index * 280,
                      behavior: "smooth",
                    });
                  }
                }}
              />
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Link
            href="/praktyki"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center group"
          >
            <span>Zobacz wszystkie praktyki</span>
            <svg
              className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
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
