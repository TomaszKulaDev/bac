// src/app/profile/page.tsx

"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { string, z } from "zod";
import {
  FaEdit,
  FaSave,
  FaTimes,
  FaCamera,
  FaShareAlt,
  FaSearch,
  FaFilter,
  FaStar,
  FaClock,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaRuler,
  FaGraduationCap,
  FaCalendarAlt,
  FaMusic,
  FaTicketAlt,
  FaChalkboardTeacher,
  FaImage,
  FaTrophy,
  FaUsers,
  FaVideo,
  FaCertificate,
  FaMedal,
  FaPhotoVideo,
  FaHeart,
} from "react-icons/fa";
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
            {/* Backdrop z blur effect */}
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity" />

            {/* Modal content */}
            <div className="relative bg-white rounded-xl max-w-2xl w-full shadow-2xl z-50">
              {/* Header modala */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">
                  Edytuj profil
                </h2>
                <button
                  onClick={handleCancel}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FaTimes className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Formularz */}
              <motion.form
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleSubmit}
                className="p-6 space-y-6 max-h-[calc(100vh-12rem)] overflow-y-auto"
              >
                {/* Sekcja zdjęcia profilowego */}
                <div className="flex items-center space-x-6 mb-8">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden">
                      <Image
                        src={userProfile?.image ?? "/images/default-avatar.png"}
                        alt="Profile"
                        width={96}
                        height={96}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <button
                      type="button"
                      className="absolute bottom-0 right-0 p-2 bg-gray-900 rounded-full text-white hover:bg-gray-800 transition-colors"
                    >
                      <FaCamera className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Zdjęcie profilowe
                    </h3>
                    <p className="text-sm text-gray-500">
                      Wybierz zdjęcie w formacie JPG lub PNG
                    </p>
                  </div>
                </div>

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

                {/* Footer modala */}
                <div className="flex items-center justify-end gap-3 p-4 border-t bg-gray-50 sticky bottom-0">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Anuluj
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors"
                  >
                    Zapisz zmiany
                  </button>
                </div>
              </motion.form>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gray-50">
        {/* Nowy, bardziej elegancki header */}
        <header className="bg-white border-b">
          <div
            className="container mx-auto px-4 py-8"
            style={{ maxWidth: "900px" }}
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Ulepszony Avatar */}
              <div className="relative group">
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-gray-200 transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={userProfile?.image ?? "/images/default-avatar.png"}
                    alt="Profile"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
                <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 border-2 border-gray-200">
                  <span className="block w-3 h-3 rounded-full bg-green-500"></span>
                </div>
              </div>

              {/* Ulepszone informacje profilowe */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-6">
                  <div className="flex flex-col items-center md:items-start gap-1">
                    <h1 className="text-2xl font-semibold text-gray-900">
                      {userProfile?.name}
                    </h1>
                    <p className="text-sm text-gray-500">
                      {/* {userProfile?.title || "Tancerz"} */}
                      Tytuł do zrobienia w backendzie
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm font-medium"
                    >
                      Edytuj profil
                    </button>
                    <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                      <FaShareAlt className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Ulepszone statystyki */}
                <div className="grid grid-cols-3 gap-4 mb-6 max-w-md">
                  <div className="text-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="text-xl font-semibold text-gray-900">
                      1,392
                    </div>
                    <div className="text-sm text-gray-600">postów</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="text-xl font-semibold text-gray-900">
                      6.8K
                    </div>
                    <div className="text-sm text-gray-600">obserwujących</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="text-xl font-semibold text-gray-900">
                      3.7K
                    </div>
                    <div className="text-sm text-gray-600">obserwuje</div>
                  </div>
                </div>

                {/* Bio i tagi */}
                <div className="space-y-4">
                  <div className="text-sm text-gray-600 leading-relaxed">
                    {userProfile?.bio ||
                      "Tancerka, instruktorka, choreografka, kursy online"}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {userProfile?.dancePreferences?.styles?.map((style) => (
                      <span
                        key={style}
                        className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium hover:bg-amber-100 transition-colors cursor-pointer"
                      >
                        {style}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Ulepszony navbar pod headerem */}
        <nav className="bg-white border-b sticky top-0 z-40">
          <div className="container mx-auto" style={{ maxWidth: "900px" }}>
            <div className="flex items-center justify-between px-4">
              <div className="flex -mb-px">
                <button className="px-6 py-4 border-b-2 border-amber-500 text-amber-500 font-medium">
                  Posty
                </button>
                <button className="px-6 py-4 text-gray-500 hover:text-gray-700">
                  Wydarzenia
                </button>
                <button className="px-6 py-4 text-gray-500 hover:text-gray-700">
                  Informacje
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <FaSearch className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <FaFilter className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Galeria na pełną szerokość */}
        <div className="w-full bg-white py-1 border-b">
          {/* Kontener o maksymalnej szerokości 1200px */}
          <div className="max-w-[1200px] mx-auto">
            {/* Grid galerii */}
            <div className="grid grid-cols-12 gap-1">
              {/* Mniejsze elementy - pierwsze 5 */}
              {[
                { icon: FaMusic, label: "Występ" },
                { icon: FaGraduationCap, label: "Warsztaty" },
                { icon: FaTicketAlt, label: "Event" },
                { icon: FaChalkboardTeacher, label: "Lekcja" },
                { icon: FaTrophy, label: "Konkurs" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="col-span-1 relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-sm overflow-hidden group cursor-pointer"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-gray-400 group-hover:text-amber-500 group-hover:scale-110 transition-all duration-200" />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                  <div className="absolute bottom-1 left-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] text-gray-500 font-medium block text-center truncate">
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}

              {/* Główne zdjęcie na środku */}
              <div className="col-span-2 row-span-2 relative aspect-[4/5] bg-gradient-to-br from-amber-500/10 to-amber-600/10 rounded-sm overflow-hidden group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaImage className="w-8 h-8 text-amber-500 group-hover:scale-110 transition-transform" />
                </div>
                <div className="absolute bottom-2 right-2">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                    <FaCamera className="w-3 h-3" />
                    Główne
                  </span>
                </div>
              </div>

              {/* Mniejsze elementy - ostatnie 5 */}
              {[
                { icon: FaUsers, label: "Grupa" },
                { icon: FaVideo, label: "Film" },
                { icon: FaCalendarAlt, label: "Wydarzenie" },
                { icon: FaStar, label: "Wyróżnione" },
                { icon: FaCertificate, label: "Certyfikat" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="col-span-1 relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-sm overflow-hidden group cursor-pointer"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-gray-400 group-hover:text-amber-500 group-hover:scale-110 transition-all duration-200" />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                  <div className="absolute bottom-1 left-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] text-gray-500 font-medium block text-center truncate">
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}

              {/* Pozostałe elementy */}
              {[
                { icon: FaMedal, label: "Osiągnięcie" },
                { icon: FaPhotoVideo, label: "Media" },
                { icon: FaImage, label: "Galeria" },
                { icon: FaHeart, label: "Ulubione" },
                { icon: FaCamera, label: "Zdjęcia" },
                { icon: FaShareAlt, label: "Udostępnione" },
                { icon: FaClock, label: "Ostatnie" },
                { icon: FaFilter, label: "Filtry" },
                { icon: FaSearch, label: "Szukaj" },
                { icon: FaEdit, label: "Edytuj" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="col-span-1 relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-sm overflow-hidden group cursor-pointer"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-gray-400 group-hover:text-amber-500 group-hover:scale-110 transition-all duration-200" />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                  <div className="absolute bottom-1 left-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] text-gray-500 font-medium block text-center truncate">
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ulepszona sekcja dostępności */}
        <div
          className="container mx-auto px-4 py-8"
          style={{ maxWidth: "900px" }}
        >
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Dostępność w tym tygodniu
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Preferowane godziny na taniec
                  </p>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  Dostępny/a
                </span>
              </div>

              <div className="grid grid-cols-7 gap-3">
                {[
                  { day: "Pon", hours: "20-22", available: true },
                  { day: "Wt", hours: "19-21", available: true },
                  { day: "Śr", hours: "-", available: false },
                  { day: "Czw", hours: "20-22", available: true },
                  { day: "Pt", hours: "18-22", available: true },
                  { day: "Sob", hours: "16-22", available: true },
                  { day: "Nd", hours: "16-20", available: true },
                ].map((item) => (
                  <div key={item.day} className="text-center">
                    <div className="text-sm font-medium text-gray-900 mb-2">
                      {item.day}
                    </div>
                    <div
                      className={`
                      py-3 px-2 rounded-lg text-sm font-medium
                      ${
                        item.available
                          ? "bg-green-50 text-green-700 border border-green-100"
                          : "bg-gray-50 text-gray-400"
                      }
                    `}
                    >
                      {item.hours}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Grid z informacjami i aktywnością */}
          <div className="grid grid-cols-12 gap-8 mt-8">
            {/* Lewa kolumna - Ulubione wydarzenia */}
            <div className="col-span-12 md:col-span-4 space-y-6">
              {/* Informacje */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Informacje
                  </h2>
                  <dl className="space-y-4">
                    <div className="flex items-center gap-3">
                      <dt className="text-gray-500">
                        <FaStar className="w-4 h-4" />
                      </dt>
                      <dd className="text-sm text-gray-900">
                        {translateLevel(
                          userProfile?.dancePreferences?.level || ""
                        )}
                      </dd>
                    </div>
                    <div className="flex items-center gap-3">
                      <dt className="text-gray-500">
                        <FaClock className="w-4 h-4" />
                      </dt>
                      <dd className="text-sm text-gray-900">
                        {userProfile?.dancePreferences?.availability}
                      </dd>
                    </div>
                    <div className="flex items-center gap-3">
                      <dt className="text-gray-500">
                        <FaMapMarkerAlt className="w-4 h-4" />
                      </dt>
                      <dd className="text-sm text-gray-900">
                        {userProfile?.dancePreferences?.location}
                      </dd>
                    </div>
                    <div className="flex items-center gap-3">
                      <dt className="text-gray-500">
                        <FaBirthdayCake className="w-4 h-4" />
                      </dt>
                      <dd className="text-sm text-gray-900">
                        {userProfile?.age} lat
                      </dd>
                    </div>
                    <div className="flex items-center gap-3">
                      <dt className="text-gray-500">
                        <FaRuler className="w-4 h-4" />
                      </dt>
                      <dd className="text-sm text-gray-900">
                        {userProfile?.height} cm
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Ulepszone Ulubione wydarzenia */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Ulubione wydarzenia
                    </h2>
                    <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                      3 nadchodzące
                    </span>
                  </div>
                </div>
                <div className="divide-y">
                  {/* Pojedyncze wydarzenie */}
                  <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                    <div className="flex items-start gap-4">
                      {/* Data wydarzenia */}
                      <div className="flex-shrink-0 w-14 text-center">
                        <div className="text-2xl font-bold text-amber-500">
                          15
                        </div>
                        <div className="text-xs font-medium text-gray-500 uppercase">
                          KWI
                        </div>
                      </div>

                      {/* Szczegóły wydarzenia z ikonami */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <FaCalendarAlt className="w-4 h-4 text-amber-500" />
                          <h3 className="font-medium text-gray-900 truncate group-hover:text-amber-600 transition-colors">
                            Warsaw Salsa Festival
                          </h3>
                          <span className="flex-shrink-0 w-2 h-2 rounded-full bg-green-500"></span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                          <FaMapMarkerAlt className="w-3.5 h-3.5" />
                          <span>Warszawa, Centrum</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium">
                            <FaMusic className="w-3 h-3 mr-1" />
                            Salsa
                          </span>
                          <span className="inline-flex items-center px-2 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">
                            <FaTicketAlt className="w-3 h-3 mr-1" />
                            Festiwal
                          </span>
                          <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                            <FaChalkboardTeacher className="w-3 h-3 mr-1" />
                            Warsztaty
                          </span>
                        </div>
                      </div>

                      {/* Akcje */}
                      <button className="p-2 text-gray-400 hover:text-amber-500 transition-colors">
                        <FaStar className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Kolejne wydarzenia w podobnym stylu */}
                  {/* ... */}
                </div>
                <div className="p-4 bg-gray-50 border-t">
                  <button className="w-full py-2 text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors">
                    Zobacz wszystkie wydarzenia
                  </button>
                </div>
              </div>
            </div>

            {/* Prawa kolumna - Ulepszona Historia aktywności */}
            <div className="col-span-12 md:col-span-8">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Historia aktywności
                    </h2>
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                        <FaFilter className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                        <FaSearch className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="relative space-y-8">
                    {/* Linia timeline */}
                    <div className="absolute left-8 top-0 bottom-0 w-px bg-amber-500 to-amber-100" />

                    {/* Pojedyncza aktywność */}
                    <div className="relative flex gap-6 group">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0 z-10 group-hover:scale-105 transition-transform">
                          <FaGraduationCap className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                          <FaStar className="w-3 h-3 text-white" />
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                                Instruktor
                              </span>
                              <span className="text-sm text-gray-500">•</span>
                              <time className="text-sm text-gray-500">
                                15 kwi 2024
                              </time>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 group-hover:text-amber-600 transition-colors">
                              Technika Bachaty
                            </h3>
                          </div>
                          <button className="p-2 text-gray-400 hover:text-amber-500 transition-colors rounded-lg hover:bg-gray-100">
                            <FaShareAlt className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                          Warsztaty z techniki prowadzenia i footworku w
                          bachacie. Zajęcia obejmowały zaawansowane techniki
                          prowadzenia oraz złożone kombinacje kroków.
                        </p>

                        <div className="flex items-center gap-4">
                          <div className="flex gap-2">
                            <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium">
                              Bachata
                            </span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                              6 godzin
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-400">
                            <FaStar className="w-4 h-4 text-amber-400" />
                            <FaStar className="w-4 h-4 text-amber-400" />
                            <FaStar className="w-4 h-4 text-amber-400" />
                            <FaStar className="w-4 h-4 text-amber-400" />
                            <FaStar className="w-4 h-4 text-amber-400" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Kolejne aktywności w podobnym stylu */}
                    {/* ... */}
                  </div>
                </div>

                <div className="p-4 bg-gray-50 border-t">
                  <button className="w-full py-2 text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors">
                    Załaduj więcej
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
