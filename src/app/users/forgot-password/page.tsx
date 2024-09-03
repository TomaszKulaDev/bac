"use client";

import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form submitted");
    console.log("Email:", email);

    if (!email) {
      setMessage("Email jest wymagany.");
      console.log("Email is required");
      return;
    }

    try {
      console.log("Sending request to /api/forgot-password");
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        setMessage(
          "Link do resetowania hasła został wysłany na Twój adres email."
        );
        console.log("Password reset link sent successfully");
      } else {
        setMessage(data.message || "Wystąpił błąd. Spróbuj ponownie.");
        console.log("Error:", data.message || "Unknown error occurred");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setMessage("Wystąpił nieoczekiwany błąd. Spróbuj ponownie.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">
          Zapomniałeś hasła?
        </h1>
        {message && (
          <p className="mb-4 text-center text-sm font-medium text-gray-800 bg-gray-100 p-2 rounded">
            {message}
          </p>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Wprowadź swój email"
            autoComplete="email"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors duration-200"
        >
          Wyślij link do resetowania
        </button>
      </form>
    </div>
  );
}
