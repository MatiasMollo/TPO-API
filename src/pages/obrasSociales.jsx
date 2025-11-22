import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

// Yup validation schema
const validationSchema = Yup.object({
  prestador: Yup.string()
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/, "Solo se permiten letras y espacios.")
    .required("El nombre del prestador es obligatorio"),
  numeroAfiliado: Yup.string().matches(
    /^[a-zA-Z0-9]+$/,
    "Solo se permiten letras y números."
  ),
  // .required("El número de afiliado es obligatorio"),
});

const ObrasSociales = () => {
  const jwt = localStorage.getItem("authToken");
  const [obrasSociales, setObrasSociales] = useState([]);

  const [openAddEditDialog, setOpenAddEditDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const [editingObraSocial, setEditingObraSocial] = useState(null);
  const [obraSocialToDelete, setObraSocialToDelete] = useState(null);

  async function getObrasSociales() {
    try {
      const response = await axios.get("http://localhost:3000/api/obraSocial");
      setObrasSociales(response.data.obras_sociales);
    } catch (err) {
      console.log(err);
    }
  }

  async function crearObraSocial(values) {
    await axios.post(
      "http://localhost:3000/api/obraSocial",
      { nombre: values.prestador },
      { headers: { Authorization: `Bearer ${jwt}` } }
    );
    getObrasSociales();
  }
  async function editarObraSocial(values) {
    await axios.put(
      `http://localhost:3000/api/obraSocial/${editingObraSocial.id}`,
      { nombre: values.prestador },
      { headers: { Authorization: `Bearer ${jwt}` } }
    );
    getObrasSociales();
  }

  async function handleEliminarObraSocial() {
    try {
      await axios.delete(
        `http://localhost:3000/api/obraSocial/${obraSocialToDelete}`,
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );

      setObrasSociales(
        obrasSociales.filter((os) => os.id !== obraSocialToDelete)
      );

      handleCloseConfirmDialog();
    } catch (err) {
      console.log(err);
    }
  }

  // Modal para editar obra social
  const handleOpenAddEditDialog = (obraSocial = null) => {
    setEditingObraSocial(obraSocial);
    setOpenAddEditDialog(true);
  };
  const handleCloseAddEditDialog = () => {
    setOpenAddEditDialog(false);
    setEditingObraSocial(null);
  };

  const handleSave = async (values) => {
    if (editingObraSocial) {
      await editarObraSocial(values);
    } else {
      await crearObraSocial(values);
    }
    handleCloseAddEditDialog();
  };

  // Cuando abro modal para eliminar, guardo el id de la obra social a eliminar.
  // Cuando lo cierro, limpio ese estado.
  const handleOpenConfirmDialog = (id) => {
    setObraSocialToDelete(id);
    setOpenConfirmDialog(true);
  };
  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setObraSocialToDelete(null);
  };

  // Confirmación de eliminación
  const handleDeleteConfirmed = () => {
    handleEliminarObraSocial();
    getObrasSociales(); //refresh
    handleCloseConfirmDialog();
  };

  useEffect(() => {
    getObrasSociales();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 800,
        mx: "auto",
        mt: 4,
      }}
    >
      <Paper sx={{ p: 3, m: 2, border: "1px solid #e0e0e0", boxShadow: 4 }}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography
            variant="h5"
            fontWeight={700}
            align="left"
            marginBottom={3}
          >
            Mis Obras Sociales
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenAddEditDialog()}
            sx={{ mb: 5, backgroundColor: "#01819d" }}
          >
            Agregar Obra Social
          </Button>
        </Box>
        <TableContainer>
          <Table aria-label="tabla de obras sociales" size="small">
            <TableHead>
              <TableRow>
                <TableCell>Opción</TableCell>
                <TableCell>Prestador</TableCell>
                <TableCell>Número de Afiliado</TableCell>
                <TableCell align="right">Modificar/Eliminar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {obrasSociales.map((os, index) => (
                <TableRow key={os.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{os.nombre}</TableCell>
                  <TableCell> Poner campo en back </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleOpenAddEditDialog(os)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleOpenConfirmDialog(os.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Add/Edit Dialog */}
        <Dialog open={openAddEditDialog} onClose={handleCloseAddEditDialog}>
          <DialogTitle>
            {editingObraSocial ? "Editar Obra Social" : "Agregar Obra Social"}
          </DialogTitle>
          <Formik
            initialValues={{
              prestador: editingObraSocial ? editingObraSocial.nombre : "",
              // numeroAfiliado: editingObraSocial
              //   ? editingObraSocial.numero_afiliado ?? ""
              //   : "",
            }}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={handleSave}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              errors,
              touched,
            }) => (
              <form onSubmit={handleSubmit}>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    name="prestador"
                    label="Prestador de la Obra Social"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={values.prestador}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.prestador && !!errors.prestador}
                    helperText={touched.prestador && errors.prestador}
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    margin="dense"
                    name="numeroAfiliado"
                    label="Número de Afiliado"
                    type="text"
                    fullWidth
                    variant="outlined"
                    // value={values.numeroAfiliado}
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    // error={touched.numeroAfiliado && !!errors.numeroAfiliado}
                    helperText={"Este campo todavía no está en el backend"}
                    disabled
                  />
                </DialogContent>

                <DialogActions>
                  <Button onClick={handleCloseAddEditDialog}>Cancelar</Button>

                  <Button type="submit" variant="contained">
                    Guardar
                  </Button>
                </DialogActions>
              </form>
            )}
          </Formik>
        </Dialog>
        {/* Deletion Confirmation Dialog */}
        <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
          <DialogTitle>Confirmar Eliminación</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Está seguro/a de querer eliminar esta obra social? Esta acción no
              se podrá deshacer.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmDialog}>Cancelar</Button>
            <Button
              onClick={handleDeleteConfirmed}
              color="error"
              variant="contained"
            >
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default ObrasSociales;
