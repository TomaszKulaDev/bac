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
          <span className="text-white font-bold text-lg">B</span>
        </div>
        <h2 className="text-xl font-bold uppercase tracking-wide">
          Tanczysz i wiesz
        </h2>
      </div>

      {/* Main content area - czerwony kontener */}
      <div className="bg-red-600 p-3">
        <div className="grid grid-cols-12 gap-4">
          {/* Lewa kolumna - główne duże zdjęcie */}
          <div className="col-span-12 lg:col-span-7 relative">
            <Link href="/artykul/nowe-trendy-w-bachacie" className="block">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1545959570-a94084071b5d?q=80&w=1776&auto=format&fit=crop"
                  alt="Nowe trendy w bachacie na 2024 rok"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />

                {/* Prezentacja autora na zdjęciu w okręgu */}
                <div className="absolute top-4 left-4 flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <Image
                      src="https://randomuser.me/api/portraits/women/32.jpg"
                      alt="Maria Rodriguez"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-2 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-medium text-white">
                      Maria Rodriguez
                    </span>
                    <span className="mx-1 text-gray-400">•</span>
                    <span className="text-xs text-gray-300">2 godz. temu</span>
                  </div>
                </div>

                {/* Kategoria i akcje w prawym górnym rogu */}
                <div className="absolute top-4 right-4 flex items-center space-x-2">
                  <span className="text-xs bg-red-600 text-white px-2 py-1 rounded-sm font-bold shadow-md">
                    TANIEC
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
                      Nowe trendy w bachacie na 2024 rok. &ldquo;Rewolucja w
                      technice&rdquo;
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
                <Link href="/artykul/dominikanska-bachata" className="block">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=80&w=1770&auto=format&fit=crop"
                      alt="Dominikańska bachata - powrót do korzeni"
                      fill
                      className="object-cover"
                    />
                    {/* Prezentacja autora na zdjęciu w okręgu */}
                    <div className="absolute bottom-3 left-3 flex items-center">
                      <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-md">
                        <Image
                          src="https://randomuser.me/api/portraits/men/44.jpg"
                          alt="Carlos Mendez"
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-2 bg-black/60 backdro-blur-sm px-2 py-0.5 rounded-full">
                        <span className="text-xs text-white">C. Mendez</span>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2">
                      <div className="bg-yellow-400 text-black text-xs px-1.5 py-0.5 font-bold rounded-sm">
                        sprawdź
                      </div>
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mt-2">
                    Dominikańska bachata - powrót do korzeni.
                    &ldquo;Autentyczność ponad wszystko&rdquo;
                  </h3>
                </Link>
              </div>

              {/* Artykuł 2 - PODMIENIONE ZDJĘCIE */}
              <div>
                <Link href="/artykul/bachata-sensual" className="block group">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src="/images/bachata-romance.jpg"
                      alt="Bachata Sensual - nowy wymiar bliskości"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Prezentacja autora na zdjęciu w okręgu */}
                    <div className="absolute bottom-3 left-3 flex items-center">
                      <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-md">
                        <Image
                          src="https://randomuser.me/api/portraits/women/42.jpg"
                          alt="Sofia Garcia"
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-2 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full">
                        <span className="text-xs text-white">S. Garcia</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mt-2 group-hover:underline">
                    Bachata Sensual - nowy wymiar bliskości w tańcu
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
                    href="/artykul/bachata-festiwal-warszawa"
                    className="flex p-2 hover:bg-red-700 transition-colors group"
                  >
                    <div className="w-20 h-16 relative flex-shrink-0 mr-2">
                      <Image
                        src="/images/bachata-festival.jpg"
                        alt="Bachata Festiwal w Warszawie"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 className="text-xs font-medium text-white group-hover:underline line-clamp-3">
                      Bachata Festiwal w Warszawie - największe wydarzenie roku
                      już w maju
                    </h4>
                  </Link>

                  {/* Article 2 */}
                  <Link
                    href="/artykul/mistrzostwa-bachaty"
                    className="flex p-2 hover:bg-red-700 transition-colors group"
                  >
                    <div className="w-20 h-16 relative flex-shrink-0 mr-2">
                      <Image
                        src="https://images.unsplash.com/photo-1504609813442-a8924e83f76e?q=80&w=1770&auto=format&fit=crop"
                        alt="Mistrzostwa Bachaty"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 className="text-xs font-medium text-white group-hover:underline line-clamp-3">
                      Mistrzostwa Bachaty 2024 - polscy tancerze podbijają
                      światowe podium
                    </h4>
                  </Link>

                  {/* Article 3 */}
                  <Link
                    href="/artykul/bachata-dla-poczatkujacych"
                    className="flex p-2 hover:bg-red-700 transition-colors group"
                  >
                    <div className="w-20 h-16 relative flex-shrink-0 mr-2">
                      <Image
                        src="/images/bachata-steps.jpg"
                        alt="Bachata dla początkujących"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 className="text-xs font-medium text-white group-hover:underline line-clamp-3">
                      Bachata dla początkujących - jak zacząć przygodę z
                      najpopularniejszym tańcem
                    </h4>
                  </Link>

                  {/* Article 4 */}
                  <Link
                    href="/artykul/muzyka-do-bachaty"
                    className="flex p-2 hover:bg-red-700 transition-colors group"
                  >
                    <div className="w-20 h-16 relative flex-shrink-0 mr-2">
                      <Image
                        src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1770&auto=format&fit=crop"
                        alt="Muzyka do bachaty"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 className="text-xs font-medium text-white group-hover:underline line-clamp-3">
                      Muzyka do bachaty - nowe hity, które musisz znać w 2024
                      roku
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
                src="https://images.unsplash.com/photo-1535525153412-5a42439a210d?q=80&w=1770&auto=format&fit=crop"
                alt="Wywiad z mistrzem bachaty"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white group-hover:underline line-clamp-3">
                Wywiad z mistrzem bachaty: &ldquo;Taniec zmienił moje życie na
                zawsze&rdquo;
              </h4>
              <span className="text-xs text-gray-300 mt-1 block">
                Juan Perez
              </span>
            </div>
          </div>

          {/* Artykuł 2 */}
          <div className="flex group">
            <div className="w-24 h-20 relative flex-shrink-0 mr-3">
              <Image
                src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1770&auto=format&fit=crop"
                alt="Bachata w parach"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white group-hover:underline line-clamp-3">
                Bachata w parach - jak osiągnąć idealną harmonię i zrozumienie
                na parkiecie
              </h4>
              <span className="text-xs text-gray-300 mt-1 block">
                Marta Kowalska
              </span>
            </div>
          </div>

          {/* Artykuł 3 */}
          <div className="flex group">
            <div className="w-24 h-20 relative flex-shrink-0 mr-3">
              <Image
                src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1769&auto=format&fit=crop"
                alt="Stroje do bachaty"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white group-hover:underline line-clamp-3">
                Stroje do bachaty - co wybrać, aby czuć się komfortowo i
                wyglądać olśniewająco
              </h4>
              <span className="text-xs text-gray-300 mt-1 block">
                Anna Nowak
              </span>
            </div>
          </div>

          {/* Artykuł 4 */}
          <div className="flex group">
            <div className="w-24 h-20 relative flex-shrink-0 mr-3">
              <Image
                src="https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1774&auto=format&fit=crop"
                alt="Bachata fusion"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white group-hover:underline line-clamp-3">
                Bachata fusion - jak łączyć style taneczne i tworzyć unikalne
                choreografie
              </h4>
              <span className="text-xs text-gray-300 mt-1 block">
                Piotr Wiśniewski
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
