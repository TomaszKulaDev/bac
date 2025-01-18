import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nauka Tańca Bachata | MusiSite",
  description:
    "Naucz się tańczyć bachatę z najlepszymi instruktorami. Kursy dla początkujących i zaawansowanych.",
};

interface BachataLayoutProps {
  children: React.ReactNode;
}

export default function BachataLayout({ children }: BachataLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Nauka Tańca Bachata
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Odkryj piękno bachaty i rozwiń swoje umiejętności taneczne
          </p>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
