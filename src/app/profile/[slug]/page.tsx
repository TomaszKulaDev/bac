"use client";
// Strona profilu użytkownika (widok publiczny)
// Wyświetla profil tancerza na podstawie przekazanego parametru slug w URL
// Dostępna pod adresem: /profile/[nazwa-uzytkownika]


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

  if (isLoading) return <div>Ładowanie...</div>;
  if (error) return <div>{error}</div>;
  if (!profile) return <div>Nie znaleziono profilu</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profil: {profile.name}</h1>
      <table className="min-w-full bg-white shadow-sm rounded-lg overflow-hidden">
        <tbody>
          <tr className="border-b">
            <td className="py-2 px-4 font-semibold">Imię</td>
            <td className="py-2 px-4">{profile.name}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 px-4 font-semibold">Email</td>
            <td className="py-2 px-4">{profile.email}</td>
          </tr>
          {profile.bio && (
            <tr className="border-b">
              <td className="py-2 px-4 font-semibold">Bio</td>
              <td className="py-2 px-4">{profile.bio}</td>
            </tr>
          )}
          {profile.dancePreferences && (
            <>
              <tr className="border-b">
                <td className="py-2 px-4 font-semibold">Poziom</td>
                <td className="py-2 px-4">{profile.dancePreferences.level}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-semibold">Dostępność</td>
                <td className="py-2 px-4">
                  {profile.dancePreferences.availability}
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-semibold">Style</td>
                <td className="py-2 px-4">
                  {profile.dancePreferences.styles.join(", ")}
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}
