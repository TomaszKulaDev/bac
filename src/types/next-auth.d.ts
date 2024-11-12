// src/types/next-auth.d.ts

import { NextApiRequest } from "next";
import { DefaultSession } from "next-auth";

// Rozszerzenie interfejsu NextApiRequest o opcjonalne pole user
declare module "next" {
  interface NextApiRequest {
    user?: DefaultSession["user"];
  }
}

// Interfejs reprezentujący dane użytkownika
export interface UserPayload {
  id: string; // ID użytkownika
  name: string; // Nazwa użytkownika
  email: string; // Email użytkownika
}

// Rozszerzenie NextApiRequest o wymagane pole user z typem UserPayload
export interface AuthenticatedNextApiRequest extends NextApiRequest {
  user: UserPayload; // Dane uwierzytelnionego użytkownika
}

import "next-auth";

// Rozszerzenie interfejsu Session z next-auth o dodatkowe pola użytkownika
declare module "next-auth" {
  interface User {
    role: string;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}
