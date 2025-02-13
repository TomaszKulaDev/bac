"use client";

import { useEffect, useState, useCallback } from "react";
import { LikedByUser } from "./types/likedBy";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaTimes } from "react-icons/fa";
import { getProfileUrl } from "@/utils/profile";

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

  // Przenosimy fetchFullPage do useCallback
  const fetchFullPage = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/musisite/songs/${songId}/likers?page=1&limit=20&random=false`
      );

      if (!response.ok) throw new Error("Failed to fetch likers");

      const data = await response.json();
      setLikers(data.users);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error("Error fetching full page:", error);
    } finally {
      setIsLoading(false);
    }
  }, [songId]); // Dodajemy songId jako zależność

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setLikers(initialLikers);
      setPage(1);
      setHasMore(true);
      fetchFullPage();
    }
  }, [isOpen, initialLikers, fetchFullPage]); // Dodajemy fetchFullPage do zależności

  const fetchMoreLikers = useCallback(async () => {
    if (isLoading || !hasMore || page === 1) return;

    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/musisite/songs/${songId}/likers?page=${page}&limit=20&random=false`
      );

      if (!response.ok) throw new Error("Failed to fetch likers");

      const data = await response.json();

      setLikers((prev) => {
        // Filtruj duplikaty
        const newUsers = data.users.filter(
          (newUser: LikedByUser) =>
            !prev.some((existingUser) => existingUser.userId === newUser.userId)
        );
        return [...prev, ...newUsers];
      });

      setHasMore(data.hasMore);
    } catch (error) {
      console.error("Error fetching more likers:", error);
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
          style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <div className="min-h-screen text-center md:px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              aria-hidden="true"
              onClick={onClose}
            />

            {/* Trick to center modal */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            {/* Modal */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="inline-block w-full max-w-lg p-6 my-8 
                         overflow-hidden text-left align-middle 
                         transition-all transform bg-white 
                         shadow-xl rounded-2xl relative
                         md:my-16 mx-auto
                         vertical-center"
              style={{
                marginTop: "15vh", // Dodajemy stały margines od góry
              }}
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
                  className="text-gray-400 hover:text-gray-500 
                           transition-colors rounded-full p-2
                           hover:bg-gray-100"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="max-h-[60vh] overflow-y-auto">
                {isLoading && likers.length === 0 ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500" />
                  </div>
                ) : (
                  <>
                    <div className="space-y-3">
                      {likers.map((user) => (
                        <motion.div
                          key={user.userId}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-3 p-2 hover:bg-gray-50 
                                   rounded-lg cursor-pointer transition-colors"
                          onClick={() => {
                            router.push(
                              getProfileUrl({
                                id: user.userId,
                                name: user.userName,
                                ...(user.slug && { slug: user.slug }),
                              })
                            );
                            onClose();
                          }}
                        >
                          <div className="relative w-12 h-12 rounded-full overflow-hidden">
                            <Image
                              src={
                                user.userImage || "/images/default-avatar.png"
                              }
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
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
