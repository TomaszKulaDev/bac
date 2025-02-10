"use client";

import Image from "next/image";
import { LikedByUser } from "../types/likedBy";
import React from "react";
import { MusicTooltip } from "../../ui/MusicTooltip";

interface LikedByAvatarsProps {
  users: LikedByUser[];
  size?: "small" | "large";
  maxAvatars?: number;
  onAvatarClick?: (userId: string) => void;
  showTooltip?: boolean;
}

export const LikedByAvatars: React.FC<LikedByAvatarsProps> = ({
  users,
  size = "small",
  maxAvatars = 10,
  onAvatarClick,
  showTooltip = true,
}) => {
  const firstPlaceMaxAvatars = 5;
  const effectiveMaxAvatars = firstPlaceMaxAvatars;

  const avatarSize = size === "large" ? "w-14 h-14" : "w-12 h-12";
  const spacing = size === "large" ? "-space-x-3" : "-space-x-4";
  const hoverSpacing =
    size === "large" ? "hover:space-x-1" : "hover:space-x-0.5";

  return (
    <div className="flex items-center">
      <div
        className={`flex ${spacing} group transition-all duration-300 ${hoverSpacing}`}
      >
        {users.slice(0, effectiveMaxAvatars).map((user) => (
          <MusicTooltip
            key={user.userId}
            content={user.userName}
            position="top"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAvatarClick?.(user.userId);
              }}
              className={`
                relative ${avatarSize} 
                rounded-full 
                flex items-center justify-center 
                border-2 border-white
                transform transition-all duration-300
                hover:scale-125 hover:z-20
                group-hover:translate-x-0
                hover:border-amber-500
                cursor-pointer
                overflow-hidden
                bg-gray-50
              `}
            >
              <Image
                src={user.userImage || "/images/default-avatar.png"}
                alt={user.userName}
                fill
                className="object-cover"
              />
            </button>
          </MusicTooltip>
        ))}
        {users.length > effectiveMaxAvatars && (
          <div
            className={`
              relative ${avatarSize} 
              rounded-full bg-gray-100 
              flex items-center justify-center 
              text-sm text-gray-600 
              border border-white
              transform transition-all duration-300
              hover:scale-105 hover:z-10
              group-hover:translate-x-0
              translate-x-0
            `}
          >
            +{users.length - effectiveMaxAvatars}
          </div>
        )}
      </div>
    </div>
  );
};
