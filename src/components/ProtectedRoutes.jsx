import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoutes({ protectedPaths = [] }) {
  const token = localStorage.getItem("authToken");
  const location = useLocation();
  const current = location.pathname;

  const requiereAuth = protectedPaths.includes(current);

  if (requiereAuth && !token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
