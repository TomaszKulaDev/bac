import Image from "next/image";
import { useLikes } from "@/app/muzyka/hooks/useLikes";
import { useEffect } from "react";
import { LikedByAvatarsProps } from "../types/likedBy";
import React, { useState } from "react";

export const LikedByAvatars: React.FC<LikedByAvatarsProps> = ({
  songId,
  size = "small",
  maxAvatars = 4,
}) => {
  const { likes, isLoading } = useLikes(songId);

  console.log("Rendering LikedByAvatars with", likes.length, "users");

  if (isLoading) {
    return <div className="text-gray-500">Ładowanie...</div>;
  }

  if (!likes || likes.length === 0) {
    return <div className="text-gray-500 text-sm">Brak polubień</div>;
  }

  const visibleUsers = likes.slice(0, maxAvatars);
  const remainingCount = Math.max(0, likes.length - maxAvatars);

  const avatarSize = size === "large" ? "w-10 h-10" : "w-8 h-8";
  const textSize = size === "large" ? "text-xs" : "text-[10px]";
  const spacing = size === "large" ? "-space-x-3" : "-space-x-2";
  const hoverSpacing =
    size === "large" ? "hover:space-x-1" : "hover:space-x-0.5";

  return (
    <div className="flex items-center">
      <div className={`flex ${size === "large" ? "-space-x-3" : "-space-x-2"}`}>
        {visibleUsers.map((user) => (
          <div key={user.userId} className="relative group">
            <Image
              src={user.userImage}
              alt={user.userName}
              width={size === "large" ? 40 : 32}
              height={size === "large" ? 40 : 32}
              className={`rounded-full border-2 border-white`}
              title={user.userName}
            />
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black/75 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {user.userName}
            </div>
          </div>
        ))}
        {remainingCount > 0 && (
          <div
            className={`rounded-full bg-gray-100 flex items-center justify-center ${
              size === "large" ? "w-10 h-10 text-xs" : "w-8 h-8 text-[10px]"
            }`}
          >
            +{remainingCount}
          </div>
        )}
      </div>
    </div>
  );
};
