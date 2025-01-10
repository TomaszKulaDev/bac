"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { toast } from "react-toastify";
import { useUserProfile } from "@/hooks/useUserProfile";
import { UserProfile, UserProfilePaths } from "@/types/user";
import { CITIES } from "@/constants/cities";

interface EditableFieldProps {
  value: string | number | undefined;
  field: UserProfilePaths;
  onSave: (field: UserProfilePaths, value: string | number) => Promise<void>;
  type?: "text" | "number";
  label: string;
}

const EditableField = ({
  value = "",
  field,
  onSave,
  type = "text",
  label,
}: EditableFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState<string | number>(value);

  const handleSave = async () => {
    try {
      await onSave(field, editValue);
      setIsEditing(false);
      toast.success(`${label} zaktualizowane`);
    } catch (error) {
      toast.error(`Błąd podczas aktualizacji: ${label}`);
    }
  };

  return isEditing ? (
    <div className="flex items-center gap-2">
      <input
        type={type}
        value={editValue}
        onChange={(e) =>
          setEditValue(
            type === "number" ? Number(e.target.value) : e.target.value
          )
        }
        className="rounded-lg border-gray-300 text-sm"
        autoFocus
      />
      <button
        onClick={handleSave}
        className="p-1 text-green-600 hover:bg-green-50 rounded"
      >
        <FaCheck className="w-4 h-4" />
      </button>
      <button
        onClick={() => {
          setIsEditing(false);
          setEditValue(value);
        }}
        className="p-1 text-red-600 hover:bg-red-50 rounded"
      >
        <FaTimes className="w-4 h-4" />
      </button>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <span>{value}</span>
      <button
        onClick={() => setIsEditing(true)}
        className="p-1 text-gray-400 hover:text-amber-600 rounded"
      >
        <FaEdit className="w-4 h-4" />
      </button>
    </div>
  );
};

export default function ProfilePage() {
  const { data: session } = useSession();
  const {
    userProfile: profile,
    isLoading,
    updateUserProfile,
  } = useUserProfile();

  const handleFieldUpdate = async (
    field: UserProfilePaths,
    value: string | number
  ) => {
    if (!profile) return;

    try {
      const updatedData = { ...profile };
      const fieldPath = field.split(".");

      if (fieldPath.length === 1) {
        (updatedData as any)[field] = value;
      } else {
        let current: any = updatedData;
        for (let i = 0; i < fieldPath.length - 1; i++) {
          if (!current[fieldPath[i]]) {
            current[fieldPath[i]] = {};
          }
          current = current[fieldPath[i]];
        }
        current[fieldPath[fieldPath.length - 1]] = value;
      }

      await updateUserProfile(updatedData);
      toast.success(`Zaktualizowano pomyślnie`);
    } catch (error) {
      console.error("Błąd aktualizacji:", error);
      toast.error(`Błąd podczas aktualizacji`);
    }
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <a href="/auth/signin" className="text-amber-600 hover:underline">
          Zaloguj się aby zobaczyć profil
        </a>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Ładowanie...</div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-start gap-6">
          <Image
            src={profile.image || "/images/default-avatar.png"}
            alt={profile.name}
            width={120}
            height={120}
            className="rounded-full"
          />
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500">Imię</label>
              <EditableField
                value={profile.name}
                field="name"
                onSave={handleFieldUpdate}
                label="Imię"
              />
            </div>
            <div>
              <label className="text-sm text-gray-500">Bio</label>
              <EditableField
                value={profile.bio}
                field="bio"
                onSave={handleFieldUpdate}
                label="Bio"
              />
            </div>
            <div>
              <label className="text-sm text-gray-500">Wzrost (cm)</label>
              <EditableField
                value={profile.height}
                field="height"
                onSave={handleFieldUpdate}
                type="number"
                label="Wzrost"
              />
            </div>
            <div>
              <label className="text-sm text-gray-500">Wiek</label>
              <EditableField
                value={profile.age}
                field="age"
                onSave={handleFieldUpdate}
                type="number"
                label="Wiek"
              />
            </div>
            <div>
              <label className="text-sm text-gray-500">Płeć</label>
              <select
                value={profile.gender || ""}
                onChange={(e) => handleFieldUpdate("gender", e.target.value)}
                className="rounded-lg border-gray-300 text-sm"
              >
                <option value="">Wybierz płeć</option>
                <option value="male">Mężczyzna</option>
                <option value="female">Kobieta</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Sekcja preferencji tanecznych */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Preferencje taneczne</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500">Poziom</label>
            <EditableField
              value={profile.dancePreferences?.level}
              field="dancePreferences.level"
              onSave={handleFieldUpdate}
              label="Poziom"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500">Dostępność</label>
            <EditableField
              value={profile.dancePreferences?.availability}
              field="dancePreferences.availability"
              onSave={handleFieldUpdate}
              label="Dostępność"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500">Lokalizacja</label>
            <select
              value={profile.dancePreferences?.location || ""}
              onChange={(e) =>
                handleFieldUpdate("dancePreferences.location", e.target.value)
              }
              className="rounded-lg border-gray-300 text-sm w-full"
            >
              {CITIES.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Sekcja social media */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Media społecznościowe</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500">Instagram</label>
            <EditableField
              value={profile.socialMedia?.instagram}
              field="socialMedia.instagram"
              onSave={handleFieldUpdate}
              label="Instagram"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500">Facebook</label>
            <EditableField
              value={profile.socialMedia?.facebook}
              field="socialMedia.facebook"
              onSave={handleFieldUpdate}
              label="Facebook"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500">YouTube</label>
            <EditableField
              value={profile.socialMedia?.youtube}
              field="socialMedia.youtube"
              onSave={handleFieldUpdate}
              label="YouTube"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
