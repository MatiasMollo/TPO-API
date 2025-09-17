import { EyeIcon } from "@heroicons/react/16/solid";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Grid } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="d-flex justify-content-center min-vh-100">
      <div className="d-none d-md-flex flex-column col-md-6 col-xl-8 p-4 min-vh-100 position-relative">
        <h1 className="text-start display-5 text-secondary">
          Acceso a usuarios
        </h1>
        <span className="text-start fs-5 fw-light">
          Gestiona turnos médicos con tus credenciales
        </span>

        <img
          src="/src/assets/clients.svg"
          alt="Imagen de clientes"
          className="col-7 bottom-0 position-fixed"
        />
      </div>

      <Grid container alignItems="center" spacing={2}>
        <Grid
          item
          xs={12}
          md={6}
          xl={4}
          sx={{
            bgcolor: "white",
            boxShadow: 3, // usa los niveles de sombra del theme (0–24)
            zIndex: 3,
            p: 4,
            minHeight: "100vh",
          }}
        >
            <div className="p-4 mx-4 text-start">
              <h2 className="h4 fw-secondary mb-2">
                ¡Hola! Te damos la bienvenida
              </h2>
              <p className="mb-4 text-secondary">
                Completá tus datos para ingresar
              </p>
              <form className="d-flex flex-column">
                <div className="mb-3">
                  <label className="form-label" htmlFor="documento">
                    Número de documento
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="documento"
                    placeholder=""
                  />
                </div>
                <div className="mb-3 position-relative">
                  <label className="form-label" htmlFor="password">
                    Contraseña
                  </label>
                  <input
                    className="form-control pe-5"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder=""
                  />
                  <span
                    className="position-absolute top-50 end-0 me-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? "Ocultar" : "Mostrar"}
                  >
                    <EyeIcon width="20" />
                  </span>
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    id="recordar"
                    className="form-check-input"
                  />
                  <label
                    htmlFor="recordar"
                    className="form-check-label text-secondary"
                  >
                    Recordar el número de documento
                  </label>
                </div>
                <Link to="/citas">
                  <button
                    type="submit"
                    className="btn btn-danger fw-semibold mb-3 mx-auto"
                  >
                    Ingresar
                  </button>
                </Link>
              </form>
              <div className="text-center mb-3">
                <a
                  href="#"
                  className="text-primary fw-semibold small text-decoration-underline"
                >
                  ¿Necesitás ayuda para ingresar?
                </a>
              </div>
              <div className="card card-shadow d-flex flex-row bg-light p-3">
                <span className="me-3">
                  <InformationCircleIcon
                    width="20"
                    className="text-primary"
                  ></InformationCircleIcon>
                </span>
                <div>
                  <span className="fw-bold text-dark">
                    No compartas tus claves.
                  </span>
                  <p className="small text-secondary mb-0">
                    Nunca te solicitaremos esta información por redes sociales,
                    teléfono o email.
                    <br />
                  </p>
                </div>
              </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
