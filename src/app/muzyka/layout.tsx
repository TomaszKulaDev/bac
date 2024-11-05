// Ten plik to layout dla sekcji /muzyka w aplikacji Next.js
// Layout jest współdzielony przez wszystkie podstrony w tej sekcji

// Importujemy metadane SEO zdefiniowane w osobnym pliku
import { metadata } from "./metadata";

// Eksportujemy metadane, aby Next.js mógł je wykorzystać
export { metadata };

// Główny komponent Layout, który opakowuje zawartość podstron
export default function Layout({
  children, // children to komponenty podstron, które będą renderowane wewnątrz layoutu
}: {
  children: React.ReactNode
}) {
  // Definiujemy strukturę danych JSON-LD dla wyszukiwarek
  // JSON-LD to format służący do przekazywania ustrukturyzowanych danych
  const jsonLd = {
    "@context": "https://schema.org", // Określa kontekst Schema.org
    "@type": "MusicPlaylist", // Typ treści - playlista muzyczna
    "name": "Kolekcja Bachaty",
    "description": "Największa kolekcja muzyki bachata online",
    "numTracks": "100+", // Liczba utworów
    "genre": "Bachata",
    "provider": { // Informacje o dostawcy treści
      "@type": "Organization",
      "name": "Baciata.pl",
      "url": "https://www.baciata.pl",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.baciata.pl/logo.png"
      }
    },
    "aggregateRating": { // Zagregowana ocena użytkowników
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250"
    },
    "offers": { // Informacje o ofercie
      "@type": "Offer", 
      "price": "0",
      "priceCurrency": "PLN",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <>
      {/* Wstawiamy dane JSON-LD do znacznika script w head */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd)
        }}
      />
      {/* Renderujemy właściwą zawartość podstrony */}
      {children}
    </>
  );
}
