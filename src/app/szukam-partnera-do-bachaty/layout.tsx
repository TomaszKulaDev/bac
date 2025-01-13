import Link from "next/link";
import { ScrollToTop } from "./components/ScrollToTop";

export default function PartnerSearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-white to-amber-50 border-t border-amber-100">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-1">
              <h3
                className="text-xl font-bold mb-4 bg-gradient-to-r 
                           from-amber-500 to-red-500 bg-clip-text 
                           text-transparent"
              >
                Szukam Partnera do Tańca
              </h3>
              <p className="text-gray-600 mb-6">
                Największa społeczność tancerzy w Polsce.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4 text-gray-800">O Serwisie</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/szukam-partnera-do-bachaty/jak-to-dziala"
                    className="text-gray-600 hover:text-amber-600 transition-colors"
                  >
                    Jak to działa
                  </Link>
                </li>
                <li>
                  <Link
                    href="/szukam-partnera-do-bachaty/zasady-bezpieczenstwa"
                    className="text-gray-600 hover:text-amber-600 transition-colors"
                  >
                    Zasady bezpieczeństwa
                  </Link>
                </li>
                <li>
                  <Link
                    href="/szukam-partnera-do-bachaty/faq"
                    className="text-gray-600 hover:text-amber-600 transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Dancers Section */}
            <div>
              <h3 className="font-semibold mb-4 text-gray-800">Dla Tancerzy</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/dodaj-ogloszenie"
                    className="text-gray-600 hover:text-amber-600 transition-colors"
                  >
                    Dodaj ogłoszenie
                  </Link>
                </li>
                <li>
                  <Link
                    href="/szukam-partnera-do-bachaty"
                    className="text-gray-600 hover:text-amber-600 transition-colors"
                  >
                    Szukaj partnera
                  </Link>
                </li>
                <li>
                  <Link
                    href="/wydarzenia"
                    className="text-gray-600 hover:text-amber-600 transition-colors"
                  >
                    Wydarzenia taneczne
                  </Link>
                </li>
              </ul>
            </div>

            {/* Business Section */}
            <div>
              <h3 className="font-semibold mb-4 text-gray-800">Dla Biznesu</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/oferta-reklamowa"
                    className="text-gray-600 hover:text-amber-600 transition-colors 
                             flex items-center gap-2"
                  >
                    <span>Oferta reklamowa</span>
                    <span
                      className="text-xs px-2 py-0.5 bg-amber-100 
                                 text-amber-700 rounded-full"
                    >
                      New
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/wspolpraca"
                    className="text-gray-600 hover:text-amber-600 transition-colors"
                  >
                    Współpraca
                  </Link>
                </li>
                <li>
                  <Link
                    href="/kontakt"
                    className="text-gray-600 hover:text-amber-600 transition-colors"
                  >
                    Kontakt biznesowy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter & Join Section */}
          <div className="mt-8 pt-8 border-t border-amber-100">
            <div className="flex flex-wrap justify-center gap-4">
              <button
                className="px-4 py-2 rounded-lg border border-amber-200 
                             text-amber-700 hover:bg-amber-50 transition-colors"
              >
                Newsletter
              </button>
              <Link
                href="/register"
                className="px-4 py-2 rounded-lg bg-gradient-to-r 
                         from-amber-500 to-red-500 text-white 
                         hover:from-amber-600 hover:to-red-600 
                         transition-colors"
              >
                Dołącz do nas
              </Link>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-amber-100 text-center text-gray-600">
            © 2024 Baciata.pl - Wszystkie prawa zastrzeżone
          </div>
        </div>
      </footer>
      <ScrollToTop />
    </div>
  );
}
