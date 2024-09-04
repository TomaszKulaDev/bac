"use client";

import { useState } from "react";
import { forgotPasswordSchema } from "../../../schemas/forgotPasswordSchema";
import { z } from "zod";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      forgotPasswordSchema.parse({ email });

      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(
          "Link do resetowania hasła został wysłany na Twój adres email."
        );
      } else {
        setMessage(data.message || "Wystąpił błąd. Spróbuj ponownie.");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setMessage(error.errors[0].message);
      } else {
        console.error("Unexpected error:", error);
        setMessage("Wystąpił nieoczekiwany błąd. Spróbuj ponownie.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">
          Zapomniałeś hasła?
        </h1>
        {message && (
          <p className="mb-4 text-center text-sm font-medium text-gray-800 bg-gray-100 p-2 rounded">
            {message}
          </p>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Wprowadź swój email"
            autoComplete="email"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : null}
          {isLoading ? "Wysyłanie..." : "Wyślij link do resetowania"}
        </button>
      </form>
    </div>
  );
}
