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
import {
  mainArticle,
  rightColumnArticles,
  shortNewsArticles,
  bottomRowArticles,
} from "./data/onetNewsRedSectionData";

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
            <Link href={`/artykul/${mainArticle.slug}`} className="block">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={mainArticle.image}
                  alt={mainArticle.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />

                {/* Prezentacja autora na zdjęciu w okręgu */}
                <div className="absolute top-4 left-4 flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <Image
                      src={mainArticle.author.avatar}
                      alt={mainArticle.author.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-2 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-medium text-white">
                      {mainArticle.author.name}
                    </span>
                    <span className="mx-1 text-gray-400">•</span>
                    <span className="text-xs text-gray-300">
                      {mainArticle.author.timeAgo}
                    </span>
                  </div>
                </div>

                {/* Kategoria i akcje w prawym górnym rogu */}
                <div className="absolute top-4 right-4 flex items-center space-x-2">
                  <span className="text-xs bg-red-600 text-white px-2 py-1 rounded-sm font-bold shadow-md">
                    {mainArticle.category}
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
                      {mainArticle.title}
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
                <Link
                  href={`/artykul/${rightColumnArticles[0].slug}`}
                  className="block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={rightColumnArticles[0].image}
                      alt={rightColumnArticles[0].title}
                      fill
                      className="object-cover"
                    />
                    {/* Prezentacja autora na zdjęciu w okręgu */}
                    <div className="absolute bottom-3 left-3 flex items-center">
                      <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-md">
                        <Image
                          src={rightColumnArticles[0].author.avatar}
                          alt={rightColumnArticles[0].author.name}
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-2 bg-black/60 backdro-blur-sm px-2 py-0.5 rounded-full">
                        <span className="text-xs text-white">
                          {rightColumnArticles[0].author.shortName}
                        </span>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2">
                      <div className="bg-yellow-400 text-black text-xs px-1.5 py-0.5 font-bold rounded-sm">
                        {rightColumnArticles[0].premiumLabel}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mt-2">
                    {rightColumnArticles[0].title}
                  </h3>
                </Link>
              </div>

              {/* Artykuł 2 - PODMIENIONE ZDJĘCIE */}
              <div>
                <Link
                  href={`/artykul/${rightColumnArticles[1].slug}`}
                  className="block group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={rightColumnArticles[1].image}
                      alt={rightColumnArticles[1].title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Prezentacja autora na zdjęciu w okręgu */}
                    <div className="absolute bottom-3 left-3 flex items-center">
                      <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-md">
                        <Image
                          src={rightColumnArticles[1].author.avatar}
                          alt={rightColumnArticles[1].author.name}
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-2 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full">
                        <span className="text-xs text-white">
                          {rightColumnArticles[1].author.shortName}
                        </span>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mt-2 group-hover:underline">
                    {rightColumnArticles[1].title}
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
                    href={`/artykul/${shortNewsArticles[0].slug}`}
                    className="flex p-2 hover:bg-red-700 transition-colors group"
                  >
                    <div className="w-20 h-16 relative flex-shrink-0 mr-2">
                      <Image
                        src={shortNewsArticles[0].image}
                        alt={shortNewsArticles[0].title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 className="text-xs font-medium text-white group-hover:underline line-clamp-3">
                      {shortNewsArticles[0].title}
                    </h4>
                  </Link>

                  {/* Article 2 */}
                  <Link
                    href={`/artykul/${shortNewsArticles[1].slug}`}
                    className="flex p-2 hover:bg-red-700 transition-colors group"
                  >
                    <div className="w-20 h-16 relative flex-shrink-0 mr-2">
                      <Image
                        src={shortNewsArticles[1].image}
                        alt={shortNewsArticles[1].title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 className="text-xs font-medium text-white group-hover:underline line-clamp-3">
                      {shortNewsArticles[1].title}
                    </h4>
                  </Link>

                  {/* Article 3 */}
                  <Link
                    href={`/artykul/${shortNewsArticles[2].slug}`}
                    className="flex p-2 hover:bg-red-700 transition-colors group"
                  >
                    <div className="w-20 h-16 relative flex-shrink-0 mr-2">
                      <Image
                        src={shortNewsArticles[2].image}
                        alt={shortNewsArticles[2].title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 className="text-xs font-medium text-white group-hover:underline line-clamp-3">
                      {shortNewsArticles[2].title}
                    </h4>
                  </Link>

                  {/* Article 4 */}
                  <Link
                    href={`/artykul/${shortNewsArticles[3].slug}`}
                    className="flex p-2 hover:bg-red-700 transition-colors group"
                  >
                    <div className="w-20 h-16 relative flex-shrink-0 mr-2">
                      <Image
                        src={shortNewsArticles[3].image}
                        alt={shortNewsArticles[3].title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 className="text-xs font-medium text-white group-hover:underline line-clamp-3">
                      {shortNewsArticles[3].title}
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
          <Link
            href={`/artykul/${bottomRowArticles[0].slug}`}
            className="flex group"
          >
            <div className="w-24 h-20 relative flex-shrink-0 mr-3">
              <Image
                src={bottomRowArticles[0].image}
                alt={bottomRowArticles[0].title}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white group-hover:underline line-clamp-3">
                {bottomRowArticles[0].title}
              </h4>
              <span className="text-xs text-gray-300 mt-1 block">
                {bottomRowArticles[0].author}
              </span>
            </div>
          </Link>

          {/* Artykuł 2 */}
          <Link
            href={`/artykul/${bottomRowArticles[1].slug}`}
            className="flex group"
          >
            <div className="w-24 h-20 relative flex-shrink-0 mr-3">
              <Image
                src={bottomRowArticles[1].image}
                alt={bottomRowArticles[1].title}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white group-hover:underline line-clamp-3">
                {bottomRowArticles[1].title}
              </h4>
              <span className="text-xs text-gray-300 mt-1 block">
                {bottomRowArticles[1].author}
              </span>
            </div>
          </Link>

          {/* Artykuł 3 */}
          <Link
            href={`/artykul/${bottomRowArticles[2].slug}`}
            className="flex group"
          >
            <div className="w-24 h-20 relative flex-shrink-0 mr-3">
              <Image
                src={bottomRowArticles[2].image}
                alt={bottomRowArticles[2].title}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white group-hover:underline line-clamp-3">
                {bottomRowArticles[2].title}
              </h4>
              <span className="text-xs text-gray-300 mt-1 block">
                {bottomRowArticles[2].author}
              </span>
            </div>
          </Link>

          {/* Artykuł 4 */}
          <Link
            href={`/artykul/${bottomRowArticles[3].slug}`}
            className="flex group"
          >
            <div className="w-24 h-20 relative flex-shrink-0 mr-3">
              <Image
                src={bottomRowArticles[3].image}
                alt={bottomRowArticles[3].title}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white group-hover:underline line-clamp-3">
                {bottomRowArticles[3].title}
              </h4>
              <span className="text-xs text-gray-300 mt-1 block">
                {bottomRowArticles[3].author}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
