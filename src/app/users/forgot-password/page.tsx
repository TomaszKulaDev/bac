"use client";

import { useState } from "react";
import { z } from "zod";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";

const forgotPasswordSchema = z.object({
  email: z.string().email("Nieprawidłowy adres email"),
});

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    try {
      forgotPasswordSchema.parse({ email });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
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
        setErrors({});
      } else {
        setMessage("");
        setErrors({ form: data.message || "Wystąpił błąd. Spróbuj ponownie." });
      }
    } catch (error) {
      setMessage("");
      setErrors({ form: "Wystąpił nieoczekiwany błąd. Spróbuj ponownie." });
    } finally {
      setIsLoading(false);
    }
  };

  const getInputClasses = (errorKey: string) => {
    return errors[errorKey]
      ? "border-red-500 focus:ring-red-500"
      : "focus:ring-blue-500";
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Zapomniałeś hasła?
        </h1>
        {message && (
          <p className="mb-4 text-center text-sm font-medium p-3 rounded text-green-800 bg-green-100 border border-green-300">
            {message}
          </p>
        )}
        {errors.form && (
          <p className="mb-4 text-center text-sm font-medium p-3 rounded text-red-800 bg-red-100 border border-red-300">
            {errors.form}
          </p>
        )}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-semibold">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 border rounded text-gray-900 focus:outline-none focus:ring-2 ${getInputClasses(
                "email"
              )}`}
              placeholder="Wprowadź swój email"
              autoComplete="email"
            />
          </div>
          {errors.email && (
            <p className="text-red-600 text-sm mt-2">{errors.email}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center font-semibold"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <LoadingSpinner />
              <span className="ml-2">Wysyłanie...</span>
            </>
          ) : (
            "Wyślij link do resetowania"
          )}
        </button>
        <div className="mt-4 text-center">
          <Link href="/users/login" className="text-blue-500 hover:underline">
            Powrót do logowania
          </Link>
        </div>
      </form>
    </div>
  );
}
