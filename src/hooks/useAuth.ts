import { useSession, signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout, login } from "../store/slices/authSlice";
import { useCallback } from "react";

export function useAuth() {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      dispatch(logout());
      router.push("/");
    } catch (error) {
      console.error("Błąd podczas wylogowywania:", error);
    }
  };

  const syncAuthState = useCallback(() => {
    if (status === "authenticated" && session?.user) {
      dispatch(
        login({
          user: {
            id: session.user.id || "",
            email: session.user.email || null,
            name: session.user.name || null,
            role: session.user.role || null,
          },
        })
      );
    } else if (status === "unauthenticated") {
      dispatch(logout());
    }
  }, [status, session, dispatch]);

  return { session, status, handleLogout, syncAuthState };
}
