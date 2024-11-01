import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentSongIndex } from '@/store/slices/features/songsSlice';
import type { Song, Playlist, RepeatMode } from '../types';

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
  isPlaying
}: UsePlaybackControlsProps) => {
  const dispatch = useDispatch();

  const previousSong = useCallback(() => {
    if (!currentSong) return;

    if (currentPlaylistId) {
      const currentPlaylist = playlists.find(p => p.id === currentPlaylistId);
      if (currentPlaylist) {
        const currentIndex = currentPlaylist.songs.indexOf(currentSong.id);
        const prevIndex = currentIndex === 0 
          ? currentPlaylist.songs.length - 1 
          : currentIndex - 1;
        const prevSongId = currentPlaylist.songs[prevIndex];
        dispatch(setCurrentSongIndex(songs.findIndex(s => s.id === prevSongId)));
      }
    } else {
      const currentIndex = songs.findIndex(s => s.id === currentSong.id);
      const prevIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
      dispatch(setCurrentSongIndex(prevIndex));
    }
    setIsPlaying(true);
    setIsLoading(true);
  }, [currentPlaylistId, playlists, currentSong, songs, dispatch, setIsPlaying, setIsLoading]);

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

  const nextSong = useCallback(() => {
    if (!currentSong) return;

    try {
      if (currentPlaylistId) {
        const currentPlaylist = playlists.find(p => p.id === currentPlaylistId);
        if (currentPlaylist) {
          const currentIndex = currentPlaylist.songs.indexOf(currentSong.id);
          if (repeatMode.song === "on") {
            dispatch(setCurrentSongIndex(songs.findIndex(s => s.id === currentSong.id)));
          } else {
            const nextIndex = (currentIndex + 1) % currentPlaylist.songs.length;
            const nextSongId = currentPlaylist.songs[nextIndex];
            dispatch(setCurrentSongIndex(songs.findIndex(s => s.id === nextSongId)));
          }
        }
      } else {
        const currentIndex = songs.findIndex(s => s.id === currentSong.id);
        if (repeatMode.song === "on") {
          dispatch(setCurrentSongIndex(currentIndex));
        } else {
          const nextIndex = (currentIndex + 1) % songs.length;
          dispatch(setCurrentSongIndex(nextIndex));
        }
      }
      setIsPlaying(true);
      setIsLoading(true);
    } catch (error) {
      console.error('Błąd podczas przechodzenia do następnego utworu:', error);
    }
  }, [currentPlaylistId, playlists, currentSong, songs, repeatMode.song, dispatch, setIsPlaying, setIsLoading]);

  return {
    previousSong,
    togglePlayback,
    nextSong
  };
};
