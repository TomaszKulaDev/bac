import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { registerSchema } from "../../schemas/registerSchema";
import { z } from "zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log("Received registration request");
    await connectToDatabase();

    try {
      const validatedData = registerSchema.parse(req.body);

      const existingUser = await User.findOne({ email: validatedData.email });
      if (existingUser) {
        return res.status(400).json({ message: "Użytkownik już istnieje" });
      }

      // Generowanie tokena weryfikacyjnego
      const verificationToken = crypto.randomBytes(32).toString("hex");

      // Hashowanie hasła
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);

      // Tworzenie nowego użytkownika
      const newUser = new User({
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.name,
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
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      console.error("Unexpected error:", error);
      return res.status(500).json({ message: "Wystąpił nieoczekiwany błąd" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
