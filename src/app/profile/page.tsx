"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { FaEdit, FaKey } from "react-icons/fa";
import EditProfileModal from "./components/EditProfileModal";
import ChangePasswordModal from "./components/ChangePasswordModal";
import { useUserProfile } from "@/hooks/useUserProfile";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const {
    userProfile: profile,
    isLoading,
    updateUserProfile,
    isModalOpen,
    openModal,
    closeModal,
  } = useUserProfile();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if (status === "unauthenticated") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <a href="/auth/signin" className="text-amber-600 hover:underline">
          Zaloguj się aby zobaczyć profil
        </a>
      </div>
    );
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Ładowanie...</div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {/* Nagłówek z akcjami */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Twój profil</h1>
        <div className="space-x-3">
          <button
            onClick={() => setIsChangingPassword(true)}
            className="px-4 py-2 text-amber-600 border border-amber-500 rounded-lg hover:bg-amber-50 flex items-center gap-2"
          >
            <FaKey /> Zmień hasło
          </button>
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 flex items-center gap-2"
          >
            <FaEdit /> Edytuj profil
          </button>
        </div>
      </div>

      {/* Główne informacje */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-start gap-6">
          <Image
            src={profile.image || "/images/default-avatar.png"}
            alt={profile.name}
            width={120}
            height={120}
            className="rounded-full"
          />
          <div>
            <h2 className="text-xl font-semibold">{profile.name}</h2>
            <p className="text-gray-600">{profile.email}</p>
            {profile.bio && <p className="mt-2">{profile.bio}</p>}
          </div>
        </div>
      </div>

      {/* Informacje o tańcu */}
      {profile.dancePreferences && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Preferencje taneczne</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-medium">Style:</span>{" "}
              {profile.dancePreferences.styles.join(", ")}
            </div>
            <div>
              <span className="font-medium">Poziom:</span>{" "}
              {profile.dancePreferences.level}
            </div>
            <div>
              <span className="font-medium">Lokalizacja:</span>{" "}
              {profile.dancePreferences.location}
            </div>
            <div>
              <span className="font-medium">Dostępność:</span>{" "}
              {profile.dancePreferences.availability}
            </div>
          </div>
        </div>
      )}

      {/* Informacje osobiste */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Informacje osobiste</h3>
        <div className="grid grid-cols-2 gap-4">
          {profile.age && (
            <div>
              <span className="font-medium">Wiek:</span> {profile.age} lat
            </div>
          )}
          {profile.height && (
            <div>
              <span className="font-medium">Wzrost:</span> {profile.height} cm
            </div>
          )}
          {profile.gender && (
            <div>
              <span className="font-medium">Płeć:</span>{" "}
              {profile.gender === "male" ? "Mężczyzna" : "Kobieta"}
            </div>
          )}
        </div>
      </div>

      {/* Modale */}
      {isEditing && (
        <EditProfileModal
          profile={profile}
          onClose={() => setIsEditing(false)}
          onSubmit={async (updatedProfile) => {
            try {
              await updateUserProfile(updatedProfile);
              setIsEditing(false);
              toast.success("Profil zaktualizowany");
            } catch (error) {
              toast.error("Błąd podczas aktualizacji profilu");
            }
          }}
        />
      )}

      {isChangingPassword && (
        <ChangePasswordModal onClose={() => setIsChangingPassword(false)} />
      )}
    </div>
  );
}
