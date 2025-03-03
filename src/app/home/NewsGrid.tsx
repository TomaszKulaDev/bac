"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  featuredArticles,
  secondaryArticles,
  sidebarArticles,
} from "./data/newsGridData";

export default function NewsGrid() {
  const [hoveredArticle, setHoveredArticle] = useState<string | null>(null);

  return (
    <div className="bg-white text-gray-900 py-4">
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="bg-yellow-400 rounded-full w-8 h-8 flex items-center justify-center mr-2">
              <span className="font-bold text-black">B</span>
            </div>
            <h1 className="text-base font-bold uppercase">BACHATA NA DZIŚ</h1>
          </div>
          <div>
            <Link href="/bachat-posty" className="text-sm hover:underline">
              Zobacz Bachata Posty!
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Main featured articles - first row */}
          <div className="col-span-12 lg:col-span-9 grid grid-cols-12 gap-2">
            {/* Large featured article */}
            <div className="col-span-12 md:col-span-6 row-span-1">
              <div className="relative overflow-hidden shadow-sm aspect-[16/10]">
                <Link
                  href={`/artykul/${featuredArticles[0].slug}`}
                  className="block h-full"
                >
                  <Image
                    src={featuredArticles[0].image}
                    alt={featuredArticles[0].title}
                    width={500}
                    height={313}
                    className="w-full h-full object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <h2 className="text-base font-bold leading-tight text-white">
                      {featuredArticles[0].title}
                    </h2>
                  </div>
                </Link>
                {featuredArticles[0].author && (
                  <div className="absolute bottom-2 right-2 flex items-center">
                    <div className="flex items-center mr-2">
                      <Image
                        src={featuredArticles[0].author.avatar}
                        alt={featuredArticles[0].author.name}
                        width={20}
                        height={20}
                        className="rounded-full mr-1"
                      />
                      <span className="text-white text-xs">
                        {featuredArticles[0].author.name}
                      </span>
                    </div>
                    <button className="bg-transparent border border-white text-white text-xs px-1.5 py-0.5 hover:bg-white/20">
                      Obserwuj
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Medium featured articles */}
            <div className="col-span-12 md:col-span-6 grid grid-cols-2 gap-2">
              <div className="col-span-1">
                <div className="relative overflow-hidden shadow-sm aspect-[16/10]">
                  <Link
                    href={`/artykul/${featuredArticles[1].slug}`}
                    className="block h-full"
                  >
                    <Image
                      src={featuredArticles[1].image}
                      alt={featuredArticles[1].title}
                      width={250}
                      height={156}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                      <h2 className="text-sm font-bold leading-tight text-white">
                        {featuredArticles[1].title}
                      </h2>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-span-1">
                <div className="relative overflow-hidden shadow-sm aspect-[16/10]">
                  <Link
                    href={`/artykul/${featuredArticles[2].slug}`}
                    className="block h-full"
                  >
                    <Image
                      src={featuredArticles[2].image}
                      alt={featuredArticles[2].title}
                      width={250}
                      height={156}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                      <h2 className="text-sm font-bold leading-tight text-white">
                        {featuredArticles[2].title}
                      </h2>
                    </div>
                  </Link>
                  {featuredArticles[2].author && (
                    <div className="absolute bottom-2 right-2">
                      <Image
                        src={featuredArticles[2].author.avatar}
                        alt={featuredArticles[2].author.name}
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar articles */}
          <div className="col-span-12 lg:col-span-3">
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
          <div className="col-span-12 lg:col-span-9 grid grid-cols-4 gap-2 mt-2">
            {secondaryArticles.slice(0, 4).map((article) => (
              <div
                key={article.id}
                className="relative overflow-hidden shadow-sm"
              >
                <Link href={`/artykul/${article.slug}`} className="block">
                  <div className="aspect-[16/10]">
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={200}
                      height={125}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <h2 className="text-xs font-bold leading-tight text-white">
                      {article.title}
                    </h2>
                  </div>
                </Link>
                {article.author && (
                  <div className="absolute bottom-2 right-2">
                    <Image
                      src={article.author.avatar}
                      alt={article.author.name}
                      width={16}
                      height={16}
                      className="rounded-full"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
