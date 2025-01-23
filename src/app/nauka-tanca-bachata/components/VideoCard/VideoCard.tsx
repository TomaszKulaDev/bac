import React from "react";
import Image from "next/image";
import {
  BachataVideo,
  DANCE_LEVELS,
  DANCE_CATEGORIES,
  Category,
} from "../../types/video";

interface VideoCardProps {
  video: BachataVideo;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Nagłówek z instruktorem */}
      <div className="p-3 border-b">
        <div className="flex items-center">
          {/* Avatar z gradientem */}
          <div className="relative flex-shrink-0">
            {video.instructorAvatarUrl ? (
              <>
                {/* Instagram-style gradient border */}
                <div className="absolute -inset-[2px] bg-gradient-to-tr from-yellow-400 via-fuchsia-500 to-purple-600 rounded-full animate-gradient-slow" />
                <div className="relative rounded-full w-[40px] h-[40px] border-2 border-white">
                  <Image
                    src={video.instructorAvatarUrl}
                    alt={video.instructorName || "Instruktor"}
                    fill
                    sizes="40px"
                    className="rounded-full object-cover"
                    priority
                  />
                </div>
              </>
            ) : (
              // Placeholder avatar
              <div className="w-[40px] h-[40px] rounded-full bg-gray-200 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            )}
          </div>

          {/* Informacje o instruktorze */}
          <div className="ml-3 flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {video.instructorName || "Instruktor"}
              </p>
              <button className="text-gray-400 hover:text-gray-600">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-500 truncate">
              {DANCE_LEVELS[video.level]} •{" "}
              {DANCE_CATEGORIES[video.category as Category]}
            </p>
          </div>
        </div>
      </div>

      {/* Kontener wideo */}
      <div className="relative aspect-[4/5] bg-black">
        <video
          className="w-full h-full object-contain"
          controls
          preload="metadata"
          poster={video.thumbnailUrl}
        >
          <source
            src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/${video.publicId}`}
            type="video/mp4"
          />
          Twoja przeglądarka nie obsługuje tagu video.
        </video>
      </div>

      {/* Akcje i informacje */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-red-500 transition-colors">
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
            <button className="text-gray-700 hover:text-gray-900 transition-colors">
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </button>
            <button className="text-gray-700 hover:text-gray-900 transition-colors">
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Tytuł i czas trwania */}
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
            {video.title}
          </h3>
          <div className="flex items-center text-xs text-gray-500">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {Math.floor(video.duration / 60)} min
          </div>
        </div>

        {/* Opis */}
        {video.description && (
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {video.description}
          </p>
        )}
      </div>
    </article>
  );
};
