import { ValidationResult, SongValidation } from '../types/validation';

export const useValidation = () => {
  const validateSong = (song: Partial<SongValidation>): ValidationResult => {
    const errors: string[] = [];
    
    if (!song.title || typeof song.title !== 'string') {
      errors.push('Tytuł jest wymagany');
    }
    
    if (!song.artist || typeof song.artist !== 'string') {
      errors.push('Artysta jest wymagany');
    }
    
    if (!song.youtubeLink || typeof song.youtubeLink !== 'string') {
      errors.push('Link do YouTube jest wymagany');
    }
    
    if (typeof song.impro !== 'boolean') {
      errors.push('Pole impro musi być typu boolean');
    }
    
    if (typeof song.beginnerFriendly !== 'boolean') {
      errors.push('Pole beginnerFriendly musi być typu boolean');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  return { validateSong };
};

