"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaRegClock,
  FaRegBookmark,
  FaRegComment,
  FaShare,
  FaRegEye,
} from "react-icons/fa";

export default function OnetNewsSection() {
  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 mt-6">
      {/* Header with category */}
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center mr-3">
          <span className="text-white font-bold text-lg">P</span>
        </div>
        <h2 className="text-xl font-bold uppercase tracking-wide">
          AWANTURZE W BIAŁYM DOMU
        </h2>
      </div>

      {/* Main content area - czerwony kontener */}
      <div className="bg-red-600 p-3">
        <div className="grid grid-cols-12 gap-4">
          {/* Lewa kolumna - główne duże zdjęcie */}
          <div className="col-span-12 lg:col-span-7 relative">
            <Link href="/artykul/co-z-wojskami-usa-w-polsce" className="block">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1504609813442-a8924e83f76e?q=80&w=1770&auto=format&fit=crop"
                  alt="Co z wojskami USA w Polsce?"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />

                {/* Prezentacja autora na zdjęciu w okręgu */}
                <div className="absolute top-4 left-4 flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <Image
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="Kamil Dziubka"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-2 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-medium text-white">
                      Kamil Dziubka
                    </span>
                    <span className="mx-1 text-gray-400">•</span>
                    <span className="text-xs text-gray-300">2 godz. temu</span>
                  </div>
                </div>

                {/* Kategoria i akcje w prawym górnym rogu */}
                <div className="absolute top-4 right-4 flex items-center space-x-2">
                  <span className="text-xs bg-red-600 text-white px-2 py-1 rounded-sm font-bold shadow-md">
                    POLITYKA
                  </span>
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

                <div className="absolute bottom-0 left-0 right-0">
                  <div className="bg-yellow-500 text-black px-4 py-3">
                    <h3 className="text-2xl font-bold text-black">
                      Co z wojskami USA w Polsce? Niepokojące kulisy.
                      &ldquo;Miał to powiedzieć&rdquo;
                    </h3>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Prawa kolumna - mniejsze artykuły oplatające */}
          <div className="col-span-12 lg:col-span-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
              {/* Artykuł z "premium" */}
              <div>
                <Link href="/artykul/amerykanskie-media" className="block">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1577493340887-b7bfff550145?q=80&w=1770&auto=format&fit=crop"
                      alt="Media komentują kłótnię w USA"
                      fill
                      className="object-cover"
                    />
                    {/* Prezentacja autora na zdjęciu w okręgu */}
                    <div className="absolute bottom-3 left-3 flex items-center">
                      <div className="w-6 h-6 rounded-full overflow-hidden border-2 border-white shadow-md">
                        <Image
                          src="https://randomuser.me/api/portraits/women/44.jpg"
                          alt="Anna Kowalska"
                          width={24}
                          height={24}
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-1.5 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full">
                        <span className="text-xs text-white">A. Kowalska</span>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2">
                      <div className="bg-yellow-400 text-black text-xs px-1.5 py-0.5 font-bold rounded-sm">
                        premium
                      </div>
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mt-2">
                    Amerykańskie media komentują kłótnię. &ldquo;Wyraźnie żywi
                    niechęć&rdquo;
                  </h3>
                </Link>
              </div>

              {/* Artykuł 2 */}
              <div>
                <Link href="/artykul/nowe-informacje" className="block group">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1569180880150-df4eed93c90b?q=80&w=1770&auto=format&fit=crop"
                      alt="Nowe informacje o spotkaniu"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Prezentacja autora na zdjęciu w okręgu */}
                    <div className="absolute bottom-3 left-3 flex items-center">
                      <div className="w-6 h-6 rounded-full overflow-hidden border-2 border-white shadow-md">
                        <Image
                          src="https://randomuser.me/api/portraits/men/42.jpg"
                          alt="Piotr Nowak"
                          width={24}
                          height={24}
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-1.5 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full">
                        <span className="text-xs text-white">P. Nowak</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mt-2 group-hover:underline">
                    Nowe informacje o spotkaniu Trumpa i Zełenskiego
                  </h3>
                </Link>
              </div>

              {/* SKRÓT WYDARZEŃ */}
              <div className="md:col-span-2">
                <div className="border-b border-red-500 mb-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold uppercase text-sm bg-yellow-500 text-black px-2 py-1">
                      SKRÓT WYDARZEŃ
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {/* Article 1 */}
                  <Link
                    href="/artykul/piec-waznych-rzeczy"
                    className="flex p-2 hover:bg-red-700 transition-colors group"
                  >
                    <div className="w-20 h-16 relative flex-shrink-0 mr-2">
                      <Image
                        src="https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=1770&auto=format&fit=crop"
                        alt="Pięć ważnych rzeczy"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 className="text-xs font-medium text-white group-hover:underline line-clamp-3">
                      Pięć ważnych rzeczy po spotkaniu Trumpa i Zełenskiego
                    </h4>
                  </Link>

                  {/* Article 2 */}
                  <Link
                    href="/artykul/ekspert-nie-kryje-emocji"
                    className="flex p-2 hover:bg-red-700 transition-colors group"
                  >
                    <div className="w-20 h-16 relative flex-shrink-0 mr-2">
                      <Image
                        src="https://images.unsplash.com/photo-1551627651-23e1323f5a33?q=80&w=1770&auto=format&fit=crop"
                        alt="Ekspert nie kryje emocji"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 className="text-xs font-medium text-white group-hover:underline line-clamp-3">
                      Ekspert nie kryje emocji po awanturze w Białym Domu
                    </h4>
                  </Link>

                  {/* Article 3 */}
                  <Link
                    href="/artykul/wyproszenie-zelenskiego"
                    className="flex p-2 hover:bg-red-700 transition-colors group"
                  >
                    <div className="w-20 h-16 relative flex-shrink-0 mr-2">
                      <Image
                        src="https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1774&auto=format&fit=crop"
                        alt="Wyproszenie Zełenskiego"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 className="text-xs font-medium text-white group-hover:underline line-clamp-3">
                      Tak miało wyglądać wyproszenie Zełenskiego z Białego Domu
                    </h4>
                  </Link>

                  {/* Article 4 */}
                  <Link
                    href="/artykul/ukrainski-ekspert"
                    className="flex p-2 hover:bg-red-700 transition-colors group"
                  >
                    <div className="w-20 h-16 relative flex-shrink-0 mr-2">
                      <Image
                        src="https://images.unsplash.com/photo-1551627651-23e1323f5a33?q=80&w=1770&auto=format&fit=crop"
                        alt="Ukraiński ekspert"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 className="text-xs font-medium text-white group-hover:underline line-clamp-3">
                      Ukraiński ekspert: cyrk z Zełenskim był zaplanowany
                    </h4>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dolny rząd artykułów */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {/* Artykuł 1 */}
          <div className="flex group">
            <div className="w-24 h-20 relative flex-shrink-0 mr-3">
              <Image
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1770&auto=format&fit=crop"
                alt="Komentarz byłego prezydenta"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white group-hover:underline line-clamp-3">
                Komentarz byłego prezydenta: &ldquo;To spotkanie zmieni bieg
                historii&rdquo;
              </h4>
              <span className="text-xs text-gray-300 mt-1 block">
                Jan Kowalczyk
              </span>
            </div>
          </div>

          {/* Artykuł 2 */}
          <div className="flex group">
            <div className="w-24 h-20 relative flex-shrink-0 mr-3">
              <Image
                src="https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?q=80&w=1935&auto=format&fit=crop"
                alt="Kulisy spotkania"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white group-hover:underline line-clamp-3">
                Kulisy spotkania. Tak naprawdę wyglądała rozmowa za zamkniętymi
                drzwiami
              </h4>
              <span className="text-xs text-gray-300 mt-1 block">
                Marta Lis
              </span>
            </div>
          </div>

          {/* Artykuł 3 */}
          <div className="flex group">
            <div className="w-24 h-20 relative flex-shrink-0 mr-3">
              <Image
                src="https://images.unsplash.com/photo-1541726260-e6b6a6a08b27?q=80&w=1769&auto=format&fit=crop"
                alt="Zełenski po spotkaniu"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white group-hover:underline line-clamp-3">
                Zełenski po spotkaniu: &ldquo;Nie wszystko poszło zgodnie z
                planem&rdquo;
              </h4>
              <span className="text-xs text-gray-300 mt-1 block">
                Adam Nowak
              </span>
            </div>
          </div>

          {/* Artykuł 4 */}
          <div className="flex group">
            <div className="w-24 h-20 relative flex-shrink-0 mr-3">
              <Image
                src="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=1770&auto=format&fit=crop"
                alt="Przyszłość relacji"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white group-hover:underline line-clamp-3">
                Przyszłość relacji USA-Ukraina. Co dalej po burzliwym spotkaniu?
              </h4>
              <span className="text-xs text-gray-300 mt-1 block">
                Karolina Wiśniewska
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
