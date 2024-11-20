import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { Modal, Typography, Button } from '@mui/material';

export default function BottomNavBar({ value, onChange }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = React.useState(false);

  const handleNavigation = () => {
    navigate('/businesses');
    if (onChange) onChange(0);
  };

  const handleNavigationMap = () => {
    navigate('/map');
    if (onChange) onChange(1);
  };

  const handleNavigationProfile = () => {
    const userInfo = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;

    if (userInfo && userInfo.PK) {
      const encodedGS1_PK = encodeURIComponent(userInfo.PK);
      navigate(`/profile/${encodedGS1_PK}`);
      if (onChange) onChange(2);
    } else {
      setShowModal(true); // Muestra el modal si no hay usuario
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleNavigateToAuth = () => {
    setShowModal(false);
    navigate('/auth'); // Redirige a la página de autenticación
  };

  return (
    <>
      <Box sx={{ bgcolor: '#4C956C', position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            if (onChange) onChange(newValue);
          }}
          sx={{ bgcolor: '#4C956C' }}
        >
          <BottomNavigationAction
            label="Restaurantes"
            icon={<FastfoodIcon />}
            onClick={handleNavigation}
            sx={{
              color: value === 0 ? 'white' : 'rgba(255, 255, 255, 0.6)',
              '&.Mui-selected': {
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '0px',
              },
            }}
          />
          <BottomNavigationAction
            label="Mapa"
            icon={<MapOutlinedIcon />}
            onClick={handleNavigationMap}
            sx={{
              color: value === 1 ? 'white' : 'rgba(255, 255, 255, 0.6)',
              '&.Mui-selected': {
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '0px',
              },
            }}
          />
          <BottomNavigationAction
            label="Perfil"
            icon={<AccountBoxIcon />}
            onClick={handleNavigationProfile}
            sx={{
              color: value === 2 ? 'white' : 'rgba(255, 255, 255, 0.6)',
              '&.Mui-selected': {
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '0px',
              },
            }}
          />
        </BottomNavigation>
      </Box>

      {/* Modal para mensaje de sesión requerida */}
      <Modal open={showModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: '300px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Sesión requerida
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            Debes iniciar sesión para acceder a tu perfil.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNavigateToAuth}
            fullWidth
            sx={{
              mt:1,
              backgroundColor: '#4C956C' ,

            }}
          >
            Ir a Inicio de Sesión
          </Button>
          <Button
            variant="text"
            color="black"
            onClick={handleCloseModal}
            fullWidth
            sx={{
              mt: 1
            }}
          >
            Cancelar
          </Button>
        </Box>
      </Modal>
    </>
  );
}
