import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth.config";

export default async function adminAuthMiddleware(
  request: Request,
  handler: () => Promise<NextResponse>
) {
  const session = await getServerSession(authOptions);

  if (!session?.user || (session.user as any).role !== "admin") {
    return NextResponse.json(
      { message: "Brak uprawnień administratora" },
      { status: 403 }
    );
  }

  return handler();
}
