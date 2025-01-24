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

interface VideoCardProps {
  video: BachataVideo;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const { videoRef, isPlaying, isMuted, setIsMuted, togglePlay } =
    useVideoVisibility();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-sm">
      {/* Nagłówek z instruktorem */}
      <div className="p-3 flex items-start justify-between border-b">
        <div className="flex items-start space-x-4">
          <div className="relative">
            {/* Instagram gradient: fiolet -> róż -> żółty -> pomarańcz */}
            <div className="absolute -inset-[2px] bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] rounded-full animate-gradient-slow" />
            <div className="relative w-12 h-12 rounded-full border-2 border-white overflow-hidden">
              <Image
                src={video.instructorAvatarUrl || "/default-avatar.png"}
                alt={video.instructorName || "Instruktor"}
                fill
                sizes="48px"
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{video.instructorName}</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-600">
                {DANCE_CATEGORIES[video.category]}
              </span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-600">
                {DANCE_LEVELS[video.level]}
              </span>
            </div>
          </div>
        </div>
        <span className="text-xs font-medium bg-orange-100 text-orange-700 px-2 py-1 rounded-full h-fit">
          inne
        </span>
      </div>

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

        {/* Czas trwania */}
        <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
          {Math.floor(video.duration / 60)}:
          {String(Math.floor(video.duration % 60)).padStart(2, "0")}
        </div>
      </div>

      {/* Akcje */}
      <div className="p-3">
        <div className="flex items-center space-x-4 mb-2">
          <button className="text-gray-700 hover:text-orange-500 transition-colors">
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
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
          <button className="text-gray-700 hover:text-orange-600 transition-colors">
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
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          </button>
        </div>
        <h3 className="text-sm font-medium line-clamp-2 group-hover:text-orange-700 transition-colors">
          {video.title}
        </h3>
      </div>
    </article>
  );
};
