"use client";

import { useEffect, useState } from "react";
import { LikedByAvatars } from "./avatars/LikedByAvatars";
import { LikedByUser } from "./types/likedBy";
import { useRouter } from "next/navigation";

interface SongLikersProps {
  songId: string;
}

export const SongLikers = ({ songId }: SongLikersProps) => {
  const [likers, setLikers] = useState<LikedByUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchLikers = async () => {
      try {
        const response = await fetch(`/api/musisite/songs/${songId}/likers`);
        if (!response.ok) throw new Error("Błąd podczas pobierania danych");
        const data = await response.json();

        // Mapowanie danych z API do formatu LikedByUser
        const formattedUsers: LikedByUser[] = data.users.map((user: any) => ({
          userId: user._id || user.userId,
          userName: user.email, // używamy email jako userName
          userImage: user.image || null, // dodajemy userImage zgodnie z interfejsem
        }));

        setLikers(formattedUsers);
      } catch (error) {
        console.error("Błąd:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikers();
  }, [songId]);

  return (
    <div className="relative group">
      <LikedByAvatars
        users={likers}
        size="small"
        maxAvatars={6}
        onAvatarClick={(userId) => {
          router.push(`/profile/${userId}`);
        }}
        showTooltip={true}
        isLoading={isLoading}
      />
      {!isLoading && likers.length > 0 && (
        <div
          className="absolute -bottom-8 left-0 w-full opacity-0 
                      group-hover:opacity-100 transition-opacity duration-200
                      text-xs text-gray-500 text-center"
        >
          {likers.length} {likers.length === 1 ? "osoba lubi" : "osób lubi"}
        </div>
      )}
    </div>
  );
};
