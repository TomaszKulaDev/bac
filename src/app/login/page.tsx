// src/app/login/page.tsx

"use client";
import React from "react";
// Importy z React i Next.js
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion";
import LoadingSpinner from "@/components/LoadingSpinner";
import Input from "@/app/login/Input";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setErrors({ form: "Nieprawidłowy email lub hasło" });
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      setErrors({ form: "Wystąpił błąd podczas logowania" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1e3b] to-[#2a4a7f] px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">
            Witaj ponownie!
          </h1>
          <p className="mt-2 text-white/80">
            Zaloguj się do swojego konta
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {errors.form && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-red-400 text-sm font-medium">{errors.form}</p>
            </div>
          )}

          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            placeholder="Twój adres email"
            autoComplete="email"
          />

          <Input
            label="Hasło"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            placeholder="Twoje hasło"
            autoComplete="current-password"
            showPasswordToggle
            showPassword={showPassword}
            onPasswordToggle={() => setShowPassword(!showPassword)}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 
              text-[#0a1e3b] py-3.5 px-4 rounded-xl font-semibold tracking-wide
              hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200 
              disabled:opacity-50 disabled:cursor-not-allowed shadow-lg 
              shadow-yellow-600/10 transform hover:-translate-y-0.5 
              active:translate-y-0.5"
          >
            {isLoading ? <LoadingSpinner /> : "Zaloguj się"}
          </button>

          <div className="text-center">
            <Link
              href="/forgot-password"
              className="text-yellow-400 hover:text-yellow-300 text-sm 
                font-medium transition-colors duration-200"
            >
              Zapomniałeś hasła?
            </Link>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 text-white/60 bg-[#0a1e3b]/50">
                lub
              </span>
            </div>
          </div>

          <motion.button
            type="button"
            onClick={() => signIn("google")}
            className="w-full bg-white/10 hover:bg-white/20 text-white py-3.5 
              px-4 rounded-xl font-medium transition-all duration-200 flex 
              items-center justify-center space-x-3 border border-white/10
              hover:border-white/20"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Image
              src="/google.svg"
              alt="Google"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            <span>Zaloguj się przez Google</span>
          </motion.button>

          <p className="text-center text-white/60 text-sm">
            Nie masz jeszcze konta?{" "}
            <Link
              href="/register"
              className="text-yellow-400 hover:text-yellow-300 
                font-semibold transition-colors"
            >
              Zarejestruj się
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
