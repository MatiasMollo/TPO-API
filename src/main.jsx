import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Citas from "./pages/citas";
import ObrasSociales from "./pages/obrasSociales";
import Layout from "./components/Layout/Layout";
import Home from "./pages/index.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* grupo protegido */}
          <Route
            element={
              <ProtectedRoutes protectedPaths={["/citas", "/obras-sociales"]} />
            }
          >
            <Route path="/citas" element={<Citas />} />
            <Route path="/obras-sociales" element={<ObrasSociales />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
