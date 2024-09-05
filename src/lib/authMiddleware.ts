// src/lib/authMiddleware.ts

import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export const authMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const session = await getSession({ req });
  if (session) {
    (req as any).user = session.user;
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
