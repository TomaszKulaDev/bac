"use client";

import { PageHeader } from "../szukam-partnera-do-bachaty/components/PageHeader";
import Link from "next/link";
import { FaHandshake, FaUsers, FaBullhorn, FaChartLine } from "react-icons/fa";

export default function PartnershipPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-16">
        <PageHeader title="Współpraca" />

        <div className="max-w-4xl mx-auto">
          {/* Intro */}
          <div className="text-center mb-12">
            <p className="text-lg text-gray-600">
              Rozwijaj się razem z nami. Oferujemy różne formy współpracy dla
              szkół tańca, organizatorów wydarzeń i innych partnerów.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Benefit 1 */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <FaUsers className="text-amber-500 text-2xl mr-4" />
                <h3 className="text-xl font-bold text-gray-800">
                  Dostęp do Społeczności
                </h3>
              </div>
              <p className="text-gray-600">
                Dotrzyj do tysięcy aktywnych tancerzy w całej Polsce. Promuj
                swoje wydarzenia i kursy.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <FaBullhorn className="text-amber-500 text-2xl mr-4" />
                <h3 className="text-xl font-bold text-gray-800">
                  Wzajemna Promocja
                </h3>
              </div>
              <p className="text-gray-600">
                Wspólne akcje marketingowe, cross-promocja w social mediach i
                newsletterach.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <FaHandshake className="text-amber-500 text-2xl mr-4" />
                <h3 className="text-xl font-bold text-gray-800">
                  Program Partnerski
                </h3>
              </div>
              <p className="text-gray-600">
                Atrakcyjne warunki współpracy i prowizje dla stałych partnerów.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <FaChartLine className="text-amber-500 text-2xl mr-4" />
                <h3 className="text-xl font-bold text-gray-800">
                  Rozwój Biznesu
                </h3>
              </div>
              <p className="text-gray-600">
                Wsparcie w rozwoju Twojego biznesu poprzez dostęp do nowych
                klientów i rynków.
              </p>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center bg-amber-50 p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Zainteresowany współpracą?
            </h3>
            <p className="text-gray-600 mb-6">
              Skontaktuj się z nami i omówmy możliwości współpracy.
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
