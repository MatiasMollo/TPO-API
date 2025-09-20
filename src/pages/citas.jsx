import { FunnelIcon } from "@heroicons/react/24/outline";
import {
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

// Repositorio temporal hasta conectar DB
const citasIniciales = [
  {
    paciente: "María González",
    fecha: "14/1/2024",
    hora: "09:00",
    especialidad: "Cardiología",
    estado: "Sin confirmar",
    contacto: "+34 666 123 456",
    email: "maria.gonzalez@email.com",
    notas: "Primera consulta",
  },
  {
    paciente: "Carlos Rodríguez",
    fecha: "14/1/2024",
    hora: "10:30",
    especialidad: "Dermatología",
    estado: "Confirmada",
    contacto: "+34 677 987 654",
    email: "carlos.rodriguez@email.com",
    notas: "Revisión lunar",
  },
];

export default function Citas() {
  const [citas, setCitas] = useState(citasIniciales);

  const confirmarCita = (index) => {
    const nuevasCitas = [...citas];
    nuevasCitas[index].estado = "Confirmada";
    setCitas(nuevasCitas);
  };

  return (
    <Container maxWidth="lg" sx={{minHeight:'70vh'}}>
      <Box
        display="flex"
        justifyContent="space-between"
        mb={3}
      >
        <Box>
          <Typography variant="h5" fontWeight={700} align="left">
            Gestión de Citas Médicas
          </Typography>
          <Typography variant="body2" align="start">
            {new Date().toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>
        </Box>
      </Box>

      {/* Filtros */}
      <Paper elevation={4} sx={{ mb: 4, p: 3 }}>
        <Typography variant="subtitle1" fontWeight={600} mb={2} align="start">
          <FunnelIcon width="15"></FunnelIcon>
          Filtros
        </Typography>
        <Box display="flex" gap={2} flexWrap="wrap">
          <TextField
            size="small"
            label="Nombre del paciente"
            variant="outlined"
            sx={{ minWidth: 220 }}
          />
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Estado</InputLabel>
            <Select label="Estado" defaultValue="">
              <MenuItem value="">Todos los estados</MenuItem>
              <MenuItem value="Sin confirmar">Sin confirmar</MenuItem>
              <MenuItem value="Confirmada">Confirmada</MenuItem>
              <MenuItem value="Realizada">Realizada</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Especialidad</InputLabel>
            <Select label="Especialidad" defaultValue="">
              <MenuItem value="">Todas las especialidades</MenuItem>
              <MenuItem value="Cardiología">Cardiología</MenuItem>
              <MenuItem value="Dermatología">Dermatología</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <TextField
              type="date"
              size="small"
            />
          </FormControl>
        </Box>
      </Paper>
      {/* Tabla de citas */}
      <Paper elevation={4} sx={{ p: 3, }}>
        <Typography variant="subtitle1" fontWeight={600} mb={2} display="flex" alignItems="center" gap={1}>
          {/* <CalendarMonth fontSize="small" /> */}
          Citas Médicas ({citas.length})
        </Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">Paciente</TableCell>
                <TableCell align="center">Fecha</TableCell>
                <TableCell align="center">Hora</TableCell>
                <TableCell align="center">Especialidad</TableCell>
                <TableCell align="center">Estado</TableCell>
                <TableCell align="center">Contacto</TableCell>
                <TableCell align="center">Notas</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {citas.map((cita, idx) => (
                <TableRow key={idx}>
                  <TableCell align="center">{cita.paciente}</TableCell>
                  <TableCell align="center">{cita.fecha}</TableCell>
                  <TableCell align="center">{cita.hora}</TableCell>
                  <TableCell align="center">{cita.especialidad}</TableCell>
                  <TableCell align="center">
                    {cita.estado === "Sin confirmar" && (
                      <Chip label="Sin confirmar" size="small" />
                    )}
                    {cita.estado === "Confirmada" && (
                      <Chip label="Confirmada" color="primary" size="small" />
                    )}
                    {cita.estado === "Realizada" && (
                      <Chip label="Realizada" color="success" size="small" />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {cita.contacto}
                    <br />
                    <Typography variant="caption" color="text.secondary">
                      {cita.email}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">{cita.notas}</TableCell>
                  <TableCell align="center">
                    {cita.estado === "Sin confirmar" && (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => confirmarCita(idx)}
                        sx={{fontSize:'0.7rem'}}
                      >
                        Confirmar
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}