import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import { Edit, AccessTime, Description, LocalOffer  } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
// import axios from 'axios';
// import toast from 'react-hot-toast';

const AdminProductCard = ({ product, onEdit, onDelete }) => {

  const {
    GS3_PK,
    Price = 0,
    Product_Name = 'Nombre no disponible',
    ExpirationDate = 'Fecha no especificada',
    Product_Description = 'Descripción no disponible',
    Discount = 0
  } = product || {};


  const handleProductClicked = () => {
    console.log(product);
    if (!GS3_PK) {
      console.error("El ID del producto es undefined");
      return;
    }
  
    if (onEdit) {
      onEdit(GS3_PK);
    }
  };
  

  const handleProductDeleted = async () => {
      if(onDelete) {
        onDelete(GS3_PK);
      }
    }


  const formattedPrice = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(Price);
  const discountedPrice = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(Price * (1 - Discount / 100));

  return (
    <Card className="max-w-sm mx-auto shadow-lg">
      <CardContent className="space-y-4">
        <Typography variant="h5" className="font-bold text-center text-gray-800">
          {Product_Name}
        </Typography>
        
        <div className="flex items-center justify-between">
          <Typography variant="h6" className="text-gray-700">Precio:</Typography>
          <div>
            <Typography variant="body1" className={Discount > 0 ? "line-through text-gray-500" : "font-bold"}>
              {formattedPrice}
            </Typography>
            {Discount > 0 && (
              <Typography variant="body1" className="font-bold text-green-600">
                {discountedPrice} ({Discount}% descuento)
              </Typography>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <AccessTime className="text-gray-500" />
          <Typography variant="body2">Expira: {ExpirationDate}</Typography>
        </div>

        <div className="flex items-start space-x-2">
          <Description className="text-gray-500 mt-1" />
          <Typography variant="body2">{Product_Description}</Typography>
        </div>

        {Discount > 0 && (
          <div className="flex items-center space-x-2">
            <LocalOffer className="text-red-500" />
            <Typography variant="body2" className="text-red-500 font-bold">
              ¡{Discount}% de descuento!
            </Typography>
          </div>
        )}
      </CardContent>
      <CardActions className="justify-end">
      <Button 
        variant="contained" 
        color="primary" 
        startIcon={<Edit />}
        onClick={handleProductClicked} 
        className="bg-blue-500 hover:bg-blue-600"
      >
        Editar
      </Button>
      <Button 
        variant="outlined"
        startIcon={<DeleteIcon />}
        color="error" 
        className="bg-red-500 hover:bg-red-200" 
        onClick={handleProductDeleted}>
        Borrar
      </Button>
      </CardActions>
    </Card>
  );
}; 

export default AdminProductCard;

