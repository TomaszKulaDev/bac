import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://baciata.pl"),
  title:
    "Szukasz Partnera do Bachaty? | Znajdź Partnerke do Bachaty w Swojej Okolicy",
  description:
    "Największa społeczność tancerzy Bachaty w Polsce. Znajdź idealnego partnera do Bachaty w swojej okolicy.",
  keywords:
    "partner do tańca bachaty, szukam partnera do bachaty, bachata, nauka bachaty, szkoła tańca, kurs bachaty, partner do bachaty warszawa, partnerka do bachaty kraków",
  openGraph: {
    title:
      "Szukasz Partnera do Bachaty? | Największa Społeczność Tancerzy Bachaty",
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
    url: "https://baciata.pl/szukam-partnera-do-bachaty",
  },
  twitter: {
    card: "summary_large_image",
    title: "Szukam Partnera do Bachaty",
    description: "Znajdź idealnego partnera do Bachaty w swojej okolicy",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://baciata.pl/szukam-partnera-do-bachaty",
    languages: {
      "pl-PL": "/pl/szukam-partnera-do-bachaty",
      "en-US": "/en/find-bachata-partner",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "twój-kod-weryfikacyjny",
    yandex: "twój-kod-weryfikacyjny",
    yahoo: "twój-kod-weryfikacyjny",
  },
  category: "Bachata dance",
  classification: "Dance Partner Search",
};

// Strukturowane dane dla wyszukiwarki
export const jsonLd = {
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
        "https://baciata.pl/szukam-partnera-do-bachaty?q={search_term_string}",
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
