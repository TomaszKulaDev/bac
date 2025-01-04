"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { UserProfile } from "@/types/user";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const slug = params?.slug as string;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("Pobieranie profilu dla:", slug); // Debug log
        const response = await fetch(`/api/profiles/by-name/${slug}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Otrzymane dane:", data); // Debug log
        setProfile(data);
      } catch (error) {
        console.error("Błąd:", error);
        setError("Nie udało się pobrać profilu");
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchProfile();
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{error}</h1>
          <p className="text-gray-600">Spróbuj odświeżyć stronę</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Nie znaleziono profilu
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{profile.name}</h1>
        {/* Tutaj reszta danych profilu */}
      </div>
    </div>
  );
}
