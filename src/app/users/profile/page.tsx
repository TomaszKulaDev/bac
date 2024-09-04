"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../contexts/AuthContext";
import { z } from "zod";

const profileSchemaBase = z.object({
  name: z
    .string()
    .min(1, "Imię jest wymagane")
    .max(50, "Imię nie może być dłuższe niż 50 znaków"),
  email: z.string().email("Nieprawidłowy adres email"),
});

export default function UserProfile() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    profilePicture: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/users/login");
      return;
    }

    async function fetchUserData() {
      const token = localStorage.getItem("token");
      setIsLoading(true);

      try {
        const response = await fetch("/api/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData({
          name: data.name || "",
          email: data.email || "",
          profilePicture: data.profilePicture || "",
        });
      } catch (error) {
        console.error("Error during fetching user data:", error);
        setErrors({ form: "Failed to fetch user data." });
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserData();
  }, [isLoggedIn, router]);

  const validateField = (
    field: keyof typeof profileSchemaBase.shape,
    value: string
  ) => {
    try {
      profileSchemaBase.shape[field].parse(value);
      setErrors((prev) => ({ ...prev, [field]: "" }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [field]: error.errors[0].message }));
      }
    }
  };

  const validateForm = useCallback(() => {
    try {
      profileSchemaBase.parse(userData);
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
  }, [userData]);

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [userData, validateForm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
    validateField(name as keyof typeof profileSchemaBase.shape, value);
  };

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setUserData((prev) => ({
        ...prev,
        profilePicture: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/users/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setErrors({ form: "Profile updated successfully." });
      } else {
        const errorData = await response.json();
        setErrors({ form: errorData.message || "Failed to update profile." });
      }
    } catch (error) {
      console.error("Error during profile update:", error);
      setErrors({ form: "An unexpected error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Edit Profile</h1>
        {errors.form && (
          <p
            className={`mb-4 text-center text-sm font-medium p-2 rounded ${
              errors.form.includes("successfully")
                ? "text-green-800 bg-green-100"
                : "text-red-800 bg-red-100"
            }`}
          >
            {errors.form}
          </p>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-2">{errors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            autoComplete="email"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-2">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Profile Picture</label>
          <input
            type="file"
            name="profilePicture"
            onChange={handleProfilePictureChange}
            className="w-full px-3 py-2 border rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {userData.profilePicture && (
            <Image
              src={userData.profilePicture}
              alt="Profile Preview"
              className="mt-4 h-24 w-24 rounded-full"
              width={96}
              height={96}
            />
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Updating...
            </>
          ) : (
            "Update Profile"
          )}
        </button>
      </form>
    </div>
  );
}
