import { useCallback } from 'react';
import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Playlist } from '../types';

export const usePlaylistDnd = (playlist: Playlist, onReorder: (playlistId: string, newOrder: string[]) => void) => {
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) return;
    
    const oldIndex = playlist.songs.indexOf(active.id as string);
    const newIndex = playlist.songs.indexOf(over.id as string);
    
    if (oldIndex !== newIndex) {
      const newOrder = arrayMove(playlist.songs, oldIndex, newIndex);
      onReorder(playlist.id, newOrder);
    }
  }, [playlist, onReorder]);

  return { handleDragEnd };
};
