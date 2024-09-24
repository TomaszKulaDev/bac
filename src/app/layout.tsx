// Next.js version: 14.2.6
// Używamy App Router
// Używamy NextAuth do autoryzacji
// Używamy Tailwind CSS do stylowania
// Używamy React do tworzenia interfejsu użytkownika
// Używamy Next.js do tworzenia stron
// Używamy Redux Toolkit do zarządzania stanem aplikacji
// Używamy ClientProviders do dostarczenia kontekstu dla klienta
// Używamy ClientLayout do ustawienia układu strony
// Używamy NavContent do nawigacji
// Używamy AuthSync do synchronizacji stanu autoryzacji
// Importujemy komponent SessionProvider z next-auth/react, który dostarcza kontekst dla sesji użytkownika
// Importujemy komponent Provider z react-redux, który dostarcza kontekst dla Redux store
// Importujemy store z Redux Toolkit, który jest głównym storem aplikacji
// AuthSync jest komponentem, który synchronizuje stan autoryzacji z Redux store

//src/app/layout.tsx
// Importujemy globalne style CSS, które będą miały zastosowanie do całej aplikacji
import "./globals.css";
// Importujemy komponent ClientLayout, który będzie używany do układu strony
import { ClientLayout } from "../components/ClientLayout";
// Importujemy komponent ClientProviders, który dostarcza kontekst dla klienta
import { ClientProviders } from "../components/ClientProviders";
// Importujemy komponent NavContent, który będzie używany do nawigacji
import { NavContent } from "../components/NavContent";
// Importujemy czcionkę Inter z Google Fonts, aby używać jej w aplikacji
import { Inter } from "next/font/google";
// Importujemy komponent AuthSync, który synchronizuje stan autoryzacji
import { AuthSync } from "../components/AuthSync";

// Inicjalizujemy czcionkę Inter z podzbiorem "latin", aby używać jej w aplikacji
const inter = Inter({ subsets: ["latin"] });

// Definiujemy metadane dla strony, takie jak tytuł i opis
export const metadata = {
  title: "Baciata.pl - Twoja przestrzeń do tańca bachaty", // Tytuł strony
  description:
    "Baciata.pl to platforma dla miłośników bachaty, oferująca informacje o wydarzeniach, szkołach tańca i społeczności bachateros w Polsce.", // Opis strony
};

// Definiujemy komponent RootLayout, który przyjmuje dzieci jako props
export default function RootLayout({
  children,
}: {
  children: React.ReactNode; // Typ dla dzieci przekazanych do komponentu
}) {
  return (
    // Ustawiamy język dokumentu na polski
    <html lang="pl">
      {/* Ustawiamy klasę czcionki Inter i kolor tekstu na szary */}
      <body className={`${inter.className} text-gray-800`}>
        {/* Owijamy aplikację w ClientProviders, aby dostarczyć kontekst dla klienta */}
        <ClientProviders>
          {/* Synchronizujemy stan autoryzacji za pomocą komponentu AuthSync */}
          <AuthSync />
          {/* Owijamy aplikację w ClientLayout, aby ustawić układ strony */}
          <ClientLayout>
            {/* Renderujemy nawigację za pomocą komponentu NavContent */}
            <NavContent />
            {/* Renderujemy dzieci przekazane do RootLayout */}
            {children}
          </ClientLayout>
        </ClientProviders>
      </body>
    </html>
  );
}
