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
import {
  crearObraSocial,
  editarObraSocial,
  eliminarObraSocial,
  getObrasSociales,
} from "../service/obrasSocialesService";

const validationSchema = Yup.object({
  prestador: Yup.string()
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/, "Solo se permiten letras y espacios.")
    .required("El nombre del prestador es obligatorio"),
});

const ObrasSociales = () => {
  const [obrasSociales, setObrasSociales] = useState([]);

  const [openAddEditDialog, setOpenAddEditDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [editingObraSocial, setEditingObraSocial] = useState(null);
  const [obraSocialToDelete, setObraSocialToDelete] = useState(null);

  async function handleGetObrasSociales() {
    try {
      const response = await getObrasSociales();
      setObrasSociales(response.data.obras_sociales);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleCrearObraSocial(values) {
    try {
      await crearObraSocial(values.prestador);
      handleGetObrasSociales();
    } catch (err) {
      console.log(err);
    }
  }

  async function handleEliminarObraSocial(id) {
    try {
      await eliminarObraSocial(id);
      await handleGetObrasSociales();
      handleCloseConfirmDialog();
    } catch (err) {
      console.log(err);
    }
  }

  async function handleEditarObraSocial(values) {
    try {
      await editarObraSocial(editingObraSocial.id, values.prestador);
      handleGetObrasSociales();
    } catch (err) {
      console.log(err);
    }
  }

  const handleSave = async (values) => {
    if (editingObraSocial) handleEditarObraSocial(values);
    else handleCrearObraSocial(values);

    handleCloseAddEditDialog();
  };

  // Manejo modales
  const handleOpenAddEditDialog = (obraSocial = null) => {
    setEditingObraSocial(obraSocial);
    setOpenAddEditDialog(true);
  };
  const handleCloseAddEditDialog = () => {
    setOpenAddEditDialog(false);
    setEditingObraSocial(null);
  };
  const handleOpenConfirmDialog = (id) => {
    setObraSocialToDelete(id);
    setOpenConfirmDialog(true);
  };
  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setObraSocialToDelete(null);
  };

  useEffect(() => {
    handleGetObrasSociales();
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
        {/* Header */}
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          type="header"
          mb={3}
        >
          <Typography variant="h5" fontWeight={700} align="left">
            Mis Obras Sociales
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenAddEditDialog()}
            sx={{ backgroundColor: "#01819d" }}
          >
            Agregar Obra Social
          </Button>
        </Box>

        {/* Tabla de obras sociales */}
        <TableContainer>
          <Table aria-label="tabla de obras sociales" size="small">
            <TableHead>
              <TableRow>
                <TableCell>Opción</TableCell>
                <TableCell>Prestador</TableCell>
                <TableCell align="right">Modificar/Eliminar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {obrasSociales.map((os, index) => (
                <TableRow key={os.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{os.nombre}</TableCell>
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
                <DialogContent
                  sx={{
                    width: { xs: 300, sm: 400 },
                    maxWidth: "100%",
                  }}
                >
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
              onClick={() => handleEliminarObraSocial(obraSocialToDelete)}
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
