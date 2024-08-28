// src/types/next-auth.d.ts

import { NextApiRequest } from "next";

export interface UserPayload {
  id: string;
  name: string;
  email: string;
}

export interface AuthenticatedNextApiRequest extends NextApiRequest {
  user: UserPayload;
}
