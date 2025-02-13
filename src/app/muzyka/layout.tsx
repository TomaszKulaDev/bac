// Ten plik to layout dla sekcji /muzyka w aplikacji Next.js
// Layout jest współdzielony przez wszystkie podstrony w tej sekcji

// Importujemy metadane z osobnego pliku
import { metadata } from "./metadata";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";

// Główny komponent Layout, który opakowuje zawartość podstron
export default function Layout({
  children, // children to komponenty podstron, które będą renderowane wewnątrz layoutu
}: {
  children: React.ReactNode;
}) {
  // Definiujemy strukturę danych JSON-LD
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
      <div className="px-0 sm:px-4">
        {children}
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
}
// Eksportujemy metadane
export { metadata };
