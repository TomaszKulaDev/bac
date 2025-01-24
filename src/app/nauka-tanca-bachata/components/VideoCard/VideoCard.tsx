import React, { useState } from "react";
import Image from "next/image";
import {
  BachataVideo,
  DANCE_LEVELS,
  DANCE_CATEGORIES,
  Category,
} from "../../types/video";
import { useVideoVisibility } from "../../hooks/useVideoVisibility";
import { motion, AnimatePresence } from "framer-motion";
import { InstructorHeader } from "./InstructorHeader";
import { VideoActions } from "./VideoActions";

interface VideoCardProps {
  video: BachataVideo;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const { videoRef, isPlaying, isMuted, setIsMuted, togglePlay } =
    useVideoVisibility();
  const [isHovered, setIsHovered] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: video.title,
          text: `Naucz się bachaty z ${video.instructorName}`,
          url: window.location.href,
        })
        .catch(console.error);
    }
  };

  const handleSave = () => {
    // TODO: Implementacja zapisywania
    console.log("Zapisano:", video.title);
  };

  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-sm">
      <InstructorHeader video={video} />

      {/* Kontener wideo */}
      <div
        className="relative aspect-[4/5] bg-black group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          poster={video.thumbnailUrl}
          playsInline
          loop
          muted={isMuted}
          preload="metadata"
        >
          <source
            src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/${video.publicId}`}
            type="video/mp4"
          />
        </video>

        {/* Przycisk Play/Pause na środku */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/20"
            >
              <motion.button
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="p-4 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
              >
                {isPlaying ? (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Kontrolka głośności */}
        <button
          className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            setIsMuted(!isMuted);
          }}
        >
          {isMuted ? (
            <svg
              className="w-5 h-5"
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
              className="w-5 h-5"
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
      </div>

      <VideoActions video={video} onShare={handleShare} onSave={handleSave} />
    </article>
  );
};
