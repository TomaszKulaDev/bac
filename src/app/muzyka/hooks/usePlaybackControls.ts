import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentSongIndex } from '@/store/slices/features/songsSlice';
import type { Song, Playlist, RepeatMode } from '../types';
import { useSongNavigation } from './useSongNavigation';

interface UsePlaybackControlsProps {
  player: any;
  isPlayerReady: boolean;
  currentSong: Song;
  songs: Song[];
  playlists: Playlist[];
  currentPlaylistId: string | null;
  setIsPlaying: (playing: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  repeatMode: RepeatMode;
  isPlaying: boolean;
  setCurrentPlaylistId: (id: string | null) => void;
}

export const usePlaybackControls = ({
  player,
  isPlayerReady,
  currentSong,
  songs,
  playlists,
  currentPlaylistId,
  setIsPlaying,
  setIsLoading,
  repeatMode,
  isPlaying,
  setCurrentPlaylistId
}: UsePlaybackControlsProps) => {
  const { nextSong, previousSong } = useSongNavigation({
    currentSong,
    songs,
    playlists,
    currentPlaylistId,
    repeatMode,
    setIsPlaying,
    setIsLoading,
    setCurrentPlaylistId
  });

  const togglePlayback = useCallback(() => {
    if (!player || !isPlayerReady) {
      console.warn('Player nie jest gotowy');
      return;
    }
    
    try {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Błąd podczas przełączania odtwarzania:', error);
    }
  }, [player, isPlaying, isPlayerReady, setIsPlaying]);

  return {
    previousSong,
    togglePlayback,
    nextSong
  };
};
