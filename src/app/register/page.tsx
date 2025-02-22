"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { FaCheck } from "react-icons/fa";
import { z } from "zod";
import { passwordSchema } from "../../schemas/passwordSchema";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { motion } from "framer-motion";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Input } from "@/app/register/Input";

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

  const [showPasswords, setShowPasswords] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const togglePasswordVisibility = () => {
    setShowPasswords(!showPasswords);
  };

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
      const response = await fetch("/api/auth/register", {
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
              Dołącz do nas!
            </h1>
            <p className="text-gray-600">Stwórz swoje konto już teraz</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {successMessage && (
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-green-600 text-sm">{successMessage}</p>
                </div>
              )}

              {errors.form && (
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-red-500 text-sm">{errors.form}</p>
                </div>
              )}

              <div className="space-y-4">
                {/* Pole imienia */}
                <Input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleInputChange}
                  placeholder="Twoje imię"
                  error={errors.name}
                  label="Imię"
                />

                {/* Pole email */}
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  placeholder="twoj@email.com"
                  error={errors.email}
                  label="Email"
                />

                {/* Pole hasła */}
                <Input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                  placeholder="Twoje hasło"
                  error={errors.password}
                  isPassword
                  label="Hasło"
                  showPasswords={showPasswords}
                  onTogglePassword={togglePasswordVisibility}
                />

                {/* Pole potwierdzenia hasła */}
                <Input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Potwierdź hasło"
                  error={errors.confirmPassword}
                  isPassword
                  label="Potwierdź hasło"
                  showPasswords={showPasswords}
                />

                {/* Checkbox akceptacji warunków */}
                <div className="space-y-2">
                  <label className="flex items-start space-x-3 text-gray-800">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={agreeToTerms}
                      onChange={handleInputChange}
                      className="mt-1 h-4 w-4 rounded border-gray-300 bg-white text-amber-500 
                        focus:ring-2 focus:ring-amber-500/50 focus:ring-offset-0"
                    />
                    <span className="text-sm">
                      Akceptuję{" "}
                      <Link
                        href="/polityka-prywatnosci-baciata-pl"
                        className="text-amber-500 hover:text-amber-600"
                      >
                        Politykę Prywatności
                      </Link>{" "}
                      oraz{" "}
                      <Link
                        href="/warunki-korzystania-z-uslugi-baciata-pl"
                        className="text-amber-500 hover:text-amber-600"
                      >
                        Warunki Korzystania z Usługi
                      </Link>
                    </span>
                  </label>
                  {errors.agreeToTerms && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm"
                    >
                      {errors.agreeToTerms}
                    </motion.p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading || !isFormValid}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 
                  text-white py-3 px-4 rounded-lg font-medium 
                  hover:from-amber-600 hover:to-amber-700 
                  transition-all duration-200 disabled:opacity-50 
                  disabled:cursor-not-allowed flex items-center 
                  justify-center space-x-2 shadow-md hover:shadow-lg
                  hover:shadow-amber-500/20"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner />
                    <span>Rejestrowanie...</span>
                  </>
                ) : (
                  <>
                    <FaCheck className="w-5 h-5" />
                    <span>Zarejestruj się</span>
                  </>
                )}
              </button>

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

              <motion.button
                type="button"
                onClick={() => signIn("google")}
                className="w-full bg-white text-gray-700 py-3 px-4 rounded-lg font-medium 
                  transition-all duration-200 flex items-center justify-center space-x-3 
                  border border-gray-200 hover:bg-gray-50"
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
                <span>Zarejestruj się przez Google</span>
              </motion.button>

              <p className="text-center text-gray-600 text-sm">
                Masz już konto?{" "}
                <Link
                  href="/login"
                  className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
                >
                  Zaloguj się
                </Link>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
