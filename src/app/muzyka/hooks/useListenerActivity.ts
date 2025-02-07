import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  updateListener,
  removeListener,
} from "@/store/slices/features/listenerSlice";
import { useSession } from "next-auth/react";

export const useListenerActivity = (
  isPlaying: boolean,
  currentSongId?: string
) => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const listenerId = session?.user?.id || "anonymous";

  useEffect(() => {
    // Aktualizuj status co 30 sekund
    const updateInterval = setInterval(() => {
      dispatch(
        updateListener({
          id: listenerId,
          currentSong: currentSongId,
          isPlaying,
        })
      );
    }, 30000);

    // Początkowa aktualizacja
    dispatch(
      updateListener({
        id: listenerId,
        currentSong: currentSongId,
        isPlaying,
      })
    );

    // Cleanup przy zamknięciu
    const handleUnload = () => {
      dispatch(removeListener(listenerId));
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      clearInterval(updateInterval);
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [dispatch, listenerId, isPlaying, currentSongId]);
};
