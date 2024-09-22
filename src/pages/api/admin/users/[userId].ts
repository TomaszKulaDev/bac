//src/pages/api/admin/users/[userId].ts
import { NextApiRequest, NextApiResponse } from "next";
import adminAuthMiddleware from "../../../../middleware/adminAuthMiddleware";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await adminAuthMiddleware(req, res, async () => {
    await connectToDatabase();

    if (req.method === "DELETE") {
      try {
        const { userId } = req.query;
        if (typeof userId !== "string") {
          return res
            .status(400)
            .json({ message: "Nieprawidłowe ID użytkownika" });
        }
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
          return res
            .status(404)
            .json({ message: "Użytkownik nie został znaleziony" });
        }
        res.status(200).json({ message: "Użytkownik został usunięty", userId });
      } catch (error) {
        console.error("Błąd podczas usuwania użytkownika:", error);
        res.status(500).json({ message: "Nie udało się usunąć użytkownika" });
      }
    } else if (req.method === "PATCH") {
      try {
        const { userId } = req.query;
        const { role } = req.body;

        if (typeof userId !== "string") {
          return res.status(400).json({ message: "Nieprawidłowe ID użytkownika" });
        }

        if (typeof role !== "string" || !["user", "admin"].includes(role)) {
          return res.status(400).json({ message: "Nieprawidłowa rola" });
        }

        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { role },
          { new: true, runValidators: true }
        );

        if (!updatedUser) {
          return res.status(404).json({ message: "Użytkownik nie został znaleziony" });
        }

        res.status(200).json({
          message: "Rola użytkownika została zaktualizowana",
          user: {
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            isVerified: updatedUser.isVerified
          }
        });
      } catch (error) {
        console.error("Błąd podczas aktualizacji roli użytkownika:", error);
        res.status(500).json({ message: "Nie udało się zaktualizować roli użytkownika" });
      }
    } else {
      res.status(405).json({ message: "Metoda niedozwolona" });
    }
  });
}
