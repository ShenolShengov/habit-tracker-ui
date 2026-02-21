import { Navigate, Outlet } from "react-router";
import { useAuth } from "../store/authContext";

export default function AdminGuard() {
  const { user } = useAuth();

  if (!user?.isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
}
