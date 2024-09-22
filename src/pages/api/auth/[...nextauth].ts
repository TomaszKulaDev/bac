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
    signIn: async ({ user, account, profile }) => {
      if (account?.provider === "google" && profile) {
        const existingUser = await User.findOne({ email: user.email });
        if (existingUser) {
          if (!existingUser.googleId) {
            existingUser.googleId = profile.sub;
            existingUser.provider = "google";
            await existingUser.save();
          }
          return true;
        } else {
          // Tworzenie nowego użytkownika, jeśli nie istnieje
          const newUser = new User({
            name: user.name,
            email: user.email,
            googleId: profile.sub,
            provider: "google",
            isVerified: true, // Zakładamy, że konta Google są zweryfikowane
            role: "user", // Domyślna rola
          });
          await newUser.save();
          return true;
        }
      }
      return true;
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
