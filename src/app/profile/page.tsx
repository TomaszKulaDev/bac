// src/app/profile/page.tsx

"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { FaEdit, FaSave, FaTimes, FaCamera } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useUserProfile } from "@/hooks/useUserProfile";
import { UserProfile } from "@/types/user";
import { motion } from "framer-motion";

interface ProfileFormData {
  name: string;
  email: string;
  dancePreferences: {
    styles: string[];
    level: string;
    availability: string;
    location: string;
  };
  age?: number;
}

const translateLevel = (level: string) => {
  const levels = {
    beginner: "Początkujący",
    intermediate: "Średniozaawansowany",
    advanced: "Zaawansowany",
  };
  return levels[level as keyof typeof levels] || level;
};

const profileSchemaBase = z.object({
  name: z
    .string()
    .min(1, "Imię jest wymagane")
    .max(50, "Imię nie może być dłuższe niż 50 znaków"),
  email: z.string().email("Nieprawidłowy adres email"),
  dancePreferences: z
    .object({
      styles: z
        .array(z.string())
        .min(1, "Wybierz przynajmniej jeden styl tańca"),
      level: z.string().min(1, "Wybierz poziom zaawansowania"),
      availability: z.string().min(1, "Określ swoją dostępność"),
      location: z.string().min(1, "Podaj lokalizację"),
    })
    .optional(),
  socialMedia: z
    .object({
      instagram: z.string().optional(),
      facebook: z.string().optional(),
      youtube: z.string().optional(),
    })
    .optional(),
});

type FormDataType = {
  name: string;
  email: string;
  dancePreferences: {
    styles: string[];
    level: string;
    availability: string;
    location: string;
  };
  socialMedia: {
    instagram: string | undefined;
    facebook: string | undefined;
    youtube: string | undefined;
  };
  age?: number;
};

