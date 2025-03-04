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
      <div className="max-w-[1300px] mx-auto px-4">
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

        <div className="grid grid-cols-12 gap-2">
          {/* Main content area */}
          <div className="col-span-12 lg:col-span-8">
            {/* Top row - main articles */}
            <div className="grid grid-cols-12 gap-2 mb-2">
              {/* Large featured article */}
              <div className="col-span-12 md:col-span-8">
                <div className="relative overflow-hidden shadow-sm">
                  <Link
                    href={`/artykul/${featuredArticles[0].slug}`}
                    className="block"
                  >
                    <div className="aspect-[16/7]">
                      <Image
                        src={featuredArticles[0].image}
                        alt={featuredArticles[0].title}
                        width={500}
                        height={188}
                        className="w-full h-full object-cover"
                        priority
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h2 className="text-xl font-bold leading-tight text-white">
                        {featuredArticles[0].title}
                      </h2>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Secondary featured article */}
              <div className="col-span-12 md:col-span-4">
                <div className="overflow-hidden shadow-sm">
                  <Link
                    href={`/artykul/${featuredArticles[1].slug}`}
                    className="block"
                  >
                    <div className="aspect-[16/9]">
                      <Image
                        src={featuredArticles[1].image}
                        alt={featuredArticles[1].title}
                        width={400}
                        height={150}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2 bg-white">
                      <h2
                        className="font-bold text-gray-900 mb-1"
                        style={{
                          fontFamily:
                            '"Fira Sans", Arial, Helvetica, sans-serif',
                          fontSize: "20px",
                          lineHeight: "24px",
                          textAlign: "left",
                          letterSpacing: "-0.4px",
                        }}
                      >
                        {featuredArticles[1].title}
                      </h2>
                      <div className="flex items-center">
                        <div className="flex items-center">
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
                          <span className="text-gray-600 text-xs">
                            {featuredArticles[1].author?.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom row - 3 smaller articles */}
            <div className="grid grid-cols-3 gap-2">
              {secondaryArticles.slice(0, 9).map((article, index) => (
                <div key={article.id} className="overflow-hidden shadow-sm">
                  <Link href={`/artykul/${article.slug}`} className="block">
                    <div className="aspect-[16/9]">
                      <Image
                        src={article.image}
                        alt={article.title}
                        width={150}
                        height={75}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2 bg-white">
                      <h2
                        className="font-bold text-gray-900 mb-1"
                        style={{
                          fontFamily:
                            '"Fira Sans", Arial, Helvetica, sans-serif',
                          fontSize: "20px",
                          lineHeight: "24px",
                          textAlign: "left",
                          letterSpacing: "-0.4px",
                        }}
                      >
                        {article.title}
                      </h2>
                      <div className="flex items-center">
                        <div className="flex items-center">
                          <div className="w-5 h-5 rounded-full overflow-hidden mr-1">
                            <Image
                              src={
                                article.author?.avatar ||
                                "/placeholder-avatar.jpg"
                              }
                              alt={article.author?.name || ""}
                              width={15}
                              height={15}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-gray-600 text-xs">
                            {article.author?.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
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
