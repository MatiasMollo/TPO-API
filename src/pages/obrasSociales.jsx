import React, { useState } from 'react';
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
  Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Pre-load data
const initialObrasSociales = [
  { id: 1, prestador: 'OSDE', numeroAfiliado: 'OSDE12345' },
  { id: 2, prestador: 'Swiss Medical', numeroAfiliado: 'SM67890' },
];

// Yup validation schema
const validationSchema = Yup.object({
  prestador: Yup.string()
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/, 'Solo se permiten letras y espacios.')
    .required('El nombre del prestador es obligatorio'),
  numeroAfiliado: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, 'Solo se permiten letras y números.')
    .required('El número de afiliado es obligatorio'),
});

const ObrasSociales = () => {
  const [obrasSociales, setObrasSociales] = useState(initialObrasSociales);
  const [openAddEditDialog, setOpenAddEditDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [editingObraSocial, setEditingObraSocial] = useState(null);
  const [obraSocialToDelete, setObraSocialToDelete] = useState(null);

  // Dialog to Add/Edit
  const handleOpenAddEditDialog = (obraSocial = null) => {
    setEditingObraSocial(obraSocial);
    setOpenAddEditDialog(true);
  };

  const handleCloseAddEditDialog = () => {
    setOpenAddEditDialog(false);
    setEditingObraSocial(null);
  };

  const handleSave = (values) => {
    if (editingObraSocial) {
      setObrasSociales(obrasSociales.map(os =>
        os.id === editingObraSocial.id ? { ...os, ...values } : os
      ));
    } else {
      const newId = obrasSociales.length > 0 ? Math.max(...obrasSociales.map(os => os.id)) + 1 : 1;
      const newObraSocial = { id: newId, ...values };
      setObrasSociales([...obrasSociales, newObraSocial]);
    }
    handleCloseAddEditDialog();
  };

  // Dialog to Confirm Deletion
  const handleOpenConfirmDialog = (id) => {
    setObraSocialToDelete(id);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setObraSocialToDelete(null);
  };

  const handleDeleteConfirmed = () => {
    setObrasSociales(obrasSociales.filter(os => os.id !== obraSocialToDelete));
    handleCloseConfirmDialog();
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 800,
        mx: 'auto',
        mt: 4,
      }}
    >
      <Paper sx={{ p: 3, m: 2, border: '1px solid #e0e0e0', boxShadow: 4 }}>
        <Typography sx={{ fontSize: '3.2em', fontWeight: 500, textAlign: 'left', mb: 5 }}>
          Mis Obras Sociales
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenAddEditDialog()}
          sx={{ mb: 5, backgroundColor: '#01819d' }}
        >
          Agregar Obra Social
        </Button>
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
                  <TableCell>{os.prestador}</TableCell>
                  <TableCell>{os.numeroAfiliado}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleOpenAddEditDialog(os)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleOpenConfirmDialog(os.id)} color="error">
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
          <DialogTitle>{editingObraSocial ? 'Editar Obra Social' : 'Agregar Obra Social'}</DialogTitle>
          <Formik
            initialValues={editingObraSocial || { prestador: '', numeroAfiliado: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleSave(values);
            }}
            validateOnChange={true}
            validateOnBlur={true}
          >
            {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
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
                    value={values.numeroAfiliado}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.numeroAfiliado && !!errors.numeroAfiliado}
                    helperText={touched.numeroAfiliado && errors.numeroAfiliado}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseAddEditDialog}>Cancelar</Button>
                  <Button type="submit" variant="contained">Guardar</Button>
                </DialogActions>
              </form>
            )}
          </Formik>
        </Dialog>
        {/* Deletion Confirmation Dialog */}
        <Dialog
          open={openConfirmDialog}
          onClose={handleCloseConfirmDialog}
        >
          <DialogTitle>Confirmar Eliminación</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Está seguro/a de querer eliminar esta obra social? Esta acción no se podrá deshacer.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmDialog}>Cancelar</Button>
            <Button onClick={handleDeleteConfirmed} color="error" variant="contained">
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default ObrasSociales;