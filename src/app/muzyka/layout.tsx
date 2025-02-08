// Ten plik to layout dla sekcji /muzyka w aplikacji Next.js
// Layout jest współdzielony przez wszystkie podstrony w tej sekcji

// Importujemy metadane SEO zdefiniowane w osobnym pliku
import { metadata } from "./metadata";

// Główny komponent Layout, który opakowuje zawartość podstron
export default function Layout({
  children, // children to komponenty podstron, które będą renderowane wewnątrz layoutu
}: {
  children: React.ReactNode;
}) {
  // Definiujemy strukturę danych JSON-LD dla wyszukiwarek
  // JSON-LD to format służący do przekazywania ustrukturyzowanych danych
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicPlaylist",
    name: "Kolekcja Bachaty",
    description:
      "Największa kolekcja muzyki bachata online. Idealna do nauki i treningu.",
    provider: {
      "@type": "Organization",
      name: "Baciata.pl",
      url: "https://www.baciata.pl",
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
      {/* Usuwamy padding na mobile */}
      <div className="px-0 sm:px-4">{children}</div>
    </>
  );
}
