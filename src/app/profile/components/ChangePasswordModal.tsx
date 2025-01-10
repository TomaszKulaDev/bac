"use client";

import { useState } from "react";
import { FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

interface ChangePasswordModalProps {
  onClose: () => void;
}

export default function ChangePasswordModal({
  onClose,
}: ChangePasswordModalProps) {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showAllPasswords, setShowAllPasswords] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("Nowe hasła nie są identyczne");
      return;
    }

    if (passwords.newPassword.length < 8) {
      setError("Nowe hasło musi mieć co najmniej 8 znaków");
      return;
    }

    try {
      const response = await fetch("/api/users/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Błąd zmiany hasła");
      }

      onClose();
      toast.success("Hasło zostało zmienione");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Błąd zmiany hasła");
    }
  };

  const PasswordInput = ({
    label,
    field,
  }: {
    label: string;
    field: keyof typeof passwords;
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative mt-1">
        <input
          type={showAllPasswords ? "text" : "password"}
          value={passwords[field]}
          onChange={(e) =>
            setPasswords((prev) => ({
              ...prev,
              [field]: e.target.value,
            }))
          }
          className="block w-full rounded-lg border-gray-300 shadow-sm"
          required
          minLength={8}
        />
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 flex items-center justify-center">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

        <div className="relative bg-white rounded-xl max-w-md w-full shadow-2xl">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Zmień hasło</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <FaTimes className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="flex justify-end mb-2">
              <button
                type="button"
                onClick={() => setShowAllPasswords(!showAllPasswords)}
                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800"
              >
                {showAllPasswords ? (
                  <>
                    <FaEyeSlash className="h-5 w-5" />
                    <span>Ukryj hasła</span>
                  </>
                ) : (
                  <>
                    <FaEye className="h-5 w-5" />
                    <span>Pokaż hasła</span>
                  </>
                )}
              </button>
            </div>

            <PasswordInput label="Aktualne hasło" field="currentPassword" />

            <PasswordInput label="Nowe hasło" field="newPassword" />

            <PasswordInput
              label="Potwierdź nowe hasło"
              field="confirmPassword"
            />

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Anuluj
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-lg"
              >
                Zmień hasło
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
