import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://baciata.pl"),
  title: "Szukam Partnera do Bachaty | Znajdź Partnerkę w Swojej Okolicy",
  description:
    "Największa społeczność tancerzy Bachaty w Polsce. Znajdź idealnego partnera do Bachaty w swojej okolicy.",
  keywords:
    "szukam partnera do bachaty, bachata, nauka bachaty, szkoła tańca, kurs bachaty, partner do bachaty warszawa, partnerka do bachaty kraków",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://baciata.pl/szukam-partnera-do-bachaty",
    siteName: "Baciata.pl",
    title: "Szukam Partnera do Bachaty | Znajdź Partnerkę w Swojej Okolicy",
    description:
      "Znajdź idealnego partnera do bachaty w swojej okolicy. Dołącz do społeczności 2500+ aktywnych tancerzy w Polsce!",
    images: [
      {
        url: "/images/szukam-partnera-do-bachaty.webp",
        width: 1200,
        height: 630,
        alt: "Szukam Partnera do Bachaty - społeczność tancerzy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Szukam Partnera do Bachaty",
    description: "Znajdź idealnego partnera do Bachaty w swojej okolicy",
    images: ["/images/szukam-partnera-do-bachaty.webp"],
    creator: "@baciata_pl",
  },
  alternates: {
    canonical: "https://baciata.pl/szukam-partnera-do-bachaty",
    languages: {
      en: "https://baciata.pl/en/find-dance-partner",
      es: "https://baciata.pl/es/buscar-pareja",
      pl: "https://baciata.pl/szukam-partnera-do-bachaty",
    },
  },
  verification: {
    google: "twój-kod-weryfikacyjny",
  },
};

// Structured data dla strony wyszukiwania partnerów
export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Szukam Partnera do Bachaty",
  description: "Znajdź idealnego partnera do Bachaty w swojej okolicy",
  url: "https://baciata.pl/szukam-partnera-do-bachaty",
  inLanguage: "pl-PL",
  isPartOf: {
    "@type": "WebSite",
    name: "Baciata.pl",
    url: "https://baciata.pl",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate:
        "https://baciata.pl/szukam-partnera-do-bachaty?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
  mainEntity: {
    "@type": "Service",
    name: "Wyszukiwarka Partnerów do Tańca",
    description: "Platforma łącząca tancerzy Bachaty w Polsce",
    provider: {
      "@type": "Organization",
      name: "Baciata.pl",
    },
  },
};
