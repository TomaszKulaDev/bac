// src/hooks/useUserProfile.ts

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";
import { UserProfile } from "@/types/user";

export function useUserProfile() {
  const { data: session, update } = useSession();
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("/api/users/me");
      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }
      const data = await response.json();
      setUserProfile(data);
      setIsLoading(false);
    } catch (err) {
      setError("Error fetching user profile");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetchUserProfile();
    }
  }, [session]);

  const updateUserProfile = async (updatedData: Partial<UserProfile>) => {
    try {
      const response = await fetch("/api/users/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update user profile");
      }

      const data = await response.json();
      setUserProfile(data);
      return data;
    } catch (err) {
      throw err;
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return {
    userProfile,
    isLoading,
    error,
    updateUserProfile,
    isModalOpen,
    openModal,
    closeModal,
  };
}
