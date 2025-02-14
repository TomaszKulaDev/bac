"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { toast } from "react-toastify";
import { useUserProfile } from "@/hooks/useUserProfile";
import {
  DancePreferences,
  Gender,
  SocialMedia,
  UserProfile,
  UserProfilePaths,
} from "@/types/user";
import { CITIES } from "@/constants/cities";
import { DANCE_STYLES } from "@/constants/danceStyles";
import { DANCE_LEVELS } from "@/constants/levels";

interface EditableFieldProps {
  value: string | number | undefined;
  field: Exclude<UserProfilePaths, "dancePreferences.styles">;
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

const DanceStyleCheckbox = ({
  style,
  isSelected,
  onToggle,
}: {
  style: { value: string; label: string };
  isSelected: boolean;
  onToggle: (value: string) => void;
}) => (
  <div
    className={`p-4 border rounded-lg cursor-pointer transition-all ${
      isSelected
        ? "border-amber-500 bg-amber-50"
        : "border-gray-200 hover:border-gray-300"
    }`}
    onClick={() => onToggle(style.value)}
  >
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onToggle(style.value)}
        className="hidden"
      />
      <div
        className={`w-4 h-4 border rounded flex items-center justify-center ${
          isSelected ? "bg-amber-500 border-amber-500" : "border-gray-300"
        }`}
      >
        {isSelected && <FaCheck className="w-3 h-3 text-white" />}
      </div>
      <span className="text-sm">{style.label}</span>
    </label>
  </div>
);

const GenderOption = ({
  value,
  label,
  isSelected,
  onSelect,
}: {
  value: Gender;
  label: string;
  isSelected: boolean;
  onSelect: (value: Gender) => void;
}) => (
  <div
    className={`p-4 border rounded-lg cursor-pointer transition-all ${
      isSelected
        ? "border-amber-500 bg-amber-50"
        : "border-gray-200 hover:border-gray-300"
    }`}
    onClick={() => onSelect(value)}
  >
    <label className="flex items-center gap-2 cursor-pointer">
      <div
        className={`w-4 h-4 border rounded-full flex items-center justify-center ${
          isSelected ? "bg-amber-500 border-amber-500" : "border-gray-300"
        }`}
      >
        {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
      </div>
      <span className="text-sm">{label}</span>
    </label>
  </div>
);

const LevelOption = ({
  level,
  isSelected,
  onSelect,
}: {
  level: { value: string; label: string };
  isSelected: boolean;
  onSelect: (value: string) => void;
}) => (
  <div
    className={`p-4 border rounded-lg cursor-pointer transition-all ${
      isSelected
        ? "border-amber-500 bg-amber-50"
        : "border-gray-200 hover:border-gray-300"
    }`}
    onClick={() => onSelect(level.value)}
  >
    <label className="flex items-center gap-2 cursor-pointer">
      <div
        className={`w-4 h-4 border rounded flex items-center justify-center ${
          isSelected ? "bg-amber-500 border-amber-500" : "border-gray-300"
        }`}
      >
        {isSelected && <FaCheck className="w-3 h-3 text-white" />}
      </div>
      <span className="text-sm">{level.label}</span>
    </label>
  </div>
);

export default function ProfilePage() {
  const { data: session } = useSession();
  const {
    userProfile: profile,
    isLoading,
    updateUserProfile,
  } = useUserProfile();

  const handleFieldUpdate = async (
    field: UserProfilePaths,
    value: string | number | string[] | boolean
  ) => {
    if (!profile) return;

    try {
      const updatedData = { ...profile } as UserProfile;

      if (field.includes(".")) {
        const [parent, child] = field.split(".") as [keyof UserProfile, string];

        if (parent === "dancePreferences") {
          const currentPreferences = updatedData.dancePreferences || {
            styles: [],
            level: "",
            availability: "",
            location: "",
          };

          updatedData.dancePreferences = {
            ...currentPreferences,
            [child]: value,
          } as DancePreferences;
        } else if (parent === "socialMedia") {
          const currentSocial = updatedData.socialMedia || {};
          updatedData.socialMedia = {
            ...currentSocial,
            [child]: value as string,
          };
        }
      } else {
        (updatedData[field as keyof UserProfile] as any) = value;
      }

      await updateUserProfile(updatedData);
    } catch (error) {
      throw error;
    }
  };

  const handleStyleToggle = (styleValue: string) => {
    const currentStyles = profile?.dancePreferences?.styles || [];
    const updatedStyles = currentStyles.includes(styleValue)
      ? currentStyles.filter((s) => s !== styleValue)
      : [...currentStyles, styleValue];

    handleFieldUpdate("dancePreferences.styles", updatedStyles);
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
      <div className="flex justify-end mb-4">
        <div className="inline-flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
          <div className="text-right">
            <h4 className="font-medium text-sm">Profil publiczny</h4>
            <p className="text-xs text-gray-500">
              Pozwól innym zobaczyć Twój profil
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={profile?.isPublicProfile ?? false}
              onChange={(e) => {
                handleFieldUpdate("isPublicProfile", e.target.checked);
              }}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
          </label>
        </div>
      </div>

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
              <label className="text-sm text-gray-500 mb-2 block">Płeć</label>
              <div className="grid grid-cols-2 gap-3">
                <GenderOption
                  value="male"
                  label="Mężczyzna"
                  isSelected={profile.gender === "male"}
                  onSelect={(value) => handleFieldUpdate("gender", value)}
                />
                <GenderOption
                  value="female"
                  label="Kobieta"
                  isSelected={profile.gender === "female"}
                  onSelect={(value) => handleFieldUpdate("gender", value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sekcja preferencji tanecznych */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Preferencje taneczne</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500 mb-2 block">
              Style tańca
            </label>
            <div className="grid grid-cols-3 gap-3">
              {DANCE_STYLES.filter((style) => style.value !== "").map(
                (style) => (
                  <DanceStyleCheckbox
                    key={style.value}
                    style={style}
                    isSelected={(
                      profile.dancePreferences?.styles || []
                    ).includes(style.value)}
                    onToggle={handleStyleToggle}
                  />
                )
              )}
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-500 mb-2 block">Poziom</label>
            <div className="grid grid-cols-3 gap-3">
              {DANCE_LEVELS.filter((level) => level.value !== "").map(
                (level) => (
                  <LevelOption
                    key={level.value}
                    level={level}
                    isSelected={profile.dancePreferences?.level === level.value}
                    onSelect={(value) =>
                      handleFieldUpdate("dancePreferences.level", value)
                    }
                  />
                )
              )}
            </div>
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
