import { createAction } from '@reduxjs/toolkit';

export const updatePlaylistOrder = createAction<{
  playlistId: string;
  newOrder: string[];
}>('playlist/updateOrder');

export const updateSongsPlaylists = createAction<{
  songIds: string[];
  playlistId: string;
  playlistName: string;
  remove?: boolean;
}>('playlist/updateSongsPlaylists'); 