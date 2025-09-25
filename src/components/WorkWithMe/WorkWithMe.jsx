import work from "/resources/image/home/work.jpg";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import { Typography, Button } from "@mui/material";
import { useState } from "react";

const WorkWithMe = () => {
  const availableTimes = {
    "2025-09-21": ["09:00", "10:00", "14:00"],
    "2025-09-22": ["11:00", "15:00", "16:00"],
    "2025-09-23": ["09:30", "13:00", "16:30"],
  };

  const obrasSociales = ["OSDE", "AMFFA", "PAMI"];

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [obraSocial, setObraSocial] = useState("");

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
      overflow={"hidden"}
      backgroundColor="#e0f9ff"
    >
      <Grid item xs={12} md={6} sx={{ padding: "4em", textAlign: "left" }}>
        <Typography
          variant="h2"
          sx={{ marginLeft: "-0.05em", lineHeight: 0.9, mb: 1.5 }}
        >
          Trabajemos Juntos
        </Typography>
        <Typography sx={{ marginBottom: "0.5em" }}>
          Reservá una cita conmigo, completando los siguientes datos:
        </Typography>

        <form action="" method="post">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField label="Nombre y apellido" variant="outlined" fullWidth />
            <TextField label="Teléfono" variant="outlined" fullWidth />
            <TextField label="E-mail" variant="outlined" fullWidth />

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
            <TextField
              label="Seleccioná una fecha"
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setSelectedTime(""); // reset hora al cambiar fecha
              }}
              InputLabelProps={{ shrink: true }}
            />

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
                {selectedDate && availableTimes[selectedDate] ? (
                  availableTimes[selectedDate].map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))
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
          />

          <Button
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
      </Grid>
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
    </Grid>
  );
};

export default WorkWithMe;
