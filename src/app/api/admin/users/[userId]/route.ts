import { NextResponse } from "next/server";
import adminAuthMiddleware from "@/middleware/adminAuthMiddleware";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function DELETE(request: Request) {
  return adminAuthMiddleware(request, async () => {
    await connectToDatabase();

    try {
      const url = new URL(request.url);
      const userId = url.pathname.split('/').pop();
      if (!userId) {
        return NextResponse.json({ message: "Nieprawidłowe ID użytkownika" }, { status: 400 });
      }
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return NextResponse.json({ message: "Użytkownik nie został znaleziony" }, { status: 404 });
      }
      return NextResponse.json({ message: "Użytkownik został usunięty", userId }, { status: 200 });
    } catch (error) {
      console.error("Błąd podczas usuwania użytkownika:", error);
      return NextResponse.json({ message: "Nie udało się usunąć użytkownika" }, { status: 500 });
    }
  });
}

export async function PATCH(request: Request) {
  return await adminAuthMiddleware(request, async () => {
    await connectToDatabase();

    try {
      const url = new URL(request.url);
      const userId = url.searchParams.get("userId");
      const { role } = await request.json();

      if (!userId) {
        return NextResponse.json({ message: "Nieprawidłowe ID użytkownika" }, { status: 400 });
      }

      if (typeof role !== "string" || !["user", "admin"].includes(role)) {
        return NextResponse.json({ message: "Nieprawidłowa rola" }, { status: 400 });
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { role },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        return NextResponse.json({ message: "Użytkownik nie został znaleziony" }, { status: 404 });
      }

      return NextResponse.json({
        message: "Rola użytkownika została zaktualizowana",
        user: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
          isVerified: updatedUser.isVerified
        }
      }, { status: 200 });
    } catch (error) {
      console.error("Błąd podczas aktualizacji roli użytkownika:", error);
      return NextResponse.json({ message: "Nie udało się zaktualizować roli użytkownika" }, { status: 500 });
    }
  });
}
