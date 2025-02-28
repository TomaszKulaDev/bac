"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";

interface NewsArticle {
  id: string;
  title: string;
  image: string;
  slug: string;
  category?: string;
  hasVideo?: boolean;
}

export default function NewsGrid() {
  const [hoveredArticle, setHoveredArticle] = useState<string | null>(null);

  // Przykładowe dane artykułów
  const featuredArticles: NewsArticle[] = [
    {
      id: "1",
      title: 'Jest decyzja ws. koni z Morskiego Oka. "Historyczny moment"',
      image:
        "https://images.unsplash.com/photo-1551993186-9f3995d7ed05?q=80&w=1770&auto=format&fit=crop",
      slug: "decyzja-konie-morskie-oko",
    },
    {
      id: "2",
      title: "Pobite i pogryzione niemowlę. Zarzuty dla rodziców",
      image:
        "https://images.unsplash.com/photo-1617575521317-d2974f3b56d2?q=80&w=1770&auto=format&fit=crop",
      slug: "pobite-niemowle-zarzuty",
    },
    {
      id: "3",
      title: "Będzie kolejny szczyt ws. Ukrainy. Wśród zaproszonych Tusk",
      image:
        "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=1770&auto=format&fit=crop",
      slug: "szczyt-ukraina-tusk",
    },
  ];

  const secondaryArticles: NewsArticle[] = [
    {
      id: "4",
      title: "Niebezpieczna pogoda w weekend. Od poniedziałku duże zmiany",
      image:
        "https://images.unsplash.com/photo-1500740516770-92bd004b996e?q=80&w=1772&auto=format&fit=crop",
      slug: "niebezpieczna-pogoda-weekend",
    },
    {
      id: "5",
      title: "Przez moment był bogatszy od Muska. Przelali mu 81 bilionów",
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1770&auto=format&fit=crop",
      slug: "bogatszy-od-muska",
    },
    {
      id: "6",
      title: "Makabryczne odkrycie na Mokotowie. Ciała ojca i syna",
      image:
        "https://images.unsplash.com/photo-1617575521317-d2974f3b56d2?q=80&w=1770&auto=format&fit=crop",
      slug: "makabryczne-odkrycie-mokotow",
    },
    {
      id: "7",
      title: "Gene Hackman i jego żona nie żyją. Szokujący zapis rozmowy",
      image:
        "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=1770&auto=format&fit=crop",
      slug: "gene-hackman-zona-nie-zyja",
    },
  ];

  const videoArticles: NewsArticle[] = [
    {
      id: "8",
      title: "Jagiellonia wnosi skargę do UEFA. Chodzi o mecz z Legią",
      image:
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1776&auto=format&fit=crop",
      slug: "jagiellonia-skarga-uefa",
      hasVideo: false,
    },
    {
      id: "9",
      title: "Cyklon Garance niszczy tropikalną wyspę. Pierwsza ofiara",
      image:
        "https://images.unsplash.com/photo-1504253163759-c23fccaebb55?q=80&w=1770&auto=format&fit=crop",
      slug: "cyklon-garance-wyspa",
      hasVideo: true,
    },
    {
      id: "10",
      title: "Jechał fiatem na czołówkę z tirem. Miał ponad 2 promile",
      image:
        "https://images.unsplash.com/photo-1566024164372-0281f1133aa6?q=80&w=1771&auto=format&fit=crop",
      slug: "fiat-czolowka-tir",
      hasVideo: true,
    },
    {
      id: "11",
      title: "Przebłysk Piotra Żyły w Trondheim. Do podium jednak daleko",
      image:
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=1770&auto=format&fit=crop",
      slug: "piotr-zyla-trondheim",
      hasVideo: false,
    },
  ];

  const sidebarArticles: NewsArticle[] = [
    {
      id: "12",
      title: 'Zełenski komentuje awanturę w Białym Domu. "Dziękuję Ameryko"',
      image:
        "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=1770&auto=format&fit=crop",
      slug: "zelenski-komentuje-awanture",
      category: "POLSKA",
    },
    {
      id: "13",
      title: 'Macron za Zełenskim. "Należy szanować tych, którzy walczą"',
      image: "",
      slug: "macron-za-zelenskim",
      category: "ŚWIAT",
    },
    {
      id: "14",
      title: "Rosyjski reporter wyproszony ze spotkania Trumpa z Zełenskim",
      image: "",
      slug: "rosyjski-reporter-wyproszony",
      category: "ŚWIAT",
    },
    {
      id: "15",
      title: "Radomiak ratuje remis. Kuriozalny gol pogrążył Widzew",
      image: "",
      slug: "radomiak-remis-widzew",
      category: "POLSKA",
    },
    {
      id: "16",
      title: "Ekstraklasa. WYNIKI, TERMINARZ, TABELA",
      image: "",
      slug: "ekstraklasa-wyniki-terminarz",
      category: "POLSKA",
    },
    {
      id: "17",
      title: 'Tusk wspiera Zełenskiego. "Nie jesteście sami"',
      image: "",
      slug: "tusk-wspiera-zelenskiego",
      category: "POLSKA",
    },
    {
      id: "18",
      title: "Fiasko rozmów. Zełenski opuścił Biały Dom",
      image: "",
      slug: "fiasko-rozmow-zelenski",
      category: "ŚWIAT",
    },
    {
      id: "19",
      title: "Trump: jestem bardzo zaangażowany na rzecz Polski",
      image: "",
      slug: "trump-zaangazowany-polska",
      category: "POLSKA",
    },
    {
      id: "20",
      title: "Sędzia wciągał kokainę podczas Euro. UEFA podjęła decyzję",
      image: "",
      slug: "sedzia-kokaina-euro",
      category: "ŚWIAT",
    },
    {
      id: "21",
      title:
        "Sachajko o umowie Ukraina-USA: ważne, żeby Polska też miała udział w zyskach",
      image: "",
      slug: "sachajko-umowa-ukraina-usa",
      category: "POLSKA",
    },
  ];

  // Ensure we have a valid article for the last sidebar position
  const lastSidebarArticle =
    sidebarArticles.length > 10
      ? sidebarArticles[10]
      : {
          id: "last",
          title:
            "Sachajko o umowie Ukraina-USA: ważne, żeby Polska też miała udział w zyskach",
          image: "",
          slug: "sachajko-umowa-ukraina-usa",
          category: "POLSKA",
        };

  return (
    <div className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Wiadomości</h1>
          <div className="flex space-x-4">
            <Link
              href="/polska"
              className="text-white font-bold hover:text-gray-300"
            >
              #POLSKA
            </Link>
            <Link
              href="/swiat"
              className="text-white font-bold hover:text-gray-300"
            >
              #ŚWIAT
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Main featured articles - first row */}
          <div className="col-span-12 lg:col-span-8 grid grid-cols-12 gap-4">
            {/* Large featured article */}
            <div className="col-span-12 md:col-span-6 row-span-2">
              <motion.div
                className="relative h-[400px] rounded overflow-hidden"
                onHoverStart={() => setHoveredArticle(featuredArticles[0].id)}
                onHoverEnd={() => setHoveredArticle(null)}
                whileHover={{ scale: 1.01 }}
              >
                <Link
                  href={`/artykul/${featuredArticles[0].slug}`}
                  className="block h-full"
                >
                  <Image
                    src={featuredArticles[0].image}
                    alt={featuredArticles[0].title}
                    fill
                    className={`object-cover transition-transform duration-700 ${
                      hoveredArticle === featuredArticles[0].id
                        ? "scale-105"
                        : "scale-100"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h2 className="text-xl font-bold leading-tight">
                      {featuredArticles[0].title}
                    </h2>
                  </div>
                </Link>
              </motion.div>
            </div>

            {/* Medium featured articles */}
            <div className="col-span-12 md:col-span-6 grid grid-cols-12 gap-4">
              <div className="col-span-12">
                <motion.div
                  className="relative h-[190px] rounded overflow-hidden"
                  onHoverStart={() => setHoveredArticle(featuredArticles[1].id)}
                  onHoverEnd={() => setHoveredArticle(null)}
                  whileHover={{ scale: 1.01 }}
                >
                  <Link
                    href={`/artykul/${featuredArticles[1].slug}`}
                    className="block h-full"
                  >
                    <Image
                      src={featuredArticles[1].image}
                      alt={featuredArticles[1].title}
                      fill
                      className={`object-cover transition-transform duration-700 ${
                        hoveredArticle === featuredArticles[1].id
                          ? "scale-105"
                          : "scale-100"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h2 className="text-lg font-bold leading-tight">
                        {featuredArticles[1].title}
                      </h2>
                    </div>
                  </Link>
                </motion.div>
              </div>
              <div className="col-span-12">
                <motion.div
                  className="relative h-[190px] rounded overflow-hidden"
                  onHoverStart={() => setHoveredArticle(featuredArticles[2].id)}
                  onHoverEnd={() => setHoveredArticle(null)}
                  whileHover={{ scale: 1.01 }}
                >
                  <Link
                    href={`/artykul/${featuredArticles[2].slug}`}
                    className="block h-full"
                  >
                    <Image
                      src={featuredArticles[2].image}
                      alt={featuredArticles[2].title}
                      fill
                      className={`object-cover transition-transform duration-700 ${
                        hoveredArticle === featuredArticles[2].id
                          ? "scale-105"
                          : "scale-100"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h2 className="text-lg font-bold leading-tight">
                        {featuredArticles[2].title}
                      </h2>
                    </div>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Sidebar articles */}
          <div className="col-span-12 lg:col-span-4 space-y-4">
            {sidebarArticles.slice(0, 5).map((article) => (
              <motion.div
                key={article.id}
                className="flex items-center gap-3"
                whileHover={{ x: 3 }}
              >
                {article.image && (
                  <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-sm leading-tight">
                    {article.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Second row - 4 medium articles */}
          <div className="col-span-12 lg:col-span-8 grid grid-cols-12 gap-4">
            {secondaryArticles.map((article) => (
              <div
                key={article.id}
                className="col-span-12 sm:col-span-6 md:col-span-3"
              >
                <motion.div
                  className="relative h-[120px] rounded overflow-hidden"
                  onHoverStart={() => setHoveredArticle(article.id)}
                  onHoverEnd={() => setHoveredArticle(null)}
                  whileHover={{ scale: 1.01 }}
                >
                  <Link
                    href={`/artykul/${article.slug}`}
                    className="block h-full"
                  >
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className={`object-cover transition-transform duration-700 ${
                        hoveredArticle === article.id
                          ? "scale-105"
                          : "scale-100"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h2 className="text-sm font-bold leading-tight">
                        {article.title}
                      </h2>
                    </div>
                  </Link>
                </motion.div>
              </div>
            ))}
          </div>

          {/* More sidebar articles */}
          <div className="col-span-12 lg:col-span-4 space-y-4">
            {sidebarArticles.slice(5, 10).map((article) => (
              <motion.div
                key={article.id}
                className="flex items-center gap-3"
                whileHover={{ x: 3 }}
              >
                {article.image && (
                  <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-sm leading-tight">
                    {article.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Third row - Video articles */}
          <div className="col-span-12 lg:col-span-8 grid grid-cols-12 gap-4">
            {videoArticles.map((article) => (
              <div
                key={article.id}
                className="col-span-12 sm:col-span-6 md:col-span-3"
              >
                <motion.div
                  className="relative h-[120px] rounded overflow-hidden"
                  onHoverStart={() => setHoveredArticle(article.id)}
                  onHoverEnd={() => setHoveredArticle(null)}
                  whileHover={{ scale: 1.01 }}
                >
                  <Link
                    href={`/artykul/${article.slug}`}
                    className="block h-full"
                  >
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className={`object-cover transition-transform duration-700 ${
                        hoveredArticle === article.id
                          ? "scale-105"
                          : "scale-100"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                    {article.hasVideo && (
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 rounded-full flex items-center justify-center">
                        <FaPlay className="text-white ml-1" />
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h2 className="text-sm font-bold leading-tight">
                        {article.title}
                      </h2>
                    </div>
                  </Link>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Last sidebar article */}
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-red-600 p-2 rounded mb-2 inline-block text-xs font-bold">
              POLSKIE RADIO 24
            </div>
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ x: 3 }}
            >
              <div>
                <h3 className="font-bold text-sm leading-tight">
                  {lastSidebarArticle.title}
                </h3>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
