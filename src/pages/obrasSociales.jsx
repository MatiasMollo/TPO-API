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

// Datos de ejemplo
const initialObrasSociales = [
  { id: 1, prestador: 'OSDE', numeroAfiliado: 'OSDE12345' },
  { id: 2, prestador: 'Swiss Medical', numeroAfiliado: 'SM67890' },
];

const ObrasSociales = () => {
  const [obrasSociales, setObrasSociales] = useState(initialObrasSociales);
  const [openAddEditDialog, setOpenAddEditDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [editingObraSocial, setEditingObraSocial] = useState(null);
  const [obraSocialToDelete, setObraSocialToDelete] = useState(null);
  const [formState, setFormState] = useState({ prestador: '', numeroAfiliado: '' });

  // Manejadores del Diálogo de Agregar/Editar
  const handleOpenAddEditDialog = (obraSocial = null) => {
    setEditingObraSocial(obraSocial);
    setFormState(obraSocial || { prestador: '', numeroAfiliado: '' });
    setOpenAddEditDialog(true);
  };

  const handleCloseAddEditDialog = () => {
    setOpenAddEditDialog(false);
    setEditingObraSocial(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSave = () => {
    if (editingObraSocial) {
      setObrasSociales(obrasSociales.map(os =>
        os.id === editingObraSocial.id ? { ...os, ...formState } : os
      ));
    } else {
      // The id is automatically incremented based on the current length of the array
      const newId = obrasSociales.length > 0 ? Math.max(...obrasSociales.map(os => os.id)) + 1 : 1;
      const newObraSocial = { id: newId, ...formState };
      setObrasSociales([...obrasSociales, newObraSocial]);
    }
    handleCloseAddEditDialog();
  };

  // Manejadores del Diálogo de Confirmación de Eliminación
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
    <Paper sx={{ p: 3, m: 2, border: '1px solid #e0e0e0', boxShadow: 3 }}>
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
              <TableCell>ID</TableCell>
              <TableCell>Prestador</TableCell>
              <TableCell>Número de Afiliado</TableCell>
              <TableCell align="right">Modificar/Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {obrasSociales.map((os) => (
              <TableRow key={os.id}>
                <TableCell>{os.id}</TableCell>
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
      {/* Diálogo de Agregar/Editar */}
      <Dialog open={openAddEditDialog} onClose={handleCloseAddEditDialog}>
        <DialogTitle>{editingObraSocial ? 'Editar Obra Social' : 'Agregar Obra Social'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="prestador"
            label="Prestador de la Obra Social"
            type="text"
            fullWidth
            variant="outlined"
            value={formState.prestador}
            onChange={handleFormChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="numeroAfiliado"
            label="Número de Afiliado"
            type="text"
            fullWidth
            variant="outlined"
            value={formState.numeroAfiliado}
            onChange={handleFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddEditDialog}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>
      {/* Diálogo de Confirmación de Eliminación */}
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