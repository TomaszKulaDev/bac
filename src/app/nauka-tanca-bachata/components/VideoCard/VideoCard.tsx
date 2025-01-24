import React, { useState, useRef } from "react";
import {
  BachataVideo,
  DANCE_LEVELS,
  DANCE_CATEGORIES,
  Category,
} from "../../types/video";
import { useVideoVisibility } from "../../hooks/useVideoVisibility";
import { InstructorHeader } from "./InstructorHeader";
import { VideoActions } from "./VideoActions";
import { FullscreenVideo } from "./FullscreenVideo";

interface VideoCardProps {
  video: BachataVideo;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const { videoRef, isPlaying, isMuted, setIsMuted, togglePlay } =
    useVideoVisibility();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const clickCountRef = useRef(0);

  const handleVideoClick = () => {
    clickCountRef.current += 1;

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    clickTimeoutRef.current = setTimeout(() => {
      if (clickCountRef.current === 1) {
        // Pojedyncze kliknięcie - play/pause
        togglePlay();
      } else if (clickCountRef.current === 2) {
        // Podwójne kliknięcie - fullscreen
        setIsFullscreen(true);
      }
      clickCountRef.current = 0;
    }, 300);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: video.title,
          text: `Naucz się bachaty z ${video.instructorName}`,
          url: window.location.href,
        })
        .catch(console.error);
    }
  };

  const handleSave = () => {
    console.log("Zapisano:", video.title);
  };

  return (
    <>
      <article className="bg-white rounded-lg overflow-hidden shadow-sm">
        <InstructorHeader video={video} />

        {/* Kontener wideo */}
        <div
          className="relative aspect-[4/5] bg-black cursor-pointer group"
          onClick={handleVideoClick}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            poster={video.thumbnailUrl}
            playsInline
            loop
            muted={isMuted}
            preload="metadata"
          >
            <source
              src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/${video.publicId}`}
              type="video/mp4"
            />
          </video>

          {/* Kontrolka głośności */}
          <button
            className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              setIsMuted(!isMuted);
            }}
          >
            {isMuted ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
              </svg>
            )}
          </button>
        </div>

        <VideoActions video={video} onShare={handleShare} onSave={handleSave} />
      </article>

      <FullscreenVideo
        video={video}
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        videoRef={videoRef}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />
    </>
  );
};
