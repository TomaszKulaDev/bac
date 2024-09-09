export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Warunki Korzystania z Usługi</h1>
      <p className="mb-4">Ostatnia aktualizacja: {new Date().toLocaleDateString()}</p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">1. Akceptacja warunków</h2>
        <p>Korzystając z naszej aplikacji, akceptujesz niniejsze Warunki Korzystania z Usługi.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">2. Opis usługi</h2>
        <p>Nasza aplikacja umożliwia użytkownikom [krótki opis funkcjonalności aplikacji].</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">3. Rejestracja</h2>
        <p>Aby korzystać z pełnej funkcjonalności aplikacji, musisz się zarejestrować i utworzyć konto.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">4. Prywatność</h2>
        <p>Twoje dane osobowe są chronione zgodnie z naszą Polityką Prywatności.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">5. Odpowiedzialność użytkownika</h2>
        <p>Jesteś odpowiedzialny za wszystkie działania podejmowane na Twoim koncie.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">6. Zmiany w warunkach</h2>
        <p>Zastrzegamy sobie prawo do zmiany niniejszych warunków w dowolnym momencie.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">7. Kontakt</h2>
        <p>W przypadku pytań dotyczących naszych Warunków Korzystania z Usługi, prosimy o kontakt pod adresem: terms@baciata.pl</p>
      </section>
    </div>
  );
}
