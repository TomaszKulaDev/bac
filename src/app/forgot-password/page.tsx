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
    <div className="min-h-screen bg-gradient-to-br from-[#0a1e3b] to-[#2a4a7f] py-16 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-0.5 rounded-full mb-6 inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="bg-[#0a1e3b] px-8 py-3 rounded-full">
              <span className="text-white font-medium text-lg">Baciata.pl</span>
            </div>
          </motion.div>
          
          <h1 className="text-4xl font-bold mb-4 text-white">Zapomniałeś hasła?</h1>
          <p className="text-white/70">Podaj swój email, aby zresetować hasło</p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
        >
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-lg bg-green-400/10 border border-green-400/20 text-green-400"
            >
              {message}
            </motion.div>
          )}

          {errors.form && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-lg bg-red-400/10 border border-red-400/20 text-red-400"
            >
              {errors.form}
            </motion.div>
          )}

          <div className="mb-6">
            <label className="block text-white/80 mb-2 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white 
                placeholder-white/50 focus:outline-none focus:border-yellow-400/50 transition-colors"
              placeholder="Wprowadź swój email"
              autoComplete="email"
            />
            {errors.email && (
              <p className="mt-2 text-red-400 text-sm">{errors.email}</p>
            )}
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#0a1e3b] py-3 px-4 
              rounded-lg font-medium hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200
              flex items-center justify-center"
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
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 text-center text-white/60"
          >
            <Link
              href="/login"
              className="text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              Powrót do logowania
            </Link>
          </motion.div>
        </motion.form>
      </div>
    </div>
  );
}
