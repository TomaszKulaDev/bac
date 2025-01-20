// src/app/nauka-tanca-bachata/page.metadata.ts
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://baciata.pl"),
  title: "Nauka Tańca Bachata Online | Kursy od Podstaw do Zaawansowanego",
  description:
    "Profesjonalne kursy bachaty online. Ucz się od najlepszych instruktorów w Polsce - od podstaw po zaawansowane techniki sensual i impro.",
  keywords:
    "nauka bachaty online, kurs bachaty, bachata od podstaw, bachata sensual, bachata moderna, bachata impro, pierwszy taniec, lekcje bachaty, instruktor bachaty",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://baciata.pl/nauka-tanca-bachata",
    siteName: "Baciata.pl",
    title: "Nauka Tańca Bachata Online | Kursy od Podstaw do Zaawansowanego",
    description:
      "Rozpocznij naukę bachaty online z najlepszymi instruktorami w Polsce. Ponad 1000+ lekcji wideo dostępnych 24/7!",
    images: [
      {
        url: "/images/courses/bachata-hero.webp",
        width: 1200,
        height: 630,
        alt: "Nauka tańca bachata online - kursy wideo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nauka Tańca Bachata Online",
    description:
      "Profesjonalne kursy bachaty dla każdego poziomu zaawansowania",
    images: ["/images/courses/bachata-hero.webp"],
    creator: "@baciata_pl",
  },
  alternates: {
    canonical: "https://baciata.pl/nauka-tanca-bachata",
    languages: {
      en: "https://baciata.pl/en/learn-bachata",
      es: "https://baciata.pl/es/aprender-bachata",
      pl: "https://baciata.pl/nauka-tanca-bachata",
    },
  },
  verification: {
    google: "twój-kod-weryfikacyjny",
  },
};

// Structured data dla platformy edukacyjnej
export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Nauka Tańca Bachata Online",
  description: "Kompleksowe kursy bachaty od podstaw po poziom zaawansowany",
  provider: {
    "@type": "Organization",
    name: "Baciata.pl",
    sameAs: "https://baciata.pl",
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    educationalLevel: "beginner to advanced",
    inLanguage: "pl-PL",
  },
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    priceCurrency: "PLN",
    price: "0",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "750",
  },
  learningResourceType: "Video",
  educationalLevel: "Beginner to Advanced",
  teaches: ["Bachata", "Bachata Sensual", "Bachata Moderna", "Izolacje"],
};
