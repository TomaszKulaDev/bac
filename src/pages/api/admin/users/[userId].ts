import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.role !== "admin") {
    return res.status(403).json({ message: "Brak uprawnień" });
  }

  await connectToDatabase();

  const { userId } = req.query;

  if (req.method === "DELETE") {
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ message: "Użytkownik nie znaleziony" });
      }
      return res.status(200).json({ message: "Użytkownik usunięty pomyślnie" });
    } catch (error) {
      console.error("Error deleting user:", error);
      return res
        .status(500)
        .json({ message: "Wystąpił błąd podczas usuwania użytkownika" });
    }
  } else if (req.method === "PATCH") {
    try {
      const { role } = req.body;
      if (!role) {
        return res.status(400).json({ message: "Rola jest wymagana" });
      }
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { role },
        { new: true, runValidators: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "Użytkownik nie znaleziony" });
      }
      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error updating user role:", error);
      return res
        .status(500)
        .json({
          message: "Wystąpił błąd podczas aktualizacji roli użytkownika",
        });
    }
  }

  res.setHeader("Allow", ["DELETE", "PATCH"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
