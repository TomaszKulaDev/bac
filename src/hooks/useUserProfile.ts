// src/hooks/useUserProfile.ts

import { useState, useEffect, useRef } from "react";
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
  const updateInProgress = useRef(false);

  useEffect(() => {
    if (session?.user && !updateInProgress.current) {
      fetchUserProfile();
    }
  }, [session]);

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

  const updateUserProfile = async (updatedData: Partial<UserProfile>) => {
    updateInProgress.current = true;
    try {
      const response = await fetch("/api/users/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user profile");
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
          },
        })
      );

      updateInProgress.current = false;
      return data;
    } catch (err) {
      updateInProgress.current = false;
      setError("Error updating user profile");
      throw err;
    }
  };

  return {
    userProfile: userProfile as UserProfile,
    isLoading,
    error,
    updateUserProfile,
  };
}
