//src/pages/api/admin/users/index.ts

import { NextApiRequest, NextApiResponse } from 'next';
import adminAuthMiddleware from '../../../../middleware/adminAuthMiddleware';
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Rozpoczęcie obsługi żądania API użytkowników");
  try {
    await adminAuthMiddleware(req, res, async () => {
      console.log("Middleware administratora przeszedł pomyślnie");
      await connectToDatabase();
      console.log("Połączono z bazą danych");

      if (req.method === 'GET') {
        try {
          console.log("Rozpoczęcie pobierania użytkowników");
          // Tutaj dodaj kod do pobierania użytkowników
          console.log("Użytkownicy pobrani pomyślnie");
          // res.status(200).json({ users: [...], totalUsers: ..., currentPage: ... });
        } catch (error) {
          console.error('Błąd podczas pobierania użytkowników:', error);
          res.status(500).json({ message: 'Wystąpił błąd podczas pobierania użytkowników' });
        }
      } else {
        res.status(405).json({ message: 'Metoda niedozwolona' });
      }
    });
  } catch (error) {
    console.error('Błąd w API użytkowników administratora:', error);
    res.status(500).json({ message: 'Wewnętrzny błąd serwera' });
  }
}
