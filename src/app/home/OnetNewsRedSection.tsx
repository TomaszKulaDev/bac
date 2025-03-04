"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaRegComment, FaShare } from "react-icons/fa";
import { redSectionArticles } from "./data/articlesData";

/**
 * OnetNewsSection - Komponent wyświetlający sekcję wiadomości w stylu Onet
 *
 * Struktura komponentu:
 * 1. Nagłówek sekcji z kategorią
 * 2. Główny kontener z tłem (żółty #ffd200)
 * 3. Układ siatki z głównym artykułem po lewej i mniejszymi artykułami po prawej
 * 4. Sekcja "SKRÓT WYDARZEŃ" z czterema mniejszymi artykułami
 * 5. Dolny rząd artykułów (4 artykuły w jednym rzędzie)
 */
export default function OnetNewsSection() {
  // Dopracowana paleta kolorów
  const colors = {
    primary: "bg-[#ffd200]", // Główny kolor tła - żółty #ffd200
    primaryLight: "bg-[#fff3b8]", // Jaśniejsza wersja głównego koloru
    primaryHover: "bg-[#f0c800]", // Ciemniejsza wersja do hover
    secondary: "bg-[#000000]", // Kolor uzupełniający (czarny)
    secondaryDark: "bg-[#1a1a1a]", // Ciemniejszy czarny
    accent: "bg-[#000000]", // Kolor akcentujący (czarny)
    dark: "bg-[#000000]", // Ciemny kolor do kontrastów
    text: "text-[#333333]", // Główny kolor tekstu (ciemny na żółtym tle)
    textLight: "text-white", // Jasny tekst na ciemnym tle
    textMuted: "text-[#555555]", // Przygaszony tekst na żółtym tle
    border: "border-[#000000]", // Kolor obramowań
    shadow: "shadow-md", // Cień dla elementów
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 mt-6">
      {/* ===== NAGŁÓWEK SEKCJI ===== */}
      {/* Nagłówek z okrągłą ikoną kategorii i tytułem sekcji */}
      <div className="flex items-center mb-4">
        <div
          className={`w-10 h-10 rounded-full ${colors.accent} flex items-center justify-center mr-3 ${colors.shadow}`}
        >
          <span className={`${colors.textLight} font-bold text-lg`}>T</span>
        </div>
        <h2 className="text-xl font-bold uppercase tracking-wide">
          Tanczysz i wiesz
        </h2>
      </div>

      {/* Main content area - główny kontener */}
      <div
        className={`${colors.primary} p-3 rounded-md ${colors.shadow} border border-[#e6c200]`}
      >
        <div className="grid grid-cols-12 gap-4">
          {/* Lewa kolumna - główne duże zdjęcie */}
          <div className="col-span-12 lg:col-span-7 relative">
            <Link
              href={`/artykul/${redSectionArticles[0].slug}`}
              className="block"
            >
              <div className="relative aspect-[16/7] overflow-hidden rounded-md shadow-md">
                <Image
                  src={redSectionArticles[0].image}
                  alt={redSectionArticles[0].title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />

                {/* ===== PREZENTACJA AUTORA ===== */}
                {/* Okrągłe zdjęcie autora z imieniem i czasem publikacji */}
                <div className="absolute top-4 left-4 flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <Image
                      src={
                        redSectionArticles[0].author?.avatar ||
                        "/placeholder-avatar.jpg"
                      }
                      alt={redSectionArticles[0].author?.name || "Author"}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  {/* Półprzezroczyste tło z informacjami o autorze */}
                  <div className="ml-2 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-medium text-white">
                      {redSectionArticles[0].author?.name || "Author"}
                    </span>
                    <span className="mx-1 text-gray-400">•</span>
                    <span className="text-xs text-gray-300">
                      {redSectionArticles[0].author?.timeAgo || "Recently"}
                    </span>
                  </div>
                </div>

                {/* ===== KATEGORIA I AKCJE ===== */}
                {/* Etykieta kategorii i przyciski akcji (komentarz, udostępnij) */}
                <div className="absolute top-4 right-4 flex items-center space-x-2">
                  <span
                    className={`text-xs ${colors.accent} ${colors.textLight} px-2 py-1 rounded-sm font-bold shadow-md`}
                  >
                    {redSectionArticles[0].category}
                  </span>
                  {/* Przyciski akcji na półprzezroczystym tle */}
                  <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
                    <FaRegComment
                      size={14}
                      className="text-white hover:text-gray-300 cursor-pointer"
                    />
                    <FaShare
                      size={14}
                      className="text-white hover:text-gray-300 cursor-pointer"
                    />
                  </div>
                </div>

                {/* ===== TYTUŁ ARTYKUŁU ===== */}
                {/* Pasek na dole zdjęcia z tytułem artykułu */}
                <div className="absolute bottom-0 left-0 right-0">
                  <div
                    className={`${colors.dark} ${colors.textLight} px-4 py-3`}
                  >
                    <h3 className="text-2xl font-bold text-white">
                      {redSectionArticles[0].title}
                    </h3>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Prawa kolumna - mniejsze artykuły oplatające */}
          <div className="col-span-12 lg:col-span-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
              {/* ===== ARTYKUŁ PREMIUM ===== */}
              {/* Pierwszy artykuł w prawej kolumnie z oznaczeniem premium */}
              <div>
                <Link
                  href={`/artykul/${redSectionArticles[1].slug}`}
                  className="block"
                >
                  <div className="relative aspect-[4/2] overflow-hidden rounded-md shadow-md">
                    <Image
                      src={redSectionArticles[1].image}
                      alt={redSectionArticles[1].title}
                      fill
                      className="object-cover"
                    />
                    {/* ===== PREZENTACJA AUTORA (MNIEJSZA) ===== */}
                    {/* Mniejsze okrągłe zdjęcie autora z krótszą nazwą */}
                    <div className="absolute bottom-3 left-3 flex items-center">
                      <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-md">
                        <Image
                          src={
                            redSectionArticles[1].author?.avatar ||
                            "/placeholder-avatar.jpg"
                          }
                          alt={redSectionArticles[1].author?.name || "Author"}
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-2 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full">
                        <span className="text-xs text-white">
                          {redSectionArticles[1].author?.shortName ||
                            redSectionArticles[1].author?.name ||
                            "Author"}
                        </span>
                      </div>
                    </div>
                    {/* ===== OZNACZENIE PREMIUM ===== */}
                    {/* Etykieta w prawym górnym rogu oznaczająca treść premium */}
                    <div className="absolute top-2 right-2">
                      <div
                        className={`${colors.secondary} ${colors.textLight} text-xs px-1.5 py-0.5 font-bold rounded-sm shadow-sm`}
                      >
                        {redSectionArticles[1].premiumLabel}
                      </div>
                    </div>
                  </div>
                  <h3 className={`text-base font-bold ${colors.text} mt-2`}>
                    {redSectionArticles[1].title}
                  </h3>
                </Link>
              </div>

              {/* Artykuł 2 */}
              <div>
                <Link
                  href={`/artykul/${redSectionArticles[2].slug}`}
                  className="block group"
                >
                  <div className="relative aspect-[4/2] overflow-hidden rounded-md shadow-md">
                    <Image
                      src={redSectionArticles[2].image}
                      alt={redSectionArticles[2].title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Prezentacja autora na zdjęciu w okręgu */}
                    <div className="absolute bottom-3 left-3 flex items-center">
                      <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-md">
                        <Image
                          src={
                            redSectionArticles[2].author?.avatar ||
                            "/placeholder-avatar.jpg"
                          }
                          alt={redSectionArticles[2].author?.name || "Author"}
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-2 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full">
                        <span className="text-xs text-white">
                          {redSectionArticles[2].author?.shortName ||
                            redSectionArticles[2].author?.name ||
                            "Author"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <h3
                    className={`text-base font-bold ${colors.text} mt-2 group-hover:underline`}
                  >
                    {redSectionArticles[2].title}
                  </h3>
                </Link>
              </div>

              {/* SKRÓT WYDARZEŃ */}
              <div className="md:col-span-2">
                <div className={`border-b-2 ${colors.border} mb-2`}>
                  <div className="flex items-center justify-between">
                    <h3
                      className={`font-bold uppercase text-sm ${colors.accent} ${colors.textLight} px-2 py-1 rounded-t-sm`}
                    >
                      SKRÓT WYDARZEŃ
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {/* Render articles only if they exist */}
                  {redSectionArticles.length > 3 && (
                    <Link
                      href={`/artykul/${redSectionArticles[3].slug}`}
                      className="flex p-2 hover:bg-[#f0c800] transition-colors group rounded"
                    >
                      <div className="w-20 h-16 relative flex-shrink-0 mr-2 rounded overflow-hidden shadow-sm">
                        <Image
                          src={redSectionArticles[3].image}
                          alt={redSectionArticles[3].title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h4
                        className={`text-xs font-medium ${colors.text} group-hover:underline line-clamp-3`}
                      >
                        {redSectionArticles[3].title}
                      </h4>
                    </Link>
                  )}

                  {/* Article 2 */}
                  {redSectionArticles.length > 4 && (
                    <Link
                      href={`/artykul/${redSectionArticles[4].slug}`}
                      className="flex p-2 hover:bg-[#f0c800] transition-colors group rounded"
                    >
                      <div className="w-20 h-16 relative flex-shrink-0 mr-2 rounded overflow-hidden shadow-sm">
                        <Image
                          src={redSectionArticles[4].image}
                          alt={redSectionArticles[4].title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h4
                        className={`text-xs font-medium ${colors.text} group-hover:underline line-clamp-3`}
                      >
                        {redSectionArticles[4].title}
                      </h4>
                    </Link>
                  )}

                  {/* Article 3 */}
                  {redSectionArticles.length > 5 && (
                    <Link
                      href={`/artykul/${redSectionArticles[5].slug}`}
                      className="flex p-2 hover:bg-[#f0c800] transition-colors group rounded"
                    >
                      <div className="w-20 h-16 relative flex-shrink-0 mr-2 rounded overflow-hidden shadow-sm">
                        <Image
                          src={redSectionArticles[5].image}
                          alt={redSectionArticles[5].title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h4
                        className={`text-xs font-medium ${colors.text} group-hover:underline line-clamp-3`}
                      >
                        {redSectionArticles[5].title}
                      </h4>
                    </Link>
                  )}

                  {/* Article 4 */}
                  {redSectionArticles.length > 6 && (
                    <Link
                      href={`/artykul/${redSectionArticles[6].slug}`}
                      className="flex p-2 hover:bg-[#f0c800] transition-colors group rounded"
                    >
                      <div className="w-20 h-16 relative flex-shrink-0 mr-2 rounded overflow-hidden shadow-sm">
                        <Image
                          src={redSectionArticles[6].image}
                          alt={redSectionArticles[6].title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h4
                        className={`text-xs font-medium ${colors.text} group-hover:underline line-clamp-3`}
                      >
                        {redSectionArticles[6].title}
                      </h4>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dolny rząd artykułów */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 pt-4 border-t border-[#e6c200]">
          {/* Artykuł 1 */}
          {redSectionArticles.length > 7 && (
            <Link
              href={`/artykul/${redSectionArticles[7].slug}`}
              className="flex group"
            >
              <div className="w-24 h-20 relative flex-shrink-0 mr-3 rounded overflow-hidden shadow-sm">
                <Image
                  src={redSectionArticles[7].image}
                  alt={redSectionArticles[7].title}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4
                  className={`text-sm font-medium ${colors.text} group-hover:underline line-clamp-3`}
                >
                  {redSectionArticles[7].title}
                </h4>
                <span className={`text-xs ${colors.textMuted} mt-1 block`}>
                  {typeof redSectionArticles[7].author === "string"
                    ? redSectionArticles[7].author
                    : redSectionArticles[7].author?.name || "Author"}
                </span>
              </div>
            </Link>
          )}

          {/* Artykuł 2 */}
          {redSectionArticles.length > 8 && (
            <Link
              href={`/artykul/${redSectionArticles[8].slug}`}
              className="flex group"
            >
              <div className="w-24 h-20 relative flex-shrink-0 mr-3 rounded overflow-hidden shadow-sm">
                <Image
                  src={redSectionArticles[8].image}
                  alt={redSectionArticles[8].title}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4
                  className={`text-sm font-medium ${colors.text} group-hover:underline line-clamp-3`}
                >
                  {redSectionArticles[8].title}
                </h4>
                <span className={`text-xs ${colors.textMuted} mt-1 block`}>
                  {typeof redSectionArticles[8].author === "string"
                    ? redSectionArticles[8].author
                    : redSectionArticles[8].author?.name || "Author"}
                </span>
              </div>
            </Link>
          )}

          {/* Artykuł 3 */}
          {redSectionArticles.length > 9 && (
            <Link
              href={`/artykul/${redSectionArticles[9].slug}`}
              className="flex group"
            >
              <div className="w-24 h-20 relative flex-shrink-0 mr-3 rounded overflow-hidden shadow-sm">
                <Image
                  src={redSectionArticles[9].image}
                  alt={redSectionArticles[9].title}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4
                  className={`text-sm font-medium ${colors.text} group-hover:underline line-clamp-3`}
                >
                  {redSectionArticles[9].title}
                </h4>
                <span className={`text-xs ${colors.textMuted} mt-1 block`}>
                  {typeof redSectionArticles[9].author === "string"
                    ? redSectionArticles[9].author
                    : redSectionArticles[9].author?.name || "Author"}
                </span>
              </div>
            </Link>
          )}

          {/* Artykuł 4 */}
          {redSectionArticles.length > 10 && (
            <Link
              href={`/artykul/${redSectionArticles[10].slug}`}
              className="flex group"
            >
              <div className="w-24 h-20 relative flex-shrink-0 mr-3 rounded overflow-hidden shadow-sm">
                <Image
                  src={redSectionArticles[10].image}
                  alt={redSectionArticles[10].title}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4
                  className={`text-sm font-medium ${colors.text} group-hover:underline line-clamp-3`}
                >
                  {redSectionArticles[10].title}
                </h4>
                <span className={`text-xs ${colors.textMuted} mt-1 block`}>
                  {typeof redSectionArticles[10].author === "string"
                    ? redSectionArticles[10].author
                    : redSectionArticles[10].author?.name || "Author"}
                </span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
