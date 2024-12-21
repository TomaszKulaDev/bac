"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaEye, FaRegClock, FaShare } from "react-icons/fa";
import { Poll, pollsData } from "@/components/poll";
import { PollData } from "@/components/poll/types";
import { NewsTickerBar } from "@/app/news/components/NewsTickerBar/NewsTickerBar";
import { latestNewsData as tickerNewsData } from "@/app/news/components/NewsTickerBar/data";
import { BachataNews } from "@/app/news/components/BachataNews/BachataNews";
import { bachataNewsData } from "@/app/news/components/BachataNews/data";
import { DailyTopics } from "@/app/news/components/DailyTopics";
import { topicsData } from "@/app/news/components/DailyTopics/data";

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
      {/* -------------------------- Ruchomy pasek wiadomości - dodajemy NewsTickerBar jako pierwszy komponent --------------------------    */}
      <NewsTickerBar latestNews={tickerNewsData} />

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
          <div className="w-[62%]">
            {/*------------------------  Sekcja  Czerwone BACHATA NEWS ------------------------  */}
            <BachataNews newsItems={bachataNewsData} />

            {/*------------------------  Sekcja 12 newsów w stylu WP - układ 3-kolumnowy ------------------------   */}
            <div className="w-full mt-8">
              <div className="w-full mt-16">
                <div className="grid grid-cols-3 gap-4">
                  {/* KOLUMNA 1 (LEWA) - Duży news zajmujący 2 rzędy w pionie */}
                  <div className="row-span-2 relative group">
                    <Link href="/news/bachata-main">
                      <div className="relative w-[300px] h-full overflow-hidden">
                        <Image
                          src="/images/bachata-couple.jpg"
                          alt="Para tańcząca bachatę w mistrzowskim stylu"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <h2 className="text-white text-[18px] leading-[24px] font-bold">
                            Bachata Fusion 2024 - nowy styl podbija światowe
                            parkiety. Zobacz jak łączy tradycję z nowoczesnością
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
                        alt="Festival Bachaty 2024"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white text-[18px] leading-[24px] font-bold">
                          1a. Światowa premiera w Warszawie. Ten festiwal
                          przyciągnie gwiazdy bachaty z całego świata
                        </h3>
                      </div>
                    </div>
                  </Link>
                  {/* KOLUMNA 3 (PRAWA) - Górny news */}
                  <Link href="/news/bachata-2" className="block group">
                    <div className="relative w-[300px] h-[180px] overflow-hidden">
                      <Image
                        src="/images/bachata-schools.jpg"
                        alt="Szkoła bachaty"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white text-[18px] leading-[24px] font-bold">
                          2a. Tajniki bachaty dominikańskiej. Instruktor z Santo
                          Domingo zdradza sekrety
                        </h3>
                      </div>
                    </div>
                  </Link>
                  {/* KOLUMNA 2 (ŚRODKOWA) - Dolny news */}
                  <Link href="/news/bachata-3" className="block group">
                    <div className="relative w-[300px] h-[180px] overflow-hidden">
                      <Image
                        src="/images/bachata-shoes.jpg"
                        alt="Buty do bachaty"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white text-[18px] leading-[24px] font-bold">
                          3a. Buty do bachaty - jak wybrać idealne? Eksperci
                          radzą na co zwrócić uwagę
                        </h3>
                      </div>
                    </div>
                  </Link>
                  {/* KOLUMNA 3 (PRAWA) - Dolny news */}
                  <Link href="/news/bachata-4" className="block group">
                    <div className="relative w-[300px] h-[180px] overflow-hidden">
                      <Image
                        src="/images/bachata-romance.jpg"
                        alt="Romantyczny taniec"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white text-[18px] leading-[24px] font-bold">
                          4a. Romeo Santos w Polsce! Król bachaty wystąpi na
                          wyjątkowym koncercie
                        </h3>
                      </div>
                    </div>
                  </Link>
                  {/* KOLUMNA 3 (PRAWA) - Dolny news */}
                  <Link href="/news/bachata-4" className="block group">
                    <div className="relative w-[300px] h-[180px] overflow-hidden">
                      <Image
                        src="/images/bachata-steps.jpg"
                        alt="Kroki bachaty"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white text-[18px] leading-[24px] font-bold">
                          4a. Rewolucyjna metoda nauki bachaty. Ta technika
                          zmienia sposób nauczania
                        </h3>
                      </div>
                    </div>
                  </Link>
                  {/* KOLUMNA 3 (PRAWA) - Dolny news */}
                  <Link href="/news/bachata-4" className="block group">
                    <div className="relative w-[300px] h-[180px] overflow-hidden">
                      <Image
                        src="/images/bachata-history.jpg"
                        alt="Historia bachaty"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white text-[18px] leading-[24px] font-bold">
                          4a. Historia bachaty - od muzyki zakazanej do
                          światowego fenomenu
                        </h3>
                      </div>
                    </div>
                  </Link>
                  {/* KOLUMNA 3 (PRAWA) - Dolny news */}
                  <Link href="/news/bachata-4" className="block group">
                    <div className="relative w-[300px] h-[180px] overflow-hidden">
                      <Image
                        src="/images/bachata-fusion.jpg"
                        alt="Fuzja stylów"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white text-[18px] leading-[24px] font-bold">
                          4a. Bachata i zdrowie - jak taniec wpływa na kondycję?
                          Nowe badania
                        </h3>
                      </div>
                    </div>
                  </Link>
                  {/* KOLUMNA 3 (PRAWA) - Dolny news */}
                  <Link href="/news/bachata-4" className="block group">
                    <div className="relative w-[300px] h-[180px] overflow-hidden">
                      <Image
                        src="/images/bachata-songs.jpg"
                        alt="Muzyka do bachaty"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white text-[18px] leading-[24px] font-bold">
                          4a. Mistrzostwa Polski w Bachacie 2024 - poznaj
                          faworytów
                        </h3>
                      </div>
                    </div>
                  </Link>
                  {/* KOLUMNA 3 (PRAWA) - Dolny news */}
                  <Link href="/news/bachata-4" className="block group">
                    <div className="relative w-[300px] h-[180px] overflow-hidden">
                      <Image
                        src="/images/bachata-outfit.jpg"
                        alt="Moda w bachacie"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white text-[18px] leading-[24px] font-bold">
                          4a. Moda w bachacie - trendy w strojach tanecznych na
                          nowy sezon
                        </h3>
                      </div>
                    </div>
                  </Link>
                  <Link href="/news/bachata-4" className="block group">
                    <div className="relative w-[300px] h-[180px] overflow-hidden">
                      <Image
                        src="/images/bachata-outfit.jpg"
                        alt="Moda w bachacie"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white text-[18px] leading-[24px] font-bold">
                          4a. Moda w bachacie - trendy w strojach tanecznych na
                          nowy sezon
                        </h3>
                      </div>
                    </div>
                  </Link>
                  <Link href="/news/bachata-4" className="block group">
                    <div className="relative w-[300px] h-[180px] overflow-hidden">
                      <Image
                        src="/images/bachata-outfit.jpg"
                        alt="Moda w bachacie"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white text-[18px] leading-[24px] font-bold">
                          4a. Moda w bachacie - trendy w strojach tanecznych na
                          nowy sezon
                        </h3>
                      </div>
                    </div>
                  </Link>
                  <Link href="/news/bachata-4" className="block group">
                    <div className="relative w-[300px] h-[180px] overflow-hidden">
                      <Image
                        src="/images/bachata-outfit.jpg"
                        alt="Moda w bachacie"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white text-[18px] leading-[24px] font-bold">
                          4a. Moda w bachacie - trendy w strojach tanecznych na
                          nowy sezon
                        </h3>
                      </div>
                    </div>
                  </Link>
                  <Link href="/news/bachata-4" className="block group">
                    <div className="relative w-[300px] h-[180px] overflow-hidden">
                      <Image
                        src="/images/bachata-outfit.jpg"
                        alt="Moda w bachacie"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white text-[18px] leading-[24px] font-bold">
                          4a. Moda w bachacie - trendy w strojach tanecznych na
                          nowy sezon
                        </h3>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* --------------------------------------- Sekcja ANKIETY ------------------------------------ */}
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

          {/*  ------------- Prawa kolumna - TEMATY DNIA  -------------  */}
          <div className="w-[20%]">
            <DailyTopics topics={topicsData} />

            {/* ------------- Nowa sekcja REKLAMY z dodanym odstępem mt-8 -------------  */}
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
