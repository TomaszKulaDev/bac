import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  updateListener,
  removeListener,
} from "@/store/slices/features/listenerSlice";
import { useSession } from "next-auth/react";

const getDeviceType = () => {
  if (typeof window === "undefined") return "desktop";

  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return "mobile";
  }
  return "desktop";
};

export const useListenerActivity = (
  isPlaying: boolean,
  currentSongId?: string
) => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const userId = session?.user?.id || "anonymous";
  const deviceType = getDeviceType();

  const updateActivity = useCallback(() => {
    console.log("Aktualizacja aktywności:", {
      userId,
      currentSongId,
      isPlaying,
      deviceType,
      timestamp: new Date().toISOString(),
    });

    dispatch(
      updateListener({
        userId,
        currentSong: currentSongId,
        isPlaying,
        deviceType,
      })
    );
  }, [dispatch, userId, currentSongId, isPlaying, deviceType]);

  useEffect(() => {
    // Aktualizuj co 30 sekund
    const updateInterval = setInterval(updateActivity, 30000);

    // Początkowa aktualizacja
    updateActivity();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        updateActivity();
      }
    };

    const handleUnload = () => {
      const deviceId = localStorage.getItem("deviceId");
      if (deviceId) {
        dispatch(removeListener({ userId, deviceId }));
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      clearInterval(updateInterval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleUnload);
      handleUnload();
    };
  }, [updateActivity, dispatch, userId]);
};
