// src/app/login/page.tsx

"use client";

// Importy z React i Next.js
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Head from "next/head";

// Importy z zewnętrznych bibliotek
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { z } from "zod";

// Importy lokalne
import { useAuth } from "../../contexts/AuthContext";
import LoadingSpinner from "@/components/LoadingSpinner";

// Schema walidacji formularza logowania
const loginSchema = z.object({
  email: z.string().email("Nieprawidłowy adres email"),
  password: z.string().min(1, "Hasło jest wymagane"),
});

function isWebView() {
  return (
    (typeof window !== "undefined" &&
      /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
        navigator.userAgent
      )) ||
    /Android.*Version\/[0-9].[0-9]/.test(navigator.userAgent)
  );
}

export default function Login() {
  const description =
    "Zaloguj się do swojego konta na baciata.pl. Uzyskaj dostęp do ekskluzywnych treści, wydarzeń tanecznych i połącz się z innymi miłośnikami bachaty.";

  // Stan komponentu
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isWebViewDetected, setIsWebViewDetected] = useState(false);

  // Hooki
  const router = useRouter();
  const auth = useAuth();
  const login = auth?.login;

  useEffect(() => {
    setIsWebViewDetected(isWebView());
  }, []);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/profile");
    }
  }, [status, router]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setErrors({ form: result.error });
      } else {
        if (login) {
          await login();
        }
        router.push("/profile");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ form: "An unexpected error occurred. Please try again." });
    } finally {
      setIsLoading(false);
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

      if (response.ok) {
        setErrors({
          form: "Verification email resent. Please check your inbox.",
        });
      } else {
        setErrors({
          form: `Failed to resend verification email: ${data.message}`,
        });
      }
    } catch (error) {
      console.error("Error resending verification email:", error);
      setErrors({ form: "An unexpected error occurred. Please try again." });
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <>
      <Head>
        <title>Logowanie - baciata.pl</title>
        <meta name="description" content={description} />
      </Head>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        >
          <h1 className="text-2xl font-bold mb-4 text-center">
            Dołącz szybko z:
          </h1>
          <p className="text-sm text-center mb-4 text-gray-600">
            Wybierz jedną z opcji logowania
          </p>
          {isWebViewDetected && (
            <div className="text-xs text-center mb-4">
              <p className="text-red-500 mb-2">
                Uwaga: Opcje rejestracji przez Google zostały ukryte, ponieważ
                otworzyłeś tę stronę w aplikacji Messenger, która korzysta z
                wbudowanej przeglądarki (&quot;WebView&quot;). Niestety, nie
                spełnia ona wymaganych standardów bezpieczeństwa, dlatego
                widzisz ten komunikat.
                <br />
                Prosimy o otwarcie tej strony w przeglądarce spełniającej
                standardy bezpieczeństwa, np. Chrome, Edge, Safari, Opera,
                Firefox, lub Brave.
                <br />
                Instrukcja jak to zrobić znajduje się poniżej.
              </p>
              <div className="mt-4">
                <Image
                  src="/images/open-in-browser.png"
                  alt="Jak otworzyć stronę w przeglądarce"
                  width={300}
                  height={150}
                  className="mx-auto"
                />
                <p className="text-sm text-gray-600 mt-2">
                  Kliknij w trzy kropki w prawym górnym rogu, a następnie
                  wybierz &quot;Otwórz w przeglądarce&quot;
                </p>
              </div>
            </div>
          )}
          {isWebViewDetected ? null : (
            <div className="mb-4 space-y-2">
              <button
                onClick={handleGoogleLogin}
                className="w-full bg-white text-gray-700 py-2 px-4 rounded border border-gray-300 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
                type="button"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-3"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Dołącz z Google
              </button>
            </div>
          )}
          <div className="mb-4 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">lub</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {errors.form && (
            <div className="mb-4 text-red-600">
              <p>{errors.form}</p>
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!errors.email}
              className={`w-full px-3 py-2 border rounded text-gray-900 focus:outline-none ${getInputClasses(
                email,
                "email"
              )}`}
              placeholder="Enter your email"
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-2">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!errors.password}
                className={`w-full px-3 py-2 pr-10 border rounded text-gray-900 focus:outline-none ${getInputClasses(
                  password,
                  "password"
                )}`}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-500" />
                ) : (
                  <FaEye className="text-gray-500" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-600 text-sm mt-2">{errors.password}</p>
            )}
          </div>
          <div className="mb-4 text-right">
            <Link href="/forgot-password" legacyBehavior>
              <a className="text-blue-500 hover:underline">
                Zapomniałeś hasła?
              </a>
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <LoadingSpinner />
                <span className="ml-2">Logowanie...</span>
              </>
            ) : (
              "Zaloguj się"
            )}
          </button>
          {errors.form && (
            <button
              type="button"
              onClick={handleResendVerification}
              className="mt-2 text-blue-500 underline"
            >
              Resend verification email
            </button>
          )}
        </form>
      </div>
    </>
  );
}