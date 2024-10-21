import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import { useNavigate } from "react-router-dom";

export default function BottomNavBar({ value, onChange }) {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/businesses');
    if (onChange) onChange(0);
  };
  const handleNavigationMap = () => {
    navigate('/map');
    if (onChange) onChange(1);
  };
  const handleNavigationProfile = () => {
    navigate('/profile');
    if (onChange) onChange(2);
  };

  return (
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
  );
}
