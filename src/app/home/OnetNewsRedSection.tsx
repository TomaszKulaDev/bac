"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

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

      {/* Main content area */}
      <div className="bg-red-600 grid grid-cols-12 gap-0">
        {/* Left column - Main article - POWIĘKSZONE ZDJĘCIE */}
        <div className="col-span-12 lg:col-span-6 relative pt-2">
          <Link href="/artykul/co-z-wojskami-usa-w-polsce" className="block">
            <div className="relative aspect-[16/9] overflow-hidden mx-3">
              <Image
                src="https://images.unsplash.com/photo-1504609813442-a8924e83f76e?q=80&w=1770&auto=format&fit=crop"
                alt="Co z wojskami USA w Polsce?"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0">
                <div className="bg-yellow-500 text-black px-4 py-3">
                  <h3 className="text-2xl font-bold text-black">
                    Co z wojskami USA w Polsce? Niepokojące kulisy. &ldquo;Miał
                    to powiedzieć&rdquo;
                  </h3>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Middle column - Media commentary - POMNIEJSZONE ZDJĘCIE */}
        <div className="col-span-12 lg:col-span-3 bg-red-600 pt-2">
          <div className="px-3">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1577493340887-b7bfff550145?q=80&w=1770&auto=format&fit=crop"
                alt="Media komentują kłótnię w USA"
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2">
                <div className="bg-yellow-400 text-black text-xs px-1.5 py-0.5 font-bold rounded-sm">
                  premium
                </div>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 mt-3">
              Amerykańskie media komentują kłótnię. &ldquo;Wyraźnie żywi
              niechęć&rdquo;
            </h3>
          </div>
        </div>

        {/* Right column - Related articles */}
        <div className="col-span-12 lg:col-span-3 bg-red-600 pt-2">
          <div className="px-3 border-b border-red-500">
            <div className="flex items-center justify-between">
              <h3 className="font-bold uppercase text-sm bg-yellow-500 text-black px-2 py-1">
                SKRÓT WYDARZEŃ
              </h3>
            </div>
          </div>

          <div className="divide-y divide-red-500/30">
            {/* Article 1 */}
            <Link
              href="/artykul/piec-waznych-rzeczy"
              className="flex p-3 hover:bg-red-700 transition-colors group"
            >
              <div className="w-24 h-20 relative flex-shrink-0 mr-3">
                <Image
                  src="https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=1770&auto=format&fit=crop"
                  alt="Pięć ważnych rzeczy"
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="text-sm font-medium text-white group-hover:underline line-clamp-3">
                Pięć ważnych rzeczy po spotkaniu Trumpa i Zełenskiego.
                Podsumowanie
              </h4>
            </Link>

            {/* Article 2 */}
            <Link
              href="/artykul/ekspert-nie-kryje-emocji"
              className="flex p-3 hover:bg-red-700 transition-colors group"
            >
              <div className="w-24 h-20 relative flex-shrink-0 mr-3">
                <Image
                  src="https://images.unsplash.com/photo-1551627651-23e1323f5a33?q=80&w=1770&auto=format&fit=crop"
                  alt="Ekspert nie kryje emocji"
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="text-sm font-medium text-white group-hover:underline line-clamp-3">
                Ekspert nie kryje emocji po awanturze w Białym Domu: jestem
                zszokowany
              </h4>
            </Link>

            {/* Article 3 */}
            <Link
              href="/artykul/wyproszenie-zelenskiego"
              className="flex p-3 hover:bg-red-700 transition-colors group"
            >
              <div className="w-24 h-20 relative flex-shrink-0 mr-3">
                <Image
                  src="https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1774&auto=format&fit=crop"
                  alt="Wyproszenie Zełenskiego"
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="text-sm font-medium text-white group-hover:underline line-clamp-3">
                Tak miało wyglądać wyproszenie Zełenskiego z Białego Domu. Są
                kulisy
              </h4>
            </Link>

            {/* Article 4 */}
            <Link
              href="/artykul/ukrainski-ekspert"
              className="flex p-3 hover:bg-red-700 transition-colors group"
            >
              <div className="w-24 h-20 relative flex-shrink-0 mr-3">
                <Image
                  src="https://images.unsplash.com/photo-1551627651-23e1323f5a33?q=80&w=1770&auto=format&fit=crop"
                  alt="Ukraiński ekspert"
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="text-sm font-medium text-white group-hover:underline line-clamp-3">
                Ukraiński ekspert: cyrk z Zełenskim był zaplanowany
              </h4>
            </Link>

            {/* Article 5 */}
            <Link
              href="/artykul/trump-zirytowal-sie"
              className="flex p-3 hover:bg-red-700 transition-colors group"
            >
              <div className="w-24 h-20 relative flex-shrink-0 mr-3">
                <Image
                  src="https://images.unsplash.com/photo-1541726260-e6b6a6a08b27?q=80&w=1769&auto=format&fit=crop"
                  alt="Trump zirytował się"
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="text-sm font-medium text-white group-hover:underline line-clamp-3">
                Trump zirytował się, gdy zobaczył Zełenskiego. Zgrzyźliwa uwaga
              </h4>
            </Link>

            {/* Article 6 */}
            <Link
              href="/artykul/ian-brzezinski"
              className="flex p-3 hover:bg-red-700 transition-colors group"
            >
              <div className="w-24 h-20 relative flex-shrink-0 mr-3">
                <Image
                  src="https://images.unsplash.com/photo-1574280363402-2f672940b871?q=80&w=1770&auto=format&fit=crop"
                  alt="Ian Brzeziński"
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="text-sm font-medium text-white group-hover:underline line-clamp-3">
                Ian Brzeziński o Trumpie: czułem głęboki wstyd
              </h4>
            </Link>

            {/* Article 7 */}
            <Link
              href="/artykul/premier-zadzwonil"
              className="flex p-3 hover:bg-red-700 transition-colors group"
            >
              <div className="w-24 h-20 relative flex-shrink-0 mr-3">
                <Image
                  src="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=1770&auto=format&fit=crop"
                  alt="Premier zadzwonił"
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="text-sm font-medium text-white group-hover:underline line-clamp-3">
                Premier zadzwonił do Trumpa i Zełenskiego. Wiadomo, po co
              </h4>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
