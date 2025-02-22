"use client";

import { useState } from "react";
import { z } from "zod";
import Link from "next/link";
import { motion } from "framer-motion";
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
      const response = await fetch("/api/auth/forgot-password", {
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
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="container mx-auto flex justify-center items-center max-w-screen-2xl -mt-20">
        <div className="w-full max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Zapomniałeś hasła?
            </h1>
            <p className="text-gray-600">
              Podaj swój email, aby zresetować hasło
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 
              shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-green-50 border border-green-100 text-green-600"
                >
                  {message}
                </motion.div>
              )}

              {errors.form && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600"
                >
                  {errors.form}
                </motion.div>
              )}

              <div className="space-y-2.5">
                <label className="text-gray-700 text-sm font-medium block">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl 
                    text-gray-800 placeholder-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-amber-500/30
                    focus:border-amber-500 transition-all duration-200 
                    hover:border-amber-500/50"
                  placeholder="Wprowadź swój email"
                  autoComplete="email"
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm flex items-center space-x-1.5"
                  >
                    <span className="text-xs">●</span>
                    <span>{errors.email}</span>
                  </motion.p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 
                  text-white py-3.5 px-4 rounded-xl font-medium 
                  hover:from-amber-600 hover:to-amber-700 
                  transition-all duration-200 disabled:opacity-50 
                  disabled:cursor-not-allowed flex items-center 
                  justify-center space-x-2 shadow-lg 
                  shadow-amber-500/20 hover:shadow-amber-500/30
                  hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner />
                    <span>Wysyłanie...</span>
                  </>
                ) : (
                  "Wyślij link do resetowania"
                )}
              </button>

              <p className="text-center text-gray-600 text-sm">
                <Link
                  href="/login"
                  className="text-amber-600 hover:text-amber-700 transition-colors"
                >
                  Powrót do logowania
                </Link>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
