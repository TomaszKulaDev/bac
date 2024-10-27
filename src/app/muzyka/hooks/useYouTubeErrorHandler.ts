// src/app/muzyka/hooks/useYouTubeErrorHandler.ts
import { YouTubeError, YouTubeErrorCode, getYouTubeErrorMessage } from "../utils/youtube";

export const useYouTubeErrorHandler = (
  showErrorToast: (message: string) => void
) => {
  const handleYouTubeError = (error: unknown) => {
    if (error instanceof YouTubeError) {
      const errorMessages: Record<YouTubeErrorCode, string> = {
        [YouTubeErrorCode.INVALID_PARAM]: "Nieprawidłowy parametr w żądaniu YouTube",
        [YouTubeErrorCode.HTML5_ERROR]: "Problem z odtwarzaczem HTML5",
        [YouTubeErrorCode.VIDEO_NOT_FOUND]: "Film nie jest dostępny",
        [YouTubeErrorCode.EMBED_NOT_ALLOWED]: "Odtwarzanie tego filmu zostało zablokowane",
        [YouTubeErrorCode.EMBED_NOT_ALLOWED_2]: "Odtwarzanie tego filmu zostało zablokowane"
      };

      const message = errorMessages[error.code as YouTubeErrorCode] || getYouTubeErrorMessage(error.code);
      showErrorToast(message);
      
      console.error('Szczegóły błędu YouTube:', {
        code: error.code,
        message: error.message,
        details: error.details
      });
      
      throw error;
    }

    return error;
  };

  return { handleYouTubeError };
};
