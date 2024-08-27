"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams ? searchParams.get("token") : null;

  useEffect(() => {
    if (!token) {
      alert("Invalid or missing token");
      router.push("/login");
    }
  }, [token, router]);

  useEffect(() => {
    const isValidPassword = validatePassword(password);
    const doPasswordsMatch = password === confirmPassword;

    setIsFormValid(isValidPassword && doPasswordsMatch);
    setPasswordsMatch(doPasswordsMatch);
  }, [password, confirmPassword]);

  const validatePassword = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidLength = password.length >= 6;

    return (
      isValidLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  const validateForm = () => {
    const newErrors: string[] = [];

    if (!password.trim()) {
      newErrors.push("Password is required.");
    } else if (!validatePassword(password)) {
      newErrors.push(
        "Password must be at least 6 characters long and include uppercase letters, lowercase letters, numbers, and special characters."
      );
    }
    if (!confirmPassword.trim()) {
      newErrors.push("Confirm Password is required.");
    } else if (!passwordsMatch) {
      newErrors.push("Passwords do not match.");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const response = await fetch(`/api/reset-password?token=${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      alert("Password reset successfully");
      router.push("/users/login");
    } else {
      alert("Failed to reset password");
    }
  };

  const getInputClasses = (value: string, isValid: boolean) => {
    if (value === "") {
      return ""; // Neutral color if the input is empty
    }
    if (isValid) {
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
        <h1 className="text-2xl font-bold mb-4 text-center">Reset Password</h1>
        {errors.length > 0 && (
          <div className="mb-4 text-red-600">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-3 py-2 border rounded text-gray-900 focus:outline-none ${getInputClasses(
              password,
              validatePassword(password)
            )}`}
            placeholder="Enter your new password"
            autoComplete="new-password"
          />
          <p className="text-gray-600 text-sm mt-2">
            Password must be at least 6 characters long and include uppercase
            letters, lowercase letters, numbers, and special characters.
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full px-3 py-2 border rounded text-gray-900 focus:outline-none ${getInputClasses(
              confirmPassword,
              passwordsMatch && validatePassword(confirmPassword)
            )}`}
            placeholder="Confirm your new password"
            autoComplete="new-password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors duration-200"
          disabled={!isFormValid}
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
