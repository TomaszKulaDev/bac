// src/pages/api/users/me.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import connectToDatabase from "@/lib/mongodb";
import { authMiddleware } from "@/lib/authMiddleware";
import User, { IUser } from "@/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Handler invoked");

  if (req.method !== "GET") {
    console.log("Invalid method:", req.method);
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectToDatabase();
    console.log("Connected to database");

    const session = await getServerSession(req, res, authOptions);
    console.log("Session:", session);

    if (!session || !session.user) {
      console.log("User not authenticated");
      return res.status(401).json({ message: "User not authenticated" });
    }

    const userDetails = await User.findOne({ email: session.user.email });
    console.log("User details retrieved:", userDetails);

    if (!userDetails) {
      console.log("User not found with email:", session.user.email);
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      id: userDetails._id,
      name: userDetails.name,
      email: userDetails.email,
    });
  } catch (error) {
    console.error("Fetching user data error:", error);
    res.status(500).json({ message: "Failed to fetch user data", error });
  }
}
