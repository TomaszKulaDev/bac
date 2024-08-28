import type { NextApiRequest, NextApiResponse } from "next";
import { AuthenticatedNextApiRequest } from "@/types/next-auth";
import connectToDatabase from "@/lib/mongodb";
import { authMiddleware } from "@/lib/authMiddleware";
import User from "@/models/User";

export default async function handler(
  req: AuthenticatedNextApiRequest,
  res: NextApiResponse
) {
  console.log("Handler invoked");

  if (req.method !== "POST") {
    console.log("Invalid method:", req.method);
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectToDatabase();
    console.log("Connected to database");

    // Użycie middleware autoryzacyjnego
    authMiddleware(req, res, async () => {
      console.log("Auth middleware passed, user data:", req.user);

      const user = req.user; // Zakładamy, że `authMiddleware` dodało `user` do `req`

      if (!user) {
        console.log("User not authenticated");
        return res.status(401).json({ message: "User not authenticated" });
      }

      try {
        // Aktualizacja danych użytkownika
        const updatedUser = await User.findByIdAndUpdate(user.id, req.body, {
          new: true,
        });

        if (!updatedUser) {
          console.log("User not found");
          return res.status(404).json({ message: "User not found" });
        }

        console.log("User updated successfully:", updatedUser);
        res.status(200).json({
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
        });
      } catch (updateError) {
        console.error("Profile update error:", updateError);
        return res
          .status(500)
          .json({ message: "Failed to update profile", error: updateError });
      }
    });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ message: "Database connection failed", error });
  }
}
