import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Avatar,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import BottomNavBar from '../components/BottomNavBar';

const Profile = () => {
  const { userId } = useParams();

  // Datos de usuario de ejemplo
  const user = {
    name: 'Juan Pérez',
    email: 'juanperez@example.com',
    bio: 'Amante de la comida, viajero y entusiasta del café.',
    profileImage: 'https://via.placeholder.com/150', // Imagen de marcador de posición
  };

  return (
    <div style={{ backgroundColor: '#F5F5F5', minHeight: '70vh' }}>
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
        <Typography variant="h6">{userId}</Typography>
      </Box>

      <Box sx={{ padding: '20px', textAlign: 'center' }}>
        <Avatar
          alt={user.name}
          src={user.profileImage}
          sx={{ width: 100, height: 100, margin: '0 auto' }}
        />
        <Typography variant="h5" sx={{ marginTop: 2 }}>
          {user.name}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#4C956C' }}>
          {user.email}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 2, color: '#666' }}>
          {user.bio}
        </Typography>
        <Button
          variant="contained"
          sx={{ marginTop: 3, bgcolor: '#4C956C', color: 'white' }}
          onClick={() => alert('Editar perfil')}
        >
          Editar Perfil
        </Button>
      </Box>

      <Box sx={{ padding: '20px' }}>
        <Typography variant="h6" sx={{ color: '#4C956C', marginBottom: 2 }}>
          Información Adicional
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={2} sx={{ padding: 2 }}>
              <Typography variant="h6">Restaurantes Favoritos</Typography>
              <Typography variant="body2">1. Pizzería</Typography>
              <Typography variant="body2">2. Restaurante de Sushi</Typography>
              <Typography variant="body2">3. Hamburguesería</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={2} sx={{ padding: 2 }}>
              <Typography variant="h6">Actividades Recientes</Typography>
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
