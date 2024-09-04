import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Metoda niedozwolona" });
  }

  try {
    await connectToDatabase();

    const { email, password, name } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Imię, email i hasło są wymagane" });
    }

    // Sprawdzenie długości i złożoności hasła
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (
      password.length < 6 ||
      password.length > 72 ||
      !(hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar)
    ) {
      return res.status(400).json({
        message:
          "Hasło musi mieć od 6 do 72 znaków i zawierać duże i małe litery, cyfry oraz znaki specjalne",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Użytkownik już istnieje" });
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const trimmedPassword = password.slice(0, 72);
    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
    });

    await newUser.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "noreply@yourdomain.com",
      to: newUser.email,
      subject: "Account Verification",
      html: `<h1>Verify your account</h1><p>Please click the link to verify your account:</p><a href="https://bac-eta.vercel.app/verify?token=${verificationToken}">Verify Account</a>`,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(201)
      .json({ message: "User registered. Please verify your email." });
  } catch (error) {
    console.error("Registration error:", error);
    if (error instanceof Error) {
      if (error.name === "MongoError") {
        return res
          .status(503)
          .json({ message: "Błąd bazy danych. Spróbuj ponownie później." });
      } else if (error.name === "ValidationError") {
        return res
          .status(400)
          .json({ message: "Nieprawidłowe dane wejściowe." });
      } else if (error.message.includes("E11000 duplicate key error")) {
        return res
          .status(409)
          .json({
            message: "Użytkownik o podanym adresie email już istnieje.",
          });
      }
    }
    res
      .status(500)
      .json({
        message:
          "Wystąpił nieoczekiwany błąd podczas rejestracji. Spróbuj ponownie później.",
      });
  }
}
