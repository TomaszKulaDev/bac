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

        <div className="grid grid-cols-12 gap-3">
          {/* Main content area */}
          <div className="col-span-12 lg:col-span-9">
            {/* Top row - main articles */}
            <div className="grid grid-cols-12 gap-3 mb-3">
              {/* Large featured article */}
              <div className="col-span-12 md:col-span-7">
                <div className="relative overflow-hidden shadow-sm">
                  <Link
                    href={`/artykul/${featuredArticles[0].slug}`}
                    className="block"
                  >
                    <div className="aspect-[16/7]">
                      <Image
                        src={featuredArticles[0].image}
                        alt={featuredArticles[0].title}
                        width={600}
                        height={263}
                        className="w-full h-full object-cover"
                        priority
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <div className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 inline-block mb-1">
                        WYDARZENIE
                      </div>
                      <h2 className="text-xl font-bold leading-tight text-white">
                        {featuredArticles[0].title}
                      </h2>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Secondary featured article */}
              <div className="col-span-12 md:col-span-5">
                <div className="relative overflow-hidden shadow-sm">
                  <Link
                    href={`/artykul/${featuredArticles[1].slug}`}
                    className="block"
                  >
                    <div className="aspect-[16/7]">
                      <Image
                        src={featuredArticles[1].image}
                        alt={featuredArticles[1].title}
                        width={400}
                        height={175}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 inline-block mb-1">
                        POLITYKA
                      </div>
                      <h2 className="text-lg font-bold leading-tight text-white">
                        {featuredArticles[1].title}
                      </h2>
                      <div className="flex items-center mt-1">
                        <div className="w-5 h-5 rounded-full overflow-hidden mr-1">
                          <Image
                            src={
                              featuredArticles[1].author?.avatar ||
                              "/placeholder-avatar.jpg"
                            }
                            alt={featuredArticles[1].author?.name || ""}
                            width={20}
                            height={20}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-white text-xs">
                          {featuredArticles[1].author?.name}
                        </span>
                        <button className="ml-2 text-xs text-white border border-white px-1.5 py-0.5 rounded-sm hover:bg-white/20">
                          Obserwuj
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom row - 3 smaller articles */}
            <div className="grid grid-cols-3 gap-3">
              {secondaryArticles.slice(0, 3).map((article, index) => (
                <div key={article.id} className="overflow-hidden shadow-sm">
                  <Link href={`/artykul/${article.slug}`} className="block">
                    <div className="aspect-[16/9]">
                      <Image
                        src={article.image}
                        alt={article.title}
                        width={300}
                        height={169}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2 bg-white">
                      <h2 className="text-sm font-bold leading-tight text-gray-900 mb-1">
                        {article.title}
                      </h2>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-5 h-5 rounded-full overflow-hidden mr-1">
                            <Image
                              src={
                                article.author?.avatar ||
                                "/placeholder-avatar.jpg"
                              }
                              alt={article.author?.name || ""}
                              width={20}
                              height={20}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-gray-600 text-xs">
                            {article.author?.name}
                          </span>
                        </div>
                        <button className="text-xs text-gray-600 border border-gray-300 px-1.5 py-0.5 rounded-sm hover:bg-gray-100">
                          Obserwuj
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
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
              {sidebarArticles.slice(1, 15).map((article) => (
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
        </div>
      </div>
    </div>
  );
}
