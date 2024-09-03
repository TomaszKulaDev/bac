//src/app/users/register/page.tsx
"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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

  const validatePassword = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidLength = password.length >= 6 && password.length <= 72;

    console.log("Validating password:", {
      length: password.length,
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasSpecialChar,
      isValidLength,
    });

    return (
      isValidLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  const validateForm = () => {
    console.log("Validating form");
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = "Imię jest wymagane.";
    } else if (name.length > 20) {
      newErrors.name = "Imię nie może być dłuższe niż 20 znaków.";
    }

    if (!email.trim()) {
      newErrors.email = "Email jest wymagany.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Adres email jest nieprawidłowy.";
    }

    if (!password.trim()) {
      newErrors.password = "Hasło jest wymagane.";
    } else if (!validatePassword(password)) {
      newErrors.password =
        "Hasło musi mieć od 6 do 72 znaków i zawierać duże i małe litery, cyfry oraz znaki specjalne.";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Potwierdzenie hasła jest wymagane.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Hasła nie są identyczne.";
    }

    if (!agreeToTerms) {
      newErrors.agreeToTerms = "Musisz zaakceptować politykę prywatności.";
    }

    console.log("Validation errors:", newErrors);
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form submitted");
    if (!validateForm()) {
      console.log("Form validation failed");
      return;
    }

    let trimmedPassword = password;
    if (password.length > 72) {
      trimmedPassword = password.slice(0, 72);
      console.log("Password trimmed to 72 characters");
    }

    console.log(
      "Sending registration request with password length:",
      trimmedPassword.length
    );

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password: trimmedPassword,
          name,
          agreeToTerms,
        }),
      });

      console.log("Server response status:", response.status);

      if (response.ok) {
        console.log("Registration successful");
        setSuccessMessage(
          "Rejestracja udana! Sprawdź swoją skrzynkę email, aby zweryfikować konto i zakończyć proces rejestracji."
        );
        resetForm();
      } else {
        const errorData = await response.json();
        console.log("Server error:", errorData);
        setErrors({ form: errorData.message });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setErrors({ form: "Wystąpił nieoczekiwany błąd. Spróbuj ponownie." });
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setName("");
    setAgreeToTerms(false);
    setErrors({});
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const resendVerificationEmail = async () => {
    try {
      const response = await fetch("/api/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
      } else {
        setErrors({ form: data.message });
      }
    } catch (error) {
      console.error(
        "Błąd przy ponownym wysyłaniu emaila weryfikacyjnego:",
        error
      );
      setErrors({ form: "Wystąpił nieoczekiwany błąd. Spróbuj ponownie." });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Rejestracja</h1>
        {successMessage && (
          <div className="mb-4 text-green-600 bg-green-100 border border-green-400 rounded p-3">
            <p>{successMessage}</p>
            <p className="mt-2 text-sm">
              Jeśli nie widzisz maila od nas w nowych wiadomościach, możemy
              wysłać go ponownie, ale za każdym razem, kiedy to robimy, musisz
              wysłać nam 100 000 zł. To nie są tanie rzeczy.
              <button
                type="button"
                className="text-blue-500 underline ml-1"
                onClick={resendVerificationEmail}
              >
                Wyślij email weryfikacyjny ponownie
              </button>
            </p>
          </div>
        )}
        {errors.form && (
          <div className="mb-4 text-red-600 bg-red-100 border border-red-400 rounded p-3">
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
            placeholder="Wprowadź swój email"
            autoComplete="email"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-2">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Imię</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={!!errors.name}
            className={`w-full px-3 py-2 border rounded text-gray-900 focus:outline-none ${getInputClasses(
              name,
              "name"
            )}`}
            placeholder="Wprowadź swoje imię"
            autoComplete="username"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-2">{errors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Hasło</label>
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
              placeholder="Wprowadź hasło"
              autoComplete="new-password"
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
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Potwierdź hasło</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              onClick={toggleConfirmPasswordVisibility}
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
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="mr-2"
            />
            Akceptuję{" "}
            <a href="/privacy-policy" className="text-blue-500">
              Politykę Prywatności
            </a>
          </label>
          {errors.agreeToTerms && (
            <p className="text-red-600 text-sm mt-2">{errors.agreeToTerms}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors duration-200"
        >
          Zarejestruj się
        </button>
      </form>
    </div>
  );
}
