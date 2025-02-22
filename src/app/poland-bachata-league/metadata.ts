import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Poland Bachata League | Ranking polskich tancerzy bachaty",
  description:
    "Poland Bachata League to społeczność skupiająca miłośników bachaty w Polsce. Śledź rankingi z turniejów, wydarzenia taneczne i bądź na bieżąco z bachatowym światem.",
  keywords:
    "bachata, taniec, konkursy bachaty, ranking tancerzy, turnieje bachaty, polska bachata, szkoły tańca, wydarzenia taneczne",
  openGraph: {
    title: "Poland Bachata League | Ranking polskich tancerzy bachaty",
    description:
      "Śledź rankingi z turniejów bachaty, odkrywaj nadchodzące wydarzenia i bądź częścią największej społeczności bachatowej w Polsce.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Poland Bachata League - Społeczność bachatowa w Polsce",
      },
    ],
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Poland Bachata League | Ranking polskich tancerzy bachaty",
    description:
      "Odkryj świat polskiej bachaty - rankingi, wydarzenia i społeczność taneczna w jednym miejscu.",
    images: ["/images/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};
