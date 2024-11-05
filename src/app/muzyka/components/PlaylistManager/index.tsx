import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { PlaylistManagerProps } from '../../types';
import PlaylistManagerContent from './PlaylistManagerContent';
import { useDragSensors } from '../../hooks/useDragSensors';
import { usePlaylistManagement } from '../../hooks/usePlaylistManagement';
import { DragEndEvent } from '@dnd-kit/core';
import { Playlist, Song } from '../../types';
import { useSensors, useSensor, PointerSensor } from '@dnd-kit/core';

const PlaylistManager: React.FC<PlaylistManagerProps> = ({
  isAuthenticated,
  setCurrentPlaylistId,
  ...props
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const getSongDetails = (songId: string): Song | undefined => 
    props.songs.find((song) => song._id === songId || song.id === songId);

  const playlistManagement = usePlaylistManagement({
    ...props,
    isAuthenticated,
    setCurrentPlaylistId
  });

  return (
    <PlaylistManagerContent
      {...props}
      isAuthenticated={isAuthenticated}
      setCurrentPlaylistId={setCurrentPlaylistId}
      sensors={sensors}
      getSongDetails={getSongDetails}
      onDragEnd={(event, playlist) => 
        playlistManagement.handleDragEnd(event, playlist)
      }
    />
  );
};

export default PlaylistManager;