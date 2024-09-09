import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Polityka Prywatności</h1>
      <p className="mb-4">Ostatnia aktualizacja: {new Date().toLocaleDateString()}</p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">1. Wprowadzenie</h2>
        <p>Niniejsza Polityka Prywatności opisuje, w jaki sposób zbieramy, używamy i chronimy Twoje dane osobowe podczas korzystania z naszej aplikacji.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">2. Zbierane dane</h2>
        <p>Zbieramy następujące dane:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Adres e-mail</li>
          <li>Imię i nazwisko</li>
          <li>Dane profilowe z kont Google i Facebook (jeśli używane do logowania)</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">3. Cel zbierania danych</h2>
        <p>Dane są zbierane w celu:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Umożliwienia logowania do aplikacji</li>
          <li>Personalizacji doświadczenia użytkownika</li>
          <li>Komunikacji z użytkownikiem</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">4. Ochrona danych</h2>
        <p>Stosujemy odpowiednie środki bezpieczeństwa, aby chronić Twoje dane przed nieautoryzowanym dostępem, utratą lub zmianą.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">5. Udostępnianie danych</h2>
        <p>Nie udostępniamy Twoich danych osobowych stronom trzecim bez Twojej zgody, z wyjątkiem sytuacji wymaganych prawem.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">6. Twoje prawa</h2>
        <p>Masz prawo do:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Dostępu do swoich danych</li>
          <li>Poprawiania swoich danych</li>
          <li>Usunięcia swoich danych</li>
          <li>Ograniczenia przetwarzania swoich danych</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">7. Kontakt</h2>
        <p>W przypadku pytań dotyczących naszej Polityki Prywatności, prosimy o kontakt pod adresem: privacy@baciata.pl</p>
      </section>
    </div>
  );
}
