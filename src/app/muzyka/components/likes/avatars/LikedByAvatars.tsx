import { LikedByUser, LikedByAvatarsProps } from "../types/likedBy";
import React, { useState } from "react";

export const LikedByAvatars: React.FC<
  LikedByAvatarsProps & { isFirstPlace?: boolean }
> = ({ users, size = "small", maxAvatars = 4, isFirstPlace = false }) => {
  const firstPlaceMaxAvatars = 5;
  const effectiveMaxAvatars = isFirstPlace ? firstPlaceMaxAvatars : maxAvatars;
  const [hoveredUserId, setHoveredUserId] = useState<string | null>(null);

  const avatarSize = size === "large" ? "w-10 h-10" : "w-8 h-8";
  const textSize = size === "large" ? "text-xs" : "text-[10px]";
  const spacing = size === "large" ? "-space-x-3" : "-space-x-2";
  const hoverSpacing =
    size === "large" ? "hover:space-x-1" : "hover:space-x-0.5";

  return (
    <div className="flex items-center">
      <div
        className={`flex ${spacing} group transition-all duration-300 ${hoverSpacing} hover:mx-1`}
      >
        {users.slice(0, effectiveMaxAvatars).map((user) => (
          <div
            key={user.userId}
            className="flex flex-col items-center"
            onMouseEnter={() => setHoveredUserId(user.userId)}
            onMouseLeave={() => setHoveredUserId(null)}
          >
            <button
              className={`
                relative ${avatarSize} 
                bg-amber-100 rounded-full 
                flex items-center justify-center 
                border border-white
                transform transition-all duration-300
                hover:scale-150 hover:z-20
                cursor-pointer
              `}
              onClick={(e) => {
                e.stopPropagation();
                console.log("Kliknięto avatar:", user);
              }}
            >
              <span className={`text-amber-600 ${textSize} font-medium`}>
                {user.userName[0].toUpperCase()}
              </span>
            </button>
            <span
              className={`mt-3 ${textSize} text-gray-600 truncate max-w-[4rem] transition-opacity duration-200 ${
                hoveredUserId === user.userId ? "opacity-100" : "opacity-0"
              }`}
            >
              {user.userName}
            </span>
          </div>
        ))}
        {users.length > effectiveMaxAvatars && (
          <div
            className={`
              relative ${avatarSize} 
              rounded-full bg-gray-100 
              flex items-center justify-center 
              ${textSize} text-gray-600 
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
