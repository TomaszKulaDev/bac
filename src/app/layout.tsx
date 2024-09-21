import "./globals.css";
import { ClientLayout } from "../components/ClientLayout";
import { ClientProviders } from "../components/ClientProviders";
import { NavContent } from "../components/NavContent";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Baciata.pl - Twoja przestrzeń do tańca bachaty",
  description:
    "Baciata.pl to platforma dla miłośników bachaty, oferująca informacje o wydarzeniach, szkołach tańca i społeczności bachateros w Polsce.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className={`${inter.className} text-gray-800`}>
        <ClientProviders>
          <ClientLayout>
            <NavContent />
            {children}
          </ClientLayout>
        </ClientProviders>
      </body>
    </html>
  );
}
