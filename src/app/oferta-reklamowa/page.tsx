"use client";

import { PageHeader } from "../szukam-partnera-do-tanca/components/PageHeader";
import Link from "next/link";
import { motion } from "framer-motion";

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  price: string;
  features: PricingFeature[];
  isPopular?: boolean;
  description?: string;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Start",
    price: "299 zł",
    description: "Idealne dla małych szkół tańca i początkujących instruktorów",
    features: [
      { text: "Banner reklamowy (30 dni)", included: true },
      { text: "Post w social media", included: true },
      { text: "Newsletter mention", included: true },
      { text: "Podstawowa analityka", included: true },
      { text: "Wsparcie email", included: true },
    ],
  },
  {
    name: "Premium",
    price: "599 zł",
    isPopular: true,
    description: "Najpopularniejszy wybór wśród szkół tańca",
    features: [
      { text: "Banner reklamowy (60 dni)", included: true },
      { text: "3 posty w social media", included: true },
      { text: "Dedykowany newsletter", included: true },
      { text: "Artykuł sponsorowany", included: true },
      { text: "Zaawansowana analityka", included: true },
      { text: "Priorytetowe wsparcie", included: true },
    ],
  },
  {
    name: "Business",
    price: "999 zł",
    description: "Kompleksowe rozwiązanie dla dużych szkół i organizatorów",
    features: [
      { text: "Banner reklamowy (90 dni)", included: true },
      { text: "6 postów w social media", included: true },
      { text: "3 dedykowane newslettery", included: true },
      { text: "3 artykuły sponsorowane", included: true },
      { text: "Priorytetowe wyświetlanie", included: true },
      { text: "Wsparcie premium 24/7", included: true },
      { text: "Raport efektywności", included: true },
    ],
  },
];

export default function AdvertisingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-16">
        <PageHeader title="Oferta Reklamowa" />

        <div className="max-w-4xl mx-auto">
          {/* Intro Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Zwiększ Zasięg Swojej Szkoły Tańca
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Dotrzyj do największej społeczności tancerzy w Polsce. Oferujemy
              różnorodne formy promocji dopasowane do Twoich potrzeb.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-white p-6 rounded-xl shadow-lg 
                ${
                  plan.isPopular
                    ? "border-2 border-amber-500 transform scale-105"
                    : "border border-amber-100"
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span
                      className="bg-gradient-to-r from-amber-500 to-red-500 
                                   text-white px-4 py-1 rounded-full text-sm"
                    >
                      Najpopularniejszy
                    </span>
                  </div>
                )}

                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                <p className="text-3xl font-bold text-amber-600 mb-6">
                  {plan.price}
                </p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <span className="mr-2 text-amber-500">✓</span>
                      {feature.text}
                    </li>
                  ))}
                </ul>

                <Link href="/kontakt" className="block">
                  <button
                    className={`w-full py-2 px-4 rounded-lg transition-all duration-300
                    ${
                      plan.isPopular
                        ? "bg-gradient-to-r from-amber-500 to-red-500 text-white hover:from-amber-600 hover:to-red-600"
                        : "bg-white border-2 border-amber-500 text-amber-600 hover:bg-amber-50"
                    }`}
                  >
                    Wybierz pakiet
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center bg-amber-50 p-8 rounded-xl"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Potrzebujesz indywidualnej oferty?
            </h3>
            <p className="text-gray-600 mb-6">
              Skontaktuj się z nami, przygotujemy spersonalizowaną propozycję
              dopasowaną do Twoich potrzeb.
            </p>
            <Link href="/kontakt">
              <button
                className="px-8 py-3 bg-gradient-to-r from-amber-500 to-red-500 
                               text-white rounded-lg hover:from-amber-600 hover:to-red-600 
                               transition-all duration-300"
              >
                Skontaktuj się z nami
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
