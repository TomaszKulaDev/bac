import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import PlaylistManager from "../PlaylistManager";
import { FaTimes, FaSort } from "react-icons/fa";
import { Playlist, Song } from "@/app/muzyka/types";
import { SortByType, SortOrderType } from "@/app/muzyka/types";
import { MobileDrawerProps } from "./types";
  
const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  sortBy,
  sortOrder,
  onSortChange,
  ...playlistProps
}) => {
  const handleSortChange = (newSortBy: SortByType) => {
    const newSortOrder = sortBy === newSortBy && sortOrder === "asc" ? "desc" : "asc";
    onSortChange(newSortBy, newSortOrder);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-0 left-0 right-0 bg-white shadow-xl z-50 rounded-t-3xl max-h-[60vh]"
          >
            <div className="sticky top-0 bg-white p-4 border-b rounded-t-3xl">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />
              <button
                onClick={onClose}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={24} />
              </button>
              <h2 className="text-xl font-semibold text-gray-800 text-center">
                Sortowanie
              </h2>
            </div>
            <div className="p-4 space-y-2 overflow-y-auto">
              {[
                { id: "date", label: "Nowości" },
                { id: "beginnerFriendly", label: "Dla początkujących" },
                { id: "impro", label: "Impro" },
                { id: "title", label: "Tytuł" },
                { id: "artist", label: "Wykonawca" },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => handleSortChange(id as any)}
                  className={`w-full text-left p-3 rounded-lg flex items-center justify-between ${
                    sortBy === id ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
                >
                  <span>{label}</span>
                  {sortBy === id && (
                    <FaSort
                      className={sortOrder === "desc" ? "rotate-180" : ""}
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileDrawer;
