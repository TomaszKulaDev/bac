import {
  YouTubeError,
  YouTubeErrorCode,
  getYouTubeErrorMessage,
} from "../utils/youtube";
import { ErrorLogBuffer } from "../utils/ErrorLogBuffer";
import { BaseErrorLog } from "../utils/errorLogger";
import { BrowserInfo, ErrorDetails } from '../types/errors';

const getBrowserInfo = (): BrowserInfo => ({
  userAgent: navigator.userAgent,
  platform: navigator.platform,
  language: navigator.language,
  screenResolution: `${screen.width}x${screen.height}`,
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
});

export const useYouTubeError = (showErrorToast: (message: string) => void) => {
  const errorBuffer = ErrorLogBuffer.getInstance();

  const logErrorDetails = (details: ErrorDetails): void => {
    const errorLog: BaseErrorLog = {
      type: "youtube",
      severity: "error",
      message: details.message,
      timestamp: details.timestamp,
      environment: process.env.NODE_ENV || "development",
      details: {
        code: details.code,
        additionalInfo: {
          browserInfo: details.browserInfo,
        },
      },
    };

    errorBuffer.add(errorLog);
  };

  const createErrorDetails = (error: YouTubeError): ErrorDetails => {
    return {
      code: error.code,
      message: error.message,
      details: error.details,
      timestamp: new Date().toISOString(),
      browserInfo: getBrowserInfo(),
    };
  };

  const getLocalizedErrorMessage = (error: YouTubeError): string => {
    const baseMessage = getYouTubeErrorMessage(error.code);
    const details = error.details ? `: ${error.details}` : "";
    return `${baseMessage}${details}`;
  };

  const handleYouTubeError = (error: unknown): void => {
    try {
      if (error instanceof YouTubeError) {
        const errorDetails = createErrorDetails(error);
        const userMessage = getLocalizedErrorMessage(error);
        
        showErrorToast(userMessage);
        logErrorDetails(errorDetails);

        switch (error.code) {
          case YouTubeErrorCode.VIDEO_NOT_FOUND:
          case YouTubeErrorCode.EMBED_NOT_ALLOWED:
          case YouTubeErrorCode.EMBED_NOT_ALLOWED_2:
            // Możemy tutaj dodać dodatkową logikę dla tych błędów
            break;
        }
      } else {
        const genericError = {
          code: -1,
          message: error instanceof Error ? error.message : "Nieznany błąd",
          timestamp: new Date().toISOString(),
          browserInfo: getBrowserInfo(),
        };

        showErrorToast("Wystąpił nieoczekiwany błąd podczas odtwarzania");
        logErrorDetails(genericError);
      }
    } catch (handlingError) {
      console.error("Błąd podczas obsługi błędu YouTube:", handlingError);
      showErrorToast("Wystąpił krytyczny błąd aplikacji");
    }
  };

  return {
    handleYouTubeError,
    getLocalizedErrorMessage,
    createErrorDetails,
  };
};
