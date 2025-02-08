"use client";

import { useState } from "react";

export default function DataDeletionPage() {
  const [status, setStatus] = useState<string>("");
  const [confirmationCode, setConfirmationCode] = useState<string>("");

  const checkStatus = async (code: string) => {
    // Tu dodamy później logikę sprawdzania statusu
    setStatus("W trakcie przetwarzania");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">
            Usuwanie Danych Użytkownika
          </h1>

          <div className="prose prose-sm max-w-none">
            <h2 className="text-xl font-semibold mb-4">
              Polityka Usuwania Danych
            </h2>

            <p className="mb-4">
              Zgodnie z wymogami Meta Platform Terms i obowiązującymi przepisami
              o ochronie danych, zapewniamy użytkownikom możliwość żądania
              usunięcia ich danych osobowych.
            </p>

            <h3 className="text-lg font-semibold mb-2">
              Proces usuwania danych:
            </h3>
            <ol className="list-decimal pl-5 mb-6">
              <li>
                Po otrzymaniu żądania usunięcia danych, rozpoczynamy proces w
                ciągu 24 godzin
              </li>
              <li>Usuwamy wszystkie dane powiązane z kontem użytkownika</li>
              <li>Wysyłamy potwierdzenie po zakończeniu procesu</li>
              <li>Przechowujemy minimalne informacje wymagane przez prawo</li>
            </ol>

            <div className="bg-amber-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-2">
                Sprawdź status usuwania
              </h3>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Wpisz kod potwierdzenia"
                  className="flex-1 px-4 py-2 border rounded-lg"
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                />
                <button
                  onClick={() => checkStatus(confirmationCode)}
                  className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                >
                  Sprawdź
                </button>
              </div>
              {status && (
                <div className="mt-4 p-4 bg-white rounded-lg">
                  <p>Status: {status}</p>
                </div>
              )}
            </div>

            <h3 className="text-lg font-semibold mb-2">Kontakt</h3>
            <p className="mb-4">
              W przypadku pytań dotyczących usuwania danych, prosimy o kontakt:
              <br />
              Email: privacy@baciata.pl
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
