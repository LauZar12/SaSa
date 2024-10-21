import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Avatar,
} from '@mui/material';
import { useParams } from 'react-router-dom'; // Obtener userId desde los parámetros de la ruta
import axios from 'axios';
import BottomNavBar from '../components/BottomNavBar';

const Profile = () => {
  const { userId } = useParams(); // Obtener userId desde la ruta

  const [user, setUser] = useState({}); // Inicializar user como un objeto vacío

  // Función para obtener el perfil del usuario
  const fetchUser = async () => {
    console.log("Obteniendo perfil del usuario");

    const encodedUserId = encodeURIComponent(userId);

    try {
      // Actualizar la URL para incluir userId y obtener los datos del usuario
      const response = await axios.get(`http://localhost:5000/profile/${encodedUserId}`);
      setUser(response.data); // Suponiendo que response.data contiene los datos del usuario
      console.log(response.data);
    } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUser(); // Obtener el perfil del usuario cuando el componente se monta
    }
  }, [userId]);

  return (
    <div style={{ backgroundColor: '#F5F5F5', minHeight: '70vh' }}>
      {/* Sección superior con la información del usuario */}
      <Box
        sx={{
          bgcolor: '#4C956C',
          color: 'white',
          py: 4,
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" gutterBottom>
          PERFIL
        </Typography>
        <Typography variant="h6">{user.User_Name}</Typography>
      </Box>

      {/* Sección de detalles del usuario */}
      <Box sx={{ padding: '20px', textAlign: 'center' }}>
        <Avatar
          alt={user.User_Name}
          src={user.profileImage || 'https://via.placeholder.com/150'} // Imagen de marcador de posición
          sx={{ width: 100, height: 100, margin: '0 auto' }}
        />
        <Typography variant="h5" sx={{ marginTop: 2 }}>
          {user.User_Name}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#4C956C' }}>
          {user.Email}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 2, color: '#666' }}>
          {user.bio || 'Biografía no disponible.'} {/* Mostrar mensaje por defecto si no hay biografía */}
        </Typography>
        <Button
          variant="contained"
          sx={{ marginTop: 3, bgcolor: '#4C956C', color: 'white' }}
          onClick={() => alert('¡La función de editar perfil estará disponible pronto!')}
        >
          Editar Perfil
        </Button>
      </Box>

      {/* Sección de información adicional */}
      <Box sx={{ padding: '20px' }}>
        <Typography variant="h6" sx={{ color: '#4C956C', marginBottom: 2 }}>
          Información Adicional
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={2} sx={{ padding: 2 }}>
              <Typography variant="h6">Restaurantes Favoritos</Typography>
              {/* Reemplazar con contenido dinámico si está disponible */}
              <Typography variant="body2">1. Pizzería</Typography>
              <Typography variant="body2">2. Restaurante de Sushi</Typography>
              <Typography variant="body2">3. Hamburguesería</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={2} sx={{ padding: 2 }}>
              <Typography variant="h6">Actividades Recientes</Typography>
              {/* Reemplazar con contenido dinámico si está disponible */}
              <Typography variant="body2">Visitado: Pizzería</Typography>
              <Typography variant="body2">Me gusta: Restaurante de Sushi</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <BottomNavBar value={2} />
    </div>
  );
};

export default Profile;
