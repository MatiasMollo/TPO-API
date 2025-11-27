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
import { useFormik } from "formik";
import * as Yup from "yup";

const WorkWithMe = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [obrasSociales, setObrasSociales] = useState([]);
  const [citasOcupadas, setCitasOcupadas] = useState([]);

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

  async function handleSubmit(values) {
    setLoading(true);
    setError("");

    try {
      await crearCita({
        ...values,
        fecha: values.fecha.format("YYYY-MM-DD"),
      });
      await handleGetCitas(); // refrescamos horarios

      formik.resetForm();
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

  const schema = Yup.object().shape({
    nombre: Yup.string()
      .required("El nombre y apellido son obligatorios")
      .matches(/^[a-zA-ZÁÉÍÓÚáéíóúÑñ ]+$/, "Solo letras y espacios")
      .min(3, "Mínimo 3 caracteres"),
    telefono: Yup.string()
      .required("El teléfono es obligatorio")
      .matches(/^\d+$/, "Solo números")
      .min(8, "Mínimo 8 dígitos"),
    email: Yup.string()
      .required("El email es obligatorio")
      .email("Email inválido"),
    obra_social: Yup.string().required("Seleccione una obra social"),
    fecha: Yup.date().required("Seleccione una fecha"),
    hora: Yup.string().required("Seleccione un horario"),
    motivo: Yup.string()
      .required("Ingrese un motivo")
      .min(10, "Mínimo 10 caracteres"),
  });

  const formik = useFormik({
    initialValues: {
      nombre: "",
      telefono: "",
      email: "",
      obra_social: "",
      fecha: null,
      hora: "",
      motivo: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

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

        <Box maxWidth={{ xs: "100%", md: "530px" }}>
          {/* Mensajes error */}
          {warning && (
            <Alert
              severity="warning"
              sx={{
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
                margin: "1em 0em",
              }}
            >
              {error}
            </Alert>
          )}

          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Nombre y apellido"
                fullWidth
                name="nombre"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                helperText={formik.touched.nombre && formik.errors.nombre}
              />

              <TextField
                label="Teléfono"
                fullWidth
                name="telefono"
                type="number"
                value={formik.values.telefono}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.telefono && Boolean(formik.errors.telefono)
                }
                helperText={formik.touched.telefono && formik.errors.telefono}
              />

              <TextField
                label="Email"
                fullWidth
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              <FormControl
                fullWidth
                error={
                  formik.touched.obra_social &&
                  Boolean(formik.errors.obra_social)
                }
              >
                <InputLabel>Obra social</InputLabel>
                <Select
                  label="Obra social"
                  name="obra_social"
                  value={formik.values.obra_social}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {obrasSociales.map((obra) => (
                    <MenuItem key={obra.id} value={obra.id}>
                      {obra.nombre}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.obra_social && formik.errors.obra_social && (
                  <Typography
                    variant="caption"
                    color="error"
                    marginLeft={"14px"}
                  >
                    {formik.errors.obra_social}
                  </Typography>
                )}
              </FormControl>

              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="es"
              >
                <DatePicker
                  label="Seleccioná una fecha"
                  value={formik.values.fecha}
                  onChange={(newDate) => {
                    formik.setFieldValue("fecha", newDate);
                    formik.setFieldValue("hora", "");
                  }}
                  onBlur={() => formik.setFieldTouched("fecha", true)}
                  shouldDisableDate={(day) => {
                    const weekday = day.day();
                    if (weekday === 0 || weekday === 6) return true;
                    if (day.isBefore(dayjs(), "day")) return true;
                    if (day.isAfter(dayjs().add(2, "week"), "day")) return true;
                    return false;
                  }}
                  slotProps={{
                    textField: {
                      error:
                        formik.touched.fecha && Boolean(formik.errors.fecha),
                      helperText: formik.touched.fecha && formik.errors.fecha,
                    },
                  }}
                />
              </LocalizationProvider>

              <FormControl
                fullWidth
                error={formik.touched.hora && Boolean(formik.errors.hora)}
              >
                <InputLabel>Hora</InputLabel>
                <Select
                  label="Hora"
                  name="hora"
                  value={formik.values.hora}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {formik.values.fecha ? (
                    getHorariosDisponibles(formik.values.fecha).length > 0 ? (
                      getHorariosDisponibles(formik.values.fecha).map(
                        (time) => (
                          <MenuItem key={time} value={time}>
                            {time}
                          </MenuItem>
                        )
                      )
                    ) : (
                      <MenuItem disabled>No hay horas disponibles</MenuItem>
                    )
                  ) : (
                    <MenuItem disabled>Elegí una fecha</MenuItem>
                  )}
                </Select>

                {formik.touched.hora && formik.errors.hora && (
                  <Typography
                    variant="caption"
                    color="error"
                    marginLeft={"14px"}
                  >
                    {formik.errors.hora}
                  </Typography>
                )}
              </FormControl>

              <TextField
                label="Motivo de consulta"
                multiline
                rows={4}
                fullWidth
                name="motivo"
                value={formik.values.motivo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.motivo && Boolean(formik.errors.motivo)}
                helperText={formik.touched.motivo && formik.errors.motivo}
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
            </Box>
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
