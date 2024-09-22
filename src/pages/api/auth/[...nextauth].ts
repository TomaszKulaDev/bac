// src/pages/api/auth/[...nextauth].ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "../../../lib/mongodb";
import User from "@/models/User"; // Zakładając, że masz model User
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

export const authOptions: NextAuthOptions = {
  providers: [
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
        console.log("NextAuth: Authorizing user");
        if (!credentials) {
          console.log("NextAuth: No credentials provided");
          return null;
        }

        await connectToDatabase();

        const { email, password } = credentials;
        const user = await User.findOne({ email });
        console.log("NextAuth: User found:", user ? "Yes" : "No");
        console.log("NextAuth: User found:", user ? "Yes" : "No");

        if (!user) {
          console.log("NextAuth: User not found");
          return null;
        }

        console.log("NextAuth: Comparing passwords");
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
          console.log("NextAuth: Invalid credentials");
          return null;
        }

        console.log("NextAuth: Authentication successful");
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
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role as string;
      }
      return session;
    },
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      console.log("User signed in:", user);
    },
  },
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
