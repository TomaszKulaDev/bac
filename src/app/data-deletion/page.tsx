export default function DataDeletion() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Instrukcje usuwania danych</h1>
      <p className="mb-4">
        Szanujemy Twoje prawo do prywatności i kontroli nad Twoimi danymi. Jeśli
        chcesz usunąć swoje dane z naszej aplikacji, postępuj zgodnie z
        poniższymi instrukcjami:
      </p>
      <ol className="list-decimal list-inside mb-6">
        <li className="mb-2">
          Zaloguj się do swojego konta w naszej aplikacji.
        </li>
        <li className="mb-2">Przejdź do ustawień konta.</li>
        <li className="mb-2">
          Znajdź opcję &apos;Usuń konto&apos; lub &apos;Usuń dane&apos;.
        </li>
        <li className="mb-2">Potwierdź chęć usunięcia danych.</li>
        <li className="mb-2">
          Twoje dane zostaną usunięte z naszych systemów w ciągu 30 dni.
        </li>
      </ol>
      <p className="mb-4">
        Jeśli masz problemy z usunięciem danych lub potrzebujesz dodatkowej
        pomocy, skontaktuj się z nami pod adresem: privacy@baciata.pl
      </p>
    </div>
  );
}
