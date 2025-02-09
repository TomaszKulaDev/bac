import { useEffect, useState } from "react";
import { LikedByAvatars } from "./avatars/LikedByAvatars";
import { LikedByUser } from "./types/likedBy";

interface SongLikersProps {
  songId: string;
}

export const SongLikers = ({ songId }: SongLikersProps) => {
  const [likers, setLikers] = useState<LikedByUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLikers = async () => {
      try {
        const response = await fetch(`/api/musisite/songs/${songId}/likers`);
        if (!response.ok) throw new Error("Błąd podczas pobierania danych");
        const data = await response.json();
        
        // Mapowanie danych z API do formatu LikedByUser
        const formattedUsers: LikedByUser[] = data.users.map((user: any) => ({
          userId: user._id || user.userId,
          userName: user.email // używamy email jako userName
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

  if (isLoading) return null;

  return <LikedByAvatars users={likers} size="small" maxAvatars={6} />;
};
