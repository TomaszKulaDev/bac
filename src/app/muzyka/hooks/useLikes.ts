import { useEffect, useState } from "react";
import { LikedByUser } from "../components/likes/types/likedBy";

const DEFAULT_AVATAR = "/images/default-avatar.png";

export const useLikes = (songId: string) => {
  const [likes, setLikes] = useState<LikedByUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        console.log("Fetching likes for songId:", songId);
        const response = await fetch(`/musisite/likes?songId=${songId}`);
        console.log("API response status:", response.status);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API data received:", data);

        if (!Array.isArray(data)) {
          throw new Error("Expected array but got: " + typeof data);
        }

        const users = data.map((user: any) => {
          if (!user._id || !user.name) {
            console.warn("Invalid user data:", user);
          }
          return {
            userId: user._id,
            userName: user.name,
            userImage: user.avatarUrl || DEFAULT_AVATAR,
          };
        });

        console.log("Mapped users:", users);
        setLikes(users);
      } catch (error) {
        console.error("Error fetching likes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikes();
  }, [songId]);

  return { likes, isLoading };
};
