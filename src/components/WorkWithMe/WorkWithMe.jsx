import work from "/resources/image/home/work.jpg";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/es";
import dayjs from "dayjs";
import { crearCita, getCitas } from "../../service/citasService";
import { getObrasSociales } from "../../service/obrasSocialesService";

const WorkWithMe = () => {
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    nombre: "",
    telefono: "",
    email: "",
    obra_social: "",
    fecha: null,
    hora: "",
    motivo: "",
  });
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [obrasSociales, setObrasSociales] = useState([]);
  const [citasOcupadas, setCitasOcupadas] = useState([]);

  function resetFormulario() {
    setInputs({
      nombre: "",
      telefono: "",
      email: "",
      obra_social: "",
      fecha: null,
      hora: "",
      motivo: "",
    });
  }

  async function handleGetObrasSociales() {
    try {
      const response = await getObrasSociales();
      setObrasSociales(response.data.obras_sociales);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleGetCitas() {
    try {
      const citas = await getCitas();
      setCitasOcupadas(citas);
    } catch (err) {
      setWarning("Tuvimos un problema obteniendo las citas reservadas.");
      console.log(err);
    }
  }

  function generarHorarios() {
    const horas = [];
    for (let h = 9; h <= 17; h++) {
      const hourStr = h.toString().padStart(2, "0") + ":00";
      horas.push(hourStr);
    }
    return horas;
  }

  function getHorariosDisponibles(fechaSeleccionada) {
    if (!fechaSeleccionada) return [];

    const fecha = fechaSeleccionada.format("YYYY-MM-DD");
    const todos = generarHorarios();

    const ocupadasEnFecha = citasOcupadas
      .filter((cita) => cita.fecha === fecha)
      .map((cita) => cita.hora.slice(0, 5)); // "HH:MM"

    const disponibles = todos.filter((hora) => !ocupadasEnFecha.includes(hora));

    return disponibles;
  }

  useEffect(() => {
    handleGetObrasSociales();
    handleGetCitas();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const cita = await crearCita({
        ...inputs,
        fecha: inputs.fecha.format("YYYY-MM-DD"),
      });

      console.log("Cita creada:", cita);

      await handleGetCitas(); // refrescamos horarios
      resetFormulario();
      setOpenSnackbar(true);
    } catch (err) {
      console.log(err);

      if (err.response?.data?.error) setError(err.response.data.error);
      else if (err.response?.data?.message) setError(err.response.data.message);
      else
        setError(
          "Ocurrió un error a la hora de reservar la cita. Por favor, reintente más tarde."
        );
    } finally {
      setLoading(false);
    }
  }

  const handleCloseSnackbar = (_, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  return (
    <Grid
      container
      id="workWithMe"
      minHeight={{ xs: 0, md: "calc(100vh + 68px)" }}
      sx={{
        boxSizing: "border-box",
        padding: "0px !important",
        width: "100%",
      }}
      alignItems="center"
      spacing={2}
      backgroundColor="#e0f9ff"
    >
      <Grid
        item
        size={{ xs: 12, md: 6 }}
        sx={{ padding: "4em", textAlign: "left" }}
      >
        <Typography
          variant="h2"
          sx={{ marginLeft: "-0.05em", lineHeight: 0.9 }}
        >
          Solicite una cita
        </Typography>
        <Typography sx={{ marginBottom: "0.5em" }}>
          Reservá un turno conmigo, completando los siguientes datos:
        </Typography>

        {/* Mensajes error */}
        {warning && (
          <Alert
            severity="warning"
            sx={{
              width: "92%",
              margin: "1em 0em",
            }}
          >
            {warning}
          </Alert>
        )}

        {error && (
          <Alert
            severity="error"
            sx={{
              width: "92%",
              margin: "1em 0em",
            }}
          >
            {error}
          </Alert>
        )}

        <Box maxWidth={{ xs: "100%", md: "530px" }}>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <TextField
                label="Nombre y apellido"
                variant="outlined"
                fullWidth
                value={inputs.nombre}
                onChange={(e) =>
                  setInputs({ ...inputs, nombre: e.target.value })
                }
              />
              <TextField
                label="Teléfono"
                variant="outlined"
                fullWidth
                type="number"
                value={inputs.telefono}
                onChange={(e) =>
                  setInputs({ ...inputs, telefono: e.target.value })
                }
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={inputs.email}
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
              />
              <FormControl fullWidth>
                <InputLabel>Obra social</InputLabel>
                <Select
                  label="Obra social"
                  value={inputs.obra_social}
                  onChange={(e) => {
                    console.log(e.target);
                    setInputs({ ...inputs, obra_social: e.target.value });
                  }}
                >
                  {obrasSociales.map((obra) => (
                    <MenuItem key={obra.id} value={obra.id}>
                      {obra.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="es"
              >
                <DatePicker
                  label="Seleccioná una fecha"
                  value={inputs.fecha}
                  onChange={(newDate) => {
                    setInputs({
                      ...inputs,
                      fecha: newDate,
                      hora: "",
                    });
                  }}
                  shouldDisableDate={(day) => {
                    const weekday = day.day(); // 0 domingo, 6 sábado
                    if (weekday === 0 || weekday === 6) return true;
                    if (day.isBefore(dayjs(), "day")) return true;
                    if (day.isAfter(dayjs().add(2, "week"), "day")) return true;
                    return false;
                  }}
                />
              </LocalizationProvider>

              <FormControl
                fullWidth
                disabled={!inputs.fecha}
                sx={{ marginBottom: "1em" }}
              >
                <InputLabel>Hora</InputLabel>
                <Select
                  label="Hora"
                  value={inputs.hora}
                  onChange={(e) => {
                    setInputs({
                      ...inputs,
                      hora: e.target.value,
                    });
                  }}
                >
                  {inputs.fecha ? (
                    getHorariosDisponibles(inputs.fecha).length > 0 ? (
                      getHorariosDisponibles(inputs.fecha).map((time) => (
                        <MenuItem key={time} value={time}>
                          {time}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No hay horas disponibles</MenuItem>
                    )
                  ) : (
                    <MenuItem disabled>Elegí una fecha</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Box>

            <TextField
              label="Motivo de consulta"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={inputs.motivo}
              onChange={(e) => {
                setInputs({
                  ...inputs,
                  motivo: e.target.value,
                });
              }}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                background: "#01819d",
                color: "white",
                width: "max-content",
                marginTop: "1em",
                animation: "none",
              }}
              disabled={loading}
            >
              {loading ? "Cargando..." : "Enviar solicitud"}
            </Button>
          </form>
        </Box>
      </Grid>

      {/* Imagen */}
      <Grid
        item
        size={{ xs: 0, md: 6 }}
        overflow={"hidden"}
        id="foto-servicios"
      >
        <Box
          component="img"
          src={work}
          alt="Gente trabajando"
          sx={{
            backgroundSize: "cover",
            width: "100%",
            objectFit: "cover",
            height: "auto",
          }}
          display={{ xs: "none", md: "block" }}
        />
      </Grid>

      {/* Mensaje éxito */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: "100%", padding: "1.5em" }}
        >
          ¡Se ha enviado la solicitud de turno!
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default WorkWithMe;
