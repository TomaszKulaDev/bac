"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OpenInBrowser() {
  const searchParams = useSearchParams();
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (searchParams) {
      const urlParam = searchParams.get("url");
      if (urlParam) {
        setUrl(decodeURIComponent(urlParam));
      }
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Otwórz w przeglądarce
      </h1>
      <p className="text-center mb-4">
        Aby kontynuować logowanie, skopiuj poniższy link i otwórz go w
        przeglądarce systemowej:
      </p>
      <div className="bg-white p-4 rounded shadow-md w-full max-w-md break-all">
        <p className="text-blue-500">{url}</p>
      </div>
      <button
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200"
        onClick={() => {
          if (navigator.share) {
            navigator
              .share({
                title: "Otwórz w przeglądarce",
                url: url,
              })
              .catch(console.error);
          } else {
            navigator.clipboard.writeText(url).then(
              () => {
                alert("Link skopiowany do schowka");
              },
              (err) => {
                console.error("Nie udało się skopiować linku: ", err);
              }
            );
          }
        }}
      >
        Udostępnij / Kopiuj link
      </button>
    </div>
  );
}
