import { Metadata } from "next";
import { instructors } from "./data/instructors";

export const metadata: Metadata = {
  title: "Instruktorzy Bachaty | Znajdź swojego instruktora tańca",
  description:
    "Znajdź najlepszych instruktorów bachaty w Polsce. Lekcje indywidualne, grupowe, wszystkie style: Sensual, Dominicana, Moderna. Sprawdzone opinie i doświadczeni nauczyciele.",
  keywords:
    "instruktorzy bachaty, nauka bachaty, lekcje bachaty, kurs bachaty, bachata sensual, bachata dominicana, bachata moderna",
  openGraph: {
    title: "Instruktorzy Bachaty | Znajdź swojego instruktora tańca",
    description:
      "Znajdź najlepszych instruktorów bachaty w Polsce. Sprawdzone opinie i doświadczeni nauczyciele.",
    images: [
      {
        url: "/images/bachata-romance.jpg",
        width: 1200,
        height: 630,
        alt: "Instruktorzy Bachaty",
      },
    ],
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Instruktorzy Bachaty | Znajdź swojego instruktora tańca",
    description:
      "Znajdź najlepszych instruktorów bachaty w Polsce. Sprawdzone opinie i doświadczeni nauczyciele.",
    images: ["/images/og-instructors.jpg"],
  },
  alternates: {
    canonical: "https://baciata.pl/instruktorzy-bachaty",
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
};

export const generateStaticParams = async () => {
  const cities = [
    ...new Set(instructors.map((instructor) => instructor.location)),
  ];
  const styles = ["sensual", "dominicana", "moderna"];

  return {
    cities,
    styles,
  };
};

export const structuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: instructors.map((instructor, index) => ({
    "@type": "Person",
    "@id": `https://baciata.pl/instruktorzy-bachaty#instructor${instructor.id}`,
    position: index + 1,
    name: instructor.name,
    description: instructor.description,
    image: instructor.image,
    jobTitle: "Instruktor Bachaty",
    worksFor: {
      "@type": "Organization",
      name: "Szkoła Tańca",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: instructor.location,
      addressCountry: "PL",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: instructor.rating,
      reviewCount: instructor.reviewCount || 0,
    },
  })),
};
