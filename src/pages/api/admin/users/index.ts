import { NextApiRequest, NextApiResponse } from 'next';
import adminAuthMiddleware from '../../../../middleware/adminAuthMiddleware';
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await adminAuthMiddleware(req, res, async () => {
      await connectToDatabase();

      if (req.method === 'GET') {
        try {
          const page = parseInt(req.query.page as string) || 1;
          const pageSize = parseInt(req.query.pageSize as string) || 10;
          const skip = (page - 1) * pageSize;
          const users = await User.find({}, "-password")
            .skip(skip)
            .limit(pageSize)
            .lean();
          const mappedUsers = users.map((user: any) => ({
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            isVerified: user.isVerified,
          }));
          const totalUsers = await User.countDocuments();
          return res.status(200).json({
            users: mappedUsers,
            totalUsers,
            currentPage: page,
          });
        } catch (error) {
          console.error('Error fetching users:', error);
          return res
            .status(500)
            .json({ message: 'Internal server error' });
        }
      } else if (req.method === 'POST') {
        try {
          await connectToDatabase();

          const { name, email, password, role } = req.body;

          if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "Wszystkie pola są wymagane" });
          }

          const existingUser = await User.findOne({ email });
          if (existingUser) {
            return res.status(409).json({ message: "Użytkownik o tym adresie email już istnieje" });
          }

          const hashedPassword = await bcrypt.hash(password, 10);

          const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            isVerified: true, // Zakładamydddddd, że użytkownik utworzony przez admina jest od razu zweryfikowany
          });

          await newUser.save();

          res.status(201).json({
            message: "Użytkownik został utworzony",
            user: {
              id: newUser._id.toString(),
              name: newUser.name,
              email: newUser.email,
              role: newUser.role,
              isVerified: newUser.isVerified,
            },
          });
        } catch (error) {
          console.error("Error creating user:", error);
          res.status(500).json({ message: "Nie udało się utworzyć użytkownika" });
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
