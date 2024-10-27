// src/app/login/page.tsx

"use client";

// Importy z React i Next.js
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession, getSession } from "next-auth/react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/authSlice";
import { motion } from 'framer-motion';
import { FaMusic, FaUsers, FaCrown } from 'react-icons/fa';

// Importy z zewnętrznych bibliotek
import { z } from "zod";

// Importy lokalne
import { useAuth } from "../../contexts/AuthContext";
import LoadingSpinner from "@/components/LoadingSpinner";
import Input from "@/components/ui/Input";

// Schema walidacji formularza logowania
const loginSchema = z.object({
  email: z.string().email("Nieprawidłowy adres email"),
  password: z.string().min(1, "Hasło jest wymagane"),
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
          form: `Wystąpił błąd podczas logowania: ${data.message || 'Nieznany błąd'}`,
        });
      }
    } catch (error) {
      console.error("Error resending verification email:", error);
      setErrors({ form: "An unexpected error occurred. Please try again." });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1e3b] to-[#2a4a7f] p-4">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 max-w-6xl">
        {/* Lewa strona - Formularz logowania (bez zmian) */}
        <div className="w-full lg:w-1/2 max-w-md">
          {/* Istniejący kod formularza */}
          <form onSubmit={handleLogin} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl space-y-6">
            {errors.form && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-200 text-sm">{errors.form}</p>
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

            <div className="flex items-center justify-between">
              <Link 
                href="/forgot-password"
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                Zapomniałeś hasła?
              </Link>
              <Link 
                href="/register"
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                Załóż konto
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-[#0a1e3b] py-3 px-4 rounded-lg font-medium
                hover:bg-white/90 transition-all duration-200 flex items-center justify-center
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner className="text-[#0a1e3b]" />
                  <span className="ml-2">Logowanie...</span>
                </>
              ) : (
                "Zaloguj się"
              )}
            </button>
          </form>
        </div>

        {/* Prawa strona - Nowe warianty banerów */}
        <div className="w-full lg:w-1/2 space-y-6 hidden lg:block">
          {/* Wariant 1: Baner wydarzeń */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-lg rounded-2xl p-8 shadow-2xl"
          >
            <div className="relative">
              <Image
                src="/images/bachata-event.jpg"
                alt="Bachata Event"
                width={500}
                height={300}
                className="rounded-xl mb-4 object-cover w-full h-48"
              />
              <div className="absolute top-4 right-4 bg-yellow-400 px-4 py-1 rounded-full">
                <span className="text-sm font-bold text-[#0a1e3b]">Już wkrótce!</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Baciata Summer Festival 2024</h2>
            <p className="text-white/80 mb-4">Największe wydarzenie bachatowe tego lata!</p>
            <button className="w-full bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200">
              Dowiedz się więcej
            </button>
          </motion.div>

          {/* Wariant 2: Mini karty z animacją */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-yellow-400/20 to-orange-500/20 backdrop-blur-lg rounded-xl p-6 shadow-xl"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-yellow-400/20 p-3 rounded-full">
                  <FaMusic className="h-6 w-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Nowe utwory</h3>
                  <p className="text-white/70 text-sm">+50 w tym tygodniu</p>
                </div>
              </div>
              <div className="mt-2 flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 border-2 border-[#0a1e3b]" />
                ))}
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-purple-400/20 to-pink-500/20 backdrop-blur-lg rounded-xl p-6 shadow-xl"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-purple-400/20 p-3 rounded-full">
                  <FaUsers className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Społeczność</h3>
                  <p className="text-white/70 text-sm">1.2k aktywnych</p>
                </div>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 mt-4">
                <div className="w-3/4 bg-gradient-to-r from-purple-400 to-pink-500 h-full rounded-full" />
              </div>
            </motion.div>
          </div>

          {/* Wariant 3: Baner premium z efektem hover */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden bg-gradient-to-r from-yellow-400/10 to-orange-500/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/10"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 blur-3xl -z-10" />
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <FaCrown className="text-yellow-400 mr-2" /> Premium
            </h2>
            <div className="flex items-baseline mb-6">
              <span className="text-4xl font-bold text-white">29</span>
              <span className="text-xl text-white/60 ml-1">zł/msc</span>
            </div>
            <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-[#0a1e3b] py-3 px-4 rounded-lg font-medium hover:from-yellow-500 hover:to-orange-600 transition-all duration-200">
              Wypróbuj za darmo
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
