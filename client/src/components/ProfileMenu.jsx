import React from 'react';
import { Link } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import TrackChangesIcon from '@mui/icons-material/TrackChanges'; // Icono para seguimiento de desperdicios
import '.assets\css\ProfileMenu.css'; // Estilos CSS para el componente

export default function ProfileMenu() {
  return (
    <div className="profile-menu">
      {/* Imagen de perfil y nombre */}
      <div className="profile-header">
        <img
          src="link-a-la-imagen-del-perfil"
          alt="Perfil"
          className="profile-picture"
        />
        <div className="profile-info">
          <p>Mi perfil</p>
          <h3>Salchipapas el Tesoro</h3>
        </div>
      </div>

      {/* Opciones del menú */}
      <div className="menu-options">
        <Link to="/direccion" className="menu-item">
          <LocationOnIcon />
          <span>Dirección</span>
        </Link>

        <Link to="/seguimiento" className="menu-item">
          <TrackChangesIcon />
          <span>Seguimiento de desperdicios</span>
        </Link>

        <Link to="/notificaciones" className="menu-item">
          <NotificationsIcon />
          <span>Notificaciones</span>
        </Link>

        <Link to="/ajustes" className="menu-item">
          <SettingsIcon />
          <span>Ajustes de cuenta</span>
        </Link>
      </div>
    </div>
  );
};