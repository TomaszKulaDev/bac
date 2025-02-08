import { LikedByUser, LikedByAvatarsProps } from "../types/likedBy";
import React from "react";

export const LikedByAvatars: React.FC<
  LikedByAvatarsProps & { isFirstPlace?: boolean }
> = ({
  users,
  size = "small",
  showCount = true,
  maxAvatars = 10,
  isFirstPlace = false,
}) => {
  const firstPlaceMaxAvatars = 4; // Maksymalna liczba avatarów dla pierwszej pozycji
  const effectiveMaxAvatars = isFirstPlace ? firstPlaceMaxAvatars : maxAvatars;

  const avatarSize = size === "large" ? "w-14 h-14" : "w-10 h-10";
  const textSize = size === "large" ? "text-sm" : "text-xs";
  const spacing = size === "large" ? "-space-x-4" : "-space-x-4";
  const hoverSpacing =
    size === "large" ? "hover:space-x-1" : "hover:space-x-0.5";

  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex ${spacing} group transition-all duration-300 ${hoverSpacing} hover:mx-1`}
      >
        {users.slice(0, effectiveMaxAvatars).map((user, index) => (
          <div
            key={user.userId}
            className={`
              relative ${avatarSize} 
              bg-amber-100 rounded-full 
              flex items-center justify-center 
              border border-white
              transform transition-all duration-300
              hover:scale-105 hover:z-10
              group-hover:translate-x-0
              ${index > 0 ? `translate-x-0` : ""}
            `}
          >
            <span className={`text-amber-600 ${textSize} font-medium`}>
              {user.userName[0].toUpperCase()}
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
      {showCount && (
        <span
          className={`${textSize} text-gray-500 hidden sm:inline transition-opacity duration-300`}
        >
          {size === "large"
            ? `Polubione przez ${users.length} osób`
            : users.length}
        </span>
      )}
    </div>
  );
};
