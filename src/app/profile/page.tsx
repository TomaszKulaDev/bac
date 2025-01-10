"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { toast } from "react-toastify";
import { useUserProfile } from "@/hooks/useUserProfile";
import { UserProfile } from "@/types/user";

// Typ dla zagnieżdżonych ścieżek
type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${"" extends P ? "" : "."}${P}`
    : never
  : never;

type Prev = [never, 0, 1, 2, 3, 4, 5, ...0[]];

type Paths<T, D extends number = 3> = [D] extends [never]
  ? never
  : T extends object
  ? {
      [K in keyof T]-?: K extends string | number
        ? `${K}` | Join<K, Paths<T[K], Prev[D]>>
        : never;
    }[keyof T]
  : "";

interface EditableFieldProps {
  value: string | number | undefined;
  field: Paths<UserProfile>;
  onSave: (field: Paths<UserProfile>, value: string | number) => Promise<void>;
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

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <input
          type={type}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
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
    );
  }

  return (
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
  const { data: session, status } = useSession();
  const {
    userProfile: profile,
    isLoading,
    updateUserProfile,
  } = useUserProfile();
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleFieldUpdate = async (
    field: Paths<UserProfile>,
    value: string | number
  ) => {
    if (!profile) return;

    // Tworzymy kopię profilu
    const updatedProfile = { ...profile };

    // Funkcja do bezpiecznej aktualizacji zagnieżdżonych pól
    const setNestedValue = (obj: any, path: string, value: any) => {
      const keys = path.split(".");
      let current = obj;

      // Przechodzimy przez wszystkie klucze oprócz ostatniego
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        // Tworzymy obiekt jeśli nie istnieje
        current[key] = current[key] || {};
        current = current[key];
      }

      // Ustawiamy wartość na ostatnim poziomie
      const lastKey = keys[keys.length - 1];
      current[lastKey] = value;
    };

    // Aktualizujemy wartość
    setNestedValue(updatedProfile, field, value);

    try {
      // Debugowanie
      console.log("Wysyłane dane:", updatedProfile);

      // Aktualizujemy profil
      await updateUserProfile(updatedProfile);

      toast.success(`${field} zaktualizowane pomyślnie`);
    } catch (error) {
      console.error("Błąd aktualizacji:", error);
      toast.error(`Błąd podczas aktualizacji: ${field}`);
    }
  };

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
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-start gap-6">
          <Image
            src={profile?.image || "/images/default-avatar.png"}
            alt={profile?.name || ""}
            width={120}
            height={120}
            className="rounded-full"
          />
          <div className="space-y-2">
            <div>
              <label className="text-sm text-gray-500">Imię</label>
              <EditableField
                value={profile?.name}
                field="name"
                onSave={handleFieldUpdate}
                label="Imię"
              />
            </div>
            <div>
              <label className="text-sm text-gray-500">Bio</label>
              <EditableField
                value={profile?.bio}
                field="bio"
                onSave={handleFieldUpdate}
                label="Bio"
              />
            </div>
            {/* Dodaj więcej pól */}
          </div>
        </div>
      </div>

      {/* Sekcja preferencji tanecznych */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Preferencje taneczne</h3>
        <div className="grid grid-cols-2 gap-4">
          {/* Przykład dla jednego pola */}
          <div>
            <label className="text-sm text-gray-500">Poziom</label>
            <EditableField
              value={profile?.dancePreferences?.level}
              field="dancePreferences.level"
              onSave={handleFieldUpdate}
              label="Poziom"
            />
          </div>
          {/* Dodaj więcej pól */}
        </div>
      </div>

      {/* Pozostałe sekcje... */}
    </div>
  );
}
