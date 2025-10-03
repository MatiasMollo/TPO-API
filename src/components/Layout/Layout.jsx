import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header.jsx";

const Layout = () => {
  const { pathname } = useLocation();

  let menuItems = [];
  let mode = "";

  if (pathname === "/") {
    menuItems = [
      { name: "Servicios", path: "services" },
      { name: "Nosotros", path: "location" },
      { name: "Contacto", path: "workWithMe" },
    ];
    mode = "home";
  } else if (pathname === "/citas" || pathname === "/obras-sociales") {
    menuItems = [
      { name: "Citas médicas", path: "/citas" },
      { name: "Obras sociales", path: "/obras-sociales" },
    ];
    mode = "index";
  }

  return (
    <>
      <Header menuItems={menuItems} mode={mode} />
      <main style={{ marginTop: "64px" }}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
