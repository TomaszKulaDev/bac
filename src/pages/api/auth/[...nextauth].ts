// src/pages/api/auth/[...nextauth].ts

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "../../../lib/mongodb";
import User from "@/models/User"; // Zakładając, że masz model User
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
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
        console.log("NextAuth: Authorizing user");
        if (!credentials) {
          console.log("NextAuth: No credentials provided");
          return null;
        }

        await connectToDatabase();

        const { email, password } = credentials;
        const user = await User.findOne({ email });
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
      console.log("NextAuth: JWT callback");
      if (user) {
        console.log("NextAuth: Adding user data to token", user);
        token.role = (user as any).role || 'user';
      }
      return token;
    },
    async session({ session, token }) {
      console.log("NextAuth: Session callback");
      if (session.user) {
        console.log("NextAuth: Adding token data to session", token);
        session.user.role = typeof token.role === 'string' ? token.role : 'user';
        session.user.id = token.sub || '';
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
