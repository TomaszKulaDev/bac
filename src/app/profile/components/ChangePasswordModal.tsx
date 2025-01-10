"use client";

import { useState } from "react";
import { FaTimes, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
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
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    if (password.length < 8) errors.push("• Minimum 8 znaków");
    if (!/[A-Z]/.test(password)) errors.push("• Wielka litera");
    if (!/[a-z]/.test(password)) errors.push("• Mała litera");
    if (!/[0-9]/.test(password)) errors.push("• Cyfra");
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const passwordErrors = validatePassword(passwords.newPassword);
    if (passwordErrors.length > 0) {
      setError(`Hasło musi zawierać:\n${passwordErrors.join("\n")}`);
      setIsLoading(false);
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("Nowe hasła nie są identyczne");
      setIsLoading(false);
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Błąd zmiany hasła");
      }

      toast.success("Hasło zostało zmienione");
      onClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Błąd zmiany hasła");
    } finally {
      setIsLoading(false);
    }
  };

  const PasswordInput = ({
    label,
    field,
    placeholder,
  }: {
    label: string;
    field: keyof typeof passwords;
    placeholder: string;
  }) => (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative mt-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaLock className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={
            showPasswords[field as keyof typeof showPasswords]
              ? "text"
              : "password"
          }
          value={passwords[field]}
          onChange={(e) =>
            setPasswords((prev) => ({
              ...prev,
              [field]: e.target.value,
            }))
          }
          placeholder={placeholder}
          className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          required
        />
        <button
          type="button"
          onClick={() =>
            setShowPasswords((prev) => ({
              ...prev,
              [field]: !prev[field as keyof typeof showPasswords],
            }))
          }
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          {showPasswords[field as keyof typeof showPasswords] ? (
            <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          ) : (
            <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 flex items-center justify-center">
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          onClick={onClose}
        />

        <div className="relative bg-white rounded-xl max-w-md w-full shadow-2xl">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Zmień hasło</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaTimes className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 whitespace-pre-line">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <PasswordInput
                label="Aktualne hasło"
                field="currentPassword"
                placeholder="Wprowadź aktualne hasło"
              />
              <PasswordInput
                label="Nowe hasło"
                field="newPassword"
                placeholder="Wprowadź nowe hasło"
              />
              <PasswordInput
                label="Potwierdź nowe hasło"
                field="confirmPassword"
                placeholder="Potwierdź nowe hasło"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                disabled={isLoading}
              >
                Anuluj
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? "Zapisywanie..." : "Zmień hasło"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
