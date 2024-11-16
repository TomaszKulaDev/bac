// import { useEffect } from 'react';
// import { Playlist, Song } from '../types';

// interface DebugLoggerProps {
//   playlists: Playlist[];
//   songs: Song[];
//   componentName?: string;
//   additionalInfo?: Record<string, any>;
// }

// export const DebugLogger: React.FC<DebugLoggerProps> = ({
//   playlists,
//   songs,
//   componentName = 'Unknown',
//   additionalInfo = {}
// }) => {
//   useEffect(() => {
//     if (process.env.NODE_ENV === 'development') {
//       console.group(`[Debug] ${componentName}`);
//       console.log('Playlists:', playlists);
//       console.log('Songs:', songs);
//       if (Object.keys(additionalInfo).length > 0) {
//         console.log('Additional Info:', additionalInfo);
//       }
//       console.groupEnd();
//     }
//   }, [playlists, songs, componentName, additionalInfo]);

//   return null;
// };