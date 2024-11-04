import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setCurrentSongIndex } from "@/store/slices/features/songsSlice";
import type { Song, Playlist, RepeatMode } from "../types";

interface UseSongNavigationProps {
  currentSong: Song | null;
  songs: Song[];
  playlists: Playlist[];
  currentPlaylistId: string | null;
  repeatMode: RepeatMode;
  setIsPlaying: (isPlaying: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setCurrentPlaylistId: (id: string | null) => void;
  sortedSongs: Song[];
}

export const useSongNavigation = ({
  currentSong,
  songs,
  playlists,
  currentPlaylistId,
  repeatMode,
  setIsPlaying,
  setIsLoading,
  setCurrentPlaylistId,
  sortedSongs,
}: UseSongNavigationProps) => {
  const dispatch = useDispatch();

  const findSongIndexInPlaylist = useCallback(
    (songId: string, playlist: Playlist) => {
      return playlist.songs.indexOf(songId);
    },
    []
  );

  const findSongIndexInMainList = useCallback(
    (songId: string) => {
      return songs.findIndex((s) => s.id === songId);
    },
    [songs]
  );

  const navigateInPlaylist = useCallback(
    (direction: "next" | "previous") => {
      if (!currentSong || !currentPlaylistId) return -1;

      const playlist = playlists.find((p) => p.id === currentPlaylistId);
      if (!playlist) return -1;

      const currentIndex = findSongIndexInPlaylist(currentSong.id, playlist);

      if (direction === "next") {
        if (repeatMode.song === "on") {
          return findSongIndexInMainList(currentSong.id);
        }
        const nextIndex = (currentIndex + 1) % playlist.songs.length;
        return findSongIndexInMainList(playlist.songs[nextIndex]);
      } else {
        const prevIndex =
          currentIndex === 0 ? playlist.songs.length - 1 : currentIndex - 1;
        return findSongIndexInMainList(playlist.songs[prevIndex]);
      }
    },
    [
      currentSong,
      currentPlaylistId,
      playlists,
      repeatMode.song,
      findSongIndexInPlaylist,
      findSongIndexInMainList,
    ]
  );

  const navigateInMainList = useCallback(
    (direction: "next" | "previous") => {
      if (!currentSong || sortedSongs.length === 0) return -1;

      const currentSortedIndex = sortedSongs.findIndex(s => s.id === currentSong.id);
      if (currentSortedIndex === -1) return -1;
      
      if (direction === "next") {
        if (repeatMode.song === "on") {
          return findSongIndexInMainList(currentSong.id);
        }
        const nextSortedIndex = (currentSortedIndex + 1) % sortedSongs.length;
        return findSongIndexInMainList(sortedSongs[nextSortedIndex].id);
      } else {
        const prevSortedIndex = currentSortedIndex === 0 
          ? sortedSongs.length - 1 
          : currentSortedIndex - 1;
        return findSongIndexInMainList(sortedSongs[prevSortedIndex].id);
      }
    },
    [currentSong, sortedSongs, repeatMode.song, findSongIndexInMainList]
  );

  const navigate = useCallback(
    (direction: "next" | "previous") => {
      try {
        const newIndex = currentPlaylistId
          ? navigateInPlaylist(direction)
          : navigateInMainList(direction);

        if (newIndex !== -1) {
          dispatch(setCurrentSongIndex(newIndex));
          setIsPlaying(true);
          setIsLoading(true);
        }
      } catch (error) {
        console.error(`Błąd podczas nawigacji ${direction}:`, error);
      }
    },
    [
      currentPlaylistId,
      navigateInPlaylist,
      navigateInMainList,
      dispatch,
      setIsPlaying,
      setIsLoading,
    ]
  );

  const playPlaylist = useCallback(
    (playlistId: string) => {
      setCurrentPlaylistId(playlistId);
      const playlist = playlists.find((p) => p.id === playlistId);
      if (playlist && playlist.songs.length > 0) {
        const firstSongIndex = findSongIndexInMainList(playlist.songs[0]);
        if (firstSongIndex !== -1) {
          dispatch(setCurrentSongIndex(firstSongIndex));
          setIsPlaying(true);
          setIsLoading(true);
        }
      }
    },
    [
      playlists,
      findSongIndexInMainList,
      dispatch,
      setIsPlaying,
      setIsLoading,
      setCurrentPlaylistId,
    ]
  );

  return {
    nextSong: () => navigate("next"),
    previousSong: () => navigate("previous"),
    getCurrentIndex: () =>
      currentSong ? findSongIndexInMainList(currentSong.id) : -1,
    playPlaylist,
  };
};
