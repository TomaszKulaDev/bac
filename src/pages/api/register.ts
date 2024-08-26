// src/pages/api/register.ts
import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await connectToDatabase();

    const { email, password, name } = req.body; // Dodajemy `name` do destrukturyzacji

    if (!name || !email || !password) {
      // Walidacja, czy wszystkie wymagane pola są obecne
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    try {
      // Zapisz użytkownika do bazy danych
      const newUser = new User({ email, password, name }); // Dodajemy `name` podczas tworzenia użytkownika
      await newUser.save();

      res.status(201).json({ message: "User registered" });
    } catch (error) {
      res.status(500).json({ message: "Registration failed", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
