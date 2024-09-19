// src/app/admin/users/page.tsx

"use client";

import { useEffect, useState } from "react";
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

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

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
    console.log("AdminUsersPage useEffect - user:", user);
    console.log("AdminUsersPage useEffect - user role:", user?.role);
    if (!user || user.role !== "admin") {
      console.log("Redirecting to login - no user or not admin");
      router.push("/login");
    } else {
      console.log("Fetching users");
      dispatch(fetchUsers({ page: currentPage, pageSize }))
        .unwrap()
        .then(() => {
          console.log("Users fetched successfully");
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          setError("Nie udało się pobrać listy użytkowników");
          setIsLoading(false);
        });
    }
  }, [user, router, dispatch, currentPage, pageSize]);

  const handleDeleteUser = (userId: string) => {
    if (window.confirm("Czy na pewno chcesz usunąć tego użytkownika?")) {
      dispatch(deleteUser(userId))
        .unwrap()
        .catch((error) => {
          setError("Nie udało się usunąć użytkownika");
        });
    }
  };

  const handleUpdateRole = (userId: string, newRole: string) => {
    dispatch(updateUserRole({ userId, newRole }))
      .unwrap()
      .catch((error) => {
        setError("Nie udało się zaktualizować roli użytkownika");
      });
  };

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
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Zarządzanie Użytkownikami</h1>

        {/* Formularz tworzenia nowego użytkownika */}
        <form
          onSubmit={handleCreateUser}
          className="mb-8 bg-white shadow-md rounded px-8 pt-6 pb-8"
        >
          <h2 className="text-2xl font-bold mb-4">Utwórz nowego użytkownika</h2>
          <div className="mb-4">
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
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
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
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="user">Użytkownik</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Utwórz użytkownika
          </button>
        </form>

        {/* Tabela użytkowników */}
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Imię</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Rola</th>
              <th className="p-3 text-left">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user.id} className="border-b">
                <td className="p-3">{user.id}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  <select
                    value={user.role}
                    onChange={(e) => handleUpdateRole(user.id, e.target.value)}
                    className="border rounded p-1"
                  >
                    <option value="user">Użytkownik</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Usuń
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginacja */}
        <div className="mt-4 flex justify-between items-center">
          <div>
            <span>
              Strona {currentPage} z {Math.ceil(totalUsers / pageSize)}
            </span>
          </div>
          <div>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2 disabled:bg-gray-300"
            >
              Poprzednia
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage * pageSize >= totalUsers}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
            >
              Następna
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
