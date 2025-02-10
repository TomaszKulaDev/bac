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
  isLoading?: boolean;
}

export const LikedByAvatars: React.FC<LikedByAvatarsProps> = ({
  users,
  size = "small",
  maxAvatars = 10,
  onAvatarClick,
  showTooltip = true,
  isLoading = false,
}) => {
  const firstPlaceMaxAvatars = 5;
  const effectiveMaxAvatars = firstPlaceMaxAvatars;

  const avatarSize = size === "large" ? "w-14 h-14" : "w-12 h-12";
  const spacing = size === "large" ? "-space-x-3" : "-space-x-4";

  if (isLoading) {
    return (
      <div className="flex items-center">
        <div className={`flex ${spacing}`}>
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              style={{
                animationDelay: `${index * 150}ms`,
              }}
              className={`
                relative ${avatarSize}
                rounded-full
                bg-gray-200
                animate-pulse
                border-2 border-white
                -translate-x-2
                overflow-hidden
              `}
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"
                style={{
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.5s infinite",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <div
        className={`
          flex ${spacing} group 
          transition-all duration-500 ease-in-out
          hover:space-x-1
        `}
      >
        {users.slice(0, effectiveMaxAvatars).map((user, index) => (
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
              style={{
                transitionDelay: `${index * 50}ms`,
              }}
              className={`
                relative ${avatarSize} 
                rounded-full 
                flex items-center justify-center 
                border-2 border-white
                transform transition-all duration-300 ease-in-out
                hover:scale-125 hover:z-20
                hover:border-amber-500/80
                hover:shadow-lg hover:shadow-amber-500/20
                cursor-pointer
                overflow-hidden
                bg-gray-50
                -translate-x-2 group-hover:translate-x-0
                opacity-90 hover:opacity-100
              `}
            >
              <Image
                src={user.userImage || "/images/default-avatar.png"}
                alt={user.userName}
                fill
                className="object-cover transform transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300" />
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
              border-2 border-white
              transform transition-all duration-500 ease-in-out
              hover:scale-110 hover:z-10
              -translate-x-2 group-hover:translate-x-0
              hover:bg-gray-200
              hover:border-amber-500/50
              hover:shadow-lg hover:shadow-amber-500/10
            `}
          >
            +{users.length - effectiveMaxAvatars}
          </div>
        )}
      </div>
    </div>
  );
};
