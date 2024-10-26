export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface SongValidation {
  title: string;
  artist: string;
  youtubeLink: string;
  impro: boolean;
  beginnerFriendly: boolean;
}

