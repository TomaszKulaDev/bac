import { NextApiRequest, NextApiResponse } from 'next';
import adminAuthMiddleware from '../../../../middleware/adminAuthMiddleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await adminAuthMiddleware(req, res, async () => {
    // Tutaj istniejąca logika obsługi żądań
  });
}
