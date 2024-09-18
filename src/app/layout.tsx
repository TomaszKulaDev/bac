"use client";

import Link from "next/link";
import "./globals.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { SessionProvider, useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { logout } from "../store/slices/authSlice";
import { NavContent } from "../components/NavContent";
import Head from "next/head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <Head>
        <title>Baciata.pl - Twoja przestrzeń do tańca bachaty</title>
        <meta
          name="description"
          content="Baciata.pl to platforma dla miłośników bachaty, oferująca informacje o wydarzeniach, szkołach tańca i społeczności bachateros w Polsce."
        />
        <meta
          name="keywords"
          content="bachata, bachata sensual, taniec, muzyka, wydarzenia, szkoły tańca, społeczność, Polska"
        />
        <link rel="canonical" href="https://www.baciata.pl" />
      </Head>
      <body>
        <SessionProvider>
          <Provider store={store}>
            <NavContent />
            {children}
          </Provider>
        </SessionProvider>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Baciata.pl",
            "url": "https://www.baciata.pl",
            "description": "Platforma dla miłośników bachaty w Polsce",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.baciata.pl/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </body>
    </html>
  );
}