export default function ProfilePage() {
  const { userProfile, isLoading, updateUserProfile } = useUserProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    name: userProfile?.name || "",
    email: userProfile?.email || "",
    dancePreferences: userProfile?.dancePreferences || {
      styles: [],
      level: "",
      availability: "",
      location: "",
    },
    age: userProfile?.age,
  });

  // Inicjalizacja danych formularza
  useEffect(() => {
    if (userProfile && !isEditing) {
      setFormData({
        name: userProfile.name,
        email: userProfile.email,
        dancePreferences: userProfile.dancePreferences || {
          styles: [],
          level: "",
          availability: "",
          location: "",
        },
      });
    }
  }, [userProfile, isEditing]);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    if (userProfile) {
      setFormData({
        name: userProfile.name,
        email: userProfile.email,
        dancePreferences: userProfile.dancePreferences || {
          styles: [],
          level: "",
          availability: "",
          location: "",
        },
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUserProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50">
      <div className="container mx-auto px-4">
        {/* Hero Section z Cover Photo */}
        <div className="relative h-[200px] md:h-[300px] -mx-4 mb-[60px] md:mb-[100px]">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-red-500 opacity-20"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
            <div className="relative">
              <div className="w-[120px] h-[120px] md:w-[180px] md:h-[180px] rounded-full border-4 border-white bg-white shadow-lg overflow-hidden">
                <Image
                  src={userProfile?.image ?? "/images/default-avatar.png"}
                  alt={userProfile?.name ?? "Profile"}
                  fill
                  className="object-cover"
                />
              </div>
              {!isEditing && (
                <button className="absolute bottom-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors">
                  <FaCamera className="text-gray-600" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
            </div>
          ) : isEditing ? (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="bg-white rounded-lg shadow-lg p-6 space-y-8"
            >
              {/* Podstawowe informacje */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Podstawowe informacje
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Imię
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500/20"
                    />
                  </div>
                </div>
              </div>

              {/* Preferencje taneczne */}
              <div className="space-y-8">
                {/* Style tańca */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Style tańca
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { id: "bachata", label: "Bachata" },
                      { id: "salsa", label: "Salsa" },
                      { id: "kizomba", label: "Kizomba" },
                      { id: "zouk", label: "Zouk" },
                      { id: "merengue", label: "Merengue" },
                    ].map((style) => (
                      <div
                        key={style.id}
                        className={`
                          relative flex items-center p-4 rounded-lg border-2 cursor-pointer
                          ${
                            formData.dancePreferences.styles.includes(style.id)
                              ? "border-amber-500 bg-amber-50"
                              : "border-gray-200 hover:border-amber-200 hover:bg-amber-50/50"
                          }
                          transition-all duration-200
                        `}
                        onClick={() => {
                          const newStyles =
                            formData.dancePreferences.styles.includes(style.id)
                              ? formData.dancePreferences.styles.filter(
                                  (s) => s !== style.id
                                )
                              : [...formData.dancePreferences.styles, style.id];
                          setFormData((prev) => ({
                            ...prev,
                            dancePreferences: {
                              ...prev.dancePreferences,
                              styles: newStyles,
                            },
                          }));
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={formData.dancePreferences.styles.includes(
                            style.id
                          )}
                          onChange={() => {}}
                          className="w-4 h-4 accent-amber-500 border-gray-300 rounded"
                        />
                        <label className="ml-3 block text-sm font-medium text-gray-700">
                          {style.label}
                        </label>
                        {formData.dancePreferences.styles.includes(
                          style.id
                        ) && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center"
                          >
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M5 13l4 4L19 7" />
                            </svg>
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Poziom zaawansowania */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Poziom zaawansowania
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { id: "beginner", label: "Początkujący" },
                      { id: "intermediate", label: "Średniozaawansowany" },
                      { id: "advanced", label: "Zaawansowany" },
                    ].map((level) => (
                      <div
                        key={level.id}
                        className={`
                          relative flex items-center p-4 rounded-lg border-2 cursor-pointer
                          ${
                            formData.dancePreferences.level === level.id
                              ? "border-amber-500 bg-amber-50"
                              : "border-gray-200 hover:border-amber-200 hover:bg-amber-50/50"
                          }
                          transition-all duration-200
                        `}
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            dancePreferences: {
                              ...prev.dancePreferences,
                              level: level.id,
                            },
                          }));
                        }}
                      >
                        <input
                          type="radio"
                          checked={formData.dancePreferences.level === level.id}
                          onChange={() => {}}
                          className="w-4 h-4 accent-amber-500 border-gray-300 rounded-full"
                        />
                        <label className="ml-3 block text-sm font-medium text-gray-700">
                          {level.label}
                        </label>
                        {formData.dancePreferences.level === level.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center"
                          >
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M5 13l4 4L19 7" />
                            </svg>
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dostępność */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Dostępność
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { id: "rano", label: "Rano" },
                      { id: "popoludnie", label: "Popołudnie" },
                      { id: "wieczor", label: "Wieczór" },
                      { id: "weekend", label: "Weekendy" },
                    ].map((time) => (
                      <div
                        key={time.id}
                        className={`
                          relative flex items-center p-4 rounded-lg border-2 cursor-pointer
                          ${
                            formData.dancePreferences.availability === time.id
                              ? "border-amber-500 bg-amber-50"
                              : "border-gray-200 hover:border-amber-200 hover:bg-amber-50/50"
                          }
                          transition-all duration-200
                        `}
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            dancePreferences: {
                              ...prev.dancePreferences,
                              availability: time.id,
                            },
                          }));
                        }}
                      >
                        <input
                          type="radio"
                          checked={
                            formData.dancePreferences.availability === time.id
                          }
                          onChange={() => {}}
                          className="w-4 h-4 accent-amber-500 border-gray-300 rounded-full"
                        />
                        <label className="ml-3 block text-sm font-medium text-gray-700">
                          {time.label}
                        </label>
                        {formData.dancePreferences.availability === time.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center"
                          >
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M5 13l4 4L19 7" />
                            </svg>
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dodajemy nowe pole wieku */}
              <div className="mb-4">
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Wiek
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  min="16"
                  max="120"
                  value={formData.age || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      age: e.target.value
                        ? parseInt(e.target.value)
                        : undefined,
                    }))
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                             focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                  placeholder="Wprowadź swój wiek"
                />
              </div>

              {/* Przyciski akcji */}
              <div className="flex justify-end gap-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <FaTimes className="w-4 h-4" />
                  Anuluj
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-red-500 text-white hover:from-amber-600 hover:to-red-600 transition-all flex items-center gap-2"
                >
                  <FaSave className="w-4 h-4" />
                  Zapisz zmiany
                </button>
              </div>
            </motion.form>
          ) : (
            // Wyświetlanie profilu (tryb podglądu)
            <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {userProfile?.name}
                  </h1>
                  <p className="text-gray-500">{userProfile?.email}</p>
                </div>
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-red-500 text-white hover:from-amber-600 hover:to-red-600 transition-all flex items-center gap-2"
                >
                  <FaEdit className="w-4 h-4" />
                  Edytuj profil
                </button>
              </div>

              {/* Wyświetlanie preferencji tanecznych */}
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Preferencje taneczne
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">
                      Style tańca
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {userProfile?.dancePreferences?.styles.map((style) => (
                        <span
                          key={style}
                          className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm"
                        >
                          {style}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">
                      Poziom zaawansowania
                    </h3>
                    <p className="mt-1 text-gray-900">
                      {translateLevel(
                        userProfile?.dancePreferences?.level || ""
                      )}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">
                      Dostępność
                    </h3>
                    <p className="mt-1 text-gray-900">
                      {userProfile?.dancePreferences?.availability}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">
                      Lokalizacja
                    </h3>
                    <p className="mt-1 text-gray-900">
                      {userProfile?.dancePreferences?.location}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700">Wiek</h3>
                <p className="mt-1 text-gray-900">
                  {userProfile?.age ? `${userProfile.age} lat` : "Nie podano"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
