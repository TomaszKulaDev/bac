// src/pages/verify.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function VerifyPage() {
  const [status, setStatus] = useState<string | null>(null);
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      fetch(`/api/verify?token=${token}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Account verified successfully") {
            setStatus("Your account has been successfully verified.");
          } else {
            setStatus("Verification failed: " + data.message);
          }
        })
        .catch((error) => {
          setStatus("An error occurred: " + error.message);
        });
    }
  }, [token]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-4">Account Verification</h1>
        {status ? <p>{status}</p> : <p>Verifying...</p>}
      </div>
    </div>
  );
}
