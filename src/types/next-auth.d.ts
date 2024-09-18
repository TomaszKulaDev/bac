// src/types/next-auth.d.ts

import { NextApiRequest } from "next";
import { DefaultSession } from "next-auth";

declare module "next" {
  interface NextApiRequest {
    user?: DefaultSession["user"];
  }
}

export interface UserPayload {
  id: string;
  name: string;
  email: string;
}

export interface AuthenticatedNextApiRequest extends NextApiRequest {
  user: UserPayload;
}

import "next-auth";

declare module "next-auth" {
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
