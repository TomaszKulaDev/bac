"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../contexts/AuthContext";

export default function UserProfile() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    profilePicture: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
        setErrors(["Failed to fetch user data."]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserData();
  }, [isLoggedIn, router]);

  const validateForm = useCallback(() => {
    const newErrors: string[] = [];
    if (!userData.name?.trim()) {
      newErrors.push("Name is required.");
    }
    if (!userData.email?.trim()) {
      newErrors.push("Email is required.");
    }
    setErrors(newErrors);
    return newErrors.length === 0;
  }, [userData.name, userData.email]);

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [userData, validateForm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setUserData({ ...userData, profilePicture: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("/api/users/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert("Profile updated successfully");
        router.push("/users/profile");
      } else {
        const errorData = await response.json();
        setErrors([errorData.message]);
      }
    } catch (error) {
      setErrors(["Failed to update profile."]);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Edit Profile</h1>
        {errors.length > 0 && (
          <div className="mb-4 text-red-600">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded text-gray-900 focus:outline-none"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded text-gray-900 focus:outline-none"
            placeholder="Enter your email"
            autoComplete="email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Profile Picture</label>
          <input
            type="file"
            name="profilePicture"
            onChange={handleProfilePictureChange}
            className="w-full px-3 py-2 border rounded text-gray-900 focus:outline-none"
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
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors duration-200"
          disabled={!isFormValid}
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
