// Nowy plik z regułami walidacji
export const PLAYLIST_VALIDATION = {
    TITLE_MIN_LENGTH: 3,
    TITLE_MAX_LENGTH: 50,
    ERROR_MESSAGES: {
      TOO_SHORT: 'Nazwa playlisty musi mieć co najmniej 3 znaki',
      TOO_LONG: 'Nazwa playlisty nie może przekraczać 50 znaków',
      REQUIRED: 'Nazwa playlisty jest wymagana'
    }
  };
  
  export const validatePlaylistTitle = (title: string): { isValid: boolean; error?: string } => {
    if (!title.trim()) {
      return { isValid: false, error: PLAYLIST_VALIDATION.ERROR_MESSAGES.REQUIRED };
    }
    
    if (title.length < PLAYLIST_VALIDATION.TITLE_MIN_LENGTH) {
      return { isValid: false, error: PLAYLIST_VALIDATION.ERROR_MESSAGES.TOO_SHORT };
    }
    
    if (title.length > PLAYLIST_VALIDATION.TITLE_MAX_LENGTH) {
      return { isValid: false, error: PLAYLIST_VALIDATION.ERROR_MESSAGES.TOO_LONG };
    }
  
    return { isValid: true };
  };