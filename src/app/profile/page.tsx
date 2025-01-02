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
};

export default function ProfilePage() {
  const { userProfile, isLoading, updateUserProfile } = useUserProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    dancePreferences: {
      styles: [],
      level: "",
      availability: "",
      location: "",
    },
    socialMedia: {
      instagram: undefined,
      facebook: undefined,
      youtube: undefined,
    },
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
        socialMedia: {
          instagram: userProfile.socialMedia?.instagram || "",
          facebook: userProfile.socialMedia?.facebook || "",
          youtube: userProfile.socialMedia?.youtube || "",
        },
      });
    }
  }, [userProfile, isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

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
        socialMedia: {
          instagram: userProfile.socialMedia?.instagram || "",
          facebook: userProfile.socialMedia?.facebook || "",
          youtube: userProfile.socialMedia?.youtube || "",
        },
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof FormDataType] as any),
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      dancePreferences: {
        ...prev.dancePreferences,
        [name.replace("dancePreferences.", "")]: value,
      },
    }));
  };

  const handleMultiSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setFormData((prev) => ({
      ...prev,
      dancePreferences: {
        ...prev.dancePreferences,
        styles: values,
      },
    }));
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
                  src={
                    (userProfile as UserProfile & { avatar?: string })
                      ?.avatar ?? "/images/default-avatar.png"
                  }
                  alt={userProfile?.name ?? "Profile"}
                  fill
                  className="object-cover"
                />
              </div>
              {!isEditing && (
                <button
                  className="absolute bottom-2 right-2 p-2 rounded-full bg-white shadow-md 
                             hover:bg-gray-50 transition-colors"
                  aria-label="Change profile photo"
                >
                  <FaCamera className="text-gray-600" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto">
          {/* Profile Navigation */}
          <div className="mb-8 border-b border-gray-200">
            <nav className="flex justify-center space-x-8">
              <button className="px-4 py-4 text-sm font-medium text-gray-900 border-b-2 border-amber-500">
                Profil
              </button>
              <button className="px-4 py-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                Aktywność
              </button>
              <button className="px-4 py-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                Ogłoszenia
              </button>
              <button className="px-4 py-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                Ustawienia
              </button>
            </nav>
          </div>

          {/* Profile Content */}
          <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-8">
            {/* Main Profile Info */}
            <div className="space-y-6">
              <div
                className="bg-white/95 backdrop-blur-sm rounded-xl p-8 
                            shadow-lg shadow-amber-500/10 border border-amber-500/10"
              >
                {isLoading ? (
                  <div className="flex justify-center items-center min-h-[200px]">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
                  </div>
                ) : isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Imię
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-lg border-gray-300 
                                 shadow-sm focus:border-amber-500 focus:ring-amber-500/20 
                                 transition-colors"
                      />
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">
                        Preferencje taneczne
                      </h3>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Style tańca
                        </label>
                        <select
                          multiple
                          name="dancePreferences.styles"
                          value={formData.dancePreferences.styles}
                          onChange={handleMultiSelect}
                          className="mt-1 block w-full rounded-lg border-gray-300"
                        >
                          <option value="salsa">Salsa</option>
                          <option value="bachata">Bachata</option>
                          <option value="kizomba">Kizomba</option>
                          {/* Dodaj więcej opcji */}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Poziom zaawansowania
                        </label>
                        <select
                          name="dancePreferences.level"
                          value={formData.dancePreferences.level}
                          onChange={handleSelectChange}
                          className="mt-1 block w-full rounded-lg border-gray-300"
                        >
                          <option value="">Wybierz poziom</option>
                          <option value="beginner">Początkujący</option>
                          <option value="intermediate">
                            Średniozaawansowany
                          </option>
                          <option value="advanced">Zaawansowany</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Dostępność
                        </label>
                        <input
                          type="text"
                          name="dancePreferences.availability"
                          value={formData.dancePreferences.availability}
                          onChange={handleInputChange}
                          placeholder="np. Wieczory w tygodniu, weekendy"
                          className="mt-1 block w-full rounded-lg border-gray-300"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Lokalizacja
                        </label>
                        <input
                          type="text"
                          name="dancePreferences.location"
                          value={formData.dancePreferences.location}
                          onChange={handleInputChange}
                          placeholder="np. Warszawa, Mokotów"
                          className="mt-1 block w-full rounded-lg border-gray-300"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">
                        Social Media
                      </h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Instagram
                        </label>
                        <input
                          type="text"
                          name="socialMedia.instagram"
                          value={formData.socialMedia.instagram || ""}
                          onChange={handleInputChange}
                          placeholder="@username"
                          className="mt-1 block w-full rounded-lg border-gray-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Facebook
                        </label>
                        <input
                          type="text"
                          name="socialMedia.facebook"
                          value={formData.socialMedia.facebook || ""}
                          onChange={handleInputChange}
                          placeholder="profil facebook"
                          className="mt-1 block w-full rounded-lg border-gray-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          YouTube
                        </label>
                        <input
                          type="text"
                          name="socialMedia.youtube"
                          value={formData.socialMedia.youtube || ""}
                          onChange={handleInputChange}
                          placeholder="kanał youtube"
                          className="mt-1 block w-full rounded-lg border-gray-300"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-4">
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="px-4 py-2 rounded-lg border border-gray-300 
                                 text-gray-700 hover:bg-gray-50 transition-all"
                      >
                        <FaTimes className="inline-block mr-2" />
                        Anuluj
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-gradient-to-r 
                                 from-amber-500 to-red-500 text-white 
                                 hover:from-amber-600 hover:to-red-600 
                                 transition-all"
                      >
                        <FaSave className="inline-block mr-2" />
                        Zapisz
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                          {userProfile?.name}
                        </h1>
                        <p className="text-gray-500">{userProfile?.email}</p>
                      </div>
                      <button
                        onClick={handleEdit}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r 
                                 from-amber-500 to-red-500 text-white 
                                 hover:from-amber-600 hover:to-red-600 
                                 transition-all"
                      >
                        <FaEdit className="inline-block mr-2" />
                        Edytuj profil
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div
                className="bg-white/95 backdrop-blur-sm rounded-xl p-6 
                            shadow-lg shadow-amber-500/10 border border-amber-500/10"
              >
                <h2 className="text-lg font-semibold mb-4">Statystyki</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ogłoszenia</span>
                    <span className="font-medium">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Wiadomości</span>
                    <span className="font-medium">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dołączono</span>
                    <span className="font-medium">2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
