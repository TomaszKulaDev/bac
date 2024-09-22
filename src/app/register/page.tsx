"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { z } from "zod";
import { passwordSchema } from "../../schemas/passwordSchema";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

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
  })
  .refine(
    (data) => !data.password.toLowerCase().includes(data.name.toLowerCase()),
    {
      message: "Hasło nie może zawierać Twojego imienia",
      path: ["password"],
    }
  );

export default function Register() {
  const description =
    "Zarejestruj się na baciata.pl i dołącz do naszej roztańczonej społeczności. Odkryj nowe możliwości, poznaj pasjonatów bachaty i rozwijaj swoją taneczną pasję.";

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

  const validateField = useCallback(
    (field: keyof typeof registerSchemaBase.shape, value: string | boolean) => {
      try {
        registerSchemaBase.shape[field].parse(value);
        setErrors((prev) => ({ ...prev, [field]: "" }));
      } catch (error) {
        if (error instanceof z.ZodError) {
          setErrors((prev) => ({ ...prev, [field]: error.errors[0].message }));
        }
      }
    },
    []
  );

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

  const isFormValid = useMemo(() => {
    return (
      name.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0 &&
      agreeToTerms
    );
  }, [name, email, password, confirmPassword, agreeToTerms]);

  return (
    <>
      <Head>
        <title>Rejestracja - baciata.pl</title>
        <meta name="description" content={description} />
      </Head>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        >
          <Head>
            <title>Rejestracja - baciata.pl</title>
            <meta name="description" content={description} />
          </Head>
          <h1 className="text-gray-700 font-medium mb-4 text-2xltext-center">
            Zarejestruj się
          </h1>

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
                href="/polityka-prywatnosci-baciata-pl"
                className="text-blue-500 hover:underline"
              >
                Politykę Prywatności
              </Link>{" "}
              oraz{" "}
              <Link
                href="/warunki-korzystania-z-uslugi-baciata-pl"
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
            disabled={isLoading || !isFormValid}
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
    </>
  );
}
