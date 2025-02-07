export interface Listener {
  id: string;
  lastActive: number;
  currentSong?: string;
  isPlaying: boolean;
}

export interface ListenerState {
  activeListeners: Listener[];
  lastCleanup: number;
}
