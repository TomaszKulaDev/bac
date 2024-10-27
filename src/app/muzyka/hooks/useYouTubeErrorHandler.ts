// src/app/muzyka/hooks/useYouTubeErrorHandler.ts
import { YouTubeError, YouTubeErrorCode, getYouTubeErrorMessage } from "../utils/youtube";
import { ErrorLogBuffer } from '../utils/ErrorLogBuffer';
import { BaseErrorLog } from '../utils/errorLogger';

export const useYouTubeErrorHandler = (
  showErrorToast: (message: string) => void
) => {
  const errorBuffer = ErrorLogBuffer.getInstance();
  
  const errorMessages: Record<YouTubeErrorCode, string> = {
    [YouTubeErrorCode.INVALID_PARAM]: "Nieprawidłowy parametr w żądaniu YouTube",
    [YouTubeErrorCode.HTML5_ERROR]: "Problem z odtwarzaczem HTML5",
    [YouTubeErrorCode.VIDEO_NOT_FOUND]: "Film nie jest dostępny",
    [YouTubeErrorCode.EMBED_NOT_ALLOWED]: "Odtwarzanie tego filmu zostało zablokowane",
    [YouTubeErrorCode.EMBED_NOT_ALLOWED_2]: "Odtwarzanie tego filmu zostało zablokowane"
  };

  const handleYouTubeError = (error: unknown) => {
    if (error instanceof YouTubeError) {
      const errorLog: BaseErrorLog = {
        type: "youtube",
        severity: "error",
        message: error.message,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        details: {
          code: error.code,
          additionalInfo: {
            details: error.details
          }
        }
      };

      errorBuffer.add(errorLog);
      
      const message = errorMessages[error.code as YouTubeErrorCode] || 
        getYouTubeErrorMessage(error.code);
      showErrorToast(message);
      
      throw error;
    }

    return error;
  };

  return { handleYouTubeError };
};
