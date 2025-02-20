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
  FaCheckCircle,
  FaUserPlus,
} from "react-icons/fa";
import { z } from "zod";
import { passwordSchema } from "../../schemas/passwordSchema";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
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

  const resetForm = useCallback(() => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setAgreeToTerms(false);
    setErrors({});
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    // Czyścimy błąd dla danego pola przy jego zmianie
    setErrors((prev) => ({ ...prev, [name]: "" }));

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
        resetForm(); // Czyszczenie formularza po udanej rejestracji
        setSuccessMessage(
          "Rejestracja udana! Sprawdź swoją skrzynkę email, aby zweryfikować konto."
        );

        // Automatyczne ukrycie komunikatu sukcesu po 5 sekundach
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      } else {
        setErrors({
          form: data.message || "Wystąpił błąd podczas rejestracji",
        });

        // Automatyczne ukrycie błędu po 5 sekundach
        setTimeout(() => {
          setErrors((prev) => ({ ...prev, form: "" }));
        }, 5000);
      }
    } catch (error) {
      setErrors({
        form: "Wystąpił nieoczekiwany błąd. Spróbuj ponownie.",
      });

      // Automatyczne ukrycie błędu po 5 sekundach
      setTimeout(() => {
        setErrors((prev) => ({ ...prev, form: "" }));
      }, 5000);
    } finally {
      setIsLoading(false);
    }
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

  // Czyszczenie komunikatów przy odmontowaniu komponentu
  useEffect(() => {
    return () => {
      setSuccessMessage(null);
      setErrors({});
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-start justify-center p-2 lg:p-2">
      <div className="container mx-auto flex flex-col xl:flex-row justify-between items-start gap-8 max-w-screen-2xl mt-8 lg:mt-3">
        <div className="w-full max-w-md mx-auto">
          {/* Nagłówek */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-2.5 mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-800">Dołącz do nas</h1>
            <p className="text-gray-500 text-lg">
              Stwórz konto i rozpocznij swoją przygodę z bachatą
            </p>
          </motion.div>

          {/* Formularz */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-7 bg-white p-8 rounded-2xl shadow-lg shadow-gray-100/50 
              border border-gray-100"
          >
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200/70 text-green-600 p-4 rounded-xl 
                  flex items-center space-x-2.5"
              >
                <FaCheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="font-medium text-sm">{successMessage}</span>
              </motion.div>
            )}

            {errors.form && (
              <div className="bg-red-400/20 border border-red-400/30 text-red-400 p-4 rounded-xl mb-6">
                {errors.form}
              </div>
            )}

            <div className="space-y-5">
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
                autoComplete="name"
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
                autoComplete="email"
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
                autoComplete="new-password"
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
                autoComplete="new-password"
              />
            </div>

            {/* Checkbox akceptacji warunków */}
            <div className="space-y-2">
              <label className="flex items-start space-x-3 text-gray-600">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={agreeToTerms}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 rounded border-gray-300 bg-gray-50 
                    text-amber-500 focus:ring-2 focus:ring-amber-500/30 
                    focus:ring-offset-0 transition-colors duration-200"
                />
                <span className="text-sm leading-relaxed">
                  Akceptuję{" "}
                  <Link
                    href="/polityka-prywatnosci-baciata-pl"
                    className="text-amber-500 hover:text-amber-600 transition-colors font-medium"
                  >
                    Politykę Prywatności
                  </Link>{" "}
                  oraz{" "}
                  <Link
                    href="/warunki-korzystania-z-uslugi-baciata-pl"
                    className="text-amber-500 hover:text-amber-600 transition-colors font-medium"
                  >
                    Regulamin
                  </Link>
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading || !isFormValid}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 
                text-white py-4 px-4 rounded-xl font-semibold tracking-wide
                hover:from-amber-600 hover:to-amber-700 
                transition-all duration-200 disabled:opacity-50 
                disabled:cursor-not-allowed shadow-lg shadow-amber-500/10
                transform hover:translate-y-[-1px] active:translate-y-[1px]
                mt-8"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <LoadingSpinner className="h-5 w-5" />
                  <span>Rejestrowanie...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <FaUserPlus className="h-5 w-5" />
                  <span>Zarejestruj się</span>
                </div>
              )}
            </button>
          </motion.form>

          {/* Link do logowania */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-8 text-gray-600"
          >
            Masz już konto?{" "}
            <Link
              href="/login"
              className="text-amber-500 hover:text-amber-600 transition-colors 
                font-semibold hover:underline"
            >
              Zaloguj się
            </Link>
          </motion.p>
        </div>
      </div>
    </div>
  );
}
