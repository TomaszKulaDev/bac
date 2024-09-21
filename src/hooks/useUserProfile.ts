// src/hooks/useUserProfile.ts

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
}

export function useUserProfile() {
  const { data: session } = useSession();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user) {
      fetchUserProfile();
    }
  }, [session]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("/api/users/update-profile");
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
      return data;
    } catch (err) {
      setError("Error updating user profile");
      throw err;
    }
  };

  return { userProfile, isLoading, error, updateUserProfile };
}
