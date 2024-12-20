"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaEye, FaRegClock, FaShare } from "react-icons/fa";
import { Poll, pollsData } from "@/components/poll";
import { PollData } from "@/components/poll/types";

// Uproszczony interfejs bez elementów społecznościowych
interface NewsItem {
  id: string;
  title: string;
  image: string;
  url: string;
}

const newsData: NewsItem[] = [
  {
    id: "1",
    title:
      "Światowy Festiwal Bachaty 2024 - Największe wydarzenie roku już w czerwcu w Warszawie",
    image: "/images/bachata-festival.jpg",
    url: "/news/bachata-1",
  },
  {
    id: "2",
    title: "Daniel i Maya zdobywają mistrzostwo świata w bachacie sensual",
    image: "/images/bachata-couple.jpg",
    url: "/news/bachata-2",
  },
  {
    id: "3",
    title: "Bachata Romance - nowy kierunek w bachacie tradycyjnej",
    image: "/images/bachata-romance.jpg",
    url: "/news/bachata-3",
  },
  {
    id: "4",
    title: "Top 10 szkół bachaty w Polsce - gdzie warto zacząć?",
    image: "/images/bachata-schools.jpg",
    url: "/news/bachata-schools",
  },
  {
    id: "5",
    title: "Podstawowe kroki bachaty - przewodnik dla początkujących",
    image: "/images/bachata-steps.jpg",
    url: "/news/bachata-steps",
  },
  {
    id: "6",
    title: "Co założyć na imprezę bachatową? Kompletny przewodnik",
    image: "/images/bachata-outfit.jpg",
    url: "/news/bachata-outfit",
  },
  {
    id: "7",
    title: "Top 20 piosenek bachatowych 2024 roku",
    image: "/images/bachata-songs.jpg",
    url: "/news/bachata-songs",
  },
  {
    id: "8",
    title: "Historia bachaty - od dominikańskich korzeni po światową scenę",
    image: "/images/bachata-history.jpg",
    url: "/news/bachata-history",
  },
  {
    id: "9",
    title: "Najlepsze festiwale bachaty w Europie 2024",
    image: "/images/bachata-festivals-europe.jpg",
    url: "/news/bachata-festivals-europe",
  },
  {
    id: "10",
    title: "Technika prowadzenia w bachacie - wskazówki dla zaawansowanych",
    image: "/images/bachata-leading.jpg",
    url: "/news/bachata-leading",
  },
  {
    id: "11",
    title: "Muzyka bachatowa - jak rozpoznać style i rytmy",
    image: "/images/bachata-music-styles.jpg",
    url: "/news/bachata-music-styles",
  },
  {
    id: "12",
    title: "Bachata fusion - łączenie stylów i nowe trendy",
    image: "/images/bachata-history.jpg",
    url: "/news/bachata-fusion",
  },
  {
    id: "13",
    title: "Nowe trendy w bachacie na 2024 rok. Co się zmieni w technice?",
    image: "/images/bachata-trends.jpg",
    url: "/news/bachata-trends",
  },
  {
    id: "14",
    title: "Mistrzostwa Polski w Bachacie - zapisy już otwarte",
    image: "/images/bachata-championship.jpg",
    url: "/news/bachata-championship",
  },
  {
    id: "15",
    title: "Dominikańscy instruktorzy prowadzą warsztaty w Polsce",
    image: "/images/bachata-workshop.jpg",
    url: "/news/bachata-workshop",
  },
  {
    id: "16",
    title: "Jak przygotować się do pierwszych zawodów bachaty?",
    image: "/images/bachata-preparation.jpg",
    url: "/news/bachata-preparation",
  },
  {
    id: "17",
    title: "10 najlepszych szkół bachaty w Polsce - ranking 2024",
    image: "/images/bachata-schools.jpg",
    url: "/news/bachata-schools",
  },
  {
    id: "18",
    title: "Bachata dla początkujących - od czego zacząć?",
    image: "/images/bachata-beginners.jpg",
    url: "/news/bachata-beginners",
  },
  {
    id: "19",
    title: "Trening mentalny w bachacie - jak pokonać stres przed występem",
    image: "/images/bachata-mental.jpg",
    url: "/news/bachata-mental",
  },
];

