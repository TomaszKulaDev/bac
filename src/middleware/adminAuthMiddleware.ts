import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";

export default async function adminAuthMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.role !== "admin") {
    return res.status(403).json({ message: "Brak uprawnień" });
  }

  await next();
}
