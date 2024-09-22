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
        console.log("Authorize function started");
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
    signIn: async ({ user, account, profile, email }) => {
      console.log("SignIn callback started");
      console.log("User:", user);
      console.log("Account:", account);
      console.log("Profile:", profile);
      console.log("Email:", email);

      if (account?.provider === "google" && profile) {
        console.log("Google sign-in detected");
        await connectToDatabase();
        console.log("Connected to database");

        const existingUser = await User.findOne({ email: user.email });
        console.log("Existing user:", existingUser);

        if (existingUser) {
          console.log("Updating existing user");
          existingUser.googleId = profile.sub;
          existingUser.provider = existingUser.provider ? 'both' : 'google';
          console.log("Updated user:", existingUser);
          await existingUser.save();
          console.log("User saved successfully");
          return true;
        } else {
          console.log("Creating new user");
          const newUser = new User({
            name: user.name,
            email: user.email,
            googleId: profile.sub,
            provider: 'google',
            isVerified: true,
            role: "user",
            password: await bcrypt.hash(Math.random().toString(36).slice(-8), 10),
          });
          console.log("New user:", newUser);
          await newUser.save();
          console.log("New user saved successfully");
        }
        console.log("Google sign-in completed successfully");
        return true;
      }
      console.log("SignIn callback completed");
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
