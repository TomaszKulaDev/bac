import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";

export default async function adminAuthMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) {
  console.log("Rozpoczęcie weryfikacji uprawnień administratora");
  const session = await getServerSession(req, res, authOptions);
  console.log("Sesja użytkownika:", session);

  if (!session || session.user.role !== "admin") {
    console.log("Brak uprawnień administratora");
    return res.status(403).json({ message: "Brak uprawnień" });
  }

  console.log("Uprawnienia administratora zweryfikowane pomyślnie");
  await next();
}
