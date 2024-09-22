import { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    role?: string;
  }
}

// src/pages/api/auth/[...nextauth].ts

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "../../../lib/mongodb";
import User from "@/models/User"; // Zakładając, że masz model User
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // Do zrobienia w przyszłości.
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_CLIENT_ID as string,
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          console.log("No credentials provided");
          return null;
        }

        await connectToDatabase();
        console.log("Connected to database");

        const { email, password } = credentials;
        console.log("Searching for user with email:", email);
        const user = await User.findOne({ email });
        console.log("User found:", user ? "Yes" : "No");

        if (!user) {
          console.log("User not found");
          return null;
        }

        console.log("Comparing passwords");
        const isValidPassword = await bcrypt.compare(password, user.password);
        console.log("Password valid:", isValidPassword);

        if (!isValidPassword) {
          console.log("Invalid credentials");
          return null;
        }

        console.log("Authentication successful");
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
