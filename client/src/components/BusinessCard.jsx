import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import '.assets/css/BusinessCard.css'; // Asegúrate de tener esta hoja de estilos para el diseño.

export default function BusinessCard() {
  return (
    <div className="business-card">
      {/* Imagen del producto */}
      <img 
        src=".assets\images\BusinessImages\Caracas Fried Chicken.jpeg" 
        alt="Caracas Fried Chicken" 
        className="business-image" 
      />

      {/* Información del producto */}
      <div className="business-name">
        <h2>Caracas Fried Chicken</h2>
        <p className="address">
          <LocationOnIcon /> Laureles, Carrera 35 #7-83
        </p>
        <div className="rating">
          <StarIcon /> 4.5
        </div>
        <p className="hours">Horario: 9am - 10pm</p>

        {/* Precio */}
        <div className="price-container">
          <LocalShippingIcon />
          <span className="price">$20.000</span>
        </div>
      </div>
    </div>
  );
}


