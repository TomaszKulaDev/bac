declare global {
  interface Window {
    gtag: (
      command: "consent" | "config" | "event",
      action: string,
      params?: any
    ) => void;
  }
}

export {};
