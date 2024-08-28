// src/pages/api/users/me.ts

import type { NextApiResponse } from "next";
import { AuthenticatedNextApiRequest } from "@/types/next-auth";
import connectToDatabase from "@/lib/mongodb";
import { authMiddleware } from "@/lib/authMiddleware";
import User from "@/models/User";

export default async function handler(
  req: AuthenticatedNextApiRequest,
  res: NextApiResponse
) {
  console.log("Handler invoked");

  if (req.method !== "GET") {
    console.log("Invalid method:", req.method);
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectToDatabase();
    console.log("Connected to database");

    // Middleware authMiddleware jest teraz wywoływane przed właściwą obsługą żądania
    authMiddleware(req, res, async () => {
      console.log("Auth middleware passed, user data:", req.user);
      const user = req.user; // Zakładamy, że `authMiddleware` dodało `user` do `req`

      if (!user) {
        console.log("User not authenticated");
        return res.status(401).json({ message: "User not authenticated" });
      }

      // Pobieramy dane użytkownika z bazy, jeśli potrzebujemy więcej danych
      const userDetails = await User.findById(user.id);
      console.log("User details retrieved:", userDetails);

      if (!userDetails) {
        console.log("User not found with ID:", user.id);
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        id: userDetails._id,
        name: userDetails.name,
        email: userDetails.email,
      });
    });
  } catch (error) {
    console.error("Fetching user data error:", error);
    res.status(500).json({ message: "Failed to fetch user data", error });
  }
}
