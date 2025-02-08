"use client";

import { PoplistaHeader } from "./PoplistaHeader";
import { PoplistaList } from "./PoplistaList";
import { PoplistaFilters } from "./PoplistaFilters";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ShareModal } from "../ui/ShareModal";
import { useState } from "react";

export const PoplistaContainer = () => {
  const { status, error } = useSelector((state: RootState) => state.poplista);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-1 sm:px-4 py-2 sm:py-8">
        {status === "failed" && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-4">
            <p className="text-red-700">Błąd ładowania listy: {error}</p>
          </div>
        )}

        <PoplistaHeader onShare={handleShare} />
        <PoplistaFilters />
        <PoplistaList />
      </div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </>
  );
};
