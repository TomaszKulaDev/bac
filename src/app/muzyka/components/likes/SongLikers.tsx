"use client";

import { useEffect, useState, useCallback } from "react";
import { LikedByAvatars } from "./avatars/LikedByAvatars";
import { LikedByUser } from "./types/likedBy";
import { useRouter } from "next/navigation";
import { LikersModal } from "./LikersModal";

interface SongLikersProps {
  songId: string;
}

export const SongLikers = ({ songId }: SongLikersProps) => {
  const [likers, setLikers] = useState<LikedByUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalLikes, setTotalLikes] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const fetchLikers = useCallback(async () => {
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
  }, [songId]);

  useEffect(() => {
    fetchLikers();
  }, [fetchLikers]);

  return (
    <div className="relative group">
      <LikedByAvatars
        users={likers}
        size="small"
        maxAvatars={5}
        onAvatarClick={(userId) => {
          router.push(`/profile/${userId}`);
        }}
        onMoreClick={() => setShowModal(true)}
        showTooltip={true}
        isLoading={isLoading}
        totalLikes={totalLikes}
      />

      <LikersModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        songId={songId}
        initialLikers={likers}
        totalLikes={totalLikes}
      />
    </div>
  );
};
