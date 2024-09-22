import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Metoda niedozwolona" });
  }

  try {
    const { title, artist, youtubeLink } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: "baciatapl@gmail.com",
      subject: "Nowe zgłoszenie utworu",
      html: `
        <h1>Nowy utwór został zgłoszony</h1>
        <p><strong>Tytuł:</strong> ${title}</p>
        <p><strong>Wykonawca:</strong> ${artist}</p>
        <p><strong>Link do YouTube:</strong> <a href="${youtubeLink}">${youtubeLink}</a></p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "E-mail został wysłany pomyślnie" });
  } catch (error) {
    console.error("Błąd wysyłania e-maila:", error);
    res
      .status(500)
      .json({ message: "Wystąpił błąd podczas wysyłania e-maila" });
  }
}
