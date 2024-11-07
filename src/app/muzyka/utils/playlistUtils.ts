export const normalizePlaylist = (playlist: any) => {
    return {
      _id: playlist._id || playlist.id,
      name: playlist.name,
      songs: playlist.songs,
      createdAt: playlist.createdAt ? new Date(playlist.createdAt) : new Date()
    };
  };
  
  export const normalizePlaylists = (playlists: any[]) => {
    return playlists.map(normalizePlaylist);
  };