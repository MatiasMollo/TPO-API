import { Navigate, Outlet, useLocation } from "react-router-dom";
import { usuarioLogueado } from "../utils";

export default function ProtectedRoutes({ protectedPaths = [] }) {
  const location = useLocation();
  const current = location.pathname;
  const requiereAuth = protectedPaths.includes(current);

  if (requiereAuth && !usuarioLogueado()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
