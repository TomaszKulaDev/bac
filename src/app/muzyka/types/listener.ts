export interface Listener {
  id: string;
  userId: string;
  deviceId: string;
  lastActive: number;
  currentSong?: string;
  isPlaying: boolean;
  deviceType: "mobile" | "desktop" | "tablet";
}

export interface ListenerState {
  activeListeners: Listener[];
  lastCleanup: number;
}
