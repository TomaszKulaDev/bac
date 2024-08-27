// src/app/users/register/page.tsx

"use client";

import { useState, useEffect } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  useEffect(() => {
    const isValidPassword = validatePassword(password);
    const doPasswordsMatch = password === confirmPassword;
    const isNameValid = name.trim() !== "" && name.length <= 20;
    const isEmailValid = /\S+@\S+\.\S+/.test(email);
    const isFormValid =
      isValidPassword &&
      doPasswordsMatch &&
      isNameValid &&
      isEmailValid &&
      agreeToTerms;

    setIsFormValid(isFormValid);
    setPasswordsMatch(doPasswordsMatch);
  }, [password, confirmPassword, name, email, agreeToTerms]);

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

    if (!name.trim()) {
      newErrors.push("Name is required.");
    } else if (name.length > 20) {
      newErrors.push("Name cannot be longer than 20 characters.");
    }
    if (!email.trim()) {
      newErrors.push("Email is required.");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.push("Email address is invalid.");
    }
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
    if (!agreeToTerms) {
      newErrors.push("You must agree to the privacy policy.");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name, agreeToTerms }),
    });

    if (response.ok) {
      alert("User registered successfully");
      resetForm(); // Wyczyszczenie formularza po pomyślnej rejestracji
    } else {
      const errorData = await response.json();
      setErrors([errorData.message]);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setName("");
    setAgreeToTerms(false);
    setErrors([]);
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
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
        {errors.length > 0 && (
          <div className="mb-4 text-red-600">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-3 py-2 border rounded text-gray-900 focus:outline-none ${getInputClasses(
              email,
              /\S+@\S+\.\S+/.test(email)
            )}`}
            placeholder="Enter your email"
            autoComplete="email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-3 py-2 border rounded text-gray-900 focus:outline-none ${getInputClasses(
              name,
              name.trim() !== "" && name.length <= 20
            )}`}
            placeholder="Enter your name"
            autoComplete="username"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-3 py-2 border rounded text-gray-900 focus:outline-none ${getInputClasses(
              password,
              validatePassword(password)
            )}`}
            placeholder="Enter your password"
            autoComplete="current-password"
          />
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
            placeholder="Confirm your password"
            autoComplete="current-password"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            <input
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="mr-2"
            />
            I agree to the{" "}
            <a href="/privacy-policy" className="text-blue-500">
              Privacy Policy
            </a>
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors duration-200"
          disabled={!isFormValid}
        >
          Register
        </button>
      </form>
    </div>
  );
}
