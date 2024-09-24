import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function adminAuthMiddleware(
  request: Request,
  handler: () => Promise<NextResponse>
) {
  const session = await getServerSession(authOptions);
  console.log("Session in adminAuthMiddleware:", session);

  if (!session || session.user.role !== "admin") {
    console.log("Unauthorized access attempt");
    return NextResponse.json({ message: "Brak uprawnień" }, { status: 403 });
  }

  console.log("Admin authorized");
  return handler();
}
