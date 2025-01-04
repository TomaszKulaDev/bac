"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { UserProfile } from "@/types/user";
import { FaMapMarkerAlt, FaRuler, FaGraduationCap } from "react-icons/fa";

export default function ProfilePage({ params }: { params: { id: string } }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/profiles/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        setError("Nie udało się załadować profilu");
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {error || "Profil nie został znaleziony"}
          </h1>
          <p className="text-gray-600">
            Przepraszamy, spróbuj ponownie później.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Header z zdjęciem profilowym */}
          <div className="relative h-48 bg-gradient-to-r from-amber-500 to-amber-600">
            <div className="absolute -bottom-16 left-8">
              <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-4 border-white">
                <Image
                  src={profile.image || "/images/default-avatar.png"}
                  alt={profile.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Informacje o profilu */}
          <div className="pt-20 px-8 pb-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {profile.name}
                </h1>
                <div className="flex items-center gap-4 mt-2 text-gray-600">
                  {profile.dancePreferences?.location && (
                    <div className="flex items-center gap-1">
                      <FaMapMarkerAlt className="w-4 h-4 text-amber-500" />
                      <span>{profile.dancePreferences.location}</span>
                    </div>
                  )}
                  {profile.height && (
                    <div className="flex items-center gap-1">
                      <FaRuler className="w-4 h-4 text-amber-500" />
                      <span>{profile.height} cm</span>
                    </div>
                  )}
                  {profile.dancePreferences?.level && (
                    <div className="flex items-center gap-1">
                      <FaGraduationCap className="w-4 h-4 text-amber-500" />
                      <span>{profile.dancePreferences.level}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Style tańca */}
            {profile.dancePreferences?.styles && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Style tańca
                </h2>
                <div className="flex flex-wrap gap-2">
                  {profile.dancePreferences.styles.map((style) => (
                    <span
                      key={style}
                      className="px-3 py-1 bg-amber-50 text-amber-700 
                               rounded-full text-sm font-medium"
                    >
                      {style}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Bio */}
            {profile.bio && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  O mnie
                </h2>
                <p className="text-gray-600 whitespace-pre-line">
                  {profile.bio}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
