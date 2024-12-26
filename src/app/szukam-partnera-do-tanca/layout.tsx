export default function PartnerSearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 hover:text-red-600 transition-colors cursor-pointer">
              Szukam Partnera do Tańca
            </h1>
            <div className="flex items-center gap-4">
              <button className="btn-secondary hidden sm:block">
                Jak to działa?
              </button>
              <button className="btn-primary">Dodaj Ogłoszenie</button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-gray-50 border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="font-bold text-xl mb-4 text-gray-900">
                Szukam Partnera do Tańca
              </h3>
              <p className="text-gray-600 mb-4 max-w-md">
                Największa społeczność tancerzy w Polsce. Znajdź idealnego
                partnera do tańca i rozwijaj swoją pasję.
              </p>
              <div className="flex gap-4">
                <button className="btn-secondary">Newsletter</button>
                <button className="btn-primary">Dołącz do nas</button>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">O Serwisie</h3>
              <ul className="space-y-2">
                <li>Jak to działa</li>
                <li>Zasady bezpieczeństwa</li>
                <li>Często zadawane pytania</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Dla Tancerzy</h3>
              <ul className="space-y-2">
                <li>Dodaj ogłoszenie</li>
                <li>Szukaj partnera</li>
                <li>Wydarzenia taneczne</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Kontakt</h3>
              <ul className="space-y-2">
                <li>Pomoc</li>
                <li>Zgłoś problem</li>
                <li>Współpraca</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
