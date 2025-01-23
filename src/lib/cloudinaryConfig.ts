export const CLOUDINARY_FOLDERS = {
  "/nauka-tanca-bachata": "NaukaZinstagrama",
  // ... inne ścieżki
} as const;

export type CloudinaryFolder =
  (typeof CLOUDINARY_FOLDERS)[keyof typeof CLOUDINARY_FOLDERS];
