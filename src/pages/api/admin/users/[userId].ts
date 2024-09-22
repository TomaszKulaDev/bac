import { NextApiRequest, NextApiResponse } from 'next';
import adminAuthMiddleware from '../../../../middleware/adminAuthMiddleware';
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await adminAuthMiddleware(req, res, async () => {
    if (req.method === 'DELETE') {
      try {
        const { userId } = req.query;
        await connectToDatabase();
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
          return res.status(404).json({ message: 'Użytkownik nie znaleziony' });
        }
        res.status(200).json({ message: 'Użytkownik usunięty pomyślnie' });
      } catch (error) {
        console.error('Błąd podczas usuwania użytkownika:', error);
        res.status(500).json({ message: 'Wystąpił błąd podczas usuwania użytkownika' });
      }
    } else {
      res.status(405).json({ message: 'Metoda niedozwolona' });
    }
  });
}
