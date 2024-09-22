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

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        >
          <h1 className="text-gray-700 font-medium mb-4 text-2xl text-center">
            Dołącz do nas:
          </h1>

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
