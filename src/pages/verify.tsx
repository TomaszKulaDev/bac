// src/pages/verify.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function VerifyPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      fetch(`/api/verify?token=${token}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Account verified successfully") {
            setIsSuccess(true);
            setStatus("Hurra! Twoje konto zostało pomyślnie zweryfikowane! 🎉");
          } else {
            setStatus("Weryfikacja nie powiodła się: " + data.message);
          }
        })
        .catch((error) => {
          setStatus("Wystąpił błąd: " + error.message);
        });
    }
  }, [token]);

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
      <Link
        href="/profile"
        className="bg-orange-500 text-white px-4 py-2 rounded-full font-bold hover:bg-orange-600 transition-colors"
      >
        Przejdź do swojego konta
      </Link>
    </>
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-center">
        {status ? (
          isSuccess ? (
            successMessage
          ) : (
            <p className="text-red-500">{status}</p>
          )
        ) : (
          <p>Weryfikacja w toku...</p>
        )}
      </div>
    </div>
  );
}
