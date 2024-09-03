// src/pages/api/forgot-password.ts

// src/pages/api/forgot-password.ts

import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import nodemailer from "nodemailer";
import crypto from "crypto";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Metoda niedozwolona" });
  }

  try {
    await connectToDatabase();

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email jest wymagany" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Użytkownik nie znaleziony" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Token ważny przez 1 godzinę
    await user.save();

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL || "https://bac-eta.vercel.app";
    const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;

    console.log("Base URL:", baseUrl);
    console.log("Reset URL:", resetUrl);

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: user.email,
      subject: "Resetowanie hasła",
      html: `
        <h1>Resetowanie hasła</h1>
        <p>Kliknij poniższy link, aby zresetować swoje hasło:</p>
        <a href="${resetUrl}">Resetuj hasło</a>
        <p>Link wygaśnie za godzinę.</p>
        <p>Jeśli nie prosiłeś o reset hasła, zignoruj tę wiadomość.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ message: "Link do resetowania hasła został wysłany" });
  } catch (error) {
    console.error("Błąd podczas resetowania hasła:", error);
    res.status(500).json({ message: "Wystąpił błąd podczas wysyłania emaila" });
  }
}
