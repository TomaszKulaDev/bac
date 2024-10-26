export enum YouTubeErrorCode {
  INVALID_PARAM = 2,
  HTML5_ERROR = 5,
  VIDEO_NOT_FOUND = 100,
  EMBED_NOT_ALLOWED = 101,
  EMBED_NOT_ALLOWED_2 = 150
}

export class YouTubeError extends Error {
  constructor(
    public code: number,
    public message: string,
    public details?: string
  ) {
    super(message);
    this.name = 'YouTubeError';
  }
}

export const getYouTubeThumbnail = (youtubeId: string): string => {
  try {
    if (!youtubeId) {
      console.warn('Próba pobrania miniatury dla pustego ID YouTube');
      return '/images/default-thumbnail.jpg';
    }
    
    const youtubeIdRegex = /^[a-zA-Z0-9_-]{11}$/;
    if (!youtubeIdRegex.test(youtubeId)) {
      console.warn(`Nieprawidłowy format ID YouTube: ${youtubeId}`);
      return '/images/default-thumbnail.jpg';
    }

    return `https://img.youtube.com/vi/${youtubeId}/0.jpg`;
  } catch (error) {
    console.error('Błąd podczas pobierania miniatury YouTube:', error);
    return '/images/default-thumbnail.jpg';
  }
};

export const getYouTubeErrorMessage = (errorCode: number): string => {
  switch (errorCode) {
    case YouTubeErrorCode.INVALID_PARAM:
      return 'Nieprawidłowy parametr w żądaniu YouTube';
    case YouTubeErrorCode.HTML5_ERROR:
      return 'Film nie może być odtworzony w odtwarzaczu HTML5';
    case YouTubeErrorCode.VIDEO_NOT_FOUND:
      return 'Film nie został znaleziony lub został usunięty';
    case YouTubeErrorCode.EMBED_NOT_ALLOWED:
    case YouTubeErrorCode.EMBED_NOT_ALLOWED_2:
      return 'Właściciel filmu nie zezwala na osadzanie';
    default:
      return `Wystąpił nieoczekiwany błąd YouTube (kod: ${errorCode})`;
  }
};

export const validateYouTubeId = (youtubeId: string): boolean => {
  try {
    const youtubeIdRegex = /^[a-zA-Z0-9_-]{11}$/;
    return youtubeIdRegex.test(youtubeId);
  } catch (error) {
    throw new YouTubeError(
      400,
      'Błąd podczas walidacji ID YouTube',
      error instanceof Error ? error.message : 'Nieznany błąd'
    );
  }
};

export const extractYouTubeId = (url: string): string => {
  try {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /^[a-zA-Z0-9_-]{11}$/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    throw new YouTubeError(
      400,
      'Nieprawidłowy format linku YouTube',
      'Nie można wyodrębnić ID filmu z podanego URL'
    );
  } catch (error) {
    if (error instanceof YouTubeError) {
      throw error;
    }
    throw new YouTubeError(
      500,
      'Błąd podczas przetwarzania linku YouTube',
      error instanceof Error ? error.message : 'Nieznany błąd'
    );
  }
};