// Dodajemy stałą dla linków nawigacyjnych
const NAVIGATION_LINKS = [
  { href: "/wydarzenia", label: "Wydarzenia" },
  { href: "/zawody", label: "Zawody" },
  { href: "/style", label: "Style" },
  { href: "/edukacja", label: "Edukacja" },
  { href: "/muzyka", label: "Muzyka" },
] as const;

// Uproszczony komponent dla artykułu
const ArticleListItem = ({ news }: { news: NewsItem }) => {
  return (
    <Link href={`/news/${news.id}`} className="group block">
      <div className="flex gap-5 group-hover:bg-gray-50 p-2 -mx-2 rounded-lg transition-colors">
        {/* Miniatura */}
        <div className="relative w-[180px] h-[120px] flex-shrink-0 overflow-hidden rounded-sm">
          <Image
            src={news.image}
            alt={news.title}
            fill
            sizes="180px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="pt-1 flex-1">
          <h2 className="font-bold text-[15px] leading-tight mb-3 group-hover:text-gray-900 transition-colors">
            {news.title}
          </h2>
        </div>
      </div>
    </Link>
  );
};

// Interfejs dla najnowszych wiadomości
interface LatestNews {
  id: string;
  time: string;
  title: string;
  category: string;
  categoryColor?: string;
}

// Dane najnowszych wiadomości
const latestNewsData: LatestNews[] = [
  {
    id: "1",
    time: "22:34",
    title:
      "Światowi instruktorzy bachaty przybywają do Warszawy na BachatArt Festival",
    category: "WYDARZENIA",
    categoryColor: "text-blue-600",
  },
  {
    id: "2",
    time: "22:25",
    title: "Nowe zasady na World Bachata Masters 2024. Kontrowersyjna decyzja",
    category: "ZAWODY",
    categoryColor: "text-orange-600",
  },
  {
    id: "3",
    time: "22:14",
    title: "Romeo Santos zapowiada nowy album. 'To powrót do korzeni bachaty'",
    category: "MUZYKA",
    categoryColor: "text-purple-600",
  },
  {
    id: "4",
    time: "22:06",
    title:
      "Dominikańska technika vs styl europejski. Gorąca debata w świecie bachaty",
    category: "STYL",
    categoryColor: "text-green-600",
  },
];

// Dodajmy nowy interfejs dla tematów
interface TopicItem {
  id: string;
  title: string;
  category?: string;
  isHighlighted?: boolean;
}

// Modyfikacja listy tematów z dodatkowymi kategoriami
const topicsList: TopicItem[] = [
  {
    id: "1",
    title: "Światowy Festiwal Bachaty ogłasza nowe gwiazdy. Lista instruktorów",
    isHighlighted: true,
  },
  {
    id: "2",
    title: "Rosjanie zachwyceni bachatą. Nowy trend w Moskwie",
    category: "ŚWIAT",
  },
  {
    id: "3",
    title:
      "Dominikańscy tancerze zdziwieni europejskim stylem. Komentują technikę",
    category: "STYL",
  },
  {
    id: "4",
    title: '"Bachata to nowe tango". Eksperci przewidują boom na styl',
    category: "TRENDY",
  },
  {
    id: "5",
    title: 'Romeo Santos publikuje nowy teledysk. "To powrót do korzeni"',
    category: "MUZYKA",
  },
  {
    id: "6",
    title: '"Współczesna bachata czci tradycję". Mocne słowa po festiwalu',
    category: "WYDARZENIA",
  },
  {
    id: "7",
    category: "ŚWIAT",
    title:
      "Duński styl bije na alarm. Wskazuje na ryzyko utraty autentyczności",
  },
  {
    id: "8",
    title: "Nowa szkoła bachaty otworzona na osiedlu. Tłumy na otwarciu",
    category: "POLSKA",
  },
  {
    id: "9",
    title: "Kanada ugina się pod wpływem bachaty. Ogłaszają zmiany",
    category: "ŚWIAT",
  },
  {
    id: "10",
    category: "ŚWIAT",
    title:
      "Sensual vs Dominicana. Która wersja lepsza? Eksperci nie mają wątpliwości",
  },
];

