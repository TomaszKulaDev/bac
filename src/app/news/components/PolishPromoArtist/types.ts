export interface PolishArtist {
  id: string;
  name: string;
  image: string;
  city: string;
  school: string;
  isActive?: boolean;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
  };
}
