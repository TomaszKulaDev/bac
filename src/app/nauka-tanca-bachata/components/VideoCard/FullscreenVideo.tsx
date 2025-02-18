import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BachataVideo } from "../../types/video";

interface FullscreenVideoProps {
  video: BachataVideo;
  isOpen: boolean;
  onClose: () => void;
  videoRef: React.RefObject<HTMLVideoElement>;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export const FullscreenVideo: React.FC<FullscreenVideoProps> = ({
  video,
  isOpen,
  onClose,
  videoRef,
  isMuted,
  setIsMuted,
  onNext,
  onPrevious,
}) => {
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const handleFullscreen = async () => {
      if (isOpen && videoRef.current) {
        try {
          if (document.fullscreenElement) {
            await document.exitFullscreen();
          }
          await videoRef.current.requestFullscreen();
        } catch (err) {
          console.error(
            "Błąd podczas przełączania trybu pełnoekranowego:",
            err
          );
        }
      }
    };

    handleFullscreen();

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);
    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement) {
        onClose();
      }
    });

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.removeEventListener("fullscreenchange", () => {});
    };
  }, [isOpen, onClose, videoRef]);

  // Dodaj gesty dotykowe
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartX.current = touch.clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartX.current) return;
    const touch = e.touches[0];
    const diff = touchStartX.current - touch.clientX;

    // Implementacja gestów przewijania
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Przewiń do następnego
        onNext?.();
      } else {
        // Przewiń do poprzedniego
        onPrevious?.();
      }
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => (touchStartX.current = null)}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black flex items-center justify-center"
          >
            <video
              ref={videoRef}
              className="w-full h-full object-contain"
              playsInline
              loop
              muted={isMuted}
              autoPlay
              controlsList="nodownload nofullscreen noplaybackrate"
              controls
            >
              <source
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/${video.publicId}`}
                type="video/mp4"
              />
            </video>

            {/* Kontrolka głośności */}
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  />
                </svg>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