export default function Home() {
  // Stan dla interakcji użytkownika z useMemo dla stabilnych wartości początkowych
  const [isClient, setIsClient] = useState(false);
  const [polls, setPolls] = useState<PollData[]>(pollsData);

  // Inicjalizacja stanu po stronie klienta
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleVote = (pollId: string, optionId: string) => {
    setPolls((currentPolls) =>
      currentPolls.map((poll) => {
        if (poll.id === pollId) {
          const updatedOptions = poll.options.map((option) => ({
            ...option,
            votes: option.id === optionId ? option.votes + 1 : option.votes,
          }));

          return {
            ...poll,
            options: updatedOptions,
            totalVotes: poll.totalVotes + 1,
          };
        }
        return poll;
      })
    );
  };

  return (
    <main className="min-h-screen bg-white font-['Roboto_Condensed',_'Roboto_Condensed-fallback',_Arial,_sans-serif]">
      {/* Pasek najnowszych wiadomości */}
      <div className="bg-[#f5f5f5] border-b border-gray-200">
        <div className="max-w-[1530px] mx-auto flex items-stretch font-['Roboto_Condensed']">
          {/* Sekcja NAJNOWSZE */}
          <div className="flex items-center border-r border-gray-200">
            <div className="px-4 py-2 flex items-center gap-2">
              <span className="text-red-600 font-bold text-sm tracking-wide">
                NAJNOWSZE
              </span>
              <button className="w-6 h-6 flex items-center justify-center hover:bg-gray-200 rounded-full transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Sekcja z przewijającymi się wiadomościami */}
          <div className="flex-1 relative overflow-hidden">
            <div className="animate-marquee flex items-stretch">
              {latestNewsData.map((news) => (
                <Link
                  key={news.id}
                  href={`/news/${news.id}`}
                  className="flex items-center min-w-max border-r border-gray-200 group"
                >
                  <div className="px-4 py-2 flex items-center gap-3">
                    <span className="text-red-600 font-bold text-sm">
                      {news.time}
                    </span>
                    <span className="text-sm text-gray-900 group-hover:text-gray-900">
                      {news.title}
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        news.categoryColor || "text-gray-500"
                      }`}
                    >
                      {news.category}
                    </span>
                  </div>
                </Link>
              ))}
              {/* Duplikacja dla płynnego przewijania */}
              {latestNewsData.map((news) => (
                <Link
                  key={`dup-${news.id}`}
                  href={`/news/${news.id}`}
                  className="flex items-center min-w-max border-r border-gray-200 group"
                >
                  <div className="px-4 py-2 flex items-center gap-3">
                    <span className="text-red-600 font-bold text-sm">
                      {news.time}
                    </span>
                    <span className="text-sm text-gray-900 group-hover:text-gray-900">
                      {news.title}
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        news.categoryColor || "text-gray-500"
                      }`}
                    >
                      {news.category}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Przycisk następny */}
          <div className="border-l border-gray-200">
            <button className="h-full px-4 hover:bg-gray-200 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
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
            </button>
          </div>
        </div>
      </div>

      {/* Header z rozwiniętym systemem kategorii */}
      <div className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm font-['Roboto_Condensed']">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="bg-blue-800 rounded-full w-[42px] h-[42px] flex items-center justify-center shadow-sm">
                <span className="font-bold text-white text-[13px] leading-none">
                  INFO
                </span>
              </div>
              <span className="font-bold text-[13px] tracking-wider text-gray-900">
                PARKIET
              </span>
            </div>

            {/* Statyczne linki nawigacyjne */}
            <nav className="flex gap-2">
              {NAVIGATION_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 rounded-full transition-all duration-200
                    text-gray-600 hover:bg-gray-100 hover:text-gray-900
                    text-[13px] font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 py-6 font-['Roboto_Condensed']">
        <div className="flex gap-6">
          {/* Lewa strona - główne newsy */}
          <div className="w-[65%]">
            {/* Sekcja BACHATA NEWS */}
            <div className="w-full mt-8">
              <div className="bg-[#e90636] p-6">
                <h2 className="text-white text-3xl font-bold mb-6">
                  BACHATA NEWS
                </h2>

                <div className="grid grid-cols-3 gap-4">
                  {/* Artykuł 1 */}
                  <Link href="/news/bachata-1" className="group">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src="/images/bachata-festival.jpg"
                        alt="Światowy Festiwal Bachaty 2024"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                    <div className="mt-3">
                      <h3 className="text-white text-lg font-bold leading-tight group-hover:underline">
                        Światowy Festiwal Bachaty 2024 - Największe wydarzenie
                        roku już w czerwcu w Warszawie
                      </h3>
                      <div className="w-8 h-[2px] bg-white/80 mt-2" />
                    </div>
                  </Link>

                  {/* Artykuł 2 */}
                  <Link href="/news/bachata-2" className="group">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src="/images/bachata-couple.jpg"
                        alt="Daniel i Maya - Mistrzowie Świata"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                    <div className="mt-3">
                      <h3 className="text-white text-lg font-bold leading-tight group-hover:underline">
                        Daniel i Maya zdobywają mistrzostwo świata w bachacie
                        sensual
                      </h3>
                      <div className="w-8 h-[2px] bg-white/80 mt-2" />
                    </div>
                  </Link>

                  {/* Artykuł 3 */}
                  <Link href="/news/bachata-3" className="group">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src="/images/bachata-romance.jpg"
                        alt="Nowy kierunek w bachacie"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                    <div className="mt-3">
                      <h3 className="text-white text-lg font-bold leading-tight group-hover:underline">
                        Bachata Romance - nowy kierunek w bachacie tradycyjnej
                      </h3>
                      <div className="w-8 h-[2px] bg-white/80 mt-2" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Sekcja PILNE pod BACHATA NEWS */}
            <div className="w-full mt-8">
              {/* tutaj dodaj tą sekcje */}

              {/* Sekcja newsów w stylu WP - układ 3-kolumnowy */}
              <div className="w-full mt-8">
                <div className="grid grid-cols-3 gap-4">
                  {/* KOLUMNA 1 (LEWA) - Duży news zajmujący 2 rzędy w pionie */}
                  <div className="row-span-2 relative group">
                    <Link href="/news/bachata-main">
                      <div className="relative w-[300px] h-full overflow-hidden">
                        <Image
                          src="/images/bachata-couple.jpg"
                          alt="Para tańcząca bachatę"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <h2 className="text-white text-[18px] leading-[24px] font-bold">
                            Walczy o tytuł mistrza świata. Popularny tancerz
                            bachaty odpowiada krytykom
                          </h2>
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* KOLUMNA 2 (ŚRODKOWA) - Górny news */}
                  <Link href="/news/bachata-1" className="block group">
                    <div className="relative w-[300px] h-[180px] overflow-hidden">
                      <Image
                        src="/images/bachata-festival.jpg"
                        alt="Festival Bachaty"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white text-[18px] leading-[24px] font-bold">
                          Już miała wygraną w kieszeni. Jak przegrała
                          mistrzostwa bachaty?
                        </h3>
                      </div>
                    </div>
                  </Link>

                  {/* KOLUMNA 3 (PRAWA) - Górny news */}
                  <Link href="/news/bachata-2" className="block group">
                    <div className="relative w-[300px] h-[180px] overflow-hidden">
                      <Image
                        src="/images/bachata-schools.jpg"
                        alt="Najlepsza szkoła bachaty"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white text-[18px] leading-[24px] font-bold">
                          Najlepsza szkoła bachaty w Polsce. #1 w rankingu jest
                          w tym mieście
                        </h3>
                      </div>
                    </div>
                  </Link>

                  {/* KOLUMNA 2 (ŚRODKOWA) - Dolny news */}
                  <Link href="/news/bachata-3" className="block group">
                    <div className="relative w-[300px] h-[180px] overflow-hidden">
                      <Image
                        src="/images/bachata-romance.jpg"
                        alt="Ostrzeżenie dla tancerzy"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute top-3 right-3 w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                        <Image
                          src="/images/bachata-steps.jpg"
                          alt="Avatar"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white text-[18px] leading-[24px] font-bold">
                          Ostrzega przed tym krokiem w bachacie. Instruktorzy są
                          zaniepokojeni
                        </h3>
                      </div>
                    </div>
                  </Link>

                  {/* KOLUMNA 3 (PRAWA) - Dolny news */}
                  <Link href="/news/bachata-4" className="block group">
                    <div className="relative w-[300px] h-[180px] overflow-hidden">
                      <Image
                        src="/images/bachata-history.jpg"
                        alt="Współpraca z Romeo Santos"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white text-[18px] leading-[24px] font-bold">
                          Pracował z Romeo Santos. Zdradza kulisy współpracy z
                          królem bachaty
                        </h3>
                      </div>
                    </div>
                  </Link>

                  {/* DOLNY RZĄD - 3 newsy (pełna szerokość) */}
                  <div className="col-span-3 grid grid-cols-3 gap-4 mt-4">
                    {/* Dolny rząd - News 1 */}
                    <Link href="/news/bachata-5" className="block group">
                      <div className="relative w-[300px] h-[180px] overflow-hidden">
                        <Image
                          src="/images/bachata-fusion.jpg"
                          alt="Nowy styl bachaty"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="text-white text-[18px] leading-[24px] font-bold">
                            Rewolucja w bachacie. Nowy styl podbija światowe
                            parkiety
                          </h3>
                        </div>
                      </div>
                    </Link>

                    {/* Dolny rząd - News 2 */}
                    <Link href="/news/bachata-6" className="block group">
                      <div className="relative w-[300px] h-[180px] overflow-hidden">
                        <Image
                          src="/images/bachata-steps.jpg"
                          alt="Smutny wpis instruktorki"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="text-white text-[18px] leading-[24px] font-bold">
                            Smutny wpis znanej instruktorki. Zamyka szkołę po 15
                            latach
                          </h3>
                        </div>
                      </div>
                    </Link>

                    {/* Dolny rząd - News 3 */}
                    <Link href="/news/bachata-7" className="block group">
                      <div className="relative w-[300px] h-[180px] overflow-hidden">
                        <Image
                          src="/images/bachata-songs.jpg"
                          alt="Przełamała barierę"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="text-white text-[18px] leading-[24px] font-bold">
                            Latami nie mogła się przełamać. Teraz jest
                            mistrzynią bachaty
                          </h3>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Sekcja ANKIETY - 3 w poziomie */}
              <div className="w-full mt-8">
                <div className="grid grid-cols-3 gap-6">
                  {polls.map((poll) => (
                    <Poll key={poll.id} data={poll} onVote={handleVote} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Prawa kolumna - TEMATY DNIA */}
          <div className="w-[20%]">
            {/* Header TEMATY DNIA */}
            <div className="mb-6">
              <div className="flex items-center gap-2.5 pb-3 border-b border-gray-200">
                <div className="bg-red-600 rounded-full w-[22px] h-[22px] flex items-center justify-center shadow-sm">
                  <span className="font-bold text-white text-[13px] leading-none">
                    T
                  </span>
                </div>
                <span className="font-bold text-[13px] tracking-wider text-gray-900">
                  TEMATY DNIA
                </span>
              </div>
            </div>

            {/* Lista tematów */}
            <div className="space-y-[18px]">
              {topicsList.map((topic) => (
                <Link
                  href={`/news/${topic.id}`}
                  key={topic.id}
                  className="group block"
                >
                  <div className="flex flex-col gap-1">
                    {topic.category && (
                      <span className="text-[11px] font-bold text-blue-600">
                        {topic.category}
                      </span>
                    )}
                    <h3
                      className={`text-[13px] leading-[1.4] ${
                        topic.isHighlighted ? "font-bold" : "font-normal"
                      } text-gray-900 group-hover:text-gray-900`}
                    >
                      {topic.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>

            {/* Nowa sekcja REKLAMY z dodanym odstępem mt-8 */}
            <div className="space-y-4 mt-8">
              {/* Reklama 1 */}
              <div className="border rounded-lg overflow-hidden bg-gray-50">
                <div className="text-xs text-gray-500 px-2 py-1 border-b bg-white">
                  REKLAMA
                </div>
                <div className="aspect-[4/5] relative">
                  <Image
                    src="/ads/ad-1.jpg"
                    alt="Reklama"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Reklama 2 */}
              <div className="border rounded-lg overflow-hidden bg-gray-50">
                <div className="text-xs text-gray-500 px-2 py-1 border-b bg-white">
                  REKLAMA
                </div>
                <div className="aspect-square relative">
                  <Image
                    src="/ads/ad-2.jpg"
                    alt="Reklama"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Reklama 3 - wersja tekstowa */}
              <div className="border rounded-lg overflow-hidden bg-white p-4">
                <div className="text-xs text-gray-500 mb-2">REKLAMA</div>
                <div className="space-y-2">
                  <h3 className="font-bold text-sm">Szkoła Tańca Latino</h3>
                  <p className="text-sm text-gray-600">
                    Nowe kursy bachaty od podstaw. Zapisz się już dziś!
                  </p>
                  <a
                    href="#"
                    className="text-[#e90636] text-sm font-medium hover:underline"
                  >
                    Dowiedz się więcej →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Linia oddzielająca zamiast paginacji */}
        <div className="w-full border-b border-gray-200 my-12"></div>
      </div>
    </main>
  );
}
