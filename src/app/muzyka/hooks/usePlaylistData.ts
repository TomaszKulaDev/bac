import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPlaylists, setPlaylistError, setPlaylistLoading } from '@/store/slices/features/playlistSlice';
import { ErrorLogBuffer } from '../utils/ErrorLogBuffer';

const CACHE_KEY = 'playlists_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minut

export const usePlaylistData = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const dispatch = useDispatch();
  const errorBuffer = ErrorLogBuffer.getInstance();

  const getCachedData = () => {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_DURATION) {
      sessionStorage.removeItem(CACHE_KEY);
      return null;
    }
    return data;
  };

  const fetchPlaylists = useCallback(async () => {
    if (!isAuthenticated) {
      dispatch(setPlaylists([]));
      dispatch(setPlaylistLoading(false));
      return;
    }

    try {
      dispatch(setPlaylistLoading(true));
      
      const cachedData = getCachedData();
      if (cachedData) {
        dispatch(setPlaylists(cachedData));
        dispatch(setPlaylistLoading(false));
        return;
      }

      const response = await fetch('/api/playlists');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      dispatch(setPlaylists(data));
      
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({
        data,
        timestamp: Date.now()
      }));

    } catch (error) {
      errorBuffer.add({
        type: "general",
        severity: "error",
        message: "Błąd pobierania playlist",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "development",
        details: {
          
          stack: error instanceof Error ? error.stack : undefined,
          retryCount: 0,
        
          additionalInfo: { 
            message: error instanceof Error ? error.message : 'Nieznany błąd'
          }
        }
      });
      
      dispatch(setPlaylistError(error instanceof Error ? error.message : 'Nieznany błąd'));
    } finally {
      dispatch(setPlaylistLoading(false));
    }
  }, [dispatch, isAuthenticated, errorBuffer]);

  return { fetchPlaylists };
};
