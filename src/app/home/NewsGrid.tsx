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
  author?: {
    name: string;
    avatar: string;
  };
}

export default function NewsGrid() {
  const [hoveredArticle, setHoveredArticle] = useState<string | null>(null);

  // Przykładowe dane artykułów o bachacie
  const featuredArticles: NewsArticle[] = [
    {
      id: "1",
      title:
        "Światowy Kongres Bachaty 2024 - Największe wydarzenie roku już w czerwcu",
      image:
        "https://images.unsplash.com/photo-1545128485-c400ce7b23d5?q=80&w=1770&auto=format&fit=crop",
      slug: "swiatowy-kongres-bachaty-2024",
      author: {
        name: "Maria Rodriguez",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      },
    },
    {
      id: "2",
      title:
        "Nowe trendy w bachacie na 2024 rok. Dominikańska tradycja wraca do łask",
      image:
        "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?q=80&w=1770&auto=format&fit=crop",
      slug: "nowe-trendy-bachata-2024",
    },
    {
      id: "3",
      title: "Bachata Sensual - nowy wymiar bliskości w tańcu. Jak zacząć?",
      image:
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1770&auto=format&fit=crop",
      slug: "bachata-sensual-nowy-wymiar",
      author: {
        name: "Carlos Mendez",
        avatar: "https://randomuser.me/api/portraits/men/42.jpg",
      },
    },
  ];

  const secondaryArticles: NewsArticle[] = [
    {
      id: "4",
      title:
        "Mistrzowie bachaty z Dominikany przyjeżdżają do Polski na warsztaty",
      image:
        "https://images.unsplash.com/photo-1546805022-9f8c92733b86?q=80&w=1770&auto=format&fit=crop",
      slug: "mistrzowie-bachaty-warsztaty",
      author: {
        name: "Sofia Garcia",
        avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      },
    },
    {
      id: "5",
      title: "Festiwal Bachata Fusion 2024 - Zapisy otwarte do końca miesiąca",
      image:
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1770&auto=format&fit=crop",
      slug: "festiwal-bachata-fusion-2024",
      author: {
        name: "Juan Perez",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      },
    },
    {
      id: "6",
      title:
        'Muzyka do bachaty - "Nowy album Romeo Santosa bije rekordy popularności"',
      image:
        "https://images.unsplash.com/photo-1535525153412-5a42439a210d?q=80&w=1770&auto=format&fit=crop",
      slug: "romeo-santos-nowy-album",
    },
    {
      id: "7",
      title: "Mistrzostwa Polski w Bachacie - Zgłoszenia tylko do 15 czerwca",
      image:
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1770&auto=format&fit=crop",
      slug: "mistrzostwa-polski-bachata",
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
      title: "Jak wybrać idealne buty do bachaty? Poradnik dla początkujących",
      image:
        "https://images.unsplash.com/photo-1535525153412-5a42439a210d?q=80&w=1770&auto=format&fit=crop",
      slug: "buty-do-bachaty-poradnik",
      category: "PORADY",
    },
    {
      id: "13",
      title: "Top 5 szkół bachaty w Polsce według tancerzy",
      image: "",
      slug: "top-szkoly-bachaty-polska",
      category: "RANKING",
    },
    {
      id: "14",
      title: "Bachata w parach - nowy trend na parkietach całego świata",
      image: "",
      slug: "bachata-w-parach-trend",
      category: "TRENDY",
    },
    {
      id: "15",
      title: "Historia bachaty - Od muzyki wiejskiej do światowego fenomenu",
      image: "",
      slug: "historia-bachaty-fenomen",
      category: "HISTORIA",
    },
    {
      id: "16",
      title: "Weekendowe social dance w największych miastach Polski",
      image: "",
      slug: "social-dance-polska",
      category: "WYDARZENIA",
    },
    {
      id: "17",
      title: "Technika prowadzenia w bachacie - Warsztaty dla mężczyzn",
      image: "",
      slug: "technika-prowadzenia-warsztaty",
      category: "KURSY",
    },
    {
      id: "18",
      title: "Jak znaleźć partnera do bachaty? Porady dla solistów",
      image: "",
      slug: "partner-do-bachaty-porady",
      category: "PORADY",
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
      title: "Bachata Moderna - Nowy styl podbija polskie parkiety",
      image: "",
      slug: "bachata-moderna-nowy-styl",
      category: "STYLE",
    },
    {
      id: "21",
      title: "KALENDARZ FESTIWALI BACHATY 2024 - POLSKA I EUROPA",
      image: "",
      slug: "kalendarz-festiwali-2024",
      category: "WYDARZENIA",
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
    <div className="bg-white text-gray-900 py-4">
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="bg-yellow-400 rounded-full w-8 h-8 flex items-center justify-center mr-2">
              <span className="font-bold text-black">W</span>
            </div>
            <h1 className="text-base font-bold uppercase">
              WYBRANE DLA CIEBIE
            </h1>
          </div>
          <div>
            <Link href="/onet-posty" className="text-sm hover:underline">
              Zobacz Onet Posty!
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Main featured articles - first row */}
          <div className="col-span-12 lg:col-span-8 grid grid-cols-12 gap-4">
            {/* Large featured article */}
            <div className="col-span-12 md:col-span-8 row-span-1">
              <div className="relative overflow-hidden shadow-sm">
                <Link
                  href={`/artykul/${featuredArticles[0].slug}`}
                  className="block"
                >
                  <Image
                    src={featuredArticles[0].image}
                    alt={featuredArticles[0].title}
                    width={800}
                    height={450}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h2 className="text-xl font-bold leading-tight text-white">
                      {featuredArticles[0].title}
                    </h2>
                  </div>
                </Link>
                {featuredArticles[0].author && (
                  <div className="absolute bottom-4 right-4 flex items-center">
                    <div className="flex items-center mr-2">
                      <Image
                        src={featuredArticles[0].author.avatar}
                        alt={featuredArticles[0].author.name}
                        width={24}
                        height={24}
                        className="rounded-full mr-2"
                      />
                      <span className="text-white text-sm">
                        {featuredArticles[0].author.name}
                      </span>
                    </div>
                    <button className="bg-transparent border border-white text-white text-xs px-2 py-1 rounded-sm hover:bg-white/20">
                      Obserwuj
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Medium featured articles */}
            <div className="col-span-12 md:col-span-4 grid grid-rows-2 gap-4">
              <div className="row-span-1">
                <div className="relative overflow-hidden shadow-sm">
                  <Link
                    href={`/artykul/${featuredArticles[1].slug}`}
                    className="block"
                  >
                    <Image
                      src={featuredArticles[1].image}
                      alt={featuredArticles[1].title}
                      width={400}
                      height={225}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h2 className="text-base font-bold leading-tight text-white">
                        {featuredArticles[1].title}
                      </h2>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="row-span-1">
                <div className="relative overflow-hidden shadow-sm">
                  <Link
                    href={`/artykul/${featuredArticles[2].slug}`}
                    className="block"
                  >
                    <Image
                      src={featuredArticles[2].image}
                      alt={featuredArticles[2].title}
                      width={400}
                      height={225}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h2 className="text-base font-bold leading-tight text-white">
                        {featuredArticles[2].title}
                      </h2>
                    </div>
                  </Link>
                  {featuredArticles[2].author && (
                    <div className="absolute bottom-3 right-3 flex items-center">
                      <div className="flex items-center mr-2">
                        <Image
                          src={featuredArticles[2].author.avatar}
                          alt={featuredArticles[2].author.name}
                          width={20}
                          height={20}
                          className="rounded-full mr-1"
                        />
                        <span className="text-white text-xs">
                          {featuredArticles[2].author.name}
                        </span>
                      </div>
                      <button className="bg-transparent border border-white text-white text-xs px-1.5 py-0.5 rounded-sm hover:bg-white/20">
                        Obserwuj
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar articles */}
          <div className="col-span-12 lg:col-span-4">
            <div className="flex items-center mb-2">
              <div className="bg-yellow-400 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                <span className="font-bold text-black">T</span>
              </div>
              <h2 className="text-base font-bold uppercase">TANIEC</h2>
            </div>
            <div className="space-y-2">
              {sidebarArticles.slice(1, 10).map((article) => (
                <div key={article.id} className="border-t border-gray-200 pt-2">
                  <Link href={`/artykul/${article.slug}`} className="block">
                    <h3 className="text-sm font-bold hover:text-blue-600">
                      {article.title}
                    </h3>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Second row - 4 medium articles */}
          <div className="col-span-12 lg:col-span-8 grid grid-cols-12 gap-4">
            {secondaryArticles.slice(0, 4).map((article, index) => (
              <div
                key={article.id}
                className="col-span-12 sm:col-span-6 md:col-span-3"
              >
                <div className="relative overflow-hidden shadow-sm">
                  <Link href={`/artykul/${article.slug}`} className="block">
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={200}
                      height={150}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                      <h2 className="text-sm font-bold leading-tight text-white">
                        {article.title}
                      </h2>
                    </div>
                  </Link>
                  {article.author && (
                    <div className="absolute bottom-2 right-2">
                      <Image
                        src={article.author.avatar}
                        alt={article.author.name}
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
