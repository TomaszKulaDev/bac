export interface UserBasicInfo {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string | null;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserBasicInfo | null;
}

export const mapSessionToUser = (sessionUser: any): UserBasicInfo => {
  if (!sessionUser.email) {
    throw new Error("Email is required");
  }

  return {
    id: sessionUser.id,
    name: sessionUser.name || "Użytkownik",
    email: sessionUser.email,
    role: sessionUser.role || "user",
    image: sessionUser.image,
  };
};
