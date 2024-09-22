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
        // Istniejąca logika dla metody GET
      } else if (req.method === 'POST') {
        try {
          const { name, email, password, role } = req.body;

          if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'Wszystkie pola są wymagane' });
          }

          const existingUser = await User.findOne({ email });
          if (existingUser) {
            return res.status(409).json({ message: 'Użytkownik o tym adresie email już istnieje' });
          }

          const hashedPassword = await bcrypt.hash(password, 10);

          const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            isVerified: true, // Zakładamy, że użytkownik utworzony przez admina jest od razu zweryfikowany
          });

          await newUser.save();

          const { password: _, ...userWithoutPassword } = newUser.toObject();

          return res.status(201).json({
            message: 'Użytkownik został utworzony',
            user: userWithoutPassword
          });
        } catch (error) {
          console.error('Error creating user:', error);
          return res.status(500).json({ message: 'Wystąpił błąd podczas tworzenia użytkownika' });
        }
      } else {
        res.status(405).json({ message: 'Method not allowed' });
      }
    });
  } catch (error) {
    console.error('Error in admin users API:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
