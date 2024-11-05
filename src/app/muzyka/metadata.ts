import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bachata Music Collection | Najlepsza muzyka do tańca Bachaty",
  description:
    "Odkryj największą kolekcję muzyki bachata online. Playlisty dla początkujących i zaawansowanych tancerzy bachaty, klasyczne hity i współczesne utwory.",
  keywords:
    "baciata,bachata, muzyka do tańca, bachata sensual, dominican bachata, nauka bachaty",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Bachata Music Collection | Najlepsza muzyka do tańca Bachaty",
    description:
      "Odkryj największą kolekcję muzyki bachata online. Playlisty dla początkujących i zaawansowanych tancerzy.",
    type: 'website',
    locale: 'pl_PL',
    url: 'https://www.baciata.pl/muzyka',
    siteName: 'Baciata.pl',
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bachata Music Collection",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bachata Music Collection | Najlepsza muzyka do tańca Bachaty',
    description: 'Odkryj największą kolekcję muzyki bachata online.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.baciata.pl/muzyka',
    languages: {
      'en-US': 'https://www.baciata.pl/en/music',
      'es-ES': 'https://www.baciata.pl/es/musica',
    },
  },
  verification: {
    google: 'twój-kod-weryfikacyjny',
    yandex: 'twój-kod-weryfikacyjny',
  },
  authors: [
    { name: 'Nazwa autora' },
  ],
  category: 'Muzyka Bachata',
};