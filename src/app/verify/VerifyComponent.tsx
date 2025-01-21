"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function VerifyComponent() {
  // Stan przechowujący status weryfikacji
  const [status, setStatus] = useState<string | null>(null);
  // Stan przechowujący informację o sukcesie weryfikacji
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams?.get("token") ?? null; // Pobieranie tokena z query parametru

  useEffect(() => {
    if (token) {
      // Wysyłanie żądania do API w celu weryfikacji konta
      fetch(`/api/auth/verify?token=${token}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Account verified successfully") {
            // Jeśli weryfikacja zakończyła się sukcesem
            setIsSuccess(true);
            setStatus("Hurra! Twoje konto zostało pomyślnie zweryfikowane! 🎉");
          } else {
            // Jeśli weryfikacja nie powiodła się
            setStatus("Weryfikacja nie powiodła się: " + data.message);
          }
        })
        .catch((error) => {
          // Obsługa błędów podczas żądania
          setStatus("Wystąpił błąd: " + error.message);
        });
    }
  }, [token]); // Efekt uruchamiany przy zmianie tokena

  const handleGoToSignIn = () => {
    setIsLoading(true);
    router.push("/auth/signin?verified=true");
  };

  // Komponent wyświetlający wiadomość o sukcesie weryfikacji
  const successMessage = (
    <>
      <h1 className="text-2xl font-bold mb-4">
        Witaj w roztańczonej społeczności Baciata!
      </h1>
      <p className="mb-4">Jesteśmy zachwyceni, że do nas dołączyłeś.</p>
      <p className="mb-2">Oto co możesz teraz zrobić:</p>
      <ul className="list-disc list-inside mb-4 text-left">
        <li>Uzupełnij swój profil taneczny</li>
        <li>Przeglądaj nadchodzące wydarzenia</li>
        <li>Poznaj innych pasjonatów tańca</li>
      </ul>
      <p className="mb-4">
        Nie możemy się doczekać, aby zobaczyć Cię na parkiecie!
      </p>
      <button
        onClick={handleGoToSignIn}
        disabled={isLoading}
        className="bg-orange-500 text-white px-4 py-2 rounded-full font-bold hover:bg-orange-600 transition-colors disabled:opacity-50"
      >
        {isLoading ? "Przekierowywanie..." : "Zaloguj się do swojego konta"}
      </button>
    </>
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-center">
        {status ? (
          isSuccess ? (
            successMessage // Wyświetlanie wiadomości o sukcesie weryfikacji
          ) : (
            <p className="text-red-500">{status}</p> // Wyświetlanie wiadomości o niepowodzeniu weryfikacji
          )
        ) : (
          <p>Weryfikacja w toku...</p> // Wyświetlanie wiadomości o trwającej weryfikacji
        )}
      </div>
    </div>
  );
}
