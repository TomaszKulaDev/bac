///src/app/users/login/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter(); // Hook do nawigacji

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage(null); // Resetuje komunikat o błędzie
    setSuccessMessage(null); // Resetuje komunikat o sukcesie

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Received token:", data.token); // Logowanie odebranego tokenu
      localStorage.setItem("token", data.token);
      console.log(
        "Token saved to localStorage:",
        localStorage.getItem("token")
      ); // Logowanie zapisanego tokenu
      setSuccessMessage("Login successful"); // Ustawia komunikat o sukcesie

      // Przekierowanie użytkownika na stronę profilu
      router.push("/users/profile");
    } else {
      setErrorMessage("Invalid email or password"); // Ustawia komunikat o błędzie
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        {errorMessage && (
          <div className="mb-4 text-red-600 text-center">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="mb-4 text-green-600 text-center">
            {successMessage}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            autoComplete="email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            autoComplete="current-password"
          />
        </div>
        <div className="mb-4 text-right">
          <Link href="/users/forgot-password" legacyBehavior>
            <a className="text-blue-500 hover:underline">
              Forgot your password?
            </a>
          </Link>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
}
