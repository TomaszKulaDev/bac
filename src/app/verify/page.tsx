"use client";
import { Suspense } from "react";
import VerifyComponentImport from "./VerifyComponent";
import { useSearchParams } from "next/navigation";

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Ładowanie...</div>}>
      <VerifyComponentImport />
    </Suspense>
  );
}

function VerifyComponent() {
  const searchParams = useSearchParams();
  // Reszta logiki komponentu
}
