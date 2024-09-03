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
  if (req.method === "POST") {
    console.log("Received registration request");
    await connectToDatabase();

    const { email, password, name } = req.body;
    console.log("Raw password length:", password.length);
    console.log("Raw password:", password);

    if (!name || !email || !password) {
      console.log("Missing required fields");
      return res
        .status(400)
        .json({ message: "Imię, email i hasło są wymagane" });
    }

    // Sprawdzenie długości hasła
    if (password.length < 6 || password.length > 72) {
      console.log("Invalid password length:", password.length);
      return res
        .status(400)
        .json({ message: "Hasło musi mieć od 6 do 72 znaków" });
    }

    // Sprawdzenie złożoności hasła
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    console.log("Password validation:", {
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasSpecialChar,
    });

    if (!(hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar)) {
      console.log("Password complexity requirements not met");
      return res.status(400).json({
        message:
          "Hasło musi zawierać duże i małe litery, cyfry oraz znaki specjalne",
      });
    }

    console.log("Password validation passed");

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Użytkownik już istnieje" });
      }

      // Generowanie tokena weryfikacyjnego
      const verificationToken = crypto.randomBytes(32).toString("hex");

      // Hashowanie hasła
      const trimmedPassword = password.slice(0, 72);
      const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

      // Tworzenie nowego użytkownika
      const newUser = new User({
        email,
        password: hashedPassword,
        name,
        verificationToken,
      });

      await newUser.save();

      // Konfiguracja nodemailer do wysyłania emaili z Gmaila
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });

      // TO JEST WERSJA LOCALHOST
      // const mailOptions = {
      //   from: "noreply@yourdomain.com",
      //   to: newUser.email,
      //   subject: "Account Verification",
      //   html: `<h1>Verify your account</h1><p>Please click the link to verify your account:</p><a href="http://localhost:3000/verify?token=${verificationToken}">Verify Account</a>`,
      // };

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
      res.status(500).json({ message: "Registration failed", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
