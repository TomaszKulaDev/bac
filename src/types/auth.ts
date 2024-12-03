export interface UserBasicInfo {
  id: string;
  name: string;
  email: string | null;
  role: string;
  image?: string | null;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserBasicInfo | null;
}

export const mapSessionToUser = (sessionUser: any): UserBasicInfo => ({
  id: sessionUser.id,
  name: sessionUser.name || 'Użytkownik',
  email: sessionUser.email,
  role: sessionUser.role || 'user',
  image: sessionUser.image
}); 