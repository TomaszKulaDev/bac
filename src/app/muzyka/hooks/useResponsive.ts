import { useState, useEffect, useCallback } from 'react';

interface UseResponsiveReturn {
  isMobile: boolean;
  isSmallScreen: boolean;
  playerDimensions: { width: string; height: string };
  setPlayerDimensions: (dimensions: { width: string; height: string }) => void;
  updatePlayerDimensions: () => void;
  setIsSmallScreen: (isSmall: boolean) => void;
  updateContainerPadding: () => void;
}

export const useResponsive = (): UseResponsiveReturn => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [playerDimensions, setPlayerDimensions] = useState({
    width: "100%",
    height: "300px",
  });

  const updatePlayerDimensions = useCallback(() => {
    const width = window.innerWidth;
    if (width < 640) {
      setPlayerDimensions({ width: "100%", height: "200px" });
    } else if (width < 1024) {
      setPlayerDimensions({ width: "100%", height: "300px" });
    } else {
      setPlayerDimensions({ width: "100%", height: "360px" });
    }
  }, []);

  const updateContainerPadding = useCallback(() => {
    const mainContainer = document.querySelector(".max-w-7xl");
    if (mainContainer) {
      if (window.innerWidth < 640) {
        mainContainer.classList.remove("pb-20");
        mainContainer.classList.add("pb-32");
      } else {
        mainContainer.classList.remove("pb-32");
        mainContainer.classList.add("pb-20");
      }
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsSmallScreen(width < 768);
      updatePlayerDimensions();
      updateContainerPadding();
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updatePlayerDimensions, updateContainerPadding]);

  return {
    isMobile,
    isSmallScreen,
    playerDimensions,
    setPlayerDimensions,
    updatePlayerDimensions,
    setIsSmallScreen,
    updateContainerPadding
  };
};
