import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import SmartToyIcon from '@mui/icons-material/SmartToy';
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
  const [isGenerating, setIsGenerating] = useState(false); // Tracks if the button has been clicked

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === 'Price' || name === 'Discount' ? Number(value) : value,
    }));
  };

  // Call the AI API to generate a discount
  const generateDiscount = async () => {
    setIsGenerating(true); // Disable the button after the first click

    // Obtener la fecha actual en formato legible
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toLocaleDateString('es-ES', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

    // Convertir la fecha de vencimiento a un objeto de fecha
    const expirationDate = new Date(product.ExpirationDate);

    // Calcular el tiempo restante hasta la fecha de vencimiento
    const timeDiff = expirationDate - currentDate;
    let timeRemaining;
    if (timeDiff <= 0) {
        timeRemaining = "Producto vencido";
    } else if (timeDiff < 24 * 60 * 60 * 1000) {
        const hoursRemaining = Math.floor(timeDiff / (1000 * 60 * 60));
        timeRemaining = `${hoursRemaining} horas`;
    } else {
        const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        timeRemaining = `${daysRemaining} días`;
    }

    // Construir el prompt incluyendo la fecha actual y el tiempo restante
    const prompt = `Necesito que solo me des un numero entero de 1 a 3 dígitos. Tu respuesta no debe pasar los 3 caracteres y no debe ser menor a 1 carácter. El numero entero va a ser un descuento que me vas a dar en torno al siguiente producto que esta pronto a caducar pero aun así quiero vender por un precio mas barato para que no se pierda la comida, el descuento también tiene que dar un profit razonable al restaurante. La fecha actual es ${formattedCurrentDate} y el producto es ${product.Product_Name} con descripcion ${product.Product_Description}. Vence el ${product.ExpirationDate}, es decir, en ${timeRemaining}. Su precio es de ${product.Price} pesos colombianos. Dame el descuento que deberia darle en forma de numero entero sin el simbolo de porcentaje (0 - 100). Tu respuesta solo debe ser ese numero entero.`;

    try {
        const response = await axios.post('http://3.144.21.138:5000/generate-response', { prompt });
        const discount = parseInt(response.data.response, 10);

        if (!isNaN(discount) && discount >= 0 && discount <= 100) {
            setProduct((prevProduct) => ({
                ...prevProduct,
                Discount: discount,
            }));
            alert(`Descuento generado con éxito. El descuento que te sugerimos es: ${discount}%`);
        } else {
            alert('Error al generar el descuento. Intente nuevamente.');
        }
    } catch (error) {
        console.error('Error fetching discount:', error);
        alert('Hubo un problema al generar el descuento.');
    } finally {
        setIsGenerating(false); // Re-enable the button if needed
    }
};

  // Save changes (e.g., create a new product)
  const saveChanges = async () => {
    try {
      const encodedBusinessId = encodeURIComponent(businessId);
      const response = await axios.post(`http://3.144.21.138:5000/admin/businesses/${encodedBusinessId}/products/create-product`, product);
      setProduct(response.data);
      console.log('Producto creado con exito:', response.data);
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
              color="secondary"
              startIcon={<SmartToyIcon />}
              onClick={generateDiscount}
              disabled={isGenerating} // Disable if the button has been clicked
              sx={{ mt: 2 }}
            >
              Generar Descuento con AI
            </Button>

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
