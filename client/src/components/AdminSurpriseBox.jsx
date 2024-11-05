import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import { Edit, Inventory, MonetizationOn } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminSurpriseBoxCard = ({ surpriseBox, onEdit, onDelete }) => {

  const {
    PK,
    Price = 0,
    Product_Name = 'Nombre no disponible',
    Available_Quantity = 'Cantidad no especificada'
  } = surpriseBox || {};

  const handleSurpriseBoxClicked = () => {
    if (!PK) {
      console.error("El ID de la Surprise Box es undefined");
      return;
    }

    if (onEdit) {
      onEdit(PK);
    }
  };

  const handleSurpriseBoxDeleted = async () => {
    if (onDelete) {
      onDelete(PK);
    }
  };

  const formattedPrice = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(Price);

  return (
    <Card className="max-w-sm mx-auto shadow-lg">
      <CardContent className="space-y-4">
        <Typography variant="h5" className="font-bold text-center text-gray-800">
          {Product_Name}
        </Typography>

        <div className="flex items-center justify-between">
          <Typography variant="h6" className="text-gray-700">Precio:</Typography>
          <Typography variant="body1" className="font-bold">
            {formattedPrice}
          </Typography>
        </div>

        <div className="flex items-center space-x-2">
          <Inventory className="text-gray-500" />
          <Typography variant="body2">Cantidad disponible: {Available_Quantity}</Typography>
        </div>
      </CardContent>
      
      <CardActions className="justify-end">
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<Edit />}
          onClick={handleSurpriseBoxClicked} 
          className="bg-blue-500 hover:bg-blue-600"
        >
          Editar
        </Button>
        <Button 
          variant="outlined"
          startIcon={<DeleteIcon />}
          color="error" 
          className="bg-red-500 hover:bg-red-200" 
          onClick={handleSurpriseBoxDeleted}
        >
          Borrar
        </Button>
      </CardActions>
    </Card>
  );
};

export default AdminSurpriseBoxCard;
