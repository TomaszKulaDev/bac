import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { IUser } from "@/models/User";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
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
        console.log("NextAuth: Connected to database");

        const { email, password } = credentials;
        const user = await User.findOne({ email });
        console.log("NextAuth: User found:", user ? "Yes" : "No");

        if (!user) {
          console.log("NextAuth: User not found");
          return null;
        }

        if (!user.isVerified) {
          console.log("NextAuth: User not verified");
          return null;
        }

        console.log("NextAuth: Comparing passwords");
        const isValidPassword = await bcrypt.compare(password, user.password);
        console.log("NextAuth: Password valid:", isValidPassword);

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
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as IUser).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};

export default authOptions;
