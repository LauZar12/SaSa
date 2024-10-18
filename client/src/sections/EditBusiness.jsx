import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie'; 

const EditBusiness = ({ open = false, handleClose }) => {
  const { businessId } = useParams();
  const [business, setBusiness] = useState({
    Business_Name: '',
    Business_City: '',
    Business_Address: '',
    Business_Hours: '',
    Business_Localization: '',
  });

  useEffect(() => {
    if (open && businessId) {
      fetchBusinessDetails(businessId);
    }
  }, [businessId, open]);

  const fetchBusinessDetails = async (businessId) => {
    try {
      const encodedBusinessId = encodeURIComponent(businessId);
      
      const response = await axios.get(`http://localhost:5000/admin/businesses/${encodedBusinessId}`);
      
      setBusiness(response.data);
    } catch (error) {
      console.error('Error fetching business details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBusiness((prevBusiness) => ({
      ...prevBusiness,
      [name]: value, 
    }));
  };

  const saveChanges = async () => {
    try {
      const encodedBusinessId = encodeURIComponent(businessId);
      
      const user = JSON.parse(Cookies.get('user'));
      const PK = user.PK; 

      const businessData = { ...business, PK };
      console.log(businessData)
      await axios.put(`http://localhost:5000/admin/businesses/${encodedBusinessId}/edit-info`, businessData, {
        withCredentials: true 
      });
      
      toast.success('El negocio ha sido editado con éxito!');
      handleClose();
    } catch (error) {
      console.error('Error editing business:', error);
      toast.error('Tuvimos problemas para editar el negocio');
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
          Editar Negocio
        </Typography>

        {business ? (
          <form noValidate autoComplete="off">
            <TextField
              fullWidth
              margin="normal"
              label="Nombre"
              name="Business_Name"
              value={business.Business_Name}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Ciudad"
              name="Business_City"
              value={business.Business_City}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Dirección"
              name="Business_Address"
              value={business.Business_Address}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Horario"
              name="Business_Hours"
              value={business.Business_Hours}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Localización"
              name="Business_Localization"
              value={business.Business_Localization}
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
          <Typography>Cargando información del negocio...</Typography>
        )}
      </Box>
    </Modal>
  );
};

export default EditBusiness;
