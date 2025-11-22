import { FunnelIcon, PhoneIcon } from "@heroicons/react/24/outline";
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
import { useEffect, useState } from "react";
import { cancelarCita, confirmarCita, getCitas } from "../service/citasService";

export default function Citas() {
  const [citas, setCitas] = useState([]);
  const [estado, setEstado] = useState("");
  const [fecha, setFecha] = useState("");
  const [nombre, setNombre] = useState("");

  async function cargarCitasConFiltros() {
    try {
      const data = await getCitas({ estado, fecha, nombre }, true);
      setCitas(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleConfirmar(id) {
    try {
      await confirmarCita(id);
      cargarCitasConFiltros();
    } catch (err) {
      console.log("error al confirmar:", err);
    }
  }

  async function handleCancelar(id) {
    try {
      await cancelarCita(id);
      cargarCitasConFiltros();
    } catch (err) {
      console.log("error al cancelar:", err);
    }
  }

  useEffect(() => {
    cargarCitasConFiltros();
  }, []);

  useEffect(() => {
    cargarCitasConFiltros();
  }, [estado, fecha, nombre]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: "70vh",
        paddingTop: "3em",
      }}
    >
      <Box display="flex" justifyContent="space-between" mb={3}>
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
        <Typography
          variant="subtitle1"
          fontWeight={600}
          mb={2}
          align="start"
          display="flex"
          alignItems="center"
          gap={1}
        >
          <FunnelIcon width="15"></FunnelIcon>
          Filtros
        </Typography>
        <Box display="flex" gap={2} flexWrap="wrap">
          <TextField
            size="small"
            label="Nombre del paciente"
            variant="outlined"
            sx={{ minWidth: 220 }}
            onChange={(e) => setNombre(e.target.value)}
          />
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Estado</InputLabel>
            <Select
              label="Estado"
              defaultValue=""
              onChange={(e) => {
                setEstado(e.target.value);
              }}
            >
              <MenuItem value="">Todos los estados</MenuItem>
              <MenuItem value="pendiente">Sin confirmar</MenuItem>
              <MenuItem value="confirmado">Confirmada</MenuItem>
              <MenuItem value="cancelado">Cancelada</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <TextField
              type="date"
              size="small"
              onChange={(e) => setFecha(e.target.value)}
            />
          </FormControl>
        </Box>
      </Paper>

      {/* Tabla de citas */}
      <Paper elevation={4} sx={{ p: 3 }}>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          mb={2}
          display="flex"
          alignItems="center"
          gap={1}
        >
          Citas Médicas ({citas.length})
        </Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">Paciente</TableCell>
                <TableCell align="center">Fecha</TableCell>
                <TableCell align="center">Hora</TableCell>
                <TableCell align="center">Estado</TableCell>
                <TableCell align="center">Contacto</TableCell>
                <TableCell align="center">Notas</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {citas.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    align="center"
                    style={{ padding: "1.5em", backgroundColor: "#f9f9f9" }}
                  >
                    No se encontraron citas programadas.
                  </TableCell>
                </TableRow>
              ) : (
                citas.map((cita, idx) => (
                  <TableRow key={idx}>
                    <TableCell align="center">{cita.cliente.nombre}</TableCell>
                    <TableCell align="center">{cita.fecha}</TableCell>
                    <TableCell align="center">{cita.hora}</TableCell>
                    <TableCell align="center">
                      {cita.estado === "pendiente" && (
                        <Chip label="Sin confirmar" size="small" />
                      )}
                      {cita.estado === "confirmado" && (
                        <Chip label="Confirmada" color="primary" size="small" />
                      )}
                      {cita.estado === "cancelado" && (
                        <Chip label="Cancelada" color="error" size="small" />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <PhoneIcon width="15" />
                      {cita.cliente.telefono}
                      <br />
                      <Typography variant="caption" color="text.secondary">
                        {cita.cliente.email}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        maxWidth: "5em",
                        overflowX: "auto",
                        boxSizing: "border-box",
                      }}
                    >
                      {cita.motivo}
                    </TableCell>
                    <TableCell align="center">
                      {cita.estado === "pendiente" && (
                        <span
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            variant="contained"
                            color="success"
                            size="small"
                            onClick={() => handleConfirmar(idx + 1)}
                            sx={{ fontSize: "0.7rem" }}
                          >
                            Confirmar
                          </Button>
                        </span>
                      )}

                      {cita.estado === "pendiente" ||
                      cita.estado === "confirmado" ? (
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => handleCancelar(idx + 1)}
                          sx={{ fontSize: "0.7rem" }}
                        >
                          Cancelar
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          size="small"
                          sx={{ fontSize: "0.7rem" }}
                          disabled
                        >
                          Sin pendientes
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}
