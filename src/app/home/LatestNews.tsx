"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegClock, FaRegBookmark, FaBookmark, FaShare } from "react-icons/fa";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  slug: string;
  readTime: string;
  tags?: string[];
}

export default function LatestNews() {
  const [articles, setArticles] = useState<Article[]>([
    {
      id: "1",
      title: "10 najlepszych szkół tańca w Warszawie",
      excerpt:
        "Przegląd najlepszych szkół tańca w stolicy, gdzie możesz rozpocząć swoją przygodę z bachatą.",
      image:
        "https://images.unsplash.com/photo-1546805022-9f8c92733b86?q=80&w=1770&auto=format&fit=crop",
      category: "Ranking",
      date: "2024-03-19",
      slug: "najlepsze-szkoly-tanca-warszawa",
      readTime: "5 min",
      tags: ["szkoły", "warszawa", "ranking"],
    },
    {
      id: "2",
      title: "Jak wybrać pierwsze buty do tańca?",
      excerpt:
        "Poradnik dla początkujących tancerzy - na co zwrócić uwagę przy wyborze pierwszych butów tanecznych.",
      image:
        "https://images.unsplash.com/photo-1535525153412-5a42439a210d?q=80&w=1770&auto=format&fit=crop",
      category: "Poradnik",
      date: "2024-03-18",
      slug: "jak-wybrac-buty-do-tanca",
      readTime: "4 min",
      tags: ["porady", "sprzęt", "początkujący"],
    },
    {
      id: "3",
      title: "Muzyka bachatowa - historia i współczesność",
      excerpt:
        "Od tradycyjnych korzeni po nowoczesne brzmienia - poznaj historię muzyki bachatowej.",
      image:
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1770&auto=format&fit=crop",
      category: "Historia",
      date: "2024-03-17",
      slug: "historia-muzyki-bachatowej",
      readTime: "7 min",
      tags: ["muzyka", "historia", "kultura"],
    },
    {
      id: "4",
      title: "Bachata Sensual vs Dominicana",
      excerpt:
        "Poznaj różnice między dwoma najpopularniejszymi stylami bachaty i wybierz swój ulubiony.",
      image:
        "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?q=80&w=1770&auto=format&fit=crop",
      category: "Edukacja",
      date: "2024-03-16",
      slug: "bachata-sensual-vs-dominicana",
      readTime: "6 min",
      tags: ["style", "technika", "porównanie"],
    },
  ]);

  const [activeFilter, setActiveFilter] = useState("wszystkie");
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [savedArticles, setSavedArticles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Filtrowanie artykułów
  useEffect(() => {
    if (activeFilter === "wszystkie") {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter(
        (article) =>
          article.category.toLowerCase() === activeFilter ||
          article.tags?.includes(activeFilter)
      );
      setFilteredArticles(filtered);
    }
  }, [activeFilter, articles]);

  // Symulacja ładowania większej ilości artykułów
  const loadMoreArticles = () => {
    setIsLoading(true);

    // Symulacja opóźnienia ładowania
    setTimeout(() => {
      const newArticles = [
        {
          id: "5",
          title: "Najlepsze playlisty do tańczenia bachaty w domu",
          excerpt:
            "Zestawienie playlist ze Spotify i YouTube, które pomogą ci ćwiczyć bachatę w domowym zaciszu.",
          image:
            "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1770&auto=format&fit=crop",
          category: "Muzyka",
          date: "2024-03-15",
          slug: "playlisty-do-tanca-w-domu",
          readTime: "3 min",
          tags: ["muzyka", "ćwiczenia", "dom"],
        },
        {
          id: "6",
          title: "Jak przygotować się do pierwszego festiwalu bachaty?",
          excerpt:
            "Praktyczne wskazówki dla osób, które po raz pierwszy wybierają się na festiwal taneczny.",
          image:
            "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1770&auto=format&fit=crop",
          category: "Wydarzenia",
          date: "2024-03-14",
          slug: "przygotowanie-do-festiwalu",
          readTime: "8 min",
          tags: ["festiwale", "porady", "wydarzenia"],
        },
      ];

      setArticles((prev) => [...prev, ...newArticles]);
      setIsLoading(false);
    }, 1500);
  };

  // Zapisywanie/usuwanie artykułu
  const toggleSaveArticle = (id: string) => {
    if (savedArticles.includes(id)) {
      setSavedArticles((prev) => prev.filter((articleId) => articleId !== id));
    } else {
      setSavedArticles((prev) => [...prev, id]);
    }
  };

  // Symulacja udostępniania artykułu
  const shareArticle = (slug: string) => {
    // W rzeczywistej aplikacji tutaj byłaby implementacja udostępniania
    alert(`Udostępniono artykuł: ${slug}`);
  };

  return (
    <div className="space-y-16">
      {/* Filtry kategorii */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => setActiveFilter("wszystkie")}
          className={`px-4 py-2 rounded-none text-sm font-medium transition-all ${
            activeFilter === "wszystkie"
              ? "bg-amber-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Wszystkie
        </button>
        <button
          onClick={() => setActiveFilter("ranking")}
          className={`px-4 py-2 rounded-none text-sm font-medium transition-all ${
            activeFilter === "ranking"
              ? "bg-amber-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Rankingi
        </button>
        <button
          onClick={() => setActiveFilter("poradnik")}
          className={`px-4 py-2 rounded-none text-sm font-medium transition-all ${
            activeFilter === "poradnik"
              ? "bg-amber-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Poradniki
        </button>
        <button
          onClick={() => setActiveFilter("historia")}
          className={`px-4 py-2 rounded-none text-sm font-medium transition-all ${
            activeFilter === "historia"
              ? "bg-amber-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Historia
        </button>
        <button
          onClick={() => setActiveFilter("edukacja")}
          className={`px-4 py-2 rounded-none text-sm font-medium transition-all ${
            activeFilter === "edukacja"
              ? "bg-amber-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Edukacja
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-16"
        >
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                Nie znaleziono artykułów w tej kategorii.
              </p>
            </div>
          ) : (
            filteredArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group grid md:grid-cols-2 gap-8 relative"
              >
                {/* Image */}
                <Link href={`/artykul/${article.slug}`} className="block">
                  <div className="aspect-[16/10] rounded-none overflow-hidden bg-gray-100 shadow-md relative">
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={800}
                      height={500}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </Link>

                {/* Content */}
                <div className="flex flex-col justify-center">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="px-3 py-1 bg-amber-100 text-amber-800 font-medium rounded-none shadow-sm">
                        {article.category}
                      </span>
                      <time className="text-gray-500 flex items-center gap-1">
                        <FaRegClock className="w-3.5 h-3.5" />
                        {new Date(article.date).toLocaleDateString("pl-PL", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </time>
                      <span className="text-gray-500">{article.readTime}</span>
                    </div>

                    <Link href={`/artykul/${article.slug}`}>
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                        {article.title}
                      </h3>
                    </Link>

                    <p className="text-gray-600 leading-relaxed">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      <Link
                        href={`/artykul/${article.slug}`}
                        className="inline-flex items-center gap-2 text-amber-600 font-medium hover:text-amber-700 transition-colors"
                      >
                        Czytaj więcej
                        <svg
                          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
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

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleSaveArticle(article.id)}
                          className="p-2 text-gray-400 hover:text-amber-600 transition-colors"
                          aria-label={
                            savedArticles.includes(article.id)
                              ? "Usuń z zapisanych"
                              : "Zapisz artykuł"
                          }
                        >
                          {savedArticles.includes(article.id) ? (
                            <FaBookmark className="w-4 h-4 text-amber-600" />
                          ) : (
                            <FaRegBookmark className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => shareArticle(article.slug)}
                          className="p-2 text-gray-400 hover:text-amber-600 transition-colors"
                          aria-label="Udostępnij"
                        >
                          <FaShare className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {article.tags && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {article.tags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => setActiveFilter(tag)}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-none hover:bg-gray-200 transition-colors"
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            ))
          )}
        </motion.div>
      </AnimatePresence>

      <div className="text-center pt-8">
        <button
          onClick={loadMoreArticles}
          disabled={isLoading}
          className="px-8 py-3 text-amber-600 font-medium border-2 border-amber-600 
                   rounded-none hover:bg-amber-600 hover:text-white transition-colors shadow-sm 
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Ładowanie...
            </span>
          ) : (
            "Załaduj więcej artykułów"
          )}
        </button>
      </div>
    </div>
  );
}
