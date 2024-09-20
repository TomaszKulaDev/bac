// src/app/admin/users/page.tsx

"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
  fetchUsers,
  deleteUser,
  updateUserRole,
  createUser,
} from "../../../store/slices/adminSlice";
import LoadingSpinner from "@/components/LoadingSpinner";
import AdminLayout from '@/components/AdminLayout';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
}

interface UserRowProps {
  user: User;
  onUpdateRole: (userId: string, newRole: string) => void;
  onDeleteUser: (userId: string) => Promise<void>;
}

const UserRow: React.FC<UserRowProps> = React.memo(
  ({ user, onUpdateRole, onDeleteUser }) => {
    return (
      <tr key={user.id} className="border-b hover:bg-gray-50">
        <td className="p-3 text-gray-700">{user.id}</td>
        <td className="p-3 text-gray-700">{user.name}</td>
        <td className="p-3 text-gray-700">{user.email}</td>
        <td className="p-3">
          <select
            value={user.role}
            onChange={(e) => onUpdateRole(user.id, e.target.value)}
            className="border rounded p-1 text-gray-700"
          >
            <option value="user">Użytkownik</option>
            <option value="admin">Admin</option>
          </select>
        </td>
        <td className="p-3">
          <button
            onClick={() => onDeleteUser(user.id)}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300"
          >
            Usuń
          </button>
        </td>
        <td className="px-4 py-2">
          {user.isVerified ? (
            <span className="text-green-500">Zweryfikowany</span>
          ) : (
            <span className="text-red-500">Niezweryfikowany</span>
          )}
        </td>
      </tr>
    );
  }
);

UserRow.displayName = "UserRow";

export default function AdminUsersPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const { users, totalUsers, currentPage } = useSelector(
    (state: RootState) => state.admin
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    
    if (user.role !== "admin") {
      router.push("/");
      return;
    }

    if (users.length === 0) {
      setIsLoading(true);
      dispatch(fetchUsers({ page: currentPage, pageSize }))
        .unwrap()
        .then(() => {
          setIsLoading(false);
          setError(null);
        })
        .catch((error: Error) => {
          console.error("Error fetching users:", error);
          setError("Nie udało się pobrać listy użytkowników");
          setIsLoading(false);
        });
    }
  }, [user, router, dispatch, currentPage, pageSize, users.length]);

  const handleDeleteUser = useCallback(async (userId: string) => {
    if (!userId) {
      console.error("Invalid userId:", userId);
      return;
    }
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Odśwież listę użytkowników
        dispatch(fetchUsers({ page: currentPage, pageSize }));
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Nie udało się usunąć użytkownika");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Wystąpił błąd podczas usuwania użytkownika");
    }
  }, [dispatch, currentPage, pageSize]);

  const handleUpdateRole = useCallback(
    (userId: string, newRole: string) => {
      dispatch(updateUserRole({ userId, newRole }))
        .unwrap()
        .catch((error) => {
          setError("Nie udało się zaktualizować roli użytkownika");
        });
    },
    [dispatch]
  );

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createUser(newUser))
      .unwrap()
      .then(() => {
        setNewUser({ name: "", email: "", password: "", role: "user" });
        setError(null);
      })
      .catch((error) => {
        setError("Nie udało się utworzyć nowego użytkownika: " + error.message);
      });
  };

  const handlePageChange = (newPage: number) => {
    dispatch(fetchUsers({ page: newPage, pageSize }));
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Zarządzanie Użytkownikami
        </h1>

        {/* Formularz tworzenia nowego użytkownika */}
        <form
          onSubmit={handleCreateUser}
          className="mb-12 bg-white shadow-lg rounded-lg px-8 pt-6 pb-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-700">
            Utwórz nowego użytkownika
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Imię
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Hasło
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="role"
              >
                Rola
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="role"
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
              >
                <option value="user">Użytkownik</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <div className="mt-6">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
              type="submit"
            >
              Utwórz użytkownika
            </button>
          </div>
        </form>

        {/* Tabela użytkowników */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left text-gray-600">ID</th>
                <th className="p-3 text-left text-gray-600">Imię</th>
                <th className="p-3 text-left text-gray-600">Email</th>
                <th className="p-3 text-left text-gray-600">Rola</th>
                <th className="p-3 text-left text-gray-600">Akcje</th>
                <th className="px-4 py-2 text-gray-600">Status weryfikacji</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: User) => (
                <UserRow
                  key={user.id}
                  user={user}
                  onUpdateRole={handleUpdateRole}
                  onDeleteUser={handleDeleteUser}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginacja */}
        <div className="mt-8 flex justify-between items-center">
          <div className="text-gray-600">
            Strona {currentPage} z {Math.ceil(totalUsers / pageSize)}
          </div>
          <div>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2 disabled:bg-gray-300 hover:bg-blue-600 transition duration-300"
            >
              Poprzednia
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage * pageSize >= totalUsers}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300 hover:bg-blue-600 transition duration-300"
            >
              Następna
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
