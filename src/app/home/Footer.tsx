"use client";

import Link from "next/link";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

/**
 * Footer - Komponent stopki strony
 *
 * Zawiera:
 * - Logo i krótki opis
 * - Linki nawigacyjne podzielone na kategorie
 * - Linki do mediów społecznościowych
 * - Informacje o prawach autorskich i polityce prywatności
 */
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 bg-[#ffd200] rounded-lg flex items-center justify-center text-white font-bold text-xl">
                B
              </div>
              <span className="ml-3 text-xl font-bold text-white">Baciata</span>
            </Link>
            <p className="mt-4 text-gray-400 text-sm">
              Największy polski portal poświęcony bachacie. Znajdziesz tu
              wszystko, co związane z tańcem, muzyką i kulturą bachaty.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200">
              Nawigacja
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/wydarzenia"
                  className="text-gray-400 hover:text-[#ffd200] text-sm"
                >
                  Wydarzenia
                </Link>
              </li>
              <li>
                <Link
                  href="/spolecznosc"
                  className="text-gray-400 hover:text-[#ffd200] text-sm"
                >
                  Społeczność
                </Link>
              </li>
              <li>
                <Link
                  href="/szkoly"
                  className="text-gray-400 hover:text-[#ffd200] text-sm"
                >
                  Szkoły
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-400 hover:text-[#ffd200] text-sm"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200">
              Społeczność
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/szukam-partnera-do-bachaty"
                  className="text-gray-400 hover:text-[#ffd200] text-sm"
                >
                  Szukam partnera do bachaty
                </Link>
              </li>
              <li>
                <Link
                  href="/poland-bachata-league"
                  className="text-gray-400 hover:text-[#ffd200] text-sm"
                >
                  Poland Bachata League
                </Link>
              </li>
              <li>
                <Link
                  href="/instruktorzy-bachaty"
                  className="text-gray-400 hover:text-[#ffd200] text-sm"
                >
                  Instruktorzy bachaty
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200">
              Kontakt
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/kontakt"
                  className="text-gray-400 hover:text-[#ffd200] text-sm"
                >
                  Kontakt
                </Link>
              </li>
              <li>
                <Link
                  href="/oferta-reklamowa"
                  className="text-gray-400 hover:text-[#ffd200] text-sm"
                >
                  Oferta reklamowa
                </Link>
              </li>
              <li>
                <Link
                  href="/wspolpraca"
                  className="text-gray-400 hover:text-[#ffd200] text-sm"
                >
                  Współpraca
                </Link>
              </li>
            </ul>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#ffd200]">
                <FaFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#ffd200]">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#ffd200]">
                <FaYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Baciata.pl. Wszelkie prawa
            zastrzeżone.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/polityka-prywatnosci-baciata-pl"
              className="text-gray-400 hover:text-[#ffd200] text-sm"
            >
              Polityka prywatności
            </Link>
            <Link
              href="/warunki-korzystania-z-uslugi-baciata-pl"
              className="text-gray-400 hover:text-[#ffd200] text-sm"
            >
              Warunki korzystania
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
