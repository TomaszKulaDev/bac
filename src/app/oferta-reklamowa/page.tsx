"use client";

import { PageHeader } from "../szukam-partnera-do-tanca/components/PageHeader";
import Link from "next/link";

export default function AdvertisingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-16">
        <PageHeader title="Oferta Reklamowa" />

        <div className="max-w-4xl mx-auto">
          {/* Intro Section */}
          <div className="text-center mb-12">
            <p className="text-lg text-gray-600 mb-6">
              Dotrzyj do największej społeczności tancerzy w Polsce. Oferujemy
              różnorodne formy promocji dopasowane do Twoich potrzeb.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Basic */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-amber-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Start</h3>
              <p className="text-3xl font-bold text-amber-600 mb-6">299 zł</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600">
                  <span className="mr-2">✓</span> Banner reklamowy (30 dni)
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="mr-2">✓</span> Post w social media
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="mr-2">✓</span> Newsletter mention
                </li>
              </ul>
              <Link href="/kontakt">
                <button
                  className="w-full py-2 px-4 bg-gradient-to-r from-amber-500 
                               to-red-500 text-white rounded-lg hover:from-amber-600 
                               hover:to-red-600 transition-all duration-300"
                >
                  Wybierz pakiet
                </button>
              </Link>
            </div>

            {/* Premium */}
            <div
              className="bg-white p-6 rounded-xl shadow-lg border-2 border-amber-500 
                          transform scale-105"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span
                  className="bg-gradient-to-r from-amber-500 to-red-500 text-white 
                             px-4 py-1 rounded-full text-sm"
                >
                  Najpopularniejszy
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Premium</h3>
              <p className="text-3xl font-bold text-amber-600 mb-6">599 zł</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600">
                  <span className="mr-2">✓</span> Banner reklamowy (60 dni)
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="mr-2">✓</span> 3 posty w social media
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="mr-2">✓</span> Dedykowany newsletter
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="mr-2">✓</span> Artykuł sponsorowany
                </li>
              </ul>
              <Link href="/kontakt">
                <button
                  className="w-full py-2 px-4 bg-gradient-to-r from-amber-500 
                               to-red-500 text-white rounded-lg hover:from-amber-600 
                               hover:to-red-600 transition-all duration-300"
                >
                  Wybierz pakiet
                </button>
              </Link>
            </div>

            {/* Business */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-amber-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Business</h3>
              <p className="text-3xl font-bold text-amber-600 mb-6">999 zł</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600">
                  <span className="mr-2">✓</span> Banner reklamowy (90 dni)
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="mr-2">✓</span> 6 postów w social media
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="mr-2">✓</span> 3 dedykowane newslettery
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="mr-2">✓</span> 3 artykuły sponsorowane
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="mr-2">✓</span> Priorytetowe wyświetlanie
                </li>
              </ul>
              <Link href="/kontakt">
                <button
                  className="w-full py-2 px-4 bg-gradient-to-r from-amber-500 
                               to-red-500 text-white rounded-lg hover:from-amber-600 
                               hover:to-red-600 transition-all duration-300"
                >
                  Wybierz pakiet
                </button>
              </Link>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center bg-amber-50 p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Potrzebujesz indywidualnej oferty?
            </h3>
            <p className="text-gray-600 mb-6">
              Skontaktuj się z nami, przygotujemy spersonalizowaną propozycję
              dopasowaną do Twoich potrzeb.
            </p>
            <Link href="/kontakt">
              <button
                className="px-8 py-3 bg-gradient-to-r from-amber-500 
                             to-red-500 text-white rounded-lg hover:from-amber-600 
                             hover:to-red-600 transition-all duration-300"
              >
                Skontaktuj się z nami
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
