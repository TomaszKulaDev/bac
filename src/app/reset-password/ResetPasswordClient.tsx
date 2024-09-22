"use client";

// Importy z React i Next.js
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// Importy z zewnętrznych bibliotek
import { z } from "zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Importy lokalne
import { passwordSchema } from "../../schemas/passwordSchema";
import { resetPasswordSchema } from "../../schemas/authSchemas";

import LoadingSpinner from "@/components/LoadingSpinner";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams ? searchParams.get("token") : null;

  useEffect(() => {
    if (!token) {
      setMessage("Nieprawidłowy lub brakujący token");
      router.push("/login");
    }
  }, [token, router]);

  const validateForm = () => {
    try {
      resetPasswordSchema.parse({ password, confirmPassword });
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
      const response = await fetch(`/api/reset-password?token=${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setMessage("Hasło zostało zresetowane pomyślnie");
        setTimeout(() => router.push("/login"), 3000);
      } else {
        const data = await response.json();
        setErrors({ form: data.message || "Nie udało się zresetować hasła" });
      }
    } catch (error) {
      setErrors({ form: "Wystąpił nieoczekiwany błąd. Spróbuj ponownie." });
    } finally {
      setIsLoading(false);
    }
  };

  const getInputClasses = (value: string, errorKey: string) => {
    if (!value && !errors[errorKey]) {
      return "";
    }
    return errors[errorKey]
      ? "focus:ring-red-500 border-red-500"
      : "focus:ring-green-500 border-green-500";
  };

  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Resetuj hasło
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
            Nowe hasło
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-2 pr-10 border rounded text-gray-900 focus:outline-none ${getInputClasses(
                password,
                "password"
              )}`}
              placeholder="Wprowadź nowe hasło"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("password")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              aria-pressed={showPassword}
              aria-label={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-500" aria-hidden="true" />
              ) : (
                <FaEye className="text-gray-500" aria-hidden="true" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-600 text-sm mt-2">{errors.password}</p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-semibold">
            Potwierdź nowe hasło
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full px-3 py-2 pr-10 border rounded text-gray-900 focus:outline-none ${getInputClasses(
                confirmPassword,
                "confirmPassword"
              )}`}
              placeholder="Potwierdź nowe hasło"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirmPassword")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showConfirmPassword ? (
                <FaEyeSlash className="text-gray-500" />
              ) : (
                <FaEye className="text-gray-500" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm mt-2">
              {errors.confirmPassword}
            </p>
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
              <span className="ml-2">Resetowanie...</span>
            </>
          ) : (
            "Resetuj hasło"
          )}
        </button>
      </form>
    </div>
  );
}
