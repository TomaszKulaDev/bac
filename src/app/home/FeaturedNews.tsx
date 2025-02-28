"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface FeaturedArticle {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  slug: string;
}

export default function FeaturedNews() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Przykładowe dane - docelowo pobierane z API/CMS
  const featuredArticles: FeaturedArticle[] = [
    {
      id: "1",
      title: "Największy festiwal bachaty w Polsce już wkrótce",
      excerpt:
        "Poznaj szczegóły nadchodzącego wydarzenia, które zgromadzi najlepszych tancerzy z całego kraju.",
      image:
        "https://images.unsplash.com/photo-1545959570-a94084071b5d?q=80&w=1776&auto=format&fit=crop",
      category: "Wydarzenia",
      date: "2024-03-20",
      slug: "najwiekszy-festiwal-bachaty-2024",
    },
    {
      id: "2",
      title: "Daniel y Desiree - Mistrzowie wracają do Polski",
      excerpt:
        "Światowej sławy duet poprowadzi ekskluzywne warsztaty w największych miastach Polski.",
      image:
        "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?q=80&w=1770&auto=format&fit=crop",
      category: "Warsztaty",
      date: "2024-03-22",
      slug: "daniel-desiree-warsztaty-2024",
    },
    {
      id: "3",
      title: "Romeo Santos - Nowa płyta już dostępna",
      excerpt:
        "Król bachaty powraca z nowym albumem. Posłuchaj hitów, które zawładną parkietami.",
      image:
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1770&auto=format&fit=crop",
      category: "Muzyka",
      date: "2024-03-18",
      slug: "romeo-santos-nowa-plyta",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === featuredArticles.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? featuredArticles.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative h-full w-full rounded-2xl overflow-hidden bg-gray-900 shadow-lg">
      <AnimatePresence mode="wait">
        {featuredArticles.map(
          (article, index) =>
            index === currentSlide && (
              <motion.div
                key={article.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 group cursor-pointer"
              >
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-8">
                  <div className="max-w-2xl">
                    <span className="inline-block px-3 py-1 bg-amber-600 text-white text-sm font-medium rounded-full mb-4 shadow-sm">
                      {article.category}
                    </span>

                    <Link href={`/artykul/${article.slug}`}>
                      <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white group-hover:text-amber-200 transition-colors">
                        {article.title}
                      </h2>
                    </Link>

                    <p className="text-lg text-gray-200 mb-6 line-clamp-2">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center gap-4">
                      <time className="text-gray-300">
                        {new Date(article.date).toLocaleDateString("pl-PL", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </time>
                      <Link
                        href={`/artykul/${article.slug}`}
                        className="text-amber-400 font-medium hover:text-amber-300 transition-colors"
                      >
                        Czytaj więcej
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full bg-black/30 backdrop-blur-sm text-white 
                   hover:bg-amber-600/70 transition-colors pointer-events-auto shadow-md"
          aria-label="Poprzedni slajd"
        >
          <FaChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 rounded-full bg-black/30 backdrop-blur-sm text-white 
                   hover:bg-amber-600/70 transition-colors pointer-events-auto shadow-md"
          aria-label="Następny slajd"
        >
          <FaChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
        <motion.div
          className="h-full bg-amber-600"
          initial={{ width: "0%" }}
          animate={{
            width: `${((currentSlide + 1) / featuredArticles.length) * 100}%`,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}
