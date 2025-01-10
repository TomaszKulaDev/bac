"use client";

import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { UserProfile } from "@/types/user";
import { toast } from "react-toastify";

interface EditProfileModalProps {
  profile: UserProfile;
  onClose: () => void;
  onSubmit: (updatedProfile: UserProfile) => Promise<void>;
}

export default function EditProfileModal({
  profile,
  onClose,
  onSubmit,
}: EditProfileModalProps) {
  const [formData, setFormData] = useState<UserProfile>(profile);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 flex items-center justify-center">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        <div className="relative bg-white rounded-xl max-w-md w-full shadow-2xl">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Edytuj profil</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <FaTimes className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="space-y-4">
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full rounded-lg border-gray-300"
                placeholder="Imię"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Anuluj
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
              >
                Zapisz zmiany
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
