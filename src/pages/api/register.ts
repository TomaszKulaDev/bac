// src/pages/api/register.ts
import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs"; // Importujemy bcrypt do szyfrowania hasła

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await connectToDatabase();

    const { email, password, name } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    try {
      // Sprawdź, czy użytkownik już istnieje
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hashowanie hasła przed zapisaniem
      const hashedPassword = await bcrypt.hash(password, 10);

      // Zapisz użytkownika do bazy danych z zaszyfrowanym hasłem
      const newUser = new User({ email, password: hashedPassword, name });
      await newUser.save();

      res.status(201).json({ message: "User registered" });
    } catch (error) {
      res.status(500).json({ message: "Registration failed", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
