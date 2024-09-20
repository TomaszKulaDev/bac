import { NextApiRequest, NextApiResponse } from 'next';
import adminAuthMiddleware from '../../../../middleware/adminAuthMiddleware';
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await adminAuthMiddleware(req, res, async () => {
      await connectToDatabase();

      if (req.method === 'GET') {
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 10;
        // Reszta kodu...
      }
    });
  } catch (error) {
    console.error('Error in admin users API:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
