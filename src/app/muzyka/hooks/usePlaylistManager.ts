import { useState } from 'react';
import { Playlist } from '../types';

export const usePlaylistManager = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isPlaylistManagerVisible, setIsPlaylistManagerVisible] = useState(false);

  const handlePlaylistCreated = async (newPlaylist: Playlist) => {
    setPlaylists(prev => [...prev, newPlaylist]);
    setIsPlaylistManagerVisible(true);
  };

  const refreshPlaylists = async () => {
    if (!isAuthenticated) {
      return;
    }
    try {
      const response = await fetch('/api/playlists');
      if (!response.ok) throw new Error('Failed to fetch playlists');
      const data = await response.json();
      setPlaylists(data);
    } catch (error) {
      console.error('Error fetching playlists:', error);
    }
  };

  return {
    playlists,
    setPlaylists,
    isPlaylistManagerVisible,
    setIsPlaylistManagerVisible,
    handlePlaylistCreated,
    refreshPlaylists
  };
};