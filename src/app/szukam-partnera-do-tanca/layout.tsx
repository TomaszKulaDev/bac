import { Metadata } from "next";
import Link from "next/link";
import { ScrollToTop } from "./components/ScrollToTop";
import { Navbar } from "./components/Navbar";

// Dodajemy strukturowane dane JSON-LD
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Baciata.pl - Szukam Partnera do Tańca",
  url: "https://baciata.pl",
  description: "Największa społeczność tancerzy Bachaty w Polsce",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate:
        "https://baciata.pl/szukam-partnera-do-tanca?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "2500",
    bestRating: "5",
    worstRating: "1",
  },
  sameAs: [
    "https://www.facebook.com/Baciata",
    "https://www.instagram.com/baciata_pl/",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://baciata.pl"),
  title: "Szukam Partnera do Bachaty | Znajdź Partnera w Swojej Okolicy",
  description:
    "Największa społeczność tancerzy Bachaty w Polsce. Znajdź idealnego partnera do Bachaty w swojej okolicy.",
  keywords:
    "partner do tańca, szukam partnera do bachaty, bachata, nauka bachaty, szkoła tańca, kurs bachaty, partner do bachaty warszawa, partnerka do bachaty kraków, bachata sensual, bachata dominicana, bachata moderna, darmowe ogłoszenia taneczne",
  openGraph: {
    title: "Szukam Partnera do Bachaty | Największa Społeczność Tancerzy",
    description:
      "Znajdź idealnego partnera do bachaty w swojej okolicy. Dołącz do społeczności 2500+ aktywnych tancerzy w Polsce!",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Szukam Partnera do Bachaty - społeczność tancerzy",
      },
      {
        url: "/images/og-image-square.jpg",
        width: 1080,
        height: 1080,
        alt: "Baciata.pl - znajdź partnera do tańca",
      },
    ],
    locale: "pl_PL",
    type: "website",
    siteName: "Baciata.pl",
    url: "https://baciata.pl/szukam-partnera-do-tanca",
  },
  twitter: {
    card: "summary_large_image",
    title: "Szukam Partnera do Bachaty",
    description: "Znajdź idealnego partnera do Bachaty w swojej okolicy",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://baciata.pl/szukam-partnera-do-tanca",
    languages: {
      "pl-PL": "/pl/szukam-partnera-do-bachaty",
      "en-US": "/en/find-bachata-partner",
    },
  },
  verification: {
    google: "twój-kod-weryfikacyjny",
    yandex: "twój-kod-weryfikacyjny",
    yahoo: "twój-kod-weryfikacyjny",
  },
  category: "Dance",
  classification: "Dance Partner Search",
};

export default function PartnerSearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <footer className="bg-gradient-to-b from-white to-amber-50 border-t border-amber-100">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand Section */}
              <div className="md:col-span-1">
                <h3
                  className="text-xl font-bold mb-4 bg-gradient-to-r 
                             from-amber-500 to-red-500 bg-clip-text 
                             text-transparent"
                >
                  Szukam Partnera do Tańca
                </h3>
                <p className="text-gray-600 mb-6">
                  Największa społeczność tancerzy w Polsce.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-semibold mb-4 text-gray-800">O Serwisie</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/szukam-partnera-do-tanca/jak-to-dziala"
                      className="text-gray-600 hover:text-amber-600 transition-colors"
                    >
                      Jak to działa
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/szukam-partnera-do-tanca/zasady-bezpieczenstwa"
                      className="text-gray-600 hover:text-amber-600 transition-colors"
                    >
                      Zasady bezpieczeństwa
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/szukam-partnera-do-tanca/faq"
                      className="text-gray-600 hover:text-amber-600 transition-colors"
                    >
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Dancers Section */}
              <div>
                <h3 className="font-semibold mb-4 text-gray-800">
                  Dla Tancerzy
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/dodaj-ogloszenie"
                      className="text-gray-600 hover:text-amber-600 transition-colors"
                    >
                      Dodaj ogłoszenie
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.baciata.pl/szukam-partnera-do-tanca"
                      className="text-gray-600 hover:text-amber-600 transition-colors"
                    >
                      Szukaj partnera
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/wydarzenia"
                      className="text-gray-600 hover:text-amber-600 transition-colors"
                    >
                      Wydarzenia taneczne
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Business Section */}
              <div>
                <h3 className="font-semibold mb-4 text-gray-800">
                  Dla Biznesu
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/oferta-reklamowa"
                      className="text-gray-600 hover:text-amber-600 transition-colors 
                               flex items-center gap-2"
                    >
                      <span>Oferta reklamowa</span>
                      <span
                        className="text-xs px-2 py-0.5 bg-amber-100 
                                   text-amber-700 rounded-full"
                      >
                        New
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/wspolpraca"
                      className="text-gray-600 hover:text-amber-600 transition-colors"
                    >
                      Współpraca
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/kontakt"
                      className="text-gray-600 hover:text-amber-600 transition-colors"
                    >
                      Kontakt biznesowy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Newsletter & Join Section */}
            <div className="mt-8 pt-8 border-t border-amber-100">
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  className="px-4 py-2 rounded-lg border border-amber-200 
                               text-amber-700 hover:bg-amber-50 transition-colors"
                >
                  Newsletter
                </button>
                <Link
                  href="https://www.baciata.pl/register"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r 
                           from-amber-500 to-red-500 text-white 
                           hover:from-amber-600 hover:to-red-600 
                           transition-colors"
                >
                  Dołącz do nas
                </Link>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-12 pt-8 border-t border-amber-100 text-center text-gray-600">
              © 2024 Baciata.pl - Wszystkie prawa zastrzeżone
            </div>
          </div>
        </footer>
      </div>
      <ScrollToTop />
    </>
  );
}
