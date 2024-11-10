import { useState, useCallback } from "react";
import { IMAGES } from "../constants/images";
import { getYouTubeThumbnail } from "../utils/youtube";

export const useImageFallback = (
  youtubeId: string,
  defaultImage = IMAGES.DEFAULT_ALBUM_ART
) => {
  const [hasError, setHasError] = useState(false);

  const handleError = useCallback(() => {
    if (!hasError) {
      setHasError(true);
    }
  }, [hasError]);

  const imageSrc = hasError ? defaultImage : getYouTubeThumbnail(youtubeId);

  return { imageSrc, handleError };
};
