"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MusicTooltipProps {
  children: React.ReactNode;
  content: string;
  position?: "top" | "bottom" | "left" | "right";
}

export const MusicTooltip = ({
  children,
  content,
  position = "top",
}: MusicTooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTouch = () => {
    if (!content) return;
    setIsVisible(true);
    setTimeout(() => setIsVisible(false), 2000);
  };

  const positionStyles = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const tooltipPosition = isMobile
    ? "right-full top-1/2 -translate-y-1/2 mr-2"
    : positionStyles[position];

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => !isMobile && setIsVisible(true)}
      onMouseLeave={() => !isMobile && setIsVisible(false)}
      onTouchStart={handleTouch}
      onTouchEnd={() => {}}
    >
      {children}
      <AnimatePresence>
        {isVisible && content && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-50 ${tooltipPosition} 
              whitespace-nowrap bg-gray-900 text-white text-xs px-3 py-2 
              rounded-lg shadow-lg pointer-events-none
              min-w-max max-w-[200px] text-center`}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
