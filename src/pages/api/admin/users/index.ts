//src/pages/api/admin/users/index.ts

import { NextApiRequest, NextApiResponse } from 'next';
import adminAuthMiddleware from '../../../../middleware/adminAuthMiddleware';
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await adminAuthMiddleware(req, res, async () => {
      await connectToDatabase();

      if (req.method === 'GET') {
        try {
          // Istniejąca logika dla metody GET
        } catch (error) {
          console.error('Error fetching users:', error);
          res.status(500).json({ message: 'Wystąpił błąd podczas pobierania użytkowników' });
        }
      } else if (req.method === 'POST') {
        // Istniejąca logika dla metody POST
      } else {
        res.status(405).json({ message: 'Method not allowed' });
      }
    });
  } catch (error) {
    console.error('Error in admin users API:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
