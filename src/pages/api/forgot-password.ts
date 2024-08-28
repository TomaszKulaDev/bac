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
  if (req.method === "POST") {
    await connectToDatabase();

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      // Generowanie tokena do resetowania hasła
      const resetToken = crypto.randomBytes(32).toString("hex");
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 3600000; // Token ważny przez 1 godzinę
      await user.save();

      // Wysyłanie wiadomości e-mail
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });
      // TO JEST WERSJA LOCALHOST
      const mailOptions = {
        from: "noreply@yourdomain.com",
        to: user.email,
        subject: "Password Reset",
        html: `<h1>Reset your password</h1><p>Please click the link to reset your password:</p><a href="http://localhost:3000/reset-password?token=${resetToken}">Reset Password</a>`,
      };

      // const mailOptions = {
      //   from: "noreply@yourdomain.com",
      //   to: user.email,
      //   subject: "Password Reset",
      //   html: `<h1>Reset your password</h1><p>Please click the link to reset your password:</p><a href="https://bac-eta.vercel.app/reset-password?token=${resetToken}">Reset Password</a>`,
      // };

      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: "Reset link sent" });
    } catch (error) {
      res.status(500).json({ message: "Error sending email", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
