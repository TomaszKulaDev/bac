import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import type { Session } from "next-auth";
import mongoose from "mongoose";
import User, { IUser } from "@/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || (session as Session).user.role !== "admin") {
    return res.status(403).json({ message: "Brak uprawnień" });
  }

  await connectToDatabase();

  if (req.method === "GET") {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;
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

      return res.status(200).json({
        users: mappedUsers,
        totalUsers,
        currentPage: page,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      return res
        .status(500)
        .json({ message: "Wystąpił błąd podczas pobierania użytkowników" });
    }
  }

  if (req.method === "POST") {
    try {
      const { name, email, password, role } = req.body;

      if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "Wszystkie pola są wymagane" });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(409)
          .json({ message: "Użytkownik o tym adresie email już istnieje" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role,
        isVerified: true, // Ustawiamy isVerified na true dla użytkowników tworzonych przez administratora
      });

      await newUser.save();

      return res.status(201).json({
        id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        isVerified: newUser.isVerified,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      return res
        .status(500)
        .json({ message: "Wystąpił błąd podczas tworzenia użytkownika" });
    }
  }

  res.setHeader("Allow", ["GET"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
