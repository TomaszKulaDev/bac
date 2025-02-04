import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { DANCE_LEVELS, DANCE_CATEGORIES } from "../../types/video";
import type { BachataVideo } from "../../types/video";

interface InstructorHeaderProps {
  video: BachataVideo;
}

export const InstructorHeader: React.FC<InstructorHeaderProps> = ({
  video,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleShare = () => {
    // TODO: Implementacja udostępniania
    if (navigator.share) {
      navigator
        .share({
          title: video.title,
          text: `Naucz się bachaty z ${video.instructorName}`,
          url: window.location.href,
        })
        .catch(console.error);
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="p-3 flex items-start justify-between border-b relative">
      <div className="flex items-start space-x-4">
        <div className="relative">
          {/* Instagram gradient: fiolet -> róż -> żółty -> pomarańcz */}
          <div className="absolute -inset-[2px] bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] rounded-full animate-gradient-slow" />
          <div className="relative w-12 h-12 rounded-full border-2 border-white overflow-hidden">
            <Image
              src={video.instructorAvatarUrl || "/default-avatar.png"}
              alt={video.instructorName || "Instruktor"}
              fill
              sizes="48px"
              className="object-cover"
              priority
            />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{video.instructorName}</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-600">
              {DANCE_CATEGORIES[video.category]}
            </span>
          </div>
        </div>
      </div>

      {/* Przycisk z trzema kropkami */}
      <div className="relative">
        <button
          ref={buttonRef}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="4" r="2" />
            <circle cx="12" cy="20" r="2" />
          </svg>
        </button>

        {/* Menu kontekstowe */}
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10 border"
          >
            <button
              onClick={handleShare}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
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
              Udostępnij
            </button>
            <button
              onClick={() => {
                /* TODO: Implementacja kopiowania linku */
                setIsMenuOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                />
              </svg>
              Kopiuj link
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
