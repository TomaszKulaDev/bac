// src/pages/api/admin/users/index.ts

import { NextResponse } from "next/server";
import adminAuthMiddleware from "@/middleware/adminAuthMiddleware";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function GET(request: Request) {
  try {
    return await adminAuthMiddleware(request, async () => {
      await connectToDatabase();

      const url = new URL(request.url);
      const page = parseInt(url.searchParams.get("page") || "1");
      const pageSize = parseInt(url.searchParams.get("pageSize") || "10");
      const skip = (page - 1) * pageSize;
      const users = await User.find({}, "-password")
        .skip(skip)
        .limit(pageSize)
        .lean();
      const mappedUsers = users.map((user: any) => ({
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      }));
      const totalUsers = await User.countDocuments();
      return NextResponse.json({
        users: mappedUsers,
        totalUsers,
        currentPage: page,
      });
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    return await adminAuthMiddleware(request, async () => {
      await connectToDatabase();

      const { name, email, password, role } = await request.json();

      if (!name || !email || !password || !role) {
        return NextResponse.json({ message: "Wszystkie pola są wymagane" }, { status: 400 });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json({ message: "Użytkownik o tym adresie email już istnieje" }, { status: 409 });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role,
        isVerified: true, // Zakładamy, że użytkownik utworzony przez admina jest od razu zweryfikowany
      });

      await newUser.save();

      return NextResponse.json({
        message: "Użytkownik został utworzony",
        user: {
          id: newUser._id.toString(),
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          isVerified: newUser.isVerified,
        },
      }, { status: 201 });
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Nie udało się utworzyć użytkownika" }, { status: 500 });
  }
}
