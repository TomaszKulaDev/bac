import type { NextApiRequest, NextApiResponse } from "next";
import { AuthenticatedNextApiRequest } from "@/types/next-auth";
import connectToDatabase from "@/lib/mongodb";
import { authMiddleware } from "@/lib/authMiddleware";
import User from "@/models/User";
import { z } from "zod";

const updateProfileSchema = z.object({
  name: z.string().min(1, "Imię jest wymagane").max(50, "Imię nie może być dłuższe niż 50 znaków"),
  email: z.string().email("Nieprawidłowy adres email"),
});

export default async function handler(
  req: AuthenticatedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Metoda niedozwolona" });
  }

  try {
    await connectToDatabase();

    authMiddleware(req, res, async () => {
      const user = req.user;

      if (!user) {
        return res.status(401).json({ message: "Użytkownik niezalogowany" });
      }

      const validationResult = updateProfileSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ message: validationResult.error.errors[0].message });
      }

      try {
        const updatedUser = await User.findByIdAndUpdate(user.id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!updatedUser) {
          return res
            .status(404)
            .json({ message: "Nie znaleziono użytkownika" });
        }

        res.status(200).json({
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
        });
      } catch (updateError) {
        console.error("Profile update error:", updateError);
        if (updateError instanceof Error) {
          if (updateError.name === "ValidationError") {
            return res
              .status(400)
              .json({ message: "Nieprawidłowe dane wejściowe." });
          } else if (
            updateError.message.includes("E11000 duplicate key error")
          ) {
            return res
              .status(409)
              .json({ message: "Podany adres email jest już używany." });
          }
        }
        return res
          .status(500)
          .json({
            message:
              "Nie udało się zaktualizować profilu. Spróbuj ponownie później.",
          });
      }
    });
  } catch (error) {
    console.error("Database connection error:", error);
    res
      .status(503)
      .json({
        message: "Błąd połączenia z bazą danych. Spróbuj ponownie później.",
      });
  }
}
