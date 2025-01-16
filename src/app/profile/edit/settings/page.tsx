"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useUserProfile } from "@/hooks/useUserProfile";
import { DEFAULT_SETTINGS } from "@/types/user";
import ChangePasswordModal from "../../components/ChangePasswordModal";

export default function SettingsPage() {
  const { data: session } = useSession();
  const { userProfile, updateUserProfile } = useUserProfile();
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);

  if (!userProfile) return null;

  // Używamy domyślnych ustawień jeśli nie są zdefiniowane
  const settings = userProfile.settings || DEFAULT_SETTINGS;

  const updateSettings = (newSettings: typeof settings) => {
    updateUserProfile({
      settings: newSettings,
    });
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {/* Sekcja ustawień konta */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Ustawienia konta</h3>
        <div className="space-y-4">
          {/* Ustawienia powiadomień */}
          <div>
            <label className="text-sm text-gray-500 mb-2 block">
              Powiadomienia
            </label>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-sm text-gray-500">
                    Otrzymuj powiadomienia na email
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.notifications.email}
                    onChange={(e) => {
                      updateSettings({
                        ...settings,
                        notifications: {
                          ...settings.notifications,
                          email: e.target.checked,
                        },
                      });
                    }}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Push</h4>
                  <p className="text-sm text-gray-500">
                    Otrzymuj powiadomienia w przeglądarce
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.notifications.push}
                    onChange={(e) => {
                      updateSettings({
                        ...settings,
                        notifications: {
                          ...settings.notifications,
                          push: e.target.checked,
                        },
                      });
                    }}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sekcja bezpieczeństwa */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Bezpieczeństwo</h3>
        <div className="space-y-4">
          <button
            onClick={() => setIsChangePasswordModalOpen(true)}
            className="w-full p-4 border rounded-lg text-left hover:bg-gray-50 transition-colors"
          >
            <h4 className="font-medium">Zmień hasło</h4>
            <p className="text-sm text-gray-500">
              Zaktualizuj swoje hasło do konta
            </p>
          </button>

          <button className="w-full p-4 border rounded-lg text-left hover:bg-gray-50 transition-colors text-red-600">
            <h4 className="font-medium">Usuń konto</h4>
            <p className="text-sm text-gray-500">
              Trwale usuń swoje konto i wszystkie dane
            </p>
          </button>
        </div>
      </div>

      {isChangePasswordModalOpen && (
        <ChangePasswordModal
          onClose={() => setIsChangePasswordModalOpen(false)}
        />
      )}
    </div>
  );
}
