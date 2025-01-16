import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://baciata.pl"),
  title: "Baciata.pl - Portal Społeczności Bachaty w Polsce",
  description:
    "Baciata.pl - największy portal o bachacie w Polsce. Wydarzenia, szkoły tańca, muzyka, społeczność i wszystko, co związane z bachatą.",
  keywords: [
    "bachata",
    "taniec",
    "polska bachata",
    "szkoły tańca",
    "wydarzenia bachata",
    "kursy bachaty",
  ],
  authors: [{ name: "Baciata.pl Team" }],
  creator: "Baciata.pl",
  publisher: "Baciata.pl",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://baciata.pl",
    languages: {
      "pl-PL": "https://baciata.pl",
      "en-US": "https://baciata.pl/en",
      "es-ES": "https://baciata.pl/es",
    },
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://baciata.pl",
    siteName: "Baciata.pl",
    title: "Baciata.pl - Portal Społeczności Bachaty w Polsce",
    description: "Największy portal o bachacie w Polsce",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Baciata.pl - Portal Bachaty",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@baciatapl",
    creator: "@baciatapl",
    images: "/twitter-image.jpg",
  },
  verification: {
    google: "twój-kod-weryfikacyjny-google",
    yandex: "twój-kod-weryfikacyjny-yandex",
    yahoo: "twój-kod-weryfikacyjny-yahoo",
  },
  category: "dance",
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
};

// Structured data dla strony głównej
export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Baciata.pl",
  url: "https://baciata.pl",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://baciata.pl/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
  sameAs: [
    "https://www.facebook.com/Baciata/",
    "https://www.instagram.com/baciata_pl/",
    "https://www.youtube.com/@Baciata_pl",
  ],
  organization: {
    "@type": "Organization",
    name: "Baciata.pl",
    logo: {
      "@type": "ImageObject",
      url: "https://baciata.pl/logo.png",
    },
  },
};
