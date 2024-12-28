import { useSession, signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { login, logout } from "../store/slices/authSlice";
import { mapSessionToUser } from "../types/auth";

export const useAuth = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleLogout = async () => {
    await signOut();
    dispatch(logout());
  };

  const syncAuthState = async () => {
    if (session?.user) {
      const mappedUser = mapSessionToUser(session.user);
      dispatch(login({ user: mappedUser }));
    }
  };

  return {
    session,
    status,
    user,
    isAuthenticated,
    handleLogout,
    syncAuthState,
  };
};
