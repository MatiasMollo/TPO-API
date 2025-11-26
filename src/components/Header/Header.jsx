import * as React from "react";

import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import {
  ArrowLeftEndOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";
import { matarSesion, usuarioLogueado } from "../../utils";

function Header({ menuItems = [], mode = "home" }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <AppBar position="fixed" style={{ backgroundColor: "#01819d" }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: { xs: 0, md: 4 },
            flexWrap: "wrap",
            flexDirection: { xs: "column", md: "row" },
            paddingY: { xs: 2, md: 0 },
          }}
        >
          {!usuarioLogueado() && (
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <Typography
                variant="h5"
                noWrap
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "white",
                  textDecoration: "none !important",
                  marginLeft: { xs: 1, md: 0 },
                }}
                onClick={(e) => {
                  if (pathname === "/") {
                    e.preventDefault();
                    document
                      .getElementById("home")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                DR SANCHEZ
              </Typography>
            </Link>
          )}

          <Box sx={{ flexGrow: 1, display: "flex" }}>
            {menuItems.map((page) =>
              mode === "home" ? (
                <Button
                  key={page.name}
                  onClick={() => {
                    const el = document.getElementById(page.path);
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                  }}
                >
                  {page.name}
                </Button>
              ) : (
                <Button
                  key={page.name}
                  component={Link}
                  to={page.path}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                  }}
                >
                  {page.name}
                </Button>
              )
            )}
          </Box>

          {/*Si está deslogueado, ve el login. Si no, ve el botón para desloguearse */}
          {!usuarioLogueado() ? (
            <Link to="/login">
              <Tooltip title="Login">
                <IconButton sx={{ p: 0 }}>
                  <UserIcon
                    style={{
                      width: 26,
                      height: 26,
                      color: "white",
                      marginTop: pathname === "/login" ? 10 : 0,
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Link>
          ) : (
            <Tooltip title="Logout">
              <IconButton sx={{ p: 0 }}>
                <ArrowLeftEndOnRectangleIcon
                  style={{
                    width: 26,
                    height: 26,
                    color: "white",
                    marginTop: pathname === "/login" ? 10 : 0,
                  }}
                  onClick={() => matarSesion(navigate)}
                />
              </IconButton>
            </Tooltip>
          )}

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
