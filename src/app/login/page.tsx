// src/app/login/page.tsx

"use client";
import React from "react";
// Importy z React i Next.js
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/authSlice";
import { motion } from "framer-motion";
import { z } from "zod";
import { useAuth } from "../../contexts/AuthContext";
import LoadingSpinner from "@/components/LoadingSpinner";
import Input from "@/app/login/Input";
import { passwordSchema } from "../../schemas/passwordSchema";

// Dodajemy schemat logowania
const loginSchema = z.object({
  email: z.string().email("Nieprawidłowy adres email"),
  password: passwordSchema,
});

export default function Login() {
  // Stan komponentu
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  // Hooki
  const router = useRouter();
  const auth = useAuth();
  const dispatch = useDispatch();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      dispatch(
        login({
          user: {
            id: session.user.id || "",
            email: session.user.email || "",
            name: session.user.name || "",
            role: session.user.role || "user",
          },
        })
      );

      if (session.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/profile");
      }
    }
  }, [status, session, router, dispatch]);

  const validateForm = () => {
    try {
      loginSchema.parse({ email, password });
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Login initiated");

    if (!validateForm()) {
      setIsLoading(false);
      console.log("Form validation failed");
      return;
    }

    try {
      console.log("Login attempt with email:", email);
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      console.log("SignIn result:", result);

      if (result?.error) {
        console.error("Login error:", result.error);
        setErrors({ form: result.error });
      } else {
        console.log("Login successful, redirecting to profile");
        router.push("/profile");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ form: "Wystąpił błąd podczas logowania. Spróbuj ponownie." });
    } finally {
      setIsLoading(false);
      console.log("Login process completed");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getInputClasses = (value: string, errorKey: string) => {
    if (!value && !errors[errorKey]) {
      return "";
    }
    if (!errors[errorKey]) {
      return "focus:ring-green-500 border-green-500";
    } else {
      return "focus:ring-red-500 border-red-500";
    }
  };

  const handleResendVerification = async () => {
    try {
      const response = await fetch("/api/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.status === 403) {
        setErrors({
          form: "Proszę zweryfikować swój adres e-mail przed zalogowaniem. Sprawdź swoją skrzynkę pocztową lub wyślij ponownie e-mail weryfikacyjny.",
        });
      } else if (response.status === 401 || response.status === 400) {
        setErrors({
          form: "Nieprawidłowe dane logowania. Spróbuj ponownie.",
        });
      } else if (!response.ok) {
        setErrors({
          form: `Wystąpił błąd podczas logowania: ${
            data.message || "Nieznany błąd"
          }`,
        });
      }
    } catch (error) {
      console.error("Error resending verification email:", error);
      setErrors({ form: "An unexpected error occurred. Please try again." });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="container mx-auto flex justify-center items-center max-w-screen-2xl -mt-60">
        <div className="w-full max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Witaj ponownie!
            </h1>
            <p className="text-gray-600">Zaloguj się do swojego konta</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <form onSubmit={handleLogin} className="space-y-6">
              {errors.form && (
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-red-500 text-sm">{errors.form}</p>
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
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-4 rounded-lg font-medium 
                  hover:from-amber-600 hover:to-amber-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? <LoadingSpinner /> : "Zaloguj się"}
              </button>

              {/* Link do resetowania hasła */}
              <div className="mt-4 text-center">
                <Link
                  href="/forgot-password"
                  className="text-amber-600 hover:text-amber-700 text-sm transition-colors duration-200"
                >
                  Zapomniałeś hasła?
                </Link>
              </div>

              {/* Separator */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 text-gray-500 bg-white">
                    lub kontynuuj przez
                  </span>
                </div>
              </div>

              {/* Przycisk Google */}
              <motion.button
                type="button"
                onClick={() => signIn("google")}
                className="w-full bg-white text-gray-700 py-3 px-4 rounded-lg font-medium 
                  transition-all duration-200 flex items-center justify-center space-x-3 border border-gray-200
                  hover:bg-gray-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Image
                  src="/images/google-logo.svg"
                  alt="Google"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                <span>Zaloguj się przez Google</span>
              </motion.button>

              {/* Link do rejestracji */}
              <p className="text-center text-gray-600 text-sm">
                Nie masz jeszcze konta?{" "}
                <Link
                  href="/register"
                  className="text-amber-600 hover:text-amber-700 transition-colors"
                >
                  Zarejestruj się
                </Link>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
