// src/lib/authMiddleware.ts

import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const authMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    (req as any).user = session.user;
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
