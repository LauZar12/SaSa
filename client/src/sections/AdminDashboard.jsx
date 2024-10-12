import React, { useState, useEffect } from 'react';
import {
  AppBar, Box, CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography,
} from '@mui/material';
import {
  Menu as MenuIcon, Business as BusinessIcon, Inventory as InventoryIcon, CardGiftcard as CardGiftcardIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; 
import BusinessCardV2 from '../components/BusinessCardV2';
import Cookies from 'js-cookie'; 
import Logo2 from '../assets/images/Logo Sasa-2.png';
import AdminProductCard from '../components/AdminProductCard';
import toast from 'react-hot-toast';

const drawerWidth = 240;

export default function AdminDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Negocio');
  const [content, setContent] = useState(null);
  const navigate = useNavigate(); 
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const userInfo = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
  const businessId = userInfo ? encodeURIComponent(userInfo.GS1_PK) : '';

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

    if (businessId) {
      fetchData();
    }
  }, [selectedOption, businessId]);

  //Función para redirigir a la edición de un producto
  const handleEditProduct = (productId) => {
    const encodedProductId = encodeURIComponent(productId); 
    window.location.href = `/admin/businesses/${businessId}/products/${encodedProductId}/edit-product`;
  };

  const handleProductDeleted = async (productId) => {
    try {
      const encodedProductId = encodeURIComponent(productId); 
      await axios.delete(`http://localhost:5000/admin/businesses/${businessId}/products/${encodedProductId}/delete-product`);
      
      setContent((prevProducts) => prevProducts.filter((product) => product.GS3_PK !== productId));
      console.log(`Producto ${productId} eliminado con éxito.`);
      toast.success('Producto eliminado correctamente!')
    } catch (error) {
      console.error('Error eliminando el producto:', error);
      toast.error("Ups, tuvimos problemas para eliminar el producto.")
    }
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
              <AdminProductCard
                key={product.GS3_PK}
                product={product}
                onEdit={handleEditProduct}
                onDelete={handleProductDeleted}
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
