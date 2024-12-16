import React, { useEffect } from "react";
import { TrackInfo } from "./TrackInfo";
import { PlaybackControls } from "./PlaybackControls";
import { SeekBar } from "./SeekBar";
import { VolumeControl } from "./VolumeControl";
import ActionButtons from "./ActionButtons";
import { Song, RepeatMode } from "../../types";

interface PlaybackBarProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onPrevious: () => void;
  onNext: () => void;
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
  currentSong: Song | null;
  repeatMode: RepeatMode;
  onToggleRepeatMode: (mode: "song" | "playlist") => void;
  onAddToPlaylist: (songId: string) => void;
  onLike: (songId: string) => void;
  isLiked: boolean;
  hasPlaylistsAndExpanded: boolean;
  onCreatePlaylist: () => void;
  playlistCount: number;
  isAuthenticated: boolean;
  isLoading?: boolean;
}

const PlaybackBar: React.FC<PlaybackBarProps> = ({
  isPlaying,
  onTogglePlay,
  onPrevious,
  onNext,
  currentTime,
  duration,
  onSeek,
  volume,
  onVolumeChange,
  currentSong,
  repeatMode,
  onToggleRepeatMode,
  onAddToPlaylist,
  onLike,
  isLiked,
  hasPlaylistsAndExpanded,
  onCreatePlaylist,
  playlistCount,
  isAuthenticated,
  isLoading = false,
}) => {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-lg z-50 px-4 py-2"
      role="region"
      aria-label="Kontrolki odtwarzacza"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-1 sm:gap-2">
        <TrackInfo
          currentSong={
            currentSong
              ? {
                  id: currentSong.id,
                  title: currentSong.title,
                  artist: currentSong.artist,
                  thumbnail: currentSong.thumbnail || "",
                }
              : null
          }
        />

        <div className="w-full sm:w-2/5 flex flex-col items-center gap-1">
          <PlaybackControls
            isPlaying={isPlaying}
            onTogglePlay={onTogglePlay}
            onPrevious={onPrevious}
            onNext={onNext}
            repeatMode={repeatMode}
            onToggleRepeatMode={onToggleRepeatMode}
            isLoading={isLoading}
          />
          <SeekBar
            currentTime={currentTime}
            duration={duration}
            onSeek={onSeek}
          />
        </div>

        <div className="w-full sm:w-1/4 flex justify-between sm:justify-end items-center">
          <div className="sm:hidden ml-0">
            <VolumeControl volume={volume} onVolumeChange={onVolumeChange} />
          </div>

          <div className="flex justify-end">
            <ActionButtons
              currentSongId={currentSong?.id}
              onCreatePlaylist={onCreatePlaylist}
              onAddToPlaylist={onAddToPlaylist}
              playlistCount={playlistCount}
              hasPlaylistsAndExpanded={hasPlaylistsAndExpanded}
              isAuthenticated={isAuthenticated}
            />
          </div>

          <div className="hidden sm:block">
            <VolumeControl volume={volume} onVolumeChange={onVolumeChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaybackBar;
