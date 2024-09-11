import React, { useState, useEffect } from 'react';
import {
  AppBar, Box, CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography,
} from '@mui/material';
import {
  Menu as MenuIcon, Business as BusinessIcon, Inventory as InventoryIcon, CardGiftcard as CardGiftcardIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Asegúrate de tener React Router
import BusinessCardV2 from '../components/BusinessCardV2';
import ProductCard from '../components/AdminProductCard'; // Importa tu tarjeta de producto

import Logo2 from '../assets/images/Logo Sasa-2.png';
import { useParams } from '@reach/router';

const drawerWidth = 240;

export default function Component() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Negocio');
  const [content, setContent] = useState(null);
  const navigate = useNavigate(); // Hook de React Router para redirigir
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  let businessId = 'business%232';

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (selectedOption === 'Negocio') {
          response = await axios.get(`http://localhost:5000/admin/businesses/${businessId}`);
        } else if (selectedOption === 'Productos') {
          response = await axios.get(`http://localhost:5000/admin/businesses/${businessId}/products`);
        }
        setContent(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setContent(null);
      }
    };

    fetchData();
  }, [selectedOption, businessId]);

  // Función para redirigir a la edición de un producto
  const handleEditProduct = (productId) => {
    const encodedProductId = encodeURIComponent(productId); // Codifica el ID
    const businessId = 'business%231'; // Codifica este también si es necesario
    window.location.href = `/admin/businesses/${businessId}/products/${encodedProductId}/edit-product`;
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {['Negocio', 'Productos', 'Cajas Sorpresa'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => setSelectedOption(text)}>
              <ListItemIcon>
                {index === 0 ? <BusinessIcon /> : index === 1 ? <InventoryIcon /> : <CardGiftcardIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const renderContent = () => {
    switch (selectedOption) {
      case 'Negocio':
        return (
          <Box p={3}>
            <Typography variant="h4" gutterBottom>
              Información del Negocio
            </Typography>
            {content && content.length > 0 ? (
              <BusinessCardV2 business={content[0]} />
            ) : (
              'Cargando información del negocio...'
            )}
          </Box>
        );
      case 'Productos':
        return (
          <Box p={3}>
            <Typography variant="h4" gutterBottom>
              Maneja tus productos
            </Typography>
            <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={2}>
            
            {content && content.map((product) => (
              <ProductCard 
               key={product.GS3_PK} 
               product={product} 
               onEdit={handleEditProduct} 
               />
            ))}

            </Box>
          </Box>
        );
      case 'Cajas Sorpresa':
        return (
          <Box p={3}>
            <Typography variant="h4" gutterBottom>
              Cajas Sorpresa
            </Typography>
            <Typography paragraph>
              Crea y administra ofertas de cajas sorpresa, establece los contenidos y determina los precios de estos paquetes especiales!
            </Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: '#4C956C',
        }}
      >
        {/* <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ color: '#fff' }}>
            Panel de Administrador
          </Typography>
        </Toolbar> */}

      <Box
        sx={{
          bgcolor: '#4C956C',
          height: '80px',
          width: '100%', // Ensure the bar covers the full width of the screen
          top: 0, // Stick to the top of the screen
          left: 0, // Stick to the left side
          p: 0, // Remove padding inside the box
          overflow: 'hidden',
          position: 'fixed', // Make it sticky
          display: 'flex', // Align items horizontally
          alignItems: 'center', // Vertically center the logo
          justifyContent: 'center', // Horizontally center the logo (optional)
          zIndex: 1000 // Ensure it's above other elements
        }}
      >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            display = "left"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        
        <img src={Logo2} alt="Logo" style={{ height: '50px' }} /> 
      </Box>

      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {renderContent()}
      </Box>
    </Box>
  );
}
