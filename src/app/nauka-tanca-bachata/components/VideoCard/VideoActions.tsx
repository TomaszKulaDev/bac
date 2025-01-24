import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { BachataVideo } from "../../types/video";

interface VideoActionsProps {
  video: BachataVideo;
  onLike?: () => void;
  onShare?: () => void;
  onSave?: () => void;
}

export const VideoActions: React.FC<VideoActionsProps> = ({
  video,
  onLike,
  onShare,
  onSave,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(video.likes || 0);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
    onLike?.();
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave?.();
  };

  return (
    <div className="p-2 pt-1">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-6">
          <motion.button
            onClick={handleLike}
            whileTap={{ scale: 0.8 }}
            className={`text-gray-700 hover:text-red-500 transition-colors ${
              isLiked ? "text-red-500" : ""
            }`}
            aria-label="Polub"
          >
            <motion.div
              animate={
                isLiked
                  ? {
                      scale: [1, 1.2, 0.95, 1],
                      transition: { duration: 0.35 },
                    }
                  : {}
              }
            >
              <svg
                className="w-8 h-8"
                fill={isLiked ? "currentColor" : "none"}
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
            </motion.div>
          </motion.button>
          <motion.button
            onClick={onShare}
            whileTap={{ scale: 0.8 }}
            whileHover={{ rotate: 15 }}
            className="text-gray-700 hover:text-orange-500 transition-colors"
            aria-label="Udostępnij"
          >
            <svg
              className="w-7 h-7"
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
          </motion.button>
        </div>
        <motion.button
          onClick={handleSave}
          whileTap={{ scale: 0.8 }}
          whileHover={{ y: -2 }}
          className={`text-gray-700 hover:text-black transition-colors ${
            isSaved ? "text-black" : ""
          }`}
          aria-label="Zapisz"
        >
          <motion.div
            animate={
              isSaved
                ? {
                    scale: [1, 1.2, 0.95, 1],
                    transition: { duration: 0.35 },
                  }
                : {}
            }
          >
            <svg
              className="w-7 h-7"
              fill={isSaved ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </motion.div>
        </motion.button>
      </div>

      {/* Liczba polubień */}
      <motion.div
        className="mb-1"
        animate={{ scale: likesCount > 0 ? [1, 1.1, 1] : 1 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-sm font-medium">
          Liczba polubień
          <span className="align-[0.01em]">: </span>
          {likesCount}
        </span>
      </motion.div>

      <h3 className="text-sm font-medium line-clamp-2 mb-0.5">{video.title}</h3>
      <p className="text-xs text-gray-600 line-clamp-2">{video.description}</p>
    </div>
  );
};
