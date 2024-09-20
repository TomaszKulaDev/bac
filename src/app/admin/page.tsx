"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useSession } from "next-auth/react";
import LoadingSpinner from "@/components/LoadingSpinner";
import AdminCard from '@/components/AdminCard';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import { AppDispatch } from '../../store/store';

export default function AdminPanel() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const { data: session, status } = useSession();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log("AdminPanel useEffect - user:", user);
    console.log("AdminPanel useEffect - session:", session);
    console.log("AdminPanel useEffect - status:", status);

    if (status === "loading") {
      return; // Czekamy na załadowanie sesji
    }

    if (status === "authenticated") {
      if (!user) {
        // Jeśli sesja jest aktywna, ale nie ma użytkownika w Redux store, zaktualizuj store
        dispatch(login({
          user: {
            id: session.user.id || '',
            email: session.user.email || '',
            name: session.user.name || '',
            role: session.user.role || 'user'
          }
        }));
      } else if (user.role !== "admin") {
        console.log("Redirecting to login - user is not admin");
        router.push("/login");
      }
    } else if (status === "unauthenticated") {
      console.log("Redirecting to login - user is not authenticated");
      router.push("/login");
    }
  }, [user, router, status, session, dispatch]);

  if (status === "loading" || !user) {
    return <LoadingSpinner />;
  }

  if (user.role !== "admin") {
    return null; // lub jakiś komponent informujący o braku dostępu
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Panel Administracyjny</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AdminCard title="Zarządzanie Użytkownikami" link="/admin/users" bgColor="bg-blue-500" textColor="text-white" />
          <AdminCard title="Zarządzanie Wydarzeniami" link="/admin/events" bgColor="bg-green-500" textColor="text-white" />
          <AdminCard
            title="Zarządzanie Szkołami Tańca"
            link="/admin/dance-schools"
            bgColor="bg-purple-500"
            textColor="text-white"
          />
          <AdminCard title="Statystyki" link="/admin/statistics" bgColor="bg-yellow-500" textColor="text-gray-800" />
        </div>
      </div>
    </div>
  );
}
