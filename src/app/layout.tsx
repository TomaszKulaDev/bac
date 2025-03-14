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
// Czegp uzywamy w projekcie.
// "dependencies": {
//   "@next-auth/mongodb-adapter": "^1.1.3",
//   "@reduxjs/toolkit": "^2.2.7",
//   "@tailwindcss/aspect-ratio": "^0.4.2",
//   "@types/lodash": "^4.17.7",
//   "@types/mongoose": "^5.11.96",
//   "@vercel/speed-insights": "^1.0.12",
//   "bcryptjs": "^2.4.3",
//   "dotenv": "^16.4.5",
//   "express-rate-limit": "^7.4.0",
//   "jsonwebtoken": "^9.0.2",
//   "lodash": "^4.17.21",
//   "mongoose": "^8.5.4",
//   "next": "14.2.6",
//   "next-auth": "^4.24.7",
//   "nodemailer": "^6.9.14",
//   "react": "^18",
//   "react-dom": "^18",
//   "react-icons": "^5.3.0",
//   "react-redux": "^9.1.2",
//   "react-youtube": "^10.1.0",
//   "zod": "^3.23.8"
// },
// "devDependencies": {
//   "@types/bcryptjs": "^2.4.6",
//   "@types/jsonwebtoken": "^9.0.6",
//   "@types/next-auth": "^3.13.0",
//   "@types/node": "^20.16.5",
//   "@types/nodemailer": "^6.4.15",
//   "@types/react": "^18",
//   "@types/react-dom": "^18",
//   "@types/youtube": "^0.1.0",
//   "@types/youtube-player": "^5.5.11",
//   "eslint": "^8",
//   "eslint-config-next": "14.2.6",
//   "postcss": "^8",
//   "tailwindcss": "^3.4.1",
//   "ts-node": "^10.9.2",
//   "typescript": "^5.6.2"
// }

//src/app/layout.tsx
// Importujemy globalne style CSS, które będą miały zastosowanie do całej aplikacji
import "./globals.css";
// Importujemy komponent ClientLayout, który będzie używany do układu strony
import { ClientLayout } from "../components/ClientLayout";
// Importujemy komponent ClientProviders, który dostarcza kontekst dla klienta
import { ClientProviders } from "../components/ClientProviders";
// Importujemy komponent NavContent, który będzie używany do nawigacji
import dynamic from "next/dynamic";
// Importujemy czcionkę Inter z Google Fonts, aby używać jej w aplikacji
import { Inter } from "next/font/google";
// Importujemy komponent AuthSync, który synchronizuje stan autoryzacji
import { AuthSync } from "../components/AuthSync";
import { NavbarSkeleton } from "../components/NavbarSkeleton";
import { Metadata } from "next";
import { CookieConsent } from "../components/CookieConsent/CookieConsent";
import "leaflet/dist/leaflet.css";
import QueryClientProvider from "@/providers/QueryClientProvider";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script";
import { NavContent } from "@/components/NavContent";
import ScrollToTopButton from "@/components/ScrollToTopButton";

// Inicjalizujemy czcionkę Inter z podzbiorem "latin", aby używać jej w aplikacji
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Baciata - Polski Portal o Bachacie",
  description:
    "Największy polski portal poświęcony bachacie. Znajdziesz tu wszystko, co związane z tańcem, muzyką i kulturą bachaty.",
  keywords:
    "bachata, taniec, muzyka, wydarzenia, festiwale, kursy, szkoły tańca, polska, dominikana, sensual",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    // Ustawiamy język dokumentu na polski
    <html lang="pl">
      <head>
        {/* Meta tag weryfikacyjny Google AdSense */}
        <meta name="google-adsense-account" content="ca-pub-8585871789466302" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8585871789466302"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      {/* Ustawiamy klasę czcionki Inter i kolor tekstu na szary */}
      <body className={`${inter.className} bg-global-white`}>
        <QueryClientProvider>
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
            <CookieConsent />
          </ClientProviders>
          <ScrollToTopButton />
        </QueryClientProvider>
      </body>
    </html>
  );
}

const DynamicNavContent = dynamic(
  () => import("../components/NavContent").then((mod) => mod.NavContent),
  {
    loading: () => <NavbarSkeleton />,
    ssr: false,
  }
);
