import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nie znaleziono ogłoszenia | Baciata.pl",
  description: "Ogłoszenie nie istnieje lub zostało usunięte",
};

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Nie znaleziono ogłoszenia
      </h1>
      <p className="text-gray-600 mb-8">
        Ogłoszenie mogło zostać usunięte lub jeszcze nie zostało dodane.
      </p>
      <div className="flex flex-col gap-4 items-center">
        <Link
          href="/szukam-partnera-do-bachaty"
          className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700"
        >
          <FaArrowLeft />
          Wróć do listy ogłoszeń
        </Link>
        <Link
          href="/szukam-partnera-do-bachaty/dodaj"
          className="inline-flex items-center px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
        >
          Dodaj nowe ogłoszenie
        </Link>
      </div>
    </div>
  );
}
