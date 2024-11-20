import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';
import toast from 'react-hot-toast';

const EditSurpriseBox = ({ open = false, handleClose, surpriseBoxId }) => {
  const { businessId } = useParams();
  const [surpriseBox, setSurpriseBox] = useState({
    Product_Name: '',
    Available_Quantity: '',
    Price: '',
  });

  useEffect(() => {
    if (open && surpriseBoxId) {
      fetchSurpriseBoxDetails(surpriseBoxId);
    }
  }, [surpriseBoxId, open]);

  const fetchSurpriseBoxDetails = async (surpriseBoxId) => {
    try {
      const encodedSurpriseBoxId = encodeURIComponent(surpriseBoxId);
      const encodedBusinessId = encodeURIComponent(businessId);

      const response = await axios.get(`http://3.144.21.138:5000/admin/businesses/${encodedBusinessId}/surprise-boxes/${encodedSurpriseBoxId}`);
      
      setSurpriseBox(response.data.result || []);
    } catch (error) {
      console.error('Error fetching surprise box details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSurpriseBox((prevSurpriseBox) => ({
      ...prevSurpriseBox,
      [name]: value !== undefined && value !== null ? (name === 'Price' || name === 'Available_Quantity' ? Number(value) : value): '', 
    }));
  };

  const saveChanges = async () => {
    try {
      const encodedSurpriseBoxId = encodeURIComponent(surpriseBoxId);
      const encodedBusinessId = encodeURIComponent(businessId);

      await axios.put(`http://3.144.21.138:5000/admin/businesses/${encodedBusinessId}/surprise-boxes/${encodedSurpriseBoxId}/edit-surprise-box`, surpriseBox);
      
      toast.success('La caja sorpresa ha sido editada con éxito!');
      handleClose();
    } catch (error) {
      console.error('Error editing surprise box:', error);
      toast.error('Tuvimos problemas para editar la caja sorpresa');
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
          Editar Surprise Box
        </Typography>

        {surpriseBox ? (
          <form noValidate autoComplete="off">
            <TextField
              fullWidth
              margin="normal"
              label="Nombre de la Surprise Box"
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
          <Typography>Cargando información de la Surprise Box...</Typography>
        )}
      </Box>
    </Modal>
  );
};

export default EditSurpriseBox;
