import { metadata } from "./metadata";

export { metadata };

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicPlaylist",
    "name": "Kolekcja Bachaty",
    "description": "Największa kolekcja muzyki bachata online",
    "numTracks": "100+",
    "genre": "Bachata",
    "provider": {
      "@type": "Organization",
      "name": "Baciata.pl",
      "url": "https://www.baciata.pl",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.baciata.pl/logo.png"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "PLN",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd)
        }}
      />
      {children}
    </>
  );
}
