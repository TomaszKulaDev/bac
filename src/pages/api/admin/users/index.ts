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
      try {
        const connection = await connectToDatabase();
        console.log("Połączono z bazą danych");

        if (req.method === 'GET') {
          try {
            console.log("Rozpoczęcie pobierania użytkowników");
            const page = parseInt(req.query.page as string) || 1;
            const pageSize = parseInt(req.query.pageSize as string) || 10;
            const skip = (page - 1) * pageSize;

            const [users, totalUsers] = await Promise.all([
              User.find().select('-password').skip(skip).limit(pageSize).lean(),
              User.countDocuments()
            ]);

            console.log(`Pobrano ${users.length} użytkowników`);
            res.status(200).json({ users, totalUsers, currentPage: page });
          } catch (error) {
            console.error('Błąd podczas pobierania użytkowników:', error);
            res.status(500).json({ message: 'Wystąpił błąd podczas pobierania użytkowników' });
          }
        } else {
          res.status(405).json({ message: 'Metoda niedozwolona' });
        }
      } catch (dbError) {
        console.error('Błąd połączenia z bazą danych:', dbError);
        res.status(500).json({ message: 'Błąd połączenia z bazą danych' });
      }
    });
  } catch (error) {
    console.error('Błąd w API użytkowników administratora:', error);
    res.status(500).json({ message: 'Wewnętrzny błąd serwera' });
  }
}
