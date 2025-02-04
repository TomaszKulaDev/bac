// Ten plik to layout dla sekcji /muzyka w aplikacji Next.js
// Layout jest współdzielony przez wszystkie podstrony w tej sekcji

// Importujemy metadane SEO zdefiniowane w osobnym pliku
import HeroBanner from "./components/HeroBanner";
import { metadata } from "./metadata";
import Breadcrumb from "@/app/muzyka/components/Breadcrumb";

// Eksportujemy metadane, aby Next.js mógł je wykorzystać
// export { metadata };

// Główny komponent Layout, który opakowuje zawartość podstron
export default function Layout({
  children, // children to komponenty podstron, które będą renderowane wewnątrz layoutu
}: {
  children: React.ReactNode;
}) {
  // Definiujemy strukturę danych JSON-LD dla wyszukiwarek
  // JSON-LD to format służący do przekazywania ustrukturyzowanych danych
  const jsonLd = {
    "@context": "https://schema.org", // Określa kontekst Schema.org
    "@type": "MusicPlaylist", // Typ treści - playlista muzyczna
    name: "Kolekcja Bachaty",
    description: "Największa kolekcja muzyki bachata online",
    numTracks: "100+", // Liczba utworów
    genre: "Bachata",
    keywords: "bachata, muzyka do tańca, dominican bachata, bachata sensual",
    provider: {
      // Informacje o dostawcy treści
      "@type": "Organization",
      name: "Baciata.pl",
      url: "https://www.baciata.pl",
      logo: {
        "@type": "ImageObject",
        url: "https://www.baciata.pl/logo.png",
      },
      sameAs: [
        "https://www.facebook.com/baciata",
        "https://www.instagram.com/baciata_pl/",
      ],
    },
    aggregateRating: {
      // Zagregowana ocena użytkowników
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250",
    },
    offers: {
      // Informacje o ofercie
      "@type": "Offer",
      price: "0",
      priceCurrency: "PLN",
      availability: "https://schema.org/InStock",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Strona główna",
          item: "https://www.baciata.pl",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Muzyka",
          item: "https://www.baciata.pl/muzyka",
        },
      ],
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://www.baciata.pl/muzyka",
    },
  };

  return (
    <>
      {/* Wstawiamy dane JSON-LD do znacznika script w head */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <Breadcrumb />
      {/* <HeroBanner /> */}
      {/* Renderujemy właściwą zawartość podstrony */}
      {children}
    </>
  );
}
