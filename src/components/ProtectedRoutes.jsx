import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoutes({ protectedPaths = [] }) {
  const token = document.cookie
    .split("; ")
    .find((c) => c.startsWith("authToken="))
    ?.split("=")[1];
  const location = useLocation();
  const current = location.pathname;

  const requiereAuth = protectedPaths.includes(current);

  if (requiereAuth && !token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
