"use client";

import { useState } from "react";
import {
  FaHome,
  FaSearch,
  FaBell,
  FaComments,
  FaUser,
  FaPlus,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function PartnerSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50 px-4">
        <div className="flex items-center justify-between h-full max-w-screen-2xl mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-2xl px-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="Szukaj partnera do tańca..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full 
                         focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <FaBell className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <FaComments className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <FaUser className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Side Navigation */}
      <nav className="fixed left-0 top-0 h-screen w-[72px] bg-white border-r border-gray-100 z-40">
        <div className="flex flex-col items-center pt-20 gap-2">
          <Link
            href="/"
            className="p-4 rounded-full hover:bg-gray-100 transition-colors"
          >
            <FaHome className="w-6 h-6 text-gray-600" />
          </Link>
          <button className="p-4 rounded-full hover:bg-gray-100 transition-colors">
            <FaPlus className="w-6 h-6 text-gray-600" />
          </button>
          <button className="p-4 rounded-full hover:bg-gray-100 transition-colors">
            <FaSearch className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 pl-[72px]">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div
            className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 
                        gap-4 space-y-4 [column-fill:_balance]"
          >
            {Array.from({ length: 90 }).map((_, index) => (
              <div key={index} className="break-inside-avoid-column mb-4">
                <div
                  className="relative rounded-lg overflow-hidden bg-white shadow-sm 
                           hover:shadow-md transition-shadow"
                  style={{
                    height: `${Math.floor(
                      Math.random() * (450 - 200) + 200
                    )}px`,
                  }}
                >
                  <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-white">
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
