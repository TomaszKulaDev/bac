export interface PolishArtist {
  id: string;
  name: string;
  image: string;
  city: string;
  school: string;
  isActive?: boolean;
  specialty?: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
}
