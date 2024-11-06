import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentSongIndex } from '@/store/slices/features/songsSlice';
import type { Song, Playlist, RepeatMode, SortByType } from '../types';
import { useSongNavigation } from './useSongNavigation';

interface UsePlaybackControlsProps {
  player: any;
  isPlayerReady: boolean;
  currentSong: Song;
  songs: Song[];
  sortedSongs: Song[];
  playlists: Playlist[];
  currentPlaylistId: string | null;
  setIsPlaying: (playing: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  repeatMode: RepeatMode;
  isPlaying: boolean;
  setCurrentPlaylistId: (id: string | null) => void;
  showErrorToast?: (message: string) => void;
  sortBy: SortByType;
}

export const usePlaybackControls = ({
  player,
  isPlayerReady,
  currentSong,
  songs,
  sortedSongs,
  playlists,
  currentPlaylistId,
  setIsPlaying,
  setIsLoading,
  repeatMode,
  isPlaying,
  setCurrentPlaylistId,
  showErrorToast,
  sortBy
}: UsePlaybackControlsProps) => {
  const { nextSong, previousSong } = useSongNavigation({
    currentSong,
    songs,
    sortedSongs,
    playlists,
    currentPlaylistId,
    repeatMode,
    setIsPlaying,
    setIsLoading,
    setCurrentPlaylistId,
    sortBy
  });

  const togglePlayback = useCallback(() => {
    if (!player || !isPlayerReady) {
      console.warn('Player nie jest gotowy');
      return;
    }
    
    try {
      if (isPlaying) {
        player.pauseVideo().catch((error: Error) => {
          console.error('Błąd podczas pauzowania:', error);
          setIsPlaying(false);
        });
      } else {
        player.playVideo().catch((error: Error) => {
          console.error('Błąd podczas odtwarzania:', error);
          showErrorToast?.('Nie udało się rozpocząć odtwarzania');
        });
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Błąd podczas przełączania odtwarzania:', error);
      setIsPlaying(false);
    }
  }, [player, isPlaying, isPlayerReady, setIsPlaying, showErrorToast]);

  return {
    previousSong,
    togglePlayback,
    nextSong
  };
};
