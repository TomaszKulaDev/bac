import { LikedByUser, LikedByAvatarsProps } from "../types/likedBy";
import React from "react";

export const LikedByAvatars: React.FC<LikedByAvatarsProps> = ({
  users,
  size = "small",
  showCount = true,
  maxAvatars = 4,
}) => {
  const avatarSize = size === "large" ? "w-14 h-14" : "w-10 h-10";
  const textSize = size === "large" ? "text-sm" : "text-xs";

  

  return (
    <div className="flex items-center gap-2">
      <div className="flex -space-x-2">
        {users.slice(0, maxAvatars).map((user) => (
          <div
            key={user.userId}
            className={`relative ${avatarSize} bg-amber-100 rounded-full flex items-center justify-center border-2 border-white`}
          >
            <span className={`text-amber-600 ${textSize} font-medium`}>
              {user.userName[0].toUpperCase()}
            </span>
          </div>
        ))}
        {users.length > maxAvatars && (
          <div
            className={`relative ${avatarSize} rounded-full bg-gray-100 flex items-center justify-center ${textSize} text-gray-600 border-2 border-white`}
          >
            +{users.length - maxAvatars}
          </div>
        )}
      </div>
      {showCount && (
        <span className={`${textSize} text-gray-500 hidden sm:inline`}>
          {size === "large"
            ? `Polubione przez ${users.length} osób`
            : users.length}
        </span>
      )}
    </div>
  );
};
