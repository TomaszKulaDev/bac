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

  // Przykładowe dane artykułów o bachacie
  const featuredArticles: NewsArticle[] = [
    {
      id: "1",
      title: "Mistrzostwa Polski w Bachacie 2024 - Znamy zwycięzców",
      image:
        "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?q=80&w=1770&auto=format&fit=crop",
      slug: "mistrzostwa-polski-bachata-2024",
    },
    {
      id: "2",
      title: "Nowy trend w bachacie - Fusion z elementami tańca współczesnego",
      image:
        "https://images.unsplash.com/photo-1545128485-c400ce7b23d5?q=80&w=1770&auto=format&fit=crop",
      slug: "nowy-trend-bachata-fusion",
    },
    {
      id: "3",
      title: "Międzynarodowy Festiwal Bachaty w Warszawie już w czerwcu",
      image:
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1770&auto=format&fit=crop",
      slug: "festiwal-bachaty-warszawa",
    },
  ];

  const secondaryArticles: NewsArticle[] = [
    {
      id: "4",
      title: "Top 5 szkół bachaty w Polsce według tancerzy",
      image:
        "https://images.unsplash.com/photo-1546805022-9f8c92733b86?q=80&w=1770&auto=format&fit=crop",
      slug: "top-szkoly-bachaty-polska",
    },
    {
      id: "5",
      title: "Romeo Santos ogłasza europejską trasę koncertową",
      image:
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1770&auto=format&fit=crop",
      slug: "romeo-santos-trasa-europa",
    },
    {
      id: "6",
      title: "Jak wybrać idealne buty do bachaty? Poradnik dla początkujących",
      image:
        "https://images.unsplash.com/photo-1535525153412-5a42439a210d?q=80&w=1770&auto=format&fit=crop",
      slug: "buty-do-bachaty-poradnik",
    },
    {
      id: "7",
      title: "Historia bachaty - Od muzyki wiejskiej do światowego fenomenu",
      image:
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1770&auto=format&fit=crop",
      slug: "historia-bachaty-fenomen",
    },
  ];

  const videoArticles: NewsArticle[] = [
    {
      id: "8",
      title: "Warsztaty online z mistrzami bachaty - Nowa seria lekcji",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1770&auto=format&fit=crop",
      slug: "warsztaty-online-bachata",
      hasVideo: true,
    },
    {
      id: "9",
      title: "Bachata Sensual vs Dominicana - Różnice w technice i stylu",
      image:
        "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?q=80&w=1770&auto=format&fit=crop",
      slug: "bachata-sensual-dominicana-roznice",
      hasVideo: true,
    },
    {
      id: "10",
      title: "Pokaz mistrzowski Daniel i Desiree na festiwalu w Krakowie",
      image:
        "https://images.unsplash.com/photo-1545128485-c400ce7b23d5?q=80&w=1770&auto=format&fit=crop",
      slug: "pokaz-daniel-desiree-krakow",
      hasVideo: true,
    },
    {
      id: "11",
      title: "Ćwiczenia rozciągające dla tancerzy bachaty - Seria wideo",
      image:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1770&auto=format&fit=crop",
      slug: "cwiczenia-rozciagajace-bachata",
      hasVideo: true,
    },
  ];

  const sidebarArticles: NewsArticle[] = [
    {
      id: "12",
      title: "Nowe kursy bachaty w Warszawie - Gdzie zacząć naukę?",
      image:
        "https://images.unsplash.com/photo-1546805022-9f8c92733b86?q=80&w=1770&auto=format&fit=crop",
      slug: "kursy-bachaty-warszawa",
      category: "KURSY",
    },
    {
      id: "13",
      title: "Bachata Moderna - Nowy styl podbija polskie parkiety",
      image: "",
      slug: "bachata-moderna-nowy-styl",
      category: "STYLE",
    },
    {
      id: "14",
      title: "Jak znaleźć partnera do bachaty? Porady dla solistów",
      image: "",
      slug: "partner-do-bachaty-porady",
      category: "PORADY",
    },
    {
      id: "15",
      title: "Weekendowe social dance w największych miastach Polski",
      image: "",
      slug: "social-dance-polska",
      category: "WYDARZENIA",
    },
    {
      id: "16",
      title: "KALENDARZ FESTIWALI BACHATY 2024 - POLSKA I EUROPA",
      image: "",
      slug: "kalendarz-festiwali-2024",
      category: "WYDARZENIA",
    },
    {
      id: "17",
      title: "Muzyka do bachaty - Najnowsze hity i klasyki gatunku",
      image: "",
      slug: "muzyka-do-bachaty-hity",
      category: "MUZYKA",
    },
    {
      id: "18",
      title: "Bachata Fusion - Łączenie stylów tanecznych",
      image: "",
      slug: "bachata-fusion-style",
      category: "STYLE",
    },
    {
      id: "19",
      title: "Polscy instruktorzy na międzynarodowych festiwalach",
      image: "",
      slug: "polscy-instruktorzy-festiwale",
      category: "LUDZIE",
    },
    {
      id: "20",
      title: "Technika prowadzenia w bachacie - Warsztaty dla mężczyzn",
      image: "",
      slug: "technika-prowadzenia-warsztaty",
      category: "KURSY",
    },
    {
      id: "21",
      title:
        "Poland Bachata League - Nowa edycja konkursu dla tancerzy amatorów",
      image: "",
      slug: "poland-bachata-league-konkurs",
      category: "KONKURSY",
    },
  ];

  // Ensure we have a valid article for the last sidebar position
  const lastSidebarArticle =
    sidebarArticles.length > 10
      ? sidebarArticles[10]
      : {
          id: "last",
          title:
            "Poland Bachata League - Nowa edycja konkursu dla tancerzy amatorów",
          image: "",
          slug: "poland-bachata-league-konkurs",
          category: "KONKURSY",
        };

  return (
    <div className="bg-slate-50 text-gray-900 py-8">
      <div className="max-w-[1600px] mx-auto px-8">
        <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-3">
          <h1 className="text-2xl font-bold">Aktualności Bachata</h1>
          <div className="flex space-x-4">
            <Link
              href="/wydarzenia"
              className="text-amber-600 font-bold hover:text-amber-700"
            >
              #WYDARZENIA
            </Link>
            <Link
              href="/kursy"
              className="text-amber-600 font-bold hover:text-amber-700"
            >
              #KURSY
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Main featured articles - first row */}
          <div className="col-span-12 lg:col-span-8 grid grid-cols-12 gap-4">
            {/* Large featured article */}
            <div className="col-span-12 md:col-span-6 row-span-2">
              <motion.div
                className="relative h-[400px] rounded-none overflow-hidden shadow-md"
                onHoverStart={() => setHoveredArticle(featuredArticles[0].id)}
                onHoverEnd={() => setHoveredArticle(null)}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h2 className="text-xl font-bold leading-tight text-white group-hover:text-amber-200">
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
                  className="relative h-[190px] rounded-none overflow-hidden shadow-md"
                  onHoverStart={() => setHoveredArticle(featuredArticles[1].id)}
                  onHoverEnd={() => setHoveredArticle(null)}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h2 className="text-lg font-bold leading-tight text-white group-hover:text-amber-200">
                        {featuredArticles[1].title}
                      </h2>
                    </div>
                  </Link>
                </motion.div>
              </div>
              <div className="col-span-12">
                <motion.div
                  className="relative h-[190px] rounded-none overflow-hidden shadow-md"
                  onHoverStart={() => setHoveredArticle(featuredArticles[2].id)}
                  onHoverEnd={() => setHoveredArticle(null)}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h2 className="text-lg font-bold leading-tight text-white group-hover:text-amber-200">
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
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
                whileHover={{ x: 3 }}
              >
                {article.image && (
                  <div className="relative w-16 h-16 flex-shrink-0 rounded-none overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-sm leading-tight text-gray-800 hover:text-amber-600">
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
                  className="relative h-[120px] rounded-none overflow-hidden shadow-md"
                  onHoverStart={() => setHoveredArticle(article.id)}
                  onHoverEnd={() => setHoveredArticle(null)}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h2 className="text-sm font-bold leading-tight text-white group-hover:text-amber-200">
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
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
                whileHover={{ x: 3 }}
              >
                {article.image && (
                  <div className="relative w-16 h-16 flex-shrink-0 rounded-none overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-sm leading-tight text-gray-800 hover:text-amber-600">
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
                  className="relative h-[120px] rounded-none overflow-hidden shadow-md"
                  onHoverStart={() => setHoveredArticle(article.id)}
                  onHoverEnd={() => setHoveredArticle(null)}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                    {article.hasVideo && (
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-amber-600/80 rounded-full flex items-center justify-center">
                        <FaPlay className="text-white ml-1" />
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h2 className="text-sm font-bold leading-tight text-white group-hover:text-amber-200">
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
            <div className="bg-amber-600 p-2 rounded mb-2 inline-block text-xs font-bold text-white">
              POLAND BACHATA LEAGUE
            </div>
            <motion.div
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
              whileHover={{ x: 3 }}
            >
              <div>
                <h3 className="font-bold text-sm leading-tight text-gray-800 hover:text-amber-600">
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
