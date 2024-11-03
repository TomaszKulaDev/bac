export const mockChartsData = {
    topLikedSongs: [
      {
        id: '1',
        title: 'Bachata Rosa',
        artist: 'Juan Luis Guerra',
        thumbnail: 'https://example.com/thumb1.jpg',
        likesCount: 15234,
        likedBy: [
          { id: '1', name: 'Anna K.', avatar: 'https://i.pravatar.cc/150?img=1' },
          { id: '2', name: 'Marek W.', avatar: 'https://i.pravatar.cc/150?img=2' }
        ],
        trend: 'up',
        lastWeekPosition: 3
      },
      // ... więcej przykładowych piosenek
    ],
    topPlaylists: [
      {
        id: 'p1',
        name: 'Najlepsza Bachata 2024',
        createdBy: {
          id: 'u1',
          name: 'DJ Carlos',
          avatar: 'https://i.pravatar.cc/150?img=10'
        },
        thumbnail: 'https://example.com/playlist1.jpg',
        likesCount: 5432,
        songsCount: 45,
        followers: 1234,
        trend: 'up',
        lastWeekPosition: 2
      },
      // ... więcej przykładowych playlist
    ]
  };