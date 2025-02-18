import React, { useRef, useState, useEffect } from "react";
import { BachataVideo } from "../../types/video";
import { useVideoVisibility } from "../../hooks/useVideoVisibility";
import { InstructorHeader } from "./InstructorHeader";
import { VideoActions } from "./VideoActions";
import Image from "next/image";

interface VideoCardProps {
  video: BachataVideo;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const {
    videoRef,
    containerRef,
    isPlaying,
    isMuted,
    isFullscreen,
    isControlsVisible,
    setIsMuted,
    togglePlay,
    toggleFullscreen,
    handleMouseMove,
  } = useVideoVisibility();

  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const clickCountRef = useRef(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (!video.duration) return;
      const currentProgress = (video.currentTime / video.duration) * 100;
      setProgress(currentProgress);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [videoRef]);

  const handleVideoClick = () => {
    clickCountRef.current += 1;

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    clickTimeoutRef.current = setTimeout(() => {
      if (clickCountRef.current === 1) {
        togglePlay();
      } else if (clickCountRef.current === 2) {
        toggleFullscreen();
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

  // Generujemy URL do pierwszej klatki wideo
  const firstFrameUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/w_640,h_800,c_fill,so_0/${video.publicId}.jpg`;

  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-sm">
      <InstructorHeader video={video} />

      <div
        ref={containerRef}
        className={`relative aspect-[4/5] cursor-pointer group ${
          isFullscreen ? "fixed inset-0 z-50 aspect-auto" : ""
        }`}
        onClick={handleVideoClick}
        onMouseMove={handleMouseMove}
      >
        {/* Pierwsza klatka jako tło */}
        <div className="absolute inset-0">
          <Image
            src={firstFrameUrl}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority
          />
        </div>

        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full ${
            isFullscreen ? "object-contain" : "object-cover"
          } ${isPlaying ? "opacity-100" : "opacity-0"}`}
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

        {/* Kontrolki */}
        <div
          className={`absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-b from-black/50 via-transparent to-black/50 transition-opacity duration-300
            ${
              isControlsVisible || !isFullscreen ? "opacity-100" : "opacity-0"
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Górne kontrolki */}
          <div className="flex justify-end">
            <button
              className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all"
              onClick={() => setIsMuted(!isMuted)}
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

          {/* Dolne kontrolki */}
          <div className="flex justify-between items-center">
            <button
              className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <button
              className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all"
              onClick={toggleFullscreen}
            >
              {isFullscreen ? (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Uproszczony pasek postępu z płynną animacją */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200/30">
          <div
            className="h-full bg-orange-500 transition-all duration-200 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {!isFullscreen && <VideoActions video={video} onShare={handleShare} />}
    </article>
  );
};
