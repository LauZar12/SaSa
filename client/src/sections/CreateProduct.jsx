import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';
import toast from 'react-hot-toast';

const CreateProduct = ({ open = false, handleClose }) => {
  const { businessId } = useParams();
  const [product, setProduct] = useState({
    Product_Name: '',
    Product_Description: '',
    ExpirationDate: '',
    Price: '',
    Discount: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === 'Price' || name === 'Discount' ? Number(value) : value, 
    }));
  };

  const saveChanges = async () => {
    try {

      const encodedBusinessId = encodeURIComponent(businessId);

      const response = await axios.post(`http://localhost:5000/admin/businesses/${encodedBusinessId}/products/create-product`, product);
      setProduct(response.data);
      console.log("Producto creado con exito:", response.data)  
      toast.success('El producto ha sido creado con éxito!');
      handleClose();
    } catch (error) {
      console.error('Error editing product:', error);
      toast.error('Tuvimos problemas para crear el producto');
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
          Crear Producto
        </Typography>

        {product ? (
          <form noValidate autoComplete="off">
            <TextField
              fullWidth
              margin="normal"
              label="Nombre del Producto"
              name="Product_Name"
              value={product.Product_Name}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Descripción del Producto"
              name="Product_Description"
              value={product.Product_Description}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Fecha de Vencimiento"
              name="ExpirationDate"
              value={product.ExpirationDate}
              onChange={handleChange}
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Precio"
              name="Price"
              value={product.Price}
              onChange={handleChange}
              type="number"  
            />
            <TextField
              fullWidth
              margin="normal"
              label="Descuento"
              name="Discount"
              value={product.Discount}
              onChange={handleChange}
              type="number"  
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
          <Typography>Cargando formulario para crear producto...</Typography>
        )}
      </Box>
    </Modal>
  );
};

export default CreateProduct;
