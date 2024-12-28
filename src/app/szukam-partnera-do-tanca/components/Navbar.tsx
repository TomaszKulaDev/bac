"use client";

import Link from "next/link";
import { AddAdvertisementButton } from "./AddAdvertisementButton";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-amber-100">
      <nav className="container mx-auto px-4 h-16">
        <div className="flex justify-between items-center h-full">
          <Link
            href="/szukam-partnera-do-tanca"
            className="text-2xl font-bold text-gray-900 hover:text-amber-600 
                     transition-colors flex items-center gap-2"
          >
            <span
              className="bg-gradient-to-r from-amber-500 to-red-500 
                           bg-clip-text text-transparent"
            >
              Szukam Partnera do Tańca
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/szukam-partnera-do-tanca/jak-to-dziala"
              className="hidden sm:flex items-center gap-2 text-gray-600 
                       hover:text-amber-600 transition-colors"
            >
              Jak to działa?
            </Link>
            <AddAdvertisementButton />
          </div>
        </div>
      </nav>
    </header>
  );
}
