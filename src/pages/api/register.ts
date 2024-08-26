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

    // Sprawdzenie, czy wszystkie wymagane pola są wypełnione
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    try {
      // Sprawdź, czy użytkownik o podanym e-mailu już istnieje
      const existingUserByEmail = await User.findOne({ email });
      if (existingUserByEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }

      // Sprawdź, czy nazwa użytkownika już istnieje
      const existingUserByName = await User.findOne({ name });
      if (existingUserByName) {
        return res.status(400).json({ message: "Username already exists" });
      }

      // Hashowanie hasła przed zapisaniem
      const hashedPassword = await bcrypt.hash(password, 10);

      // Zapisanie nowego użytkownika do bazy danych z zaszyfrowanym hasłem
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
