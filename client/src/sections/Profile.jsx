import React, { useState, useEffect } from 'react';
import {
  Box,
  AppBar,
  Typography,
  Button,
  Paper,
  Avatar,
  Link,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Logo2 from '../assets/images/Logo Sasa-2.png';
import BottomNavBar from '../components/BottomNavBar';

import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Profile = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/businesses');  // Redirige a la página '/businesses'
  };

  const { userId } = useParams();

  const [user, setUser] = useState({});
  const [businesses, setBusinesses] = useState([]);
  const [recommendation, setRecommendation] = useState('');

  const fetchBusinesses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/businesses');
      setBusinesses(response.data);
    } catch (error) {
      console.error('Error fetching businesses:', error);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchUser = async () => {
    console.log("Obteniendo perfil del usuario");
    const encodedUserId = encodeURIComponent(userId);
    try {
      const response = await axios.get(`http://localhost:5000/profile/${encodedUserId}`);
      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  // Prompt para GPT basado en la lista de negocios
  const fetchRecommendation = async () => {
    const restaurantList = businesses.map(b => `${b.Business_Name} (${b.PK})`).join(', ');
    console.log('restaurantList:', restaurantList);
    const prompt = `Recomienda un restaurante entre la siguiente lista de restaurantes en forma de un antojo, y proporciona un link al restaurante recomendado (El link tiene el siguiente formato: "http://localhost:5173/businesses/{business.PK}", es importante que la PK elegida siempre tiene un caracter '#', cambia este caracter para su codificacion en URL la cual es '%23'). Lista de restaurantes: ${restaurantList}`;

    try {
      const response = await axios.post('http://localhost:5000/generate-response', { prompt });
      setRecommendation(response.data.response);
    } catch (error) {
      console.error('Error fetching recommendation:', error);
      setRecommendation('No se pudo obtener una recomendación en este momento.');
    }
  };

  useEffect(() => {
    if (businesses.length > 0) {
      fetchRecommendation();
    }
  }, [businesses]);

  // Función para extraer el enlace del texto
  const renderRecommendationWithLink = (text) => {
    const regex = /(http:\/\/localhost:5173\/businesses\/[^\s\)]+)/g; // Excluir paréntesis de cierre
    const match = text.match(regex);
    if (match) {
      // Si encontramos un enlace, creamos un enlace clickeable
      const link = match[0];
      const beforeLink = text.split(link)[0];
      const afterLink = text.split(link)[1];

      return (
        <>
          {beforeLink}
          <Link href={link} target="_blank" sx={{ color: '#4C956C', textDecoration: 'underline' }}>
            {link}
          </Link>
          {afterLink}
        </>
      );
    }

    return text; // Si no hay enlace, devolver el texto sin cambios
  };


  return (
    <div style={{ backgroundColor: '#F5F5F5', minHeight: '70vh' }}>
      {/* Sección superior con la información del usuario */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px}` },
          backgroundColor: '#4C956C',
        }}
      >
        <Box
          sx={{
            bgcolor: '#4C956C',
            mb: 30,
            height: '80px',
            width: '100%',
            top: 0,
            left: 0,
            p: 0,
            overflow: 'hidden',
            position: 'fixed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <img
            src={Logo2}
            alt="Logo"
            style={{ height: '50px', cursor: 'pointer' }}  // Esto cambia el cursor al pasar el mouse
            onClick={handleLogoClick}
          />
        </Box>
      </AppBar>

      {/* Sección de detalles del usuario */}
      <Box sx={{ padding: '110px', textAlign: 'center' }}>
        <Avatar
          alt={user.User_Name}
          src={user.profileImage || 'https://via.placeholder.com/150'}
          sx={{ width: 100, height: 100, margin: '0 auto' }}
        />
        <Typography variant="h5" sx={{ marginTop: 2 }}>
          {user.User_Name}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#4C956C' }}>
          {user.Email}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 2, color: '#666' }}>
          {user.bio || 'Biografía no disponible.'}
        </Typography>
        <Button
          variant="contained"
          sx={{ marginTop: 3, bgcolor: '#4C956C', color: 'white' }}
          onClick={() => alert('¡La función de editar perfil estará disponible pronto!')}
        >
          Editar Perfil
        </Button>
      </Box>

      {/* Sección de recomendación de restaurante */}
      <Box sx={{ padding: '20px' }}>
        <Paper elevation={2} sx={{ padding: 3 }}>
          <Typography variant="h5" sx={{ color: '#4C956C', marginBottom: 2 }}>
            ¿Te antojas de algo delicioso?
          </Typography>
          <Typography variant="h6">
            {renderRecommendationWithLink(recommendation || 'Cargando recomendación...')}
          </Typography>
        </Paper>
      </Box>

      <BottomNavBar value={2} />
    </div>
  );
};

export default Profile;
