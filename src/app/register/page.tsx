"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUser,
  FaCheck,
  FaUsers,
  FaCalendar,
  FaHeart,
  FaCrown,
  FaMusic,
} from "react-icons/fa";
import { z } from "zod";
import { passwordSchema } from "../../schemas/passwordSchema";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { motion } from "framer-motion";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Input } from "@/app/register/Input";
import { BannerGrid } from "@/app/register/BannerGrid";
import { PremiumBanner } from "@/app/register/PremiumBanner";

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
    <>
      <Head>
        <title>Rejestracja - baciata.pl</title>
        <meta name="description" content={description} />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-[#0a1e3b] to-[#2a4a7f] flex items-center justify-center p-6 lg:p-8">
        <div className="container mx-auto flex flex-col xl:flex-row justify-between items-start gap-8 max-w-screen-2xl">
          {/* Lewa strona - Banery */}
          <div className="hidden xl:block sticky top-8 w-[380px]">
            <BannerGrid />
          </div>

          {/* Środek - Formularz */}
          <div className="w-full max-w-md mx-auto">
            {/* Logo i nagłówek */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                <motion.div
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-0.5 rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="bg-[#0a1e3b] px-6 py-2 rounded-full">
                    <span className="text-white font-medium text-xl">
                      Dołącz do nas
                    </span>
                  </div>
                </motion.div>
              </div>
              <h2 className="text-3xl font-bold text-white">Stwórz konto</h2>
              <p className="mt-2 text-white/60">
                i rozpocznij swoją przygodę z bachatą
              </p>
            </motion.div>

            {/* Formularz */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="mt-8 space-y-6 bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10"
            >
              {successMessage && (
                <div className="bg-green-400/20 border border-green-400/30 text-green-400 p-4 rounded-xl mb-6">
                  {successMessage}
                </div>
              )}

              {errors.form && (
                <div className="bg-red-400/20 border border-red-400/30 text-red-400 p-4 rounded-xl mb-6">
                  {errors.form}
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
                  icon={FaUser}
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
                  icon={FaEnvelope}
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
                  icon={FaLock}
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
                  icon={FaLock}
                  error={errors.confirmPassword}
                  isPassword
                  label="Potwierdź hasło"
                  showPasswords={showPasswords}
                />

                {/* Checkbox akceptacji warunków */}
                <div className="space-y-2">
                  <label className="flex items-start space-x-3 text-white/80">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={agreeToTerms}
                      onChange={handleInputChange}
                      className="mt-1 h-4 w-4 rounded border-white/10 bg-white/5 text-yellow-400 
                        focus:ring-2 focus:ring-yellow-400/50 focus:ring-offset-0"
                    />
                    <span className="text-sm">
                      Akceptuję{" "}
                      <Link
                        href="/polityka-prywatnosci-baciata-pl"
                        className="text-yellow-400 hover:text-yellow-300"
                      >
                        Politykę Prywatności
                      </Link>{" "}
                      oraz{" "}
                      <Link
                        href="/warunki-korzystania-z-uslugi-baciata-pl"
                        className="text-yellow-400 hover:text-yellow-300"
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
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#0a1e3b] py-3 px-4 
                  rounded-xl font-medium hover:from-yellow-500 hover:to-yellow-700 
                  transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center space-x-2"
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
            </motion.form>

            {/* Link do logowania */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center text-white/60"
            >
              Masz już konto?{" "}
              <Link
                href="/login"
                className="text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                Zaloguj się
              </Link>
            </motion.p>
          </div>

          {/* Prawa strona - Premium Banner */}
          <div className="hidden xl:block sticky top-8 w-[380px]">
            <PremiumBanner />
          </div>
        </div>
      </div>
    </>
  );
}
