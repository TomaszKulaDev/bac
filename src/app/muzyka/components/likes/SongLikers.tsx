"use client";

import { useEffect, useState } from "react";
import { LikedByAvatars } from "./avatars/LikedByAvatars";
import { LikedByUser } from "./types/likedBy";
import { useRouter } from "next/navigation";

interface SongLikersProps {
  songId: string;
  onModalOpen: () => void;
}

export const SongLikers = ({ songId, onModalOpen }: SongLikersProps) => {
  const [likers, setLikers] = useState<LikedByUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalLikes, setTotalLikes] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchLikers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/musisite/songs/${songId}/likers?limit=5&random=true`
        );

        if (!response.ok) throw new Error("Błąd podczas pobierania danych");
        const data = await response.json();

        setLikers(data.users);
        setTotalLikes(data.totalLikes);
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
        maxAvatars={5}
        onAvatarClick={(userId) => {
          router.push(`/profile/${userId}`);
        }}
        onMoreClick={onModalOpen}
        showTooltip={true}
        isLoading={isLoading}
        totalLikes={totalLikes}
      />
    </div>
  );
};
