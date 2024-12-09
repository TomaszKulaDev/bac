import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { toggleLike } from "@/store/slices/features/songsSlice";
import { useSession, signIn } from "next-auth/react";

export const useLike = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session, status } = useSession();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleLike = useCallback(
    async (songId: string) => {
      if (!songId) return;

      if (status === "unauthenticated") {
        await signIn();
        return;
      }

      if (!session?.user?.email) {
        console.error("No user email in session");
        return;
      }

      try {
        const result = await dispatch(toggleLike(songId)).unwrap();
        return result;
      } catch (error: any) {
        console.error("Error toggling like:", error);
        throw error;
      }
    },
    [dispatch, session, status]
  );

  return { handleLike };
};
