export interface PolishArtist {
  id: string;
  name: string;
  image: string;
  city: string;
  school: string;
  isActive?: boolean;
  specialty?: string;
  experience?: number; // lata doświadczenia
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
}
