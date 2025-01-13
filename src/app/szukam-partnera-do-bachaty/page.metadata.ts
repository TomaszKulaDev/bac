import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://baciata.pl"),
  title: "Szukam Partnera do Bachaty | Znajdź Partnerkę w Swojej Okolicy",
  description:
    "Największa społeczność tancerzy Bachaty w Polsce. Znajdź idealnego partnera do Bachaty w swojej okolicy.",
  keywords:
    "szukam partnera do bachaty, bachata, nauka bachaty, szkoła tańca, kurs bachaty, partner do bachaty warszawa, partnerka do bachaty kraków",
  openGraph: {
    title: "Szukam Partnera do Bachaty | Znajdź Partnerkę w Swojej Okolicy",
    description:
      "Znajdź idealnego partnera do bachaty w swojej okolicy. Dołącz do społeczności 2500+ aktywnych tancerzy w Polsce!",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Szukam Partnera do Bachaty - społeczność tancerzy",
      },
    ],
    locale: "pl_PL",
    type: "website",
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
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://baciata.pl/szukam-partnera-do-bachaty",
  },
};

// Structured data dla strony głównej
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
};
