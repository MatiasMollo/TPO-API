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
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const WorkWithMe = () => {
  const availableTimes = {
    "2025-10-03": ["09:00", "10:00", "14:00"],
    "2025-10-04": ["11:00", "15:00", "16:00"],
    "2025-10-05": ["09:30", "13:00", "16:30"],
  };

  const obrasSociales = ["OSDE", "AMFFA", "PAMI"];

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [obraSocial, setObraSocial] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [motivo, setMotivo] = useState("");

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setNombre("");
    setTelefono("");
    setEmail("");
    setObraSocial("");
    setSelectedDate(null);
    setSelectedTime("");
    setMotivo("");
    setOpenSnackbar(true);
  };

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
          sx={{ marginLeft: "-0.05em", lineHeight: 0.9, mb: 1.5 }}
        >
          Trabajemos Juntos
        </Typography>
        <Typography sx={{ marginBottom: "0.5em" }}>
          Reservá una cita conmigo, completando los siguientes datos:
        </Typography>

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
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <TextField
                label="Teléfono"
                variant="outlined"
                fullWidth
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
              <TextField
                label="E-mail"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Select obra social */}
              <FormControl fullWidth>
                <InputLabel>Obra social</InputLabel>
                <Select
                  value={obraSocial}
                  label="Obra social"
                  onChange={(e) => setObraSocial(e.target.value)}
                >
                  {obrasSociales.map((obra) => (
                    <MenuItem key={obra} value={obra}>
                      {obra}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Input fecha */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Seleccioná una fecha"
                  value={selectedDate}
                  onChange={(newValue) => {
                    setSelectedDate(newValue);
                    setSelectedTime(""); // reset hora al cambiar fecha
                  }}
                />
              </LocalizationProvider>

              {/* Select de horas */}
              <FormControl
                fullWidth
                disabled={!selectedDate}
                sx={{ marginBottom: "1em" }}
              >
                <InputLabel>Hora</InputLabel>
                <Select
                  value={selectedTime}
                  label="Hora"
                  onChange={(e) => setSelectedTime(e.target.value)}
                >
                  {selectedDate &&
                  availableTimes[selectedDate.format("YYYY-MM-DD")] ? (
                    availableTimes[selectedDate.format("YYYY-MM-DD")].map(
                      (time) => (
                        <MenuItem key={time} value={time}>
                          {time}
                        </MenuItem>
                      )
                    )
                  ) : (
                    <MenuItem disabled>No hay horas disponibles</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Box>

            {/* Textarea motivo consulta */}
            <TextField
              label="Motivo de consulta"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
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
            >
              Trabajemos juntos
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

      {/* Snackbar flotante */}
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
