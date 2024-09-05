"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { FaEdit, FaSave, FaTimes, FaCamera } from "react-icons/fa";
import LoadingSpinner from "@/components/LoadingSpinner";

interface UserData {
  name: string;
  email: string;
  image?: string;
}

const profileSchemaBase = z.object({
  name: z
    .string()
    .min(1, "Imię jest wymagane")
    .max(50, "Imię nie może być dłuższe niż 50 znaków"),
  email: z.string().email("Nieprawidłowy adres email"),
});

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (status === "authenticated") {
      console.log("Session:", session);
      fetchUserData();
    }
  }, [status, session]);

  useEffect(() => {
    if (userData) {
      setFormData({ name: userData.name, email: userData.email });
    }
  }, [userData]);

  const fetchUserData = async () => {
    try {
      console.log("Fetching user data...");
      const response = await fetch("/api/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      });
      console.log("Response status:", response.status);
      if (response.ok) {
        const data: UserData = await response.json();
        console.log("User data received:", data);
        setUserData(data);
      } else {
        const errorText = await response.text();
        console.error("Failed to fetch user data. Status:", response.status, "Error:", errorText);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = useCallback(() => {
    try {
      profileSchemaBase.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    try {
      const response = await fetch("/api/users/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        const updatedData = await response.json();
        setUserData(updatedData);
        setIsEditing(false);
      } else {
        const errorData = await response.json();
        setErrors({ form: errorData.message });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrors({ form: "Wystąpił błąd podczas aktualizacji profilu" });
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        Ładowanie...
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex justify-center items-center h-screen">
        Nie jesteś zalogowany
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Profil użytkownika
        </h1>
        {userData ? (
          <div className="bg-white shadow-xl rounded-lg overflow-hidden transition-all duration-300 ease-in-out">
            <div className="p-8">
              <div className="flex items-center justify-center mb-8">
                <div className="relative">
                  <Image
                    src={userData.image || "/default-avatar.png"}
                    alt="Avatar"
                    width={120}
                    height={120}
                    className="rounded-full border-4 border-indigo-500"
                  />
                  <button
                    className="absolute bottom-0 right-0 bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600 transition-colors duration-200"
                    onClick={() => {
                      /* Dodaj funkcję zmiany avatara */
                    }}
                  >
                    <FaCamera size={16} />
                  </button>
                </div>
              </div>
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
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
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
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
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
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
                  {errors.form && (
                    <p className="text-red-500 text-sm mt-2">{errors.form}</p>
                  )}
                </form>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Imię
                    </h2>
                    <p className="mt-1 text-gray-600">{userData.name}</p>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Email
                    </h2>
                    <p className="mt-1 text-gray-600">{userData.email}</p>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Edytuj profil
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <LoadingSpinner />
            <p className="mt-4 text-gray-600">
              Ładowanie danych użytkownika...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
