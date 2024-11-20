import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';
import toast from 'react-hot-toast';

const CreateSurpriseBox = ({ open = false, handleClose }) => {
  const { businessId } = useParams();
  const [surpriseBox, setSurpriseBox] = useState({
    Product_Name: '',
    Available_Quantity: '',
    Price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSurpriseBox((prevBox) => ({
      ...prevBox,
      [name]: name === 'Price' || name === 'Available_Quantity' ? Number(value) : value,
    }));
  };

  const saveChanges = async () => {
    try {
      const encodedBusinessId = encodeURIComponent(businessId);

      const response = await axios.post(`http://3.144.21.138:5000/admin/businesses/${encodedBusinessId}/surprise-boxes/create-surprise-box`, surpriseBox);
      setSurpriseBox(response.data.result || []);
      console.log("Surprise Box creada con éxito:", response.data);
      toast.success('La Surprise Box ha sido creada con éxito!');
      handleClose();
    } catch (error) {
      console.error('Error creando Surprise Box:', error);
      toast.error('Hubo un problema al crear la Surprise Box');
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          Crear Surprise Box
        </Typography>

        {surpriseBox ? (
          <form noValidate autoComplete="off">
            <TextField
              fullWidth
              margin="normal"
              label="Nombre del Producto"
              name="Product_Name"
              value={surpriseBox.Product_Name}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Cantidad Disponible"
              name="Available_Quantity"
              value={surpriseBox.Available_Quantity}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Precio"
              name="Price"
              value={surpriseBox.Price}
              onChange={handleChange}
            />
            
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={saveChanges}
              sx={{ mt: 2 }}
            >
              Guardar Cambios
            </Button>
          </form>
        ) : (
          <Typography>Cargando formulario para crear Surprise Box...</Typography>
        )}
      </Box>
    </Modal>
  );
};

export default CreateSurpriseBox;
