"use client";

import { useEffect, useState, useCallback } from "react";
import { LikedByUser } from "./types/likedBy";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaTimes } from "react-icons/fa";

interface LikersModalProps {
  isOpen: boolean;
  onClose: () => void;
  songId: string;
  initialLikers: LikedByUser[];
  totalLikes: number;
}

export const LikersModal = ({
  isOpen,
  onClose,
  songId,
  initialLikers,
  totalLikes,
}: LikersModalProps) => {
  const [likers, setLikers] = useState<LikedByUser[]>(initialLikers);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setLikers(initialLikers);
      setPage(1);
      setHasMore(true);
    }
  }, [isOpen, initialLikers]);

  const fetchMoreLikers = useCallback(async () => {
    if (isLoading || !hasMore) return;

    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/musisite/songs/${songId}/likers?page=${page}&limit=20&random=false`
      );

      if (!response.ok) throw new Error("Failed to fetch likers");

      const data = await response.json();

      if (page === 1) {
        setLikers(data.users);
      } else {
        setLikers((prev) => [...prev, ...data.users]);
      }

      setHasMore(data.users.length === 20);
    } catch (error) {
      console.error("Error fetching likers:", error);
    } finally {
      setIsLoading(false);
    }
  }, [songId, page, isLoading, hasMore]);

  useEffect(() => {
    if (isOpen && page > 1) {
      fetchMoreLikers();
    }
  }, [isOpen, page, fetchMoreLikers]);

  // Prevent scroll on body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              aria-hidden="true"
              onClick={onClose}
            />

            {/* Modal */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl relative"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3
                  className="text-lg font-medium leading-6 text-gray-900"
                  id="modal-title"
                >
                  Osoby, które polubiły ({totalLikes})
                </h3>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="max-h-[60vh] overflow-y-auto">
                <div className="space-y-4">
                  {likers.map((user) => (
                    <motion.div
                      key={user.userId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                      onClick={() => {
                        router.push(`/profile/${user.userId}`);
                        onClose();
                      }}
                    >
                      <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={user.userImage || "/images/default-avatar.png"}
                          alt={user.userName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {user.userName}
                        </h4>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="mt-4 text-center">
                    <button
                      onClick={() => setPage((p) => p + 1)}
                      disabled={isLoading}
                      className="px-4 py-2 text-sm font-medium text-amber-600 
                               hover:bg-amber-50 rounded-lg transition-colors
                               disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Ładowanie..." : "Załaduj więcej"}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
