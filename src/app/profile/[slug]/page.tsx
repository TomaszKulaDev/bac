"use client";
// Strona profilu użytkownika (widok publiczny)
// Wyświetla profil tancerza na podstawie przekazanego parametru slug w URL
// Dostępna pod adresem: /profile/[nazwa-uzytkownika]

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { UserProfile } from "@/types/user";
import Image from "next/image";

export default function PublicProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const slug = params?.slug as string;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/profiles/by-name/${slug}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProfile(data);
      } catch (error) {
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Ładowanie...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Nie znaleziono profilu</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-start gap-6">
          <Image
            src={profile.image || "/images/default-avatar.png"}
            alt={profile.name}
            width={120}
            height={120}
            className="rounded-full"
          />
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              {profile.bio && (
                <p className="text-gray-600 mt-2">{profile.bio}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {profile.age && (
                <div>
                  <span className="text-sm text-gray-500">Wiek</span>
                  <p>{profile.age} lat</p>
                </div>
              )}
              {profile.height && (
                <div>
                  <span className="text-sm text-gray-500">Wzrost</span>
                  <p>{profile.height} cm</p>
                </div>
              )}
              {profile.gender && (
                <div>
                  <span className="text-sm text-gray-500">Płeć</span>
                  <p>{profile.gender === "male" ? "Mężczyzna" : "Kobieta"}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {profile.dancePreferences && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Preferencje taneczne</h2>
          <div className="grid grid-cols-2 gap-4">
            {profile.dancePreferences.level && (
              <div>
                <span className="text-sm text-gray-500">Poziom</span>
                <p>{profile.dancePreferences.level}</p>
              </div>
            )}
            {profile.dancePreferences.availability && (
              <div>
                <span className="text-sm text-gray-500">Dostępność</span>
                <p>{profile.dancePreferences.availability}</p>
              </div>
            )}
            {profile.dancePreferences.location && (
              <div>
                <span className="text-sm text-gray-500">Lokalizacja</span>
                <p>{profile.dancePreferences.location}</p>
              </div>
            )}
            {profile.dancePreferences.styles &&
              profile.dancePreferences.styles.length > 0 && (
                <div className="col-span-2">
                  <span className="text-sm text-gray-500">Style taneczne</span>
                  <p>{profile.dancePreferences.styles.join(", ")}</p>
                </div>
              )}
          </div>
        </div>
      )}

      {profile.socialMedia && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Media społecznościowe</h2>
          <div className="grid grid-cols-2 gap-4">
            {profile.socialMedia.instagram && (
              <div>
                <span className="text-sm text-gray-500">Instagram</span>
                <p>{profile.socialMedia.instagram}</p>
              </div>
            )}
            {profile.socialMedia.facebook && (
              <div>
                <span className="text-sm text-gray-500">Facebook</span>
                <p>{profile.socialMedia.facebook}</p>
              </div>
            )}
            {profile.socialMedia.youtube && (
              <div>
                <span className="text-sm text-gray-500">YouTube</span>
                <p>{profile.socialMedia.youtube}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
