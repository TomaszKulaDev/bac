// src/app/profile/page.tsx

"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { FaEdit, FaSave, FaTimes, FaCamera } from "react-icons/fa";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useRouter } from "next/navigation";
import { useUserProfile } from "@/hooks/useUserProfile";

const profileSchemaBase = z.object({
  name: z
    .string()
    .min(1, "Imię jest wymagane")
    .max(50, "Imię nie może być dłuższe niż 50 znaków"),
  email: z.string().email("Nieprawidłowy adres email"),
});

export default function ProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { userProfile, isLoading, error, updateUserProfile } = useUserProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  useEffect(() => {
    if (userProfile) {
      setEditedProfile({
        name: userProfile.name,
        email: userProfile.email,
      });
    }
  }, [userProfile]);

  useEffect(() => {
    if (session && !userProfile && !isLoading) {
      updateUserProfile(editedProfile);
    }
  }, [session, userProfile, isLoading, updateUserProfile, editedProfile]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (userProfile) {
      setEditedProfile({
        name: userProfile.name,
        email: userProfile.email,
      });
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const validatedData = profileSchemaBase.parse(editedProfile);
      await updateUserProfile(validatedData);
      setIsEditing(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation error:", error.errors);
      } else {
        console.error("Error updating profile:", error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <LoadingSpinner />
        <p className="mt-4 text-gray-600">Ładowanie danych użytkownika...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!userProfile) {
    return (
      <div className="text-red-500">Nie znaleziono profilu użytkownika</div>
    );
  }

  const avatarSrc = userProfile.image || "/default-avatar.png";

  return (
    <div className="min-h-screen bg-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Profil użytkownika
        </h1>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden transition-all duration-300 ease-in-out">
          <div className="p-8">
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <Image
                  src={avatarSrc}
                  alt="Avatar użytkownika"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
                <button className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition duration-300">
                  <FaCamera />
                </button>
              </div>
            </div>
            {isEditing ? (
              <form onSubmit={handleSave} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Imię
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={editedProfile.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900"
                  />
                  {profileSchemaBase.shape.name.safeParse(editedProfile.name)
                    .success === false && (
                    <p className="text-red-500 text-sm mt-1">
                      {
                        profileSchemaBase.shape.name.safeParse(
                          editedProfile.name
                        ).error?.errors[0].message
                      }
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={editedProfile.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900"
                  />
                  {profileSchemaBase.shape.email.safeParse(editedProfile.email)
                    .success === false && (
                    <p className="text-red-500 text-sm mt-1">
                      {
                        profileSchemaBase.shape.email.safeParse(
                          editedProfile.email
                        ).error?.errors[0].message
                      }
                    </p>
                  )}
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Anuluj
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Zapisz zmiany
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">Imię</h2>
                  <p className="mt-1 text-gray-600">{userProfile.name}</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Email</h2>
                  <p className="mt-1 text-gray-600">{userProfile.email}</p>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Edytuj profil
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
