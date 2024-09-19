import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Nieprawidłowy adres email"),
  password: z.string().min(1, "Hasło jest wymagane"),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Request method:", req.method);

  if (req.method === "POST") {
    console.log("Received POST request");

    try {
      await connectToDatabase();
      console.log("Connected to database");
    } catch (dbError) {
      console.error("Database connection error: ", dbError);
      return res
        .status(500)
        .json({ message: "Database connection failed", error: dbError });
    }

    const { email, password } = req.body;
    console.log("Request body:", { email, password });

    const validationResult = loginSchema.safeParse({ email, password });
    if (!validationResult.success) {
      return res
        .status(400)
        .json({ message: validationResult.error.errors[0].message });
    }

    if (!email || !password) {
      console.log("Missing email or password");
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    try {
      const user = await User.findOne({ email });
      console.log("Found user:", user);
      console.log("User role:", user?.role);

      if (!user) {
        console.log("No user found with this email");
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Dodanie sprawdzenia, czy użytkownik jest zweryfikowany
      if (!user.isVerified) {
        console.log("User is not verified");
        return res
          .status(403)
          .json({ message: "You need to verify your email before logging in" });
      }

      console.log("Comparing passwords");
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log("Password valid:", isPasswordValid);

      if (!isPasswordValid) {
        console.log("Password is not valid");
        return res.status(400).json({ message: "Invalid credentials" });
      }

      console.log("Generating JWT token");
      console.log("JWT_SECRET:", process.env.JWT_SECRET);

      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );

      console.log("JWT token generated:", token);
      console.log("Sending response with user:", { id: user._id, email: user.email, name: user.name, role: user.role });
      res
        .status(200)
        .json({
          message: "Login successful",
          token,
          user: { id: user._id, email: user.email, name: user.name, role: user.role },
        });
    } catch (error) {
      console.error("Login error: ", error);
      res.status(500).json({ message: "Login failed", error });
    }
  } else {
    console.log("Invalid method:", req.method);
    res.status(405).json({ message: "Method not allowed" });
  }
}
