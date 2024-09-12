"use client";

import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { z } from "zod";
import { passwordSchema } from "../../schemas/passwordSchema";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const registerSchemaBase = z.object({
  name: z
    .string()
    .min(1, "Imię jest wymagane")
    .max(20, "Imię nie może być dłuższe niż 20 znaków"),
  email: z.string().email("Nieprawidłowy adres email"),
  password: passwordSchema,
  confirmPassword: z.string(),
  agreeToTerms: z.boolean(),
});

const registerSchema = registerSchemaBase
  .refine((data) => data.password === data.confirmPassword, {
    message: "Hasła nie są identyczne",
    path: ["confirmPassword"],
  })
  .refine((data) => data.agreeToTerms, {
    message: "Musisz zaakceptować politykę prywatności",
    path: ["agreeToTerms"],
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

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isWebViewDetected, setIsWebViewDetected] = useState(false);

  useEffect(() => {
    setIsWebViewDetected(isWebView());
  }, []);

  const validateField = (
    field: keyof typeof registerSchemaBase.shape,
    value: string | boolean
  ) => {
    try {
      registerSchemaBase.shape[field].parse(value);
      setErrors((prev) => ({ ...prev, [field]: "" }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [field]: error.errors[0].message }));
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setAgreeToTerms(checked);
      validateField("agreeToTerms", checked);
    } else {
      switch (name) {
        case "name":
          setName(value);
          break;
        case "email":
          setEmail(value);
          break;
        case "password":
          setPassword(value);
          break;
        case "confirmPassword":
          setConfirmPassword(value);
          break;
      }
      validateField(name as keyof typeof registerSchemaBase.shape, value);
    }
  };

  const validateForm = () => {
    try {
      registerSchema.parse({
        name,
        email,
        password,
        confirmPassword,
        agreeToTerms,
      });
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

    setIsLoading(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(
          "Rejestracja udana! Sprawdź swoją skrzynkę email, aby zweryfikować konto."
        );
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setAgreeToTerms(false);
      } else {
        setErrors({
          form: data.message || "Wystąpił błąd podczas rejestracji",
        });
      }
    } catch (error) {
      setErrors({ form: "Wystąpił nieoczekiwany błąd. Spróbuj ponownie." });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const getInputClasses = (value: string, fieldName: string) => {
    if (!value) return "border-gray-300";
    return errors[fieldName] ? "border-red-500" : "border-green-500";
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  const handleFacebookLogin = () => {
    signIn("facebook", { callbackUrl: "/" });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Zarejestruj się</h1>

        {isWebViewDetected && (
          <div className="text-xs text-center mb-4">
            <p className="text-red-500 mb-2">
              Uwaga: Opcje rejestracji przez Googlezostały ukryte, ponieważ
              otworzyłeś tę stronę w aplikacji Messenger, która korzysta z
              wbudowanej przeglądarki (&quot;WebView&quot;). Niestety, nie
              spełnia ona wymaganych standardów bezpieczeństwa, dlatego widzisz
              ten komunikat.
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
                Kliknij w trzy kropki w prawym górnym rogu, a następnie wybierz
                &quot;Otwórz w przeglądarce&quot;
              </p>
            </div>
          </div>
        )}

        {!isWebViewDetected && (
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

        {successMessage && (
          <div className="mb-4 text-green-600 text-center">
            {successMessage}
          </div>
        )}
        {errors.form && (
          <div className="mb-4 text-red-600 text-center">{errors.form}</div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Imię</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded text-gray-900 focus:outline-none ${getInputClasses(
              name,
              "name"
            )}`}
            placeholder="Twoje imię"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-2">{errors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded text-gray-900 focus:outline-none ${getInputClasses(
              email,
              "email"
            )}`}
            placeholder="twoj@email.com"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-2">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Hasło</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 pr-10 border rounded text-gray-900 focus:outline-none ${getInputClasses(
                password,
                "password"
              )}`}
              placeholder="Twoje hasło"
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
            <p id="password-error" className="text-red-600 text-sm mt-2">
              {errors.password}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Potwierdź hasło</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
              aria-invalid={!!errors.confirmPassword}
              className={`w-full px-3 py-2 pr-10 border rounded text-gray-900 focus:outline-none ${getInputClasses(
                confirmPassword,
                "confirmPassword"
              )}`}
              placeholder="Potwierdź hasło"
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
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={agreeToTerms}
              onChange={handleInputChange}
              className="mr-2"
            />
            Akceptuję{" "}
            <Link
              href="/privacy-policy"
              className="text-blue-500 hover:underline"
            >
              Politykę Prywatności
            </Link>{" "}
            oraz{" "}
            <Link
              href="/terms-of-service"
              className="text-blue-500 hover:underline"
            >
              Warunki Korzystania z Usługi
            </Link>
          </label>
          {errors.agreeToTerms && (
            <p className="text-red-600 text-sm mt-2">{errors.agreeToTerms}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
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
              Rejestrowanie...
            </>
          ) : (
            "Zarejestruj się"
          )}
        </button>
      </form>
    </div>
  );
}
