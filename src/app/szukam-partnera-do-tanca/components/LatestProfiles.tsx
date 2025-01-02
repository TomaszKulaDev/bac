"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { UserProfile } from "@/types/user";

export const LatestProfiles = () => {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch("/api/profiles");
        const data = await response.json();
        setProfiles(data);
      } catch (error) {
        console.error("Błąd podczas pobierania profili:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (isLoading) {
    return <div>Ładowanie profili...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {profiles.map((profile) => (
        <div key={profile.id} className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-4">
            <div className="relative w-16 h-16">
              <Image
                src={profile.image ?? "/images/default-avatar.png"}
                alt={profile.name}
                fill
                className="rounded-full object-cover"
                sizes="(max-width: 64px) 100vw, 64px"
                priority={false}
              />
            </div>
            <div>
              <h3 className="font-semibold">{profile.name}</h3>
              <p className="text-sm text-gray-500">
                Dołączył(a): {new Date(profile.createdAt!).toLocaleDateString()}
              </p>
            </div>
          </div>

          {profile.dancePreferences && (
            <div className="mt-4 space-y-2">
              <div className="flex flex-wrap gap-2">
                {profile.dancePreferences.styles.map((style) => (
                  <span
                    key={style}
                    className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-sm"
                  >
                    {style}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                Poziom: {profile.dancePreferences.level}
              </p>
              <p className="text-sm text-gray-600">
                Lokalizacja: {profile.dancePreferences.location}
              </p>
              <p className="text-sm text-gray-600">
                Dostępność: {profile.dancePreferences.availability}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
