"use client";

import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

interface DeleteAccountModalProps {
  onClose: () => void;
}

export default function DeleteAccountModal({
  onClose,
}: DeleteAccountModalProps) {
  const [confirmText, setConfirmText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const CONFIRMATION_TEXT = "USUŃ KONTO";

  const handleDeleteAccount = async () => {
    if (confirmText !== CONFIRMATION_TEXT) {
      toast.error("Wprowadź poprawny tekst potwierdzenia");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/users/delete-account", {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Błąd podczas usuwania konta");
      }

      toast.success("Konto zostało usunięte");
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Wystąpił błąd podczas usuwania konta"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-red-600">Usuń konto</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={isLoading}
          >
            <FaTimes />
          </button>
        </div>

        <div className="space-y-4">
          <div className="text-gray-600">
            <p className="mb-2">
              Ta operacja jest nieodwracalna. Wszystkie Twoje dane zostaną
              trwale usunięte.
            </p>
            <p className="font-medium">
              Wpisz &quot;{CONFIRMATION_TEXT}&quot; aby potwierdzić:
            </p>
          </div>

          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder={CONFIRMATION_TEXT}
            disabled={isLoading}
          />

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
              onClick={handleDeleteAccount}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50"
              disabled={isLoading || confirmText !== CONFIRMATION_TEXT}
            >
              {isLoading ? "Usuwanie..." : "Usuń konto"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
