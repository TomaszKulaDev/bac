import React from "react";
import Link from "next/link";
import Image from "next/image";

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
    image:
      "https://images.unsplash.com/photo-1545959570-a94084071b5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
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
    image:
      "https://images.unsplash.com/photo-1504609813442-a9c86dff9c2e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
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
    image:
      "https://images.unsplash.com/photo-1566154184214-c1f9c94fb8c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
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
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    url: "/praktyki/poznan-bachata-open",
    participants: 32,
  },
];

const RecommendedPractices: React.FC = () => {
  return (
    <div className="py-6">
      <div className="max-w-[1300px] mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="bg-[#ffd200] rounded-full w-8 h-8 flex items-center justify-center mr-2">
              <span className="font-bold text-black">P</span>
            </div>
            <h2 className="text-base font-bold uppercase">POLECANE PRAKTYKI</h2>
          </div>

          <div className="flex space-x-2">
            <button className="px-3 py-1 text-xs bg-[#ffd200] rounded-full text-gray-900">
              Maj
            </button>
            <button className="px-3 py-1 text-xs bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors">
              Czerwiec
            </button>
          </div>
        </div>

        <div className="overflow-x-auto -mx-4 px-4 pb-4 scrollbar-hide">
          <div className="flex space-x-4">
            {recommendedPractices.map((practice) => (
              <Link
                key={practice.id}
                href={practice.url}
                className="block w-[280px] flex-shrink-0 bg-white hover:shadow-sm transition-shadow duration-200 group"
              >
                <div className="flex border-t border-l border-r border-gray-100 rounded-t-lg overflow-hidden">
                  {/* Date column */}
                  <div className="w-20 bg-gray-50 flex flex-col items-center justify-center py-4 border-r border-gray-100 group-hover:bg-[#ffd200]/10 transition-colors">
                    <div className="text-xs font-medium text-gray-500">
                      {practice.month}
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {practice.day}
                    </div>
                    <div className="text-xs font-medium text-gray-500">
                      {practice.date}
                    </div>
                  </div>

                  {/* Content column */}
                  <div className="flex-1 p-4">
                    <h3 className="font-bold text-gray-900 mb-2">
                      {practice.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span className="font-medium text-[#ffd200]">
                        {practice.time}
                      </span>
                      <span className="mx-2">•</span>
                      <span>{practice.location}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {practice.participants} uczestników
                    </div>
                  </div>
                </div>

                <div className="h-32 relative border-b border-l border-r border-gray-100 rounded-b-lg overflow-hidden">
                  <Image
                    src={practice.image}
                    alt={practice.title}
                    width={280}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <div className="inline-block px-2 py-1 bg-white/80 backdrop-blur-sm rounded text-xs font-medium text-gray-900">
                      Dołącz do praktyki
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Link
            href="/praktyki"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors flex items-center"
          >
            <span>Zobacz wszystkie praktyki</span>
            <svg
              className="w-4 h-4 ml-1"
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
