// src/app/users/login/page.tsx

"use client"; // Dodajemy tę linijkę na początku

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      login(data.token);
      router.push("/users/profile");
    } else {
      setErrors({ form: "Invalid email or password" });
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
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
          <Link href="/users/forgot-password" legacyBehavior>
            <a className="text-blue-500 hover:underline">
              Forgot your password?
            </a>
          </Link>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
}
