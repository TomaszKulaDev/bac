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

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("/api/users/me");
      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(errorData.message || "Failed to fetch user profile");
      }
      const data = await response.json();
      console.log("Fetched user profile:", data);
      setUserProfile(data);
    } catch (err: unknown) {
      console.error("Fetch error:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
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
        body: JSON.stringify({
          ...updatedData,
          height: updatedData.height,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update user profile");
      }

      const data = await response.json();
      setUserProfile(data);

      // Aktualizuj sesję
      if (session) {
        await update({
          ...session,
          user: {
            ...session.user,
            name: data.name,
          },
        });
      }

      // Aktualizuj Redux store
      dispatch(
        login({
          user: {
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.role,
            image: data.image,
            dancePreferences: data.dancePreferences,
            age: data.age,
            height: data.height,
          },
        })
      );

      return data;
    } catch (err) {
      throw err;
    }
  };

  return {
    userProfile,
    isLoading,
    error,
    updateUserProfile,
  };
}
