import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import crypto from "crypto";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    await connectToDatabase();

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User is already verified" });
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");
    user.verificationToken = verificationToken;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "noreply@yourdomain.com",
      to: user.email,
      subject: "Potwierdź swoje konto w Baciata - Czekamy na Ciebie!",
      html: `
        <h1>Cześć Tancerko, tancerzu! 💃🕺</h1>
        <p>Ups! Wygląda na to, że jeszcze nie potwierdziłeś swojego konta w Baciata. Nic straconego!</p>
        <p>Kliknij poniższy przycisk, aby dołączyć do naszej roztańczonej społeczności:</p>
        <a href="https://www.baciata.pl/verify?token=${verificationToken}" style="background-color: #FF4500; color: white; padding: 12px 24px; text-align: center; text-decoration: none; display: inline-block; border-radius: 25px; font-weight: bold; font-size: 16px;">Potwierdź konto i zaczynamy taniec!</a>
        <p>Parkiet czeka, a muzyka gra. Nie możemy się doczekać, aby zobaczyć Twoje pierwsze kroki!</p>
        <p>Do zobaczenia wkrótce,<br>Zespół Baciata 🎵</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Verification email resent successfully" });
  } catch (error) {
    console.error("Resend verification error:", error);
    res
      .status(500)
      .json({ message: "Failed to resend verification email", error });
  }
}
