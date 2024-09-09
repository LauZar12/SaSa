import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import '.assets/css/DonationsCard.css'; // Asegúrate de tener esta hoja de estilos

export default function ContactCard() {

  return (
    <div className="contact-card">
      {/* Imagen del banco de alimentos */}
      <div className="profile-picture">
        <img 
          src="client\src\assets\images\ContactImages\Donations\El Porvenir.webp" 
          alt="Banco de alimentos El Porvenir" 
        />
      </div>

      {/* Información del banco de alimentos */}
      <div className="contact-info">
        <h2>Banco de alimentos El Porvenir</h2>

        {/* WhatsApp */}
        <div className="contact-item">
          <img 
            src=".assets\icons\Whatsapp-icon.svg" 
            alt="WhatsApp" 
            className="icon" 
          />
          <span>310 366 9621</span>
        </div>

        {/* Instagram */}
        <div className="contact-item">
          <img 
            src=".assets\icons\Instagram-icon.svg" 
            alt="Instagram" 
            className="icon" 
          />
          <span>@bancoelporvenir</span>
        </div>

        {/* Ubicación */}
        <div className="contact-item">
          <LocationOnIcon className="icon" />
          <span>Rionegro, El Porvenir</span>
        </div>

        {/* Botón de detalles */}
        <div className="details-button">
          <button>... Ver detalles</button>
        </div>
      </div>
    </div>
  );
};


