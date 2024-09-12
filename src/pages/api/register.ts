import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { validatePassword } from "@/schemas/passwordSchema";
import axios from 'axios';

async function verifyRecaptcha(token: string) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verificationURL = `https://www.google.com/recaptcha/api/siteverify`;
  
  try {
    const response = await axios.post(verificationURL, null, {
      params: {
        secret: secretKey,
        response: token
      }
    });
    console.log("reCAPTCHA API response:", response.data);
    return response.data.score >= 0.5; // Ustaw próg według potrzeb
  } catch (error) {
    console.error('Błąd weryfikacji reCAPTCHA:', error);
    return false;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Metoda niedozwolona" });
  }

  try {
    await connectToDatabase();

    const { email, password, name, recaptchaToken } = req.body;
    console.log("Received data:", { email, name, recaptchaToken: recaptchaToken ? "present" : "missing" });

    if (!name || !email || !password || !recaptchaToken) {
      return res
        .status(400)
        .json({ message: "Imię, email, hasło i token reCAPTCHA są wymagane" });
    }

    console.log("Verifying reCAPTCHA");
    const isHuman = await verifyRecaptcha(recaptchaToken);
    console.log("reCAPTCHA verification result:", isHuman);
    if (!isHuman) {
      return res.status(400).json({ message: "Weryfikacja reCAPTCHA nie powiodła się" });
    }

    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      return res.status(400).json({ message: passwordValidationError });
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
      isVerified: false,
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
