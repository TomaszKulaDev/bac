import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";

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
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Generowanie tokena weryfikacyjnego
      const verificationToken = crypto.randomBytes(32).toString("hex");

      // Hashowanie hasła
      const hashedPassword = await bcrypt.hash(password, 10);

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
      const mailOptions = {
        from: "noreply@yourdomain.com",
        to: newUser.email,
        subject: "Account Verification",
        html: `<h1>Verify your account</h1><p>Please click the link to verify your account:</p><a href="http://localhost:3000/verify?token=${verificationToken}">Verify Account</a>`,
      };

      // const mailOptions = {
      //   from: "noreply@yourdomain.com",
      //   to: newUser.email,
      //   subject: "Account Verification",
      //   html: `<h1>Verify your account</h1><p>Please click the link to verify your account:</p><a href="https://bac-eta.vercel.app/verify?token=${verificationToken}">Verify Account</a>`,
      // };

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
