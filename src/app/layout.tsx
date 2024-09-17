"use client";

import Link from "next/link";
import "./globals.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { SessionProvider, useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { logout } from '../store/slices/authSlice';
import { NavContent } from "../components/NavContent";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Provider store={store}>
            <NavContent />
            {children}
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
