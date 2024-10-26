import { YouTubeError } from '../utils/youtube';

export const useYouTubeError = (showErrorToast: (message: string) => void) => {
  const handleYouTubeError = (error: unknown) => {
    if (error instanceof YouTubeError) {
      showErrorToast(`Błąd YouTube: ${error.message}`);
      console.error('Szczegóły błędu YouTube:', {
        code: error.code,
        message: error.message,
        details: error.details
      });
    } else {
      showErrorToast('Wystąpił nieoczekiwany błąd');
      console.error('Nieobsługiwany błąd:', error);
    }
  };

  return { handleYouTubeError };
};

