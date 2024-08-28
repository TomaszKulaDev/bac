// src/lib/authMiddleware.ts

import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { AuthenticatedNextApiRequest, UserPayload } from "@/types/next-auth";

export const authMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const authHeader = req.headers.authorization;

  console.log("Auth Middleware invoked");
  console.log("Authorization header received:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log(
      "Missing or malformed authorization header. AuthHeader:",
      authHeader
    );
    return res
      .status(401)
      .json({ message: "Authentication token missing or malformed" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Extracted token from header:", token);

  if (!token) {
    console.log(
      "Token is missing after splitting the header. AuthHeader:",
      authHeader
    );
    return res.status(401).json({ message: "Authentication token missing" });
  }

  console.log("Verifying token...");
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as UserPayload;
    console.log("JWT successfully verified. Decoded payload:", decoded);

    (req as AuthenticatedNextApiRequest).user = decoded;
    console.log(
      "User payload attached to request:",
      (req as AuthenticatedNextApiRequest).user
    );
    next();
  } catch (error) {
    console.error("JWT verification error. Token:", token);
    console.error("JWT_SECRET used:", process.env.JWT_SECRET);
    console.error("Error details:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
