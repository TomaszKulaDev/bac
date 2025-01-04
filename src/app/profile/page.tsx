// src/app/profile/page.tsx

"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { string, z } from "zod";
import { FaEdit, FaSave, FaTimes, FaCamera } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Gender, UserProfile } from "@/types/user";
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
  gender?: Gender;
  bio?: string;
  height?: number;
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
    gender: userProfile?.gender,
    dancePreferences: userProfile?.dancePreferences || {
      styles: [],
      level: "",
      availability: "",
      location: "",
    },
    age: userProfile?.age,
    bio: userProfile?.bio || "",
    height: userProfile?.height,
  });

  // Inicjalizacja danych formularza
  useEffect(() => {
    if (userProfile && !isEditing) {
      setFormData({
        name: userProfile.name,
        email: userProfile.email,
        gender: userProfile.gender,
        dancePreferences: userProfile.dancePreferences || {
          styles: [],
          level: "",
          availability: "",
          location: "",
        },
        age: userProfile.age,
        bio: userProfile.bio || "",
        height: userProfile.height,
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
        gender: userProfile.gender,
        dancePreferences: userProfile.dancePreferences || {
          styles: [],
          level: "",
          availability: "",
          location: "",
        },
        age: userProfile.age,
        bio: userProfile.bio || "",
        height: userProfile.height,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Wysyłane dane:", formData);
      await updateUserProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      {/* Modal edycji - na poziomie root */}
      {isEditing && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="min-h-screen px-4 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/50 transition-opacity" />
            <div className="relative bg-white rounded-lg max-w-2xl w-full p-6 z-50">
              {/* Istniejący formularz edycji */}
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

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Wzrost (cm)
                  </label>
                  <input
                    type="number"
                    value={formData.height || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        height: e.target.value
                          ? parseInt(e.target.value)
                          : undefined,
                      }))
                    }
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm 
                               focus:border-amber-500 focus:ring-amber-500/20"
                    placeholder="Np. 175"
                    min="140"
                    max="220"
                  />
                </div>

                {/* Płeć */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Płeć
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
                    {[
                      { id: "male", label: "Mężczyzna" },
                      { id: "female", label: "Kobieta" },
                    ].map((genderOption) => (
                      <div
                        key={genderOption.id}
                        className={`
                          relative flex items-center p-4 rounded-lg border-2 cursor-pointer
                          ${
                            formData.gender === genderOption.id
                              ? "border-amber-500 bg-amber-50"
                              : "border-gray-200 hover:border-amber-200 hover:bg-amber-50/50"
                          }
                          transition-all duration-200
                        `}
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            gender: genderOption.id as Gender,
                          }));
                        }}
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={genderOption.id}
                          checked={formData.gender === genderOption.id}
                          onChange={() => {}} // Obsługa przez onClick na div
                          className="w-4 h-4 accent-amber-500 border-gray-300 rounded-full"
                        />
                        <label className="ml-3 block text-sm font-medium text-gray-700">
                          {genderOption.label}
                        </label>
                        {formData.gender === genderOption.id && (
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

                {/* Preferencje taneczne */}
                <div className="space-y-8">
                  {/* Style tańca */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Style tańca
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        { id: "Bachata Sensual", label: "Bachata Sensual" },
                        {
                          id: "Bachata Dominicana",
                          label: "Bachata Dominicana",
                        },
                        { id: "Bachata Impro", label: "Bachata Impro" },
                        { id: "Salsa LA On2", label: "Salsa LA On2" },
                        { id: "Salsa LA On1", label: "Salsa LA On1" },
                        { id: "Salsa Cubana", label: "Salsa Cubana" },
                        { id: "Salsa Rueda", label: "Rueda de Casino" },
                        { id: "Kizomba", label: "Kizomba" },
                        { id: "Urban Kiz", label: "Urban Kiz" },
                        { id: "Zouk", label: "Zouk" },
                        { id: "West Coast Swing ", label: "West Coast Swing" },
                      ].map((style) => (
                        <div
                          key={style.id}
                          className={`
                            relative flex items-center p-4 rounded-lg border-2 cursor-pointer
                            ${
                              formData.dancePreferences.styles.includes(
                                style.id
                              )
                                ? "border-amber-500 bg-amber-50"
                                : "border-gray-200 hover:border-amber-200 hover:bg-amber-50/50"
                            }
                            transition-all duration-200
                          `}
                          onClick={() => {
                            const newStyles =
                              formData.dancePreferences.styles.includes(
                                style.id
                              )
                                ? formData.dancePreferences.styles.filter(
                                    (s) => s !== style.id
                                  )
                                : [
                                    ...formData.dancePreferences.styles,
                                    style.id,
                                  ];
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
                            checked={
                              formData.dancePreferences.level === level.id
                            }
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
                          {formData.dancePreferences.availability ===
                            time.id && (
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

                  {/* Lokalizacja */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Lokalizacja
                    </label>
                    <input
                      type="text"
                      value={formData.dancePreferences.location}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          dancePreferences: {
                            ...prev.dancePreferences,
                            location: e.target.value,
                          },
                        }))
                      }
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm 
                                 focus:border-amber-500 focus:ring-amber-500/20"
                      placeholder="Np. Warszawa, Mokotów"
                    />
                  </div>
                </div>

                {/* Dodaj to pole przed przyciskami akcji */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    O mnie
                  </label>
                  <textarea
                    value={formData.bio || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        bio: e.target.value,
                      }))
                    }
                    rows={4}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm 
                               focus:border-amber-500 focus:ring-amber-500/20 resize-none"
                    placeholder="Napisz coś o sobie..."
                    maxLength={500}
                  />
                  <p className="mt-1 text-sm text-gray-500 text-right">
                    {formData.bio?.length || 0}/500 znaków
                  </p>
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
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gray-50">
        {/* Instagram-style header */}
        <header className="bg-white border-b">
          <div
            className="container mx-auto px-4 py-6"
            style={{ maxWidth: "900px" }}
          >
            <div className="flex flex-col md:flex-row gap-6 items-center">
              {/* Avatar */}
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-200">
                <Image
                  src={userProfile?.image ?? "/images/default-avatar.png"}
                  alt="Profile"
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Profile info */}
              <div className="flex-1 text-center md:text-left">
                {/* Nazwa i przycisk */}
                <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                  <h1 className="text-xl font-semibold text-gray-900">
                    {userProfile?.name}
                  </h1>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-700 transition-colors"
                  >
                    Edytuj profil
                  </button>
                </div>

                {/* Bio i informacje */}
                <div className="space-y-3">
                  <div className="text-sm text-gray-600 leading-relaxed">
                    {userProfile?.bio ||
                      "Tancerka, instruktorka, choreografka, kursy online"}
                  </div>

                  {/* Style tańca */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-900">
                      Style tańca
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {userProfile?.dancePreferences?.styles?.map((style) => (
                        <span
                          key={style}
                          className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs font-medium text-gray-700 transition-colors"
                        >
                          {style}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Lokalizacja */}
                  <div className="text-sm">
                    <span className="text-gray-500">Miejscowość:</span>
                    <span className="ml-1 text-gray-900">
                      {userProfile?.dancePreferences?.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Modern Gallery Layout - z ograniczoną szerokością */}
        <div className="bg-white py-1 border-b">
          <div
            className="container mx-auto px-1"
            style={{ maxWidth: "1200px" }}
          >
            <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-0.5">
              {/* Duży placeholder */}
              <div className="relative aspect-[4/5] col-span-2 row-span-2 bg-gray-100 rounded-sm overflow-hidden group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-base">💃</span>
                </div>
              </div>

              {/* Małe placeholdery */}
              {[
                "🎵",
                "🌟",
                "🎭",
                "🏆",
                "✨",
                "💫",
                "🎪",
                "🎨",
                "🎼",
                "🎡",
                "🌈",
                "🎶",
                "🎬",
                "🎸",
                "🎯",
                "🎪",
                "🎨",
                "🎭",
                "🌟",
                "✨",
                "💫",
                "🎪",
                "🎵",
                "🌟",
                "🎭",
                "🏆",
                "✨",
                "💫",
                "🎪",
                "🎨",
                "🎼",
                "🎡",
              ].map((emoji, index) => (
                <div
                  key={index}
                  className="relative aspect-square bg-gray-100 rounded-sm overflow-hidden"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm">{emoji}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Główna zawartość */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Sekcja dostępności - bez zmian */}
          <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-semibold">
                  Dostępność w tym tygodniu
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Preferowane godziny na taniec
                </p>
              </div>
              <span className="px-3 py-1.5 bg-green-50 text-green-600 rounded-full text-sm font-medium">
                Dostępny/a
              </span>
            </div>
            <div className="grid grid-cols-7 gap-3">
              {[
                { day: "Pon", hours: "20-22" },
                { day: "Wt", hours: "19-21" },
                { day: "Śr", hours: "-" },
                { day: "Czw", hours: "20-22" },
                { day: "Pt", hours: "18-22" },
                { day: "Sob", hours: "16-22" },
                { day: "Nd", hours: "16-20" },
              ].map((item) => (
                <div key={item.day} className="text-center">
                  <div className="text-sm font-medium text-gray-900 mb-2">
                    {item.day}
                  </div>
                  <div
                    className={`
                    py-3 px-2 rounded-lg text-sm
                    ${
                      item.hours === "-"
                        ? "bg-gray-50 text-gray-400"
                        : "bg-green-50 text-green-700 border-2 border-green-100"
                    }
                  `}
                  >
                    {item.hours}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reszta zawartości w kolumnach */}
          <div className="grid grid-cols-12 gap-8">
            {/* Lewa kolumna */}
            <div className="col-span-4 space-y-6">
              {/* Informacje */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Informacje</h2>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm text-gray-500">Poziom</dt>
                    <dd className="mt-1">
                      {translateLevel(
                        userProfile?.dancePreferences?.level || ""
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Dostępność</dt>
                    <dd className="mt-1">
                      {userProfile?.dancePreferences?.availability}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Miejscowość</dt>
                    <dd className="mt-1">
                      {userProfile?.dancePreferences?.location}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Wiek</dt>
                    <dd className="mt-1">{userProfile?.age} lat</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Wzrost</dt>
                    <dd className="mt-1">{userProfile?.height} cm</dd>
                  </div>
                </dl>
              </div>

              {/* Ulubione wydarzenia */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b">
                  <h2 className="text-lg font-semibold">Ulubione wydarzenia</h2>
                </div>

                {/* Lista wydarzeń */}
                <div className="divide-y">
                  <div className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl">💃</span>
                      <h3 className="font-medium text-gray-900">
                        Warsaw Salsa Festival
                      </h3>
                    </div>
                    <div className="ml-9 space-y-2">
                      <p className="text-sm text-gray-500">
                        Coroczne wydarzenie • Wrzesień
                      </p>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded text-xs">
                          Salsa
                        </span>
                        <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs">
                          Festiwal
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl">🌙</span>
                      <h3 className="font-medium text-gray-900">
                        Bachata Social Night
                      </h3>
                    </div>
                    <div className="ml-9 space-y-2">
                      <p className="text-sm text-gray-500">
                        Co sobotę • 20:00 - 02:00
                      </p>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded text-xs">
                          Bachata
                        </span>
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                          Social
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl">🌊</span>
                      <h3 className="font-medium text-gray-900">
                        Summer Dance Camp
                      </h3>
                    </div>
                    <div className="ml-9 space-y-2">
                      <p className="text-sm text-gray-500">
                        Coroczne wydarzenie • Lipiec
                      </p>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded text-xs">
                          Mix stylów
                        </span>
                        <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs">
                          Warsztaty
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Prawa kolumna - oś czasu */}
            <div className="col-span-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-6">
                  Historia aktywności
                </h2>

                {/* Oś czasu */}
                <div className="relative space-y-8">
                  {/* Linia czasu */}
                  <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200" />

                  {/* Aktywności */}
                  <div className="relative flex gap-6">
                    <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 z-10">
                      <span className="text-2xl">🎓</span>
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs">
                            Instruktor
                          </span>
                          <h3 className="text-lg font-medium mt-1">
                            Technika Bachaty
                          </h3>
                        </div>
                        <time className="text-sm text-gray-500">
                          15 kwi 2024
                        </time>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        Warsztaty z techniki prowadzenia i footworku w bachacie.
                      </p>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded text-xs">
                          Bachata
                        </span>
                        <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs">
                          6 godzin
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="relative flex gap-6">
                    <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0 z-10">
                      <span className="text-2xl">🎉</span>
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                            Uczestnik
                          </span>
                          <h3 className="text-lg font-medium mt-1">
                            Salsa Night
                          </h3>
                        </div>
                        <time className="text-sm text-gray-500">
                          12 mar 2024
                        </time>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        Wieczór salsowy w klubie Latino.
                      </p>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded text-xs">
                          Salsa
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Można dodać więcej aktywności */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
