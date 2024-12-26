import { Metadata } from "next";

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
      <div className="min-h-screen">
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900 hover:text-red-600 transition-colors cursor-pointer">
                Szukam Partnera do Tańca
              </h1>
              <div className="flex items-center gap-4">
                <button className="btn-secondary hidden sm:block">
                  Jak to działa?
                </button>
                <button className="btn-primary">Dodaj Ogłoszenie</button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow">{children}</main>

        <footer className="bg-gray-50 border-t">
          <nav aria-label="Stopka">
            <div className="container mx-auto px-4 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-2">
                  <h3 className="font-bold text-xl mb-4 text-gray-900">
                    Szukam Partnera do Tańca
                  </h3>
                  <p className="text-gray-600 mb-4 max-w-md">
                    Największa społeczność tancerzy w Polsce. Znajdź idealnego
                    partnera do tańca i rozwijaj swoją pasję.
                  </p>
                  <div className="flex gap-4">
                    <button className="btn-secondary">Newsletter</button>
                    <button className="btn-primary">Dołącz do nas</button>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">O Serwisie</h3>
                  <ul className="space-y-2">
                    <li>Jak to działa</li>
                    <li>Zasady bezpieczeństwa</li>
                    <li>Często zadawane pytania</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Dla Tancerzy</h3>
                  <ul className="space-y-2">
                    <li>Dodaj ogłoszenie</li>
                    <li>Szukaj partnera</li>
                    <li>Wydarzenia taneczne</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Kontakt</h3>
                  <ul className="space-y-2">
                    <li>Pomoc</li>
                    <li>Zgłoś problem</li>
                    <li>Współpraca</li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </footer>
      </div>
    </>
  );
}
