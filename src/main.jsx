import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./pages/login";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Citas from "./pages/citas";
import Header from "./components/Header/Header";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/citas" element={<Citas />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
